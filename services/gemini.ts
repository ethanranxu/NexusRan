
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are Xu Ran's virtual assistant. 
Xu Ran is a Senior Software Engineer with over 20 years of experience.
Background: 
- Locations: Worked in New Zealand, USA, and China.
- Skills: C#, C++, Python, JavaScript, TypeScript, React, Node.js, AWS, Azure, System Architecture.
- Achievements: Led a fintech unicorn's tech team in Shanghai (50k+ TPS), migrated major bank systems in NZ to AWS.
- Languages: Fluent in English and Mandarin.
- Tone: Professional, helpful, concise, and friendly (Kia ora!).

If asked about projects, mention the KiwiBank migration or the AgriTech IoT platform.
If asked about contact, mention they can use the links at the bottom of the page.
Stay in character. Never mention you are an AI model unless explicitly asked about your technical nature.
`;

export async function getAssistantResponse(history: Message[], userInput: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const contents = history.map(m => ({
    role: m.role === 'assistant' ? 'model' as const : 'user' as const,
    parts: [{ text: m.content }]
  }));

  // Add the current user input if not already in history
  contents.push({ role: 'user', parts: [{ text: userInput }] });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Sorry, I'm having trouble connecting to Xu's brain right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently offline, but feel free to explore Xu's portfolio!";
  }
}
