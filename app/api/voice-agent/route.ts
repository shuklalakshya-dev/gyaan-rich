import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";

// Initialize Deepgram client
if (!process.env.DEEPGRAM_ACCESS_TOKEN) {
  throw new Error("DEEPGRAM_ACCESS_TOKEN is not set in environment variables");
}

const deepgram = createClient(process.env.DEEPGRAM_ACCESS_TOKEN);

// Endpoint to get temporary authentication token for client-side agent connection
export async function GET() {
  try {
    // Return the configuration needed for the client to connect
    return NextResponse.json({
      apiKey: process.env.DEEPGRAM_ACCESS_TOKEN,
    });
  } catch (error) {
    console.error("Voice agent config error:", error);
    return NextResponse.json(
      { error: "Failed to get configuration" },
      { status: 500 }
    );
  }
}
