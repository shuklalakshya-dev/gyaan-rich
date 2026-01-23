import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  published: boolean
  image: string | null
  createdAt: string
  updatedAt: string
}

const BLOG_FILE = path.join(process.cwd(), "public", "blog-posts.json")

async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(BLOG_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeBlogPosts(posts: BlogPost[], retries = 3): Promise<void> {
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const posts = await readBlogPosts()
    const post = posts.find(p => p._id === id)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
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

    const posts = await readBlogPosts()
    const postIndex = posts.findIndex(p => p._id === id)

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    posts[postIndex] = {
      ...posts[postIndex],
      title,
      excerpt,
      content,
      author,
      category,
      published,
      image,
      updatedAt: new Date().toISOString(),
    }

    await writeBlogPosts(posts)
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
    const posts = await readBlogPosts()
    const filteredPosts = posts.filter(p => p._id !== id)

    if (filteredPosts.length === posts.length) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    await writeBlogPosts(filteredPosts)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
