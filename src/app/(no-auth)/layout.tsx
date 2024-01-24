import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import type { Metadata } from 'next'
import { authOptions } from 'libs/nextAuth'

export const metadata: Metadata = {
  title: 'Pergamum',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getServerSession(authOptions)

  if (user) redirect('/')
  return <>{children}</>
}
