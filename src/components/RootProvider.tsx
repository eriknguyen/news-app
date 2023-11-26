'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { TitleMapProvider } from '@/components/TitleEditorContext'
import { ViewHistoryProvider } from '@/components/ViewHistoryContext'

// Create a client
const queryClient = new QueryClient()

function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <TitleMapProvider>
        <ViewHistoryProvider>{children}</ViewHistoryProvider>
      </TitleMapProvider>
    </QueryClientProvider>
  )
}

export { RootProvider }
