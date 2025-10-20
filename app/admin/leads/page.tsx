import { AdminHeader } from "@/components/admin-header"
import { LeadsTable } from "@/components/leads-table"

export default function LeadsPage() {
  return (
    <div>
      <AdminHeader title="Leads Management" description="View and manage all incoming leads" />
      <LeadsTable />
    </div>
  )
}
