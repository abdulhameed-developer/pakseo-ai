import { GoogleGenAI, Type } from "@google/genai";
import { 
  SEOTitle, 
  SEOMeta, 
  SEOKeywords, 
  SEOSchema, 
  SEOImprovedContent, 
  ChatMessage 
} from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '');
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export async function getChatResponse(history: ChatMessage[]): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history,
      config: {
        systemInstruction: `You are PakSEO AI Assistant, a fully trained SEO expert and professional assistant.
        
        IDENTITY & CREATOR:
        - Your creator is Abdul Hameed, a highly skilled Web Developer and SEO expert from Lahore, Pakistan.
        - Abdul Hameed has 2+ years of experience in WordPress, PHP, MySQL, React, and Next.js (Headless WordPress).
        - He is currently working as a Web Developer at DE Media Solutions Pvt. Ltd. (2024 – Present).
        - Skills: Frontend (HTML, CSS, JS, Tailwind, Bootstrap), Backend (PHP, MySQL), CMS (WordPress, Shopify), Tools (Git, GitHub, Vercel), SEO (On-page + Technical).
        - Contact: Phone (+92 329 6988010), Email (hameedrjt@gmail.com).
        - Social Media: GitHub (https://github.com/abdulhameed-developer), LinkedIn (https://www.linkedin.com/in/abdul-hameed-website-developer).
        
        BEHAVIOR RULES:
        - Keep responses CONCISE and CLEAR.
        - Avoid long paragraphs; use line breaks and bullet points for readability.
        - Act like a conversational assistant, not a document generator.
        - Provide high-intent, actionable SEO advice specific to the Pakistani market.
        - If a user sends a short "Hi", respond with a friendly, brief SEO-focused greeting.
        
        IDENTITY RULES:
        - YOU MUST ONLY tell about your creator Abdul Hameed if explicitly asked by the user about who created you or your developer. 
        - DO NOT mention him in your welcome message or general SEO advice unless relevant to a question about your origin.
        - NEVER say you were created by Google or anyone else.
        - If asked for contact details or social media, provide the information listed above.
        
        PLATFORM AWARENESS:
        - You are the assistant for the PakSEO AI platform.
        - You are intimately familiar with the following tools available on this platform:
          1. Title Generator: Generates SEO-optimized, high-CTR titles for Pakistani bloggers.
          2. Meta Generator: Creates high-CTR Meta Titles and Descriptions.
          3. Keyword Generator: Performs localized keyword research for the Pakistani market.
          4. Schema Generator: Professional JSON-LD structured data builder (Articles, Blogs, FAQ, Product, Local Business).
          5. Content Improver: Optimizes grammar, SEO, and readability of provided text.
        - You help users use these tools step-by-step and suggest the best tool based on their specific SEO needs.
        
        RESPONSE RULES:
        - FORMAT: PLAIN TEXT ONLY. ABSOLUTELY NO MARKDOWN (no asterisks, no hashes, no bolding, no italics, no markdown headers).
        - TONE: Professional, short, practical, and actionable.
        - STRUCTURE: Use short paragraphs. Use simple "-" for bullet points only.
        - FOCUS: Stick strictly to SEO, digital marketing, and help with this platform's tools.`,
      }
    });

    return response.text || "I couldn't process that. Please try again.";
  } catch (error) {
    console.error("Chat Assistant Error:", error);
    throw error;
  }
}

export async function generateTitles(keyword: string): Promise<SEOTitle[]> {
  const currentYear = new Date().getFullYear();
  const prompt = `Generate 10 SEO-optimized, high-CTR titles for the keyword: "${keyword}".
  Target: Pakistani bloggers & creators.
  Year: ${currentYear}.
  Constraint: Max 60 characters, include power words.
  Return format: JSON array of objects with "title" property.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: { title: { type: Type.STRING } },
            required: ["title"],
          }
        },
      },
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Title Generation Error:", error);
    throw error;
  }
}

export async function generateMeta(keyword: string): Promise<SEOMeta> {
  const prompt = `Generate a high-CTR Meta Title and Meta Description for: "${keyword}".
  Target: Pakistani audience.
  Title: 50-60 chars. Description: 140-160 chars.
  Return format: JSON object with "metaTitle" and "metaDescription".`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            metaTitle: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
          },
          required: ["metaTitle", "metaDescription"],
        },
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Meta Generation Error:", error);
    throw error;
  }
}

export async function generateKeywords(keyword: string): Promise<SEOKeywords> {
  const prompt = `Perform localized keyword research for: "${keyword}" in Pakistan.
  Provide:
  1. Primary keyword (the main seed).
  2. 5 Long-tail keywords.
  3. 5 LSI keywords.
  4. Intent grouping: Informational, Transactional, Local (at least 3 keywords each).
  Return format: JSON object matching the requested schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING },
            longTail: { type: Type.ARRAY, items: { type: Type.STRING } },
            lsi: { type: Type.ARRAY, items: { type: Type.STRING } },
            intents: {
              type: Type.OBJECT,
              properties: {
                informational: { type: Type.ARRAY, items: { type: Type.STRING } },
                transactional: { type: Type.ARRAY, items: { type: Type.STRING } },
                local: { type: Type.ARRAY, items: { type: Type.STRING } },
              }
            }
          },
          required: ["primary", "longTail", "lsi", "intents"],
        },
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Keyword Generation Error:", error);
    throw error;
  }
}

export async function generateSchema(type: string, input: string): Promise<SEOSchema> {
  const prompt = `Generate a professional, Google-compliant JSON-LD Schema Markup for type: "${type}".
  Input Data (JSON): ${input}
  
  Strict requirements:
  - Return ONLY the valid JSON-LD string inside the "schema" property.
  - Follow the latest Google Search Central documentation for structured data.
  - Handle mandatory fields and optional fields provided in input.
  - No markdown, no extra text, just the JSON schema string.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            schema: { type: Type.STRING },
          },
          required: ["schema"],
        },
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Schema Generation Error:", error);
    throw error;
  }
}

export async function improveContent(content: string): Promise<SEOImprovedContent> {
  const prompt = `Improve the following content for SEO, grammar, and readability while maintaining original meaning and facts:
  "${content}"
  Strict requirements:
  - Better keyword placement if detected.
  - More engaging tone.
  - Return ONLY the improved text.
  - No explanations.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improvedText: { type: Type.STRING },
          },
          required: ["improvedText"],
        },
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Content Improvement Error:", error);
    throw error;
  }
}
