import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Nav } from '@/components/Nav'
import { RootProvider } from '@/components/RootProvider'
import { ThemeProvider } from '@/components/Theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'News App - Erik Nguyen',
  description: 'All your latest headlines in one app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <Nav />
            <main className="container max-sm:px-4">
              <RootProvider>{children}</RootProvider>
            </main>
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
