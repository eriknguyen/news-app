'use client'

import { TitleMapProvider } from '@/components/TitleEditorContext'
import { ViewHistoryProvider } from '@/components/ViewHistoryContext'

function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <TitleMapProvider>
      <ViewHistoryProvider>{children}</ViewHistoryProvider>
    </TitleMapProvider>
  )
}

export { RootProvider }
