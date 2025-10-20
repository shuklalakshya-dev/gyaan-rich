import { AdminHeader } from "@/components/admin-header"
import { Plus } from "lucide-react"

export default function BlogPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <AdminHeader title="Blog Management" description="Create and manage blog posts" />
        </div>
        <button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus size={20} />
          New Post
        </button>
      </div>

      <div className="bg-card rounded-xl p-8 border border-border text-center">
        <p className="text-foreground/70">No blog posts yet. Create your first post to get started!</p>
      </div>
    </div>
  )
}
