import google.generativeai as genai
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from services.models import Service
from google.generativeai.types import FunctionDeclaration, Tool

# Define the function signature with the complete and correct schema
display_vendor_recommendations_func = FunctionDeclaration(
    name="display_vendor_recommendations",
    description="Use this function to display a list of recommended vendors to the user on the main page.",
    parameters={
        "type": "object",
        "properties": {
            "vendors": {
                "type": "array",
                "description": "A list of recommended vendors.",
                "items": {
                    "type": "object", # This is required
                    "properties": {
                        "vendor_id": {"type": "string", "description": "The UUID of the vendor."},
                        "business_name": {"type": "string", "description": "The name of the vendor's business."},
                        "service_id": {"type": "string", "description": "The UUID of the specific service being recommended."},
                        "service_name": {"type": "string", "description": "The name of the service."},
                        "price_range": {"type": "string", "description": "The estimated price range for the service."},
                        "rating": {"type": "string", "description": "The vendor's average rating, e.g., '4.50/5.00'."}
                    },
                    # Adding the required fields for the nested object is crucial
                    "required": ["vendor_id", "business_name", "service_id", "service_name", "price_range", "rating"]
                }
            }
        },
         "required": ["vendors"]
    },
)

vendor_tool = Tool(function_declarations=[display_vendor_recommendations_func])


class AIRecommenderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1. CONFIGURE THE CLIENT
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel(
            model_name='gemini-2.0-flash',
            tools=[vendor_tool]
        )

        # 2. GET CONVERSATION HISTORY FROM FRONTEND
        conversation_history = request.data.get('conversation', [])
        
        # 3. RETRIEVE CONTEXT FROM YOUR DATABASE
        relevant_services = Service.objects.select_related('vendor', 'category').filter(availability_status=True)
        
        context_string = "Here is a list of available vendors and their services:\n"
        for service in relevant_services:
            context_string += (
                f"- VendorID: {service.vendor.id}, Business: {service.vendor.business_name}, "
                f"ServiceID: {service.id}, Service: {service.name}, "
                f"Price Range: {service.price_range}, Rating: {service.vendor.rating}/5.00\n"
            )

        # 4. CONSTRUCT THE FULL PROMPT
        system_instruction = """
        You are "Event Safi Assistant," a friendly and expert event planning assistant. Your goal is to help the user find the perfect vendors for their event.

        Your operation is divided into two modes:
        1.  **Information Gathering Mode:** Your primary goal is to ask clarifying questions to understand the user's needs. You MUST gather details like budget, number of guests, event date, location, and desired services. Stay in this mode until you have enough information to make a recommendation.
        2.  **Recommendation Mode:** Once you have gathered all necessary information, you MUST switch to this mode. In this mode, your ONLY action is to call the `display_vendor_recommendations` tool with the vendors you have selected from the CONTEXT. Do not write any text, do not summarize, just call the tool.

        Do not mix modes. If you are recommending, call the tool. If you are asking questions, just ask the questions.
        """
        
        # Prepare messages for the generative model
        messages = [
            {"role": "user", "parts": [{"text": system_instruction}]},
            {"role": "user", "parts": [{"text": f"CONTEXT:\n{context_string}"}]},
        ]

        # Append the actual conversation history, transforming it to the expected format
        for msg in conversation_history:
            messages.append({"role": msg["role"], "parts": [{"text": msg["text"]}]})

        # 5. CALL THE GEMINI API
        try:
            response = model.generate_content(messages)
            response_part = response.candidates[0].content.parts[0]

            # 6. HANDLE THE RESPONSE (CHECK FOR TOOL CALL)
            if response_part.function_call:
                function_call = response_part.function_call
                vendor_data = {arg: function_call.args[arg] for arg in function_call.args}
                
                return Response({
                    "reply": "I've found some great options based on your needs! Here are the top recommendations.",
                    "structured_data": vendor_data,
                    "is_tool_call": True
                })
            else:
                return Response({
                    "reply": response_part.text,
                    "structured_data": None,
                    "is_tool_call": False
                })
        except Exception as e:
            # Handle potential API errors gracefully
            return Response({"error": f"An error occurred with the AI service: {str(e)}"}, status=500)
