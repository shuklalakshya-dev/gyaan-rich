import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  author: string
  category: string
  date: string
}

export function BlogCard({ id, title, excerpt, author, category, date }: BlogCardProps) {
  return (
    <article className="bg-card rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 h-48 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-accent/30 mb-2">📚</div>
          <p className="text-foreground/50">{category}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">{category}</span>
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">{title}</h3>

        <p className="text-foreground/70 mb-4 line-clamp-2">{excerpt}</p>

        <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{date}</span>
          </div>
        </div>

        <Link
          href={`/blog/${id}`}
          className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
        >
          Read More
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  )
}
