import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const BLOG_FILE = path.join(process.cwd(), "public", "blog-posts.json")

async function ensureBlogFile() {
  try {
    await fs.access(BLOG_FILE)
  } catch {
    // Create directory if it doesn't exist
    const dir = path.dirname(BLOG_FILE)
    try {
      await fs.access(dir)
    } catch {
      await fs.mkdir(dir, { recursive: true })
    }
    await fs.writeFile(BLOG_FILE, JSON.stringify([]))
  }
}

async function readBlogPosts() {
  await ensureBlogFile()
  try {
    const data = await fs.readFile(BLOG_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

async function writeBlogPosts(posts: any[], retries = 3): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await fs.writeFile(BLOG_FILE, JSON.stringify(posts, null, 2))
      return
    } catch (error: any) {
      console.error(`Write attempt ${attempt} failed:`, error.message)
      if (attempt === retries) {
        throw error
      }
      // Wait briefly before retrying (helps with OneDrive sync issues)
      await new Promise(resolve => setTimeout(resolve, 100 * attempt))
    }
  }
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
    } catch (fileError: any) {
      console.error("File error:", fileError)
      const errorMessage = fileError.code === 'EBUSY' 
        ? "File is being synced. Please try again in a moment."
        : fileError.code === 'ENOENT'
        ? "Blog data file not found. Please refresh and try again."
        : "Failed to save blog post. Please try again."
      return NextResponse.json({ error: errorMessage }, { status: 500 })
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
