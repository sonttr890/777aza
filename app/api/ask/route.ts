import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    if (!question) {
      return NextResponse.json(
        { response: "", error: "Please enter a question." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { response: "", error: "API Key is missing." },
        { status: 500 }
      );
    }

    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";
    const data = {
      contents: [
        {
          parts: [
            { text: question },
          ],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return NextResponse.json(
        { response: "", error: `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    if (responseData.error) {
      return NextResponse.json(
        { response: "", error: `API Error: ${responseData.error.message}` },
        { status: 500 }
      );
    }

    const answer = responseData.candidates[0].content.parts[0].text ?? "No response received.";
    return NextResponse.json({ response: answer, error: "" });
  } catch (err) {
    return NextResponse.json(
      { response: "", error: `Failed to fetch response: ${err.message}` },
      { status: 500 }
    );
  }
}
