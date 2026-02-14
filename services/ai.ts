import { Message } from "../types";
import { getAssistantResponse as getGeminiResponse } from "./gemini";
import { getZhipuResponse } from "./zhipu";
import { getOpenAIResponse } from "./openai";

export async function getAssistantResponse(history: Message[], userInput: string): Promise<{ content: string; model: string }> {
    const provider = import.meta.env.VITE_AI_PROVIDER || 'auto';

    if (provider === 'auto') {
        // 1. Try OpenAI (gpt-4o-mini)
        try {
            console.log("[AI] Trying OpenAI (gpt-4o-mini)...");
            return await getOpenAIResponse(history, userInput);
        } catch (e) {
            console.warn("[AI] OpenAI failed, switching to Zhipu...", e);
        }

        // 2. Try Zhipu (glm-4.7-flashx)
        try {
            console.log("[AI] Trying Zhipu (glm-4.7-flashx)...");
            return await getZhipuResponse(history, userInput);
        } catch (e) {
            console.warn("[AI] Zhipu failed, switching to Gemini...", e);
        }

        // 3. Try Gemini (gemini-2.0-flash)
        console.log("[AI] Trying Gemini (gemini-2.0-flash)...");
        return getGeminiResponse(history, userInput);
    }

    // Explicit provider selection
    switch (provider) {
        case 'openai': return getOpenAIResponse(history, userInput);
        case 'zhipu': return getZhipuResponse(history, userInput);
        case 'gemini': return getGeminiResponse(history, userInput);
        default: return getZhipuResponse(history, userInput); // Default fallback
    }
}
