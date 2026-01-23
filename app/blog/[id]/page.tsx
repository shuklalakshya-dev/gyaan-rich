"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowLeft, Clock, BookOpen, Sparkles, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  image?: string
  createdAt: string
}

// Convert plain text to HTML paragraphs
function formatContent(content: string): string {
  // If content already contains HTML tags, return as is
  if (/<[^>]+>/.test(content)) {
    return content
  }
  
  // Split by double newlines (paragraphs) and wrap in <p> tags
  return content
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [readingTime, setReadingTime] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id
        
        if (!id) {
          setError("No post ID provided")
          setLoading(false)
          return
        }

        const response = await fetch(`/api/blog/${id}`)

        if (!response.ok) {
          setError(`Post not found (${response.status})`)
          setPost(null)
          setLoading(false)
          return
        }

        const data = await response.json()
        setPost(data)
        const wordCount = data.content.replace(/<[^>]*>/g, '').split(/\s+/).length
        setReadingTime(Math.ceil(wordCount / 200))
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post")
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [params.id])

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black">
        <Navbar />
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
              <BookOpen className="absolute inset-0 m-auto w-10 h-10 text-accent animate-pulse" />
            </div>
            <p className="text-white/70 text-lg font-medium animate-pulse">Loading article...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black">
        <Navbar />
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto px-4">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-red-500/10 flex items-center justify-center animate-bounce">
              <span className="text-6xl">📄</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">Article Not Found</h1>
            <p className="text-white/60 mb-8 text-lg">{error || "The article you're looking for doesn't exist."}</p>
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-accent/30"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-linear-to-r from-accent via-yellow-400 to-accent transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-end overflow-hidden">
        {post.image ? (
          <>
            <div className="absolute inset-0 animate-fade-in">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover scale-105 animate-slow-zoom"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/20"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-purple-900/30 to-black">
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-20 left-20 w-96 h-96 bg-accent/40 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-float-delayed"></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
        )}

        <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-black to-transparent"></div>
        
        <div className="relative z-10 w-full pb-20 pt-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-accent mb-10 group transition-all animate-slide-in"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
              <span className="font-medium">Back to Blog</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-8 animate-slide-in-delayed">
              <span className="px-5 py-2 bg-accent text-accent-foreground rounded-full text-sm font-bold uppercase tracking-wider shadow-lg shadow-accent/30 hover:scale-105 transition-transform">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-white/60 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock size={18} />
                <span className="font-medium">{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
                <Eye size={18} />
                <span className="font-medium">Featured</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-10 leading-tight animate-slide-in-delayed-2">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-white/80 animate-slide-in-delayed-3">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-accent via-yellow-400 to-yellow-300 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-accent/30 hover:scale-110 transition-transform">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{post.author}</p>
                  <p className="text-white/50 text-sm">Content Writer</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar size={20} />
                <span className="font-medium">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="relative py-20 lg:py-32">
        <div className="absolute left-0 top-0 w-1 h-full bg-linear-to-b from-accent via-accent/50 to-transparent hidden lg:block ml-4"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Excerpt */}
          <div className="relative mb-16 pl-8 border-l-4 border-accent animate-fade-in">
            <Sparkles className="absolute -left-[18px] -top-1 w-8 h-8 text-accent bg-black p-1 animate-pulse" />
            <p className="text-2xl md:text-3xl text-white/90 italic leading-relaxed font-light">
              {post.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none animate-fade-in-delayed">
            <div
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              className="
                text-white/80 leading-relaxed text-lg
                [&>h1]:text-5xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-16 [&>h1]:mb-8 [&>h1]:leading-tight [&>h1]:animate-slide-in
                [&>h2]:text-4xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:leading-tight [&>h2]:animate-slide-in
                [&>h3]:text-3xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-12 [&>h3]:mb-5 [&>h3]:animate-slide-in
                [&>h4]:text-2xl [&>h4]:font-semibold [&>h4]:text-white [&>h4]:mt-10 [&>h4]:mb-4
                [&>p]:mb-8 [&>p]:leading-loose [&>p]:text-white/80
                [&>ul]:list-none [&>ul]:ml-0 [&>ul]:mb-8 [&>ul]:space-y-4
                [&>ul>li]:relative [&>ul>li]:pl-10 [&>ul>li]:before:content-['→'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-accent [&>ul>li]:before:font-bold [&>ul>li]:before:text-2xl
                [&>ol]:list-decimal [&>ol]:ml-8 [&>ol]:mb-8 [&>ol]:space-y-3
                [&>ol>li]:pl-3 [&>ol>li]:marker:text-accent [&>ol>li]:marker:font-bold [&>ol>li]:marker:text-xl
                [&>blockquote]:border-l-4 [&>blockquote]:border-accent [&>blockquote]:pl-8 [&>blockquote]:py-4 [&>blockquote]:my-10 [&>blockquote]:bg-white/5 [&>blockquote]:backdrop-blur-sm [&>blockquote]:rounded-r-xl [&>blockquote]:italic [&>blockquote]:text-white/90
                [&>pre]:bg-black/70 [&>pre]:backdrop-blur-sm [&>pre]:rounded-2xl [&>pre]:p-8 [&>pre]:overflow-x-auto [&>pre]:my-8 [&>pre]:border [&>pre]:border-white/10
                [&>code]:bg-accent/20 [&>code]:px-3 [&>code]:py-1 [&>code]:rounded-lg [&>code]:text-accent [&>code]:font-mono [&>code]:text-base
                [&>a]:text-accent [&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-accent/30 [&>a]:hover:decoration-accent [&>a]:hover:text-yellow-400 [&>a]:transition-all
                [&>img]:rounded-2xl [&>img]:my-12 [&>img]:shadow-2xl [&>img]:shadow-accent/20 [&>img]:hover:scale-[1.02] [&>img]:transition-transform
                [&>hr]:border-white/10 [&>hr]:my-16
                [&>strong]:text-white [&>strong]:font-bold
                [&>em]:text-accent [&>em]:not-italic
              "
            />
          </div>

          {/* Author Card */}
          <div className="mt-20 pt-10 border-t border-white/10 animate-fade-in-delayed">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 bg-linear-to-br from-white/5 to-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-accent/50 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-accent via-yellow-400 to-yellow-300 flex items-center justify-center text-black font-bold text-3xl shadow-lg shadow-accent/30 hover:scale-110 transition-transform">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-bold text-xl mb-1">{post.author}</p>
                  <p className="text-white/60 text-sm">Content Writer at Gyaan Rich</p>
                  <p className="text-white/40 text-xs mt-1">Education Expert & Story Teller</p>
                </div>
              </div>
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-accent/30"
              >
                <TrendingUp size={18} />
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-accent/10 via-purple-900/20 to-accent/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-accent font-bold text-sm mb-8 animate-bounce-slow">
            <Sparkles size={18} className="animate-spin-slow" />
            Transform Your Learning Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Ready to Start Your Educational Journey?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
            Join thousands of students who have transformed their learning experience with Gyaan Rich. Let's achieve excellence together.
          </p>
          <div className="flex flex-wrap justify-center gap-5 animate-fade-in-delayed-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-5 rounded-full font-bold text-lg hover:scale-110 transition-transform shadow-2xl shadow-accent/40"
            >
              Get Started Today
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20 hover:border-accent"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
