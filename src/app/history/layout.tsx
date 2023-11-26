'use client'

import { ViewHistoryProvider } from '@/components/ViewHistoryContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ViewHistoryProvider>{children}</ViewHistoryProvider>
}
