import { DashboardLayout } from 'layouts'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
