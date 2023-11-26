'use client'
import { useState } from 'react'

import { ArticleCard } from '@/components/ArticleCard'
import { TitleEditor } from '@/components/TitleEditor'
import { TitleMapProvider } from '@/components/TitleEditorContext'
import { ViewHistoryProvider } from '@/components/ViewHistoryContext'
import { useHeadlines } from '@/data'

export default function Home() {
  const data = useHeadlines()
  const { articles } = data

  const [editingTitle, setEditingTitle] = useState<string | null>(null)

  const onEditTitle = (title: string) => () => {
    setEditingTitle(title)
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setEditingTitle(null)
    }
  }

  return (
    <TitleMapProvider>
      <ViewHistoryProvider>
        <div className="py-8">
          {editingTitle && (
            <TitleEditor onOpenChange={onOpenChange} title={editingTitle} />
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => (
              <ArticleCard
                key={article.title}
                article={article}
                onEditTitle={onEditTitle(article.title)}
              />
            ))}
          </div>
        </div>
      </ViewHistoryProvider>
    </TitleMapProvider>
  )
}
