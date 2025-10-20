import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

const blogPosts: Record<
  string,
  {
    title: string
    author: string
    date: string
    category: string
    content: string
  }
> = {
  "1": {
    title: "The Future of Education: Embracing Digital Learning",
    author: "Gyaan Rich",
    date: "Oct 15, 2024",
    category: "Education",
    content: `
      <h2>Introduction</h2>
      <p>The educational landscape is undergoing a significant transformation. Digital learning has moved from being a supplementary tool to becoming a central component of modern education. This shift is not just about technology; it's about reimagining how we teach and learn.</p>

      <h2>The Digital Revolution</h2>
      <p>Technology has opened new possibilities for educators and students alike. Interactive platforms, virtual classrooms, and AI-powered learning systems are making education more accessible and personalized than ever before.</p>

      <h2>Benefits of Digital Learning</h2>
      <ul>
        <li>Accessibility: Learn from anywhere, anytime</li>
        <li>Personalization: Tailored learning experiences</li>
        <li>Engagement: Interactive and multimedia content</li>
        <li>Efficiency: Track progress and optimize learning</li>
      </ul>

      <h2>Challenges and Solutions</h2>
      <p>While digital learning offers tremendous benefits, it also presents challenges such as digital divide, screen fatigue, and the need for digital literacy. However, with proper support and infrastructure, these challenges can be overcome.</p>

      <h2>Conclusion</h2>
      <p>The future of education is undoubtedly digital. By embracing these technologies and adapting our teaching methods, we can create a more inclusive, engaging, and effective educational system for all.</p>
    `,
  },
  "2": {
    title: "Career Counselling: Finding Your Path",
    author: "Gyaan Rich",
    date: "Oct 10, 2024",
    category: "Career",
    content: `
      <h2>Why Career Counselling Matters</h2>
      <p>Career counselling is more than just helping students choose a college or job. It's about understanding their strengths, interests, and values to guide them toward a fulfilling career path.</p>

      <h2>The Counselling Process</h2>
      <p>A good career counsellor helps students through several stages: self-assessment, exploration, decision-making, and planning. Each stage is crucial in building a strong foundation for career success.</p>

      <h2>Key Benefits</h2>
      <ul>
        <li>Clarity: Understand your strengths and interests</li>
        <li>Direction: Make informed career decisions</li>
        <li>Confidence: Build self-assurance in your choices</li>
        <li>Planning: Create actionable career plans</li>
      </ul>

      <h2>Getting Started</h2>
      <p>If you're unsure about your career path, don't hesitate to seek professional guidance. Career counselling can provide the clarity and direction you need to make the right choices.</p>
    `,
  },
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts[params.id]

  if (!post) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-accent hover:underline">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="py-20 md:py-32 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all mb-8">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center gap-6 text-foreground/70 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{post.date}</span>
              </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none space-y-6">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="space-y-6 text-foreground/80 leading-relaxed"
            />
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-4">Share This Article</h3>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors">
                Share on Twitter
              </button>
              <button className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors">
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Education?</h2>
          <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss how Gyaan Rich can help you achieve your goals.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
