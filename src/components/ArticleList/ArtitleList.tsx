'use client'
import { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'

import { ArticleCard } from '@/components/ArticleCard'
import { ErrorPage } from '@/components/ErrorPage'
import { PageLoader } from '@/components/PageLoader'
import { TitleEditor } from '@/components/TitleEditor'
import { Article } from '@/data'

const ArticleList = ({
  articlesQuery,
}: {
  articlesQuery: UseQueryResult<Article[]>
}) => {
  const { data: articles, error, isSuccess } = articlesQuery

  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const onEditTitle = (title: string) => () => {
    setEditingTitle(title)
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setEditingTitle(null)
    }
  }

  if (error) {
    return <ErrorPage />
  }

  if (!isSuccess) {
    return <PageLoader />
  }

  return (
    <div className="py-4">
      {editingTitle && (
        <TitleEditor onOpenChange={onOpenChange} title={editingTitle} />
      )}
      <div className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

export { ArticleList }
