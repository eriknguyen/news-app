'use client'

import { TitleMapProvider } from '@/components/TitleEditorContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <TitleMapProvider>{children}</TitleMapProvider>
}
