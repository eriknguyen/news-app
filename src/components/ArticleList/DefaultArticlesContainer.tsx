'use client'
import { useHeadlines } from '@/data'

import { ArticleList } from './ArtitleList'

const DefaultArticlesContainer = () => {
  const queryResult = useHeadlines()

  return (
    <div className="py-4">
      <ArticleList articlesQuery={queryResult} />
    </div>
  )
}

export { DefaultArticlesContainer }
