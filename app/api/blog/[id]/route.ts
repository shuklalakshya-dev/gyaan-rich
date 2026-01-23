import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { db } = await connectToDatabase()
    
    let post
    // Try to find by ObjectId first, then by string _id for backwards compatibility
    try {
      post = await db.collection("blogs").findOne({ _id: new ObjectId(id) })
    } catch {
      // If ObjectId parsing fails, try finding by string id
      post = await db.collection("blogs").findOne({ _id: id as any })
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Transform for client compatibility
    const transformedPost = {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : post.createdAt,
      updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : post.updatedAt,
    }

    return NextResponse.json(transformedPost)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, excerpt, content, author, category, published, image } = body

    if (!title || !content || !excerpt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    
    const updateData = {
      title,
      excerpt,
      content,
      author,
      category,
      published,
      image,
      updatedAt: new Date(),
    }

    let result
    try {
      result = await db.collection("blogs").updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      )
    } catch {
      // Fallback for string _id
      result = await db.collection("blogs").updateOne(
        { _id: id as any },
        { $set: updateData }
      )
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { db } = await connectToDatabase()

    let result
    try {
      result = await db.collection("blogs").deleteOne({ _id: new ObjectId(id) })
    } catch {
      // Fallback for string _id
      result = await db.collection("blogs").deleteOne({ _id: id as any })
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
