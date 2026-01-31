"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { useState, useEffect } from "react"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  author: string
  category: string
  image?: string
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Gyaan Rich Blog"
        description="Insights, tips, and stories about education, career, and personal growth"
      />

      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
            <p className="text-foreground/70">
              Stay updated with our latest insights and resources for educational excellence.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-foreground/70">Loading blog posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/70">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  category={post.category}
                  date={new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  image={post.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
