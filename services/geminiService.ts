
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeEcoAction(actionType: string, description: string, imageBase64?: string): Promise<string> {
  try {
    const model = 'gemini-3-flash-preview';
    let prompt = `You are an Eco-Coach. A user just logged an eco-friendly action: "${actionType}". 
    Description: "${description || 'No description provided'}". 
    Provide a short, 1-2 sentence inspiring fact about the positive environmental impact of this specific action. 
    Keep it encouraging and data-driven if possible.`;

    const contents: any[] = [{ text: prompt }];
    
    if (imageBase64) {
      contents.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64.split(',')[1] || imageBase64
        }
      });
      prompt += " Also, briefly comment on the image if it supports the action.";
    }

    const response = await ai.models.generateContent({
      model,
      contents: { parts: contents.map(c => typeof c === 'string' ? { text: c } : c) as any },
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Great job taking action for the planet!";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Your action helps build a sustainable future!";
  }
}

export async function getDailyEcoTip(): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Give me one short, creative eco-friendly tip for today. Format as: 'Tip: [Content]'",
      config: { temperature: 0.8 }
    });
    return response.text || "Tip: Use cold water for laundry to save energy.";
  } catch (error) {
    return "Tip: Carry a reusable water bottle today.";
  }
}
