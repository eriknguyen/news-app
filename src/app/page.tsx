'use client'
import { useState } from 'react'

import { ArticleCard } from '@/components/ArticleCard'
import { ErrorPage } from '@/components/ErrorPage'
import { PageLoader } from '@/components/PageLoader'
import { TitleEditor } from '@/components/TitleEditor'
import { useHeadlines } from '@/data'

export default function Home() {
  const { data: articles, error, isSuccess } = useHeadlines()
  const [editingTitle, setEditingTitle] = useState<string | null>(null)

  if (error) {
    return <ErrorPage />
  }

  if (!isSuccess) {
    return <PageLoader />
  }

  const onEditTitle = (title: string) => () => {
    setEditingTitle(title)
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setEditingTitle(null)
    }
  }

  return (
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
  )
}
