import { AdminHeader } from "@/components/admin-header"
import { BarChart3, Users, School, BookOpen } from "lucide-react"

const stats = [
  { label: "Total Leads", value: "1,234", icon: Users, color: "text-accent" },
  { label: "Schools", value: "45", icon: School, color: "text-accent" },
  { label: "Blog Posts", value: "28", icon: BookOpen, color: "text-accent" },
  { label: "Active Users", value: "892", icon: BarChart3, color: "text-accent" },
]

export default function AdminDashboard() {
  return (
    <div>
      <AdminHeader title="Dashboard" description="Welcome to your admin panel" />

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground/70 font-medium">{stat.label}</h3>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-card rounded-xl p-8 border border-border">
        <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span>New Leads This Month</span>
            <span className="font-semibold">156</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span>Conversion Rate</span>
            <span className="font-semibold">12.5%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Average Response Time</span>
            <span className="font-semibold">2.3 hours</span>
          </div>
        </div>
      </div>
    </div>
  )
}
