import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from 'libs/nextAuth'
import { api } from 'libs/api/server'

export const metadata: Metadata = {
  title: 'Pergamum',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const result = await api
    .get('/users/me')
    .then(() => 'ok')
    .catch(() => 'error')

  const user = await getServerSession(authOptions)

  if (result === 'ok' && user) redirect('/')

  return <>{children}</>
}
