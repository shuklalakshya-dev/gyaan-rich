import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";

// Endpoint to get temporary authentication token for client-side agent connection
export async function GET() {
  try {
    // Check for token at request time, not at module load
    const token = process.env.DEEPGRAM_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "DEEPGRAM_ACCESS_TOKEN not configured" },
        { status: 500 }
      );
    }

    // Initialize Deepgram client at request time
    const deepgram = createClient(token);

    // Return the configuration needed for the client to connect
    return NextResponse.json({
      apiKey: token,
    });
  } catch (error) {
    console.error("Voice agent config error:", error);
    return NextResponse.json(
      { error: "Failed to get configuration" },
      { status: 500 }
    );
  }
}
