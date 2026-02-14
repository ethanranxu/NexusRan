import { Message } from "../types";
import { SignJWT } from "jose";

const ZHIPU_API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

import { SYSTEM_INSTRUCTION } from "../data/prompts";


// Helper to generate JWT for Zhipu AI
async function generateToken(apiKey: string): Promise<string> {
    const [id, secret] = apiKey.split(".");
    if (!id || !secret) {
        throw new Error("Invalid Zhipu API Key format");
    }

    const now = Date.now();
    const payload = {
        api_key: id,
        exp: now + 300 * 1000, // 5 minutes expiration
        timestamp: now,
    };

    const secretKey = new TextEncoder().encode(secret);

    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", sign_type: "SIGN" })
        .sign(secretKey);
}

export async function getZhipuResponse(history: Message[], userInput: string): Promise<{ content: string; model: string }> {
    const apiKey = import.meta.env.VITE_ZHIPU_API_KEY;
    if (!apiKey) {
        return {
            content: "Error: Zhipu API Key is missing. Please check your .env.local configuration.",
            model: "System"
        };
    }

    try {
        const token = await generateToken(apiKey);

        // Construct messages for GLM-4
        const messages = [
            { role: "system", content: SYSTEM_INSTRUCTION },
            ...history.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userInput }
        ];

        const response = await fetch(ZHIPU_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "glm-4.7-flashx",
                messages: messages,
                stream: false,
                temperature: 0.7,
                top_p: 0.9,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Zhipu API Error:", response.status, errorData);
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return {
            content: data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response from Zhipu AI.",
            model: "GLM-4.7-FlashX"
        };
    } catch (error) {
        console.error("Zhipu Service Error:", error);
        throw error; // Throw error to trigger fallback
    }
}
