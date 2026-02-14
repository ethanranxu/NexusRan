import { Message } from "../types";
import { SYSTEM_INSTRUCTION } from "../data/prompts";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function getOpenAIResponse(history: Message[], userInput: string): Promise<{ content: string; model: string }> {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OpenAI API Key is missing");
    }

    const messages = [
        { role: "system", content: SYSTEM_INSTRUCTION },
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: "user", content: userInput }
    ];

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: messages,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("OpenAI API Error:", response.status, errorData);
            throw new Error(`OpenAI API Error: ${response.status}`);
        }

        const data = await response.json();
        return {
            content: data.choices?.[0]?.message?.content || "",
            model: "GPT-4o-mini"
        };
    } catch (error) {
        console.error("OpenAI Service Error:", error);
        throw error; // Re-throw to allow fallback
    }
}
