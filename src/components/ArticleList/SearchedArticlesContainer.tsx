'use client'
import { useHeadlines, useHeadlinesSearch } from '@/data'

import { ArticleList } from './ArtitleList'

const SearchedArticlesContainer = ({ query }: { query: string }) => {
  const queryResult = useHeadlinesSearch(query.trim())

  return (
    <div className="py-4">
      <ArticleList articlesQuery={queryResult} />
    </div>
  )
}

export { SearchedArticlesContainer }
