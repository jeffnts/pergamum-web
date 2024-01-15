import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from 'libs/nextAuth'

export const metadata: Metadata = {
  title: 'Pergamum',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getServerSession(authOptions)

  if (data) redirect('/')
  return children
}
