import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'
import { authOptions } from 'libs/nextAuth'

export const metadata: Metadata = {
  title: 'Pergamum',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const roles = ['ADMIN']

  const data: any = await getServerSession(authOptions)

  if (!roles.includes(data?.user.role)) redirect('/')
  return <>{children}</>
}
