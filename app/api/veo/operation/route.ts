import { GEMINI_API_KEY } from "@/lib/apiKey";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

if (!GEMINI_API_KEY) {
  throw new Error("Set GEMINI_PAID_API_KEY (or GEMINI_API_KEY).");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name as string | undefined;

    if (!name) {
      return NextResponse.json(
        { error: "Missing operation name" },
        { status: 400 }
      );
    }

    // Some SDK versions accept just the name, others expect an operation object.
    // We'll pass the minimal required shape with a name.
    const fresh = await ai.operations.getVideosOperation({
      operation: { name } as unknown as never,
    });

    return NextResponse.json(fresh);
  } catch (error) {
    console.error("Error polling operation:", error);
    return NextResponse.json(
      { error: "Failed to poll operation" },
      { status: 500 }
    );
  }
}
