"use client"

import { useEffect, useState } from "react"
import { Trash2, Mail, Phone } from "lucide-react"

interface Lead {
  _id: string
  name: string
  email: string
  phone: string
  schoolName: string
  message: string
  createdAt: string
  status: string
}

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/leads")
      const data = await response.json()
      setLeads(data)
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading leads...</div>
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/10 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Phone</th>
              <th className="px-6 py-4 text-left font-semibold">School</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                <td className="px-6 py-4 font-medium">{lead.name}</td>
                <td className="px-6 py-4">
                  <a href={`mailto:${lead.email}`} className="text-accent hover:underline flex items-center gap-2">
                    <Mail size={16} />
                    {lead.email}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <a href={`tel:${lead.phone}`} className="text-accent hover:underline flex items-center gap-2">
                    <Phone size={16} />
                    {lead.phone}
                  </a>
                </td>
                <td className="px-6 py-4">{lead.schoolName || "-"}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      lead.status === "new" ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary-foreground"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-destructive hover:opacity-70 transition-opacity">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {leads.length === 0 && <div className="text-center py-12 text-foreground/70">No leads yet. Check back soon!</div>}
    </div>
  )
}
