import { DashboardLayout } from 'layouts'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
