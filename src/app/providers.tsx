'use client'

import { SessionProvider } from 'next-auth/react'

import { QueryClientProvider } from 'react-query'

import { queryClient } from 'libs'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
