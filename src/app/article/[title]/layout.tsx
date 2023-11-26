'use client'

import { TitleMapProvider } from '@/components/TitleEditorContext'
import { ViewHistoryProvider } from '@/components/ViewHistoryContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TitleMapProvider>
      <ViewHistoryProvider>{children}</ViewHistoryProvider>
    </TitleMapProvider>
  )
}
