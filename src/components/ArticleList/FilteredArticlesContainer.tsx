'use client'
import { useHeadlinesBySource } from '@/data'

import { ArticleList } from './ArtitleList'

const FilteredArticlesContainer = ({ sourceIds }: { sourceIds: string[] }) => {
  const queryResult = useHeadlinesBySource(sourceIds)

  return (
    <div className="py-4">
      <ArticleList articlesQuery={queryResult} />
    </div>
  )
}

export { FilteredArticlesContainer }
