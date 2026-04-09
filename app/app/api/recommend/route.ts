import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { RECOMMENDER_SYSTEM_PROMPT } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { dataType, horizon, interpretability, description } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: RECOMMENDER_SYSTEM_PROMPT,
    });

    const userPrompt = `Please recommend the best forecasting model for my scenario:
- Data type: ${dataType}
- Forecast horizon: ${horizon}
- Need interpretability: ${interpretability}
${description ? `- Additional context: ${description}` : ""}`;

    const result = await model.generateContent(userPrompt);
    const recommendation = result.response.text();

    return NextResponse.json({ recommendation });
  } catch (err) {
    console.error("Recommend API error:", err);
    return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 });
  }
}
