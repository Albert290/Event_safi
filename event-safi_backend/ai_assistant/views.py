import json
import google.generativeai as genai
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from services.models import Service
from .models import ChatMemory
from google.generativeai.types import FunctionDeclaration, Tool


# --- 1️⃣ Define the function-calling schema ---
display_vendor_recommendations_func = FunctionDeclaration(
    name="display_vendor_recommendations",
    description="Displays structured vendor recommendations to the user.",
    parameters={
        "type": "object",
        "properties": {
            "vendors": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "vendor_id": {"type": "string"},
                        "business_name": {"type": "string"},
                        "service_id": {"type": "string"},
                        "service_name": {"type": "string"},
                        "price_range": {"type": "string"},
                        "rating": {"type": "string"},
                    },
                    "required": [
                        "vendor_id",
                        "business_name",
                        "service_id",
                        "service_name",
                        "price_range",
                        "rating",
                    ],
                },
            }
        },
        "required": ["vendors"],
    },
)

vendor_tool = Tool(function_declarations=[display_vendor_recommendations_func])


# --- 2️⃣ Define the AI View ---
class AIRecommenderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Configure Gemini client
        genai.configure(api_key=settings.GEMINI_API_KEY)

        # System instruction — this replaces "system" role messages
        system_instruction = (
            "You are Event Safi Assistant, an expert in event planning and vendor recommendations. "
            "You must first gather all necessary details (budget, event type, date, location, services) "
            "before recommending vendors. Once you have all the information, DO NOT describe the recommendations. "
            "Instead, call the `display_vendor_recommendations` tool directly using structured JSON only. "
            "Never mix text with JSON output."
        )

        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            tools=[vendor_tool],
            system_instruction=system_instruction,  # ✅ Correct usage for Gemini
        )

        # --- 3️⃣ Retrieve or create memory for the user ---
        chat_memory, _ = ChatMemory.objects.get_or_create(user=request.user)
        new_messages = request.data.get("conversation", [])
        conversation_history = chat_memory.messages + new_messages

        # --- 4️⃣ Build context from vendor services ---
        services = Service.objects.select_related("vendor", "category").filter(availability_status=True)
        context_string = "Here is a list of available vendors and their services:\n"
        for s in services:
            context_string += (
                f"- VendorID: {s.vendor.id}, Business: {s.vendor.business_name}, "
                f"ServiceID: {s.id}, Service: {s.name}, "
                f"Price Range: {s.price_range}, Rating: {s.vendor.rating}/5.00\n"
            )

        # --- 5️⃣ Construct messages (no 'system' role allowed) ---
        messages = [
            {"role": "user", "parts": [{"text": f"CONTEXT:\n{context_string}"}]},
        ]
        for msg in conversation_history:
            messages.append({"role": msg["role"], "parts": [{"text": msg["text"]}]})

        # --- 6️⃣ Call Gemini API ---
        try:
            response = model.generate_content(messages)
            part = response.candidates[0].content.parts[0]

            # --- ✅ Case 1: Gemini calls the structured tool ---
            if hasattr(part, "function_call") and part.function_call:
                func = part.function_call
                vendors = func.args.get("vendors", [])

                chat_memory.messages = conversation_history + [
                    {"role": "assistant", "text": "Provided vendor recommendations."}
                ]
                chat_memory.save()

                return Response(
                    {
                        "reply": "Here are your vendor recommendations!",
                        "structured_data": {"vendors": vendors},
                        "is_tool_call": True,
                    }
                )

            # --- ⚙️ Case 2: Fallback — AI returns JSON in text form ---
            ai_reply = part.text
            structured_data = None

            if "```json" in ai_reply:
                try:
                    json_str = ai_reply.split("```json")[1].split("```")[0]
                    structured_data = json.loads(json_str)
                except Exception:
                    pass
            else:
                try:
                    structured_data = json.loads(ai_reply)
                except Exception:
                    pass

            # --- 🧠 Save conversation history ---
            chat_memory.messages = conversation_history + [
                {"role": "assistant", "text": ai_reply}
            ]
            chat_memory.save()

            return Response(
                {
                    "reply": ai_reply,
                    "structured_data": structured_data,
                    "is_tool_call": structured_data is not None,
                }
            )

        except Exception as e:
            return Response({"error": f"AI service error: {str(e)}"}, status=500)

class ResetAIChatView(APIView):
    """
    Clears the AI chat memory for the authenticated user.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            chat_memory = ChatMemory.objects.filter(user=request.user).first()
            if chat_memory:
                chat_memory.messages = []
                chat_memory.save()
                return Response(
                    {"message": "Chat memory has been reset."},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"message": "No previous chat memory found."},
                    status=status.HTTP_200_OK
                )
        except Exception as e:
            return Response(
                {"error": f"An error occurred while resetting memory: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )