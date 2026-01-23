import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  try {
    const { fileName } = await params
    const { db } = await connectToDatabase()

    const image = await db.collection("images").findOne({ fileName })

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Extract base64 data from data URL
    const base64Data = image.data.split(",")[1]
    const buffer = Buffer.from(base64Data, "base64")

    // Return the image with proper headers
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": image.mimeType,
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error fetching image:", error)
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
  }
}
