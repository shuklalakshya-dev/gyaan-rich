"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Mail, School, BookOpen } from "lucide-react"

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Mail },
  { href: "/admin/schools", label: "Schools", icon: School },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-secondary text-secondary-foreground min-h-screen border-r border-secondary-foreground/20">
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-lg mb-8">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold">GR</span>
          </div>
          <span>Admin</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-secondary-foreground/10"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
