import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    console.log("Blog POST request received")
    
    let body
    try {
      body = await request.json()
      console.log("Request body parsed")
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { title, excerpt, content, author, category, published, image } = body

    if (!title || !content || !excerpt) {
      console.log("Missing fields")
      return NextResponse.json({ error: "Missing required fields: title, excerpt, and content are required" }, { status: 400 })
    }

    try {
      const { db } = await connectToDatabase()
      
      const newPost = {
        title,
        excerpt,
        content,
        author: author || "Gyaan Rich",
        category: category || "General",
        published: published !== undefined ? published : true,
        image: image || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await db.collection("blogs").insertOne(newPost)

      console.log("Blog post created with ID:", result.insertedId)
      return NextResponse.json({ success: true, id: result.insertedId.toString() }, { status: 201 })
    } catch (dbError: any) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Failed to save blog post. Please try again." }, { status: 500 })
    }
  } catch (error) {
    console.error("Unexpected error in POST:", error)
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get("all") === "true"
    
    const { db } = await connectToDatabase()
    
    const query = showAll ? {} : { published: true }
    const posts = await db.collection("blogs")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    // Transform MongoDB _id to string for client compatibility
    const transformedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : post.createdAt,
      updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : post.updatedAt,
    }))

    return NextResponse.json(transformedPosts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
