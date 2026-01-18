import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  author: string
  category: string
  date: string
  image?: string
}

export function BlogCard({ id, title, excerpt, author, category, date, image }: BlogCardProps) {
  return (
    <article className="bg-red-50 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative bg-gradient-to-br from-red-100 to-red-50 h-48 flex items-center justify-center overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="text-center">
            <div className="text-5xl font-bold text-red-300 mb-2">📚</div>
            <p className="text-black/60">{category}</p>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-red-100 text-black rounded-full text-sm font-medium">{category}</span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-black line-clamp-2">{title}</h3>

        <p className="text-black/70 mb-4 line-clamp-2">{excerpt}</p>

        <div className="flex items-center gap-4 text-sm text-black/60 mb-4 pb-4 border-b border-red-200">
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
          className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
        >
          Read More
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  )
}
