import { AdminHeader } from "@/components/admin-header"
import { SchoolsTable } from "@/components/schools-table"

export default function SchoolsPage() {
  return (
    <div>
      <AdminHeader title="Schools Management" description="Manage registered schools and institutions" />
      <SchoolsTable />
    </div>
  )
}
