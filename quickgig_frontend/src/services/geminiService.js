/**
 * Gemini AI Service
 * Handles communication with Google's Generative AI API
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Send a message to Gemini AI
 * @param {string} message - The user's message
 * @returns {Promise<string>} - The AI's response
 */
export const sendToGemini = async (message) => {
    if (!API_KEY) {
        console.error('Gemini API key not configured');
        return 'Sorry, AI service is not configured. Please add your Gemini API key.';
    }

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Gemini API error:', error);
            return 'Sorry, I encountered an error. Please try again.';
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error('Unexpected response format:', data);
            return 'Sorry, I got an unexpected response. Please try again.';
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return 'Sorry, I encountered a connection error. Please try again.';
    }
};

/**
 * Create a system prompt for event planning context
 */
export const createEventPlanningPrompt = (userMessage) => {
    const systemPrompt = `You are an expert event planning AI assistant for Events-Safi, a Kenyan event management platform.

CONTEXT:
- You help customers plan weddings, birthdays, corporate events, harambees, funerals, and road trips
- All prices are in Kenyan Shillings (KSh)
- You provide package recommendations based on budget and event type
- You're professional but friendly

AVAILABLE PACKAGES:
1. Weddings: Basic (KSh 50K), Standard (KSh 100K), Premium (KSh 150K)
2. Birthdays: Basic (KSh 15K), Standard (KSh 35K), Premium (KSh 60K)
3. Harambees: Basic (KSh 25K), Standard (KSh 45K), Premium (KSh 75K)
4. Corporate Events: Basic (KSh 40K), Standard (KSh 80K), Premium (KSh 150K)
5. Funerals: Basic (KSh 30K), Standard (KSh 60K), Premium (KSh 100K)
6. Road Trips: Basic (KSh 12K), Standard (KSh 25K), Premium (KSh 40K) per person

GUIDELINES:
- Always be helpful and solution-oriented
- Ask clarifying questions (budget, guest count, date, location)
- Recommend packages that fit their budget
- Suggest upgrades when appropriate
- Keep responses concise and friendly
- Use emojis to make responses engaging
- If unsure about something, admit it and suggest contacting the team

User message: ${userMessage}

Please provide a helpful response.`;

    return systemPrompt;
};
