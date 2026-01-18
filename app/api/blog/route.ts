import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const BLOG_FILE = path.join(process.cwd(), "public", "blog-posts.json")

async function ensureBlogFile() {
  try {
    await fs.access(BLOG_FILE)
  } catch {
    await fs.writeFile(BLOG_FILE, JSON.stringify([]))
  }
}

async function readBlogPosts() {
  await ensureBlogFile()
  const data = await fs.readFile(BLOG_FILE, "utf-8")
  return JSON.parse(data)
}

async function writeBlogPosts(posts: any[]) {
  await fs.writeFile(BLOG_FILE, JSON.stringify(posts, null, 2))
}

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
      const posts = await readBlogPosts()
      
      const newPost = {
        _id: Date.now().toString(),
        title,
        excerpt,
        content,
        author: author || "Gyaan Rich",
        category: category || "General",
        published: published !== undefined ? published : true,
        image: image || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      posts.push(newPost)
      await writeBlogPosts(posts)

      console.log("Blog post created with ID:", newPost._id)
      return NextResponse.json({ success: true, id: newPost._id }, { status: 201 })
    } catch (fileError) {
      console.error("File error:", fileError)
      return NextResponse.json({ error: "Failed to save blog post" }, { status: 500 })
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
    
    const posts = await readBlogPosts()
    
    const filteredPosts = showAll ? posts : posts.filter(p => p.published === true)
    const sortedPosts = filteredPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json(sortedPosts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
