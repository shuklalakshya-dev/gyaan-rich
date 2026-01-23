import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const originalName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "")
    const fileName = `${timestamp}-${randomStr}-${originalName}`

    // Convert file to base64
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    const dataUrl = `data:${file.type};base64,${base64}`

    // Store in MongoDB
    const { db } = await connectToDatabase()
    await db.collection("images").insertOne({
      fileName,
      mimeType: file.type,
      size: file.size,
      data: dataUrl,
      createdAt: new Date(),
    })

    // Return the API URL to serve the image
    const imageUrl = `/api/images/${fileName}`

    console.log("Image uploaded:", imageUrl)
    return NextResponse.json({ success: true, imageUrl, fileName })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
