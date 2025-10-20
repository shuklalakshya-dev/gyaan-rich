"use client"

import { useEffect, useState } from "react"
import { Trash2, Globe } from "lucide-react"

interface School {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  website: string
  createdAt: string
  status: string
}

export function SchoolsTable() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      const response = await fetch("/api/schools")
      const data = await response.json()
      setSchools(data)
    } catch (error) {
      console.error("Error fetching schools:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading schools...</div>
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/10 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">School Name</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Phone</th>
              <th className="px-6 py-4 text-left font-semibold">Website</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school._id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                <td className="px-6 py-4 font-medium">{school.name}</td>
                <td className="px-6 py-4">{school.email}</td>
                <td className="px-6 py-4">{school.phone || "-"}</td>
                <td className="px-6 py-4">
                  {school.website ? (
                    <a
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline flex items-center gap-2"
                    >
                      <Globe size={16} />
                      Visit
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
                    {school.status}
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
      {schools.length === 0 && <div className="text-center py-12 text-foreground/70">No schools registered yet.</div>}
    </div>
  )
}
