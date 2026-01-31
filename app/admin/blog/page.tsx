"use client"

import { AdminHeader } from "@/components/admin-header"
import { Plus, Edit2, Trash2, Eye, Upload, X } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  published: boolean
  image?: string
  createdAt: string
}

export default function BlogPage() {
  const [showForm, setShowForm] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "GyanRich",
    category: "Education",
    image: "",
  })

  useEffect(() => {
    fetchPosts()
    testAPIConnection()
  }, [])

  const testAPIConnection = async () => {
    try {
      const response = await fetch("/api/health")
      const data = await response.json()
      console.log("API health check:", data)
    } catch (error) {
      console.error("API health check failed:", error)
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog?all=true")
      
      if (!response.ok) {
        console.error("Failed to fetch posts. Status:", response.status)
        setLoading(false)
        return
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Invalid response format from API")
        setLoading(false)
        return
      }

      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formDataObj = new FormData()
      formDataObj.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataObj,
      })

      const data = await response.json()

      if (response.ok) {
        setFormData({ ...formData, image: data.imageUrl })
        setSuccess("Image uploaded successfully!")
        setTimeout(() => setSuccess(""), 2000)
      } else {
        setError(data.error || "Failed to upload image")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      setError("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setSubmitting(true)
    
    // Validate all required fields
    if (!formData.title.trim()) {
      setError("Please enter a blog title")
      setSubmitting(false)
      return
    }

    if (!formData.excerpt.trim()) {
      setError("Please enter a brief excerpt")
      setSubmitting(false)
      return
    }

    if (!formData.content.trim()) {
      setError("Please enter blog content")
      setSubmitting(false)
      return
    }
    
    try {
      const url = editingPost ? `/api/blog/${editingPost._id}` : "/api/blog"
      const method = editingPost ? "PUT" : "POST"
      
      console.log("Submitting blog post to:", url)
      console.log("Method:", method)
      console.log("Form data:", formData)
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, published: true }),
      })

      console.log("Response received")
      console.log("Response status:", response.status)
      console.log("Response statusText:", response.statusText)
      console.log("Response URL:", response.url)
      
      const contentType = response.headers.get("content-type")
      console.log("Content-Type:", contentType)

      // Try to read response text first
      const responseText = await response.text()
      console.log("Response text:", responseText.substring(0, 200))

      // Check if response is valid JSON
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Invalid content type. Got:", contentType)
        console.error("Response body:", responseText)
        setError(`Server returned invalid format (${contentType}). The database might not be connected. Check server logs.`)
        setSubmitting(false)
        return
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError)
        setError("Failed to parse server response. The server may be experiencing issues.")
        setSubmitting(false)
        return
      }

      console.log("Parsed response data:", data)

      if (response.ok) {
        setSuccess(editingPost ? "Blog post updated successfully!" : "Blog post published successfully!")
        setTimeout(() => {
          setShowForm(false)
          setEditingPost(null)
          setFormData({
            title: "",
            excerpt: "",
            content: "",
            author: "GyanRich",
            category: "Education",
            image: "",
          })
          setSuccess("")
          fetchPosts()
        }, 1500)
      } else {
        setError(data.error || `Server error: ${response.statusText}`)
      }
    } catch (error) {
      console.error("Error saving post:", error)
      if (error instanceof Error) {
        setError(`Connection error: ${error.message}`)
      } else {
        setError("An error occurred while saving the post. Please check your connection and try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <AdminHeader title="Blog Management" description="Create and manage blog posts" />
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingPost(null)
            setFormData({
              title: "",
              excerpt: "",
              content: "",
              author: "Gyaan Rich",
              category: "Education",
              image: "",
            })
          }}
          className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={20} />
          New Post
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-bold mb-6">{editingPost ? "Edit Post" : "Create New Post"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none h-24"
                placeholder="Brief description of the blog post"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
                  required
                >
                  <option value="Education">Education</option>
                  <option value="Career">Career</option>
                  <option value="Technology">Technology</option>
                  <option value="Study Tips">Study Tips</option>
                  <option value="Success">Success</option>
                  <option value="Mentorship">Mentorship</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none h-96 text-sm"
                placeholder="Write your blog content here. Use blank lines to separate paragraphs."
                required
              />
              <p className="text-sm text-foreground/50 mt-2">
                Tip: Press Enter twice to create a new paragraph. Your text will be automatically formatted.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Featured Image (Optional)
              </label>
              <div className="space-y-4">
                {formData.image && (
                  <div className="relative">
                    <Image
                      src={formData.image}
                      alt="Blog featured image"
                      width={300}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-lg hover:border-accent cursor-pointer transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={24} className="text-foreground/50" />
                    <span className="text-sm text-foreground/70">
                      {uploading ? "Uploading..." : "Click to upload image"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Publishing..." : editingPost ? "Update Post" : "Publish Post"}
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setShowForm(false)
                  setEditingPost(null)
                  setError("")
                  setSuccess("")
                }}
                className="bg-background border border-border px-8 py-3 rounded-lg font-semibold hover:bg-foreground/5 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-foreground/70">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-foreground/70">No blog posts yet. Create your first post to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary text-secondary-foreground">
                <tr>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Author</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="border-b border-border hover:bg-foreground/5">
                    <td className="px-6 py-4 font-medium">{post.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">{post.author}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          post.published
                            ? "bg-green-500/10 text-green-500"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/blog/${post._id}`}
                          target="_blank"
                          className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
