import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "../types";

import { SYSTEM_INSTRUCTION } from "../data/prompts";


export async function getAssistantResponse(history: Message[], userInput: string): Promise<{ content: string; model: string }> {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

  // Use gemini-2.0-flash which is the current standard model
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Prepend system instructions to the history for models/versions that don't support systemInstruction parameter
  const chatHistory = [
    {
      role: "user",
      parts: [{ text: "Instructions: " + SYSTEM_INSTRUCTION }],
    },
    {
      role: "model",
      parts: [{ text: "Understood. I am Xu Ran's virtual assistant. How can I help you today?" }],
    },
    ...history.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))
  ];

  const chat = model.startChat({
    history: chatHistory,
  });

  try {
    const result = await chat.sendMessage(userInput);
    const response = await result.response;
    return {
      content: response.text() || "Sorry, I'm having trouble connecting to Xu's brain right now.",
      model: "Gemini-2.0-Flash"
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      content: "I'm currently offline, but feel free to explore Xu's portfolio!",
      model: "Gemini-2.0-Flash"
    };
  }
}
