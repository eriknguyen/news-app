'use client'
import { useState } from 'react'

import { DefaultArticlesContainer } from '@/components/ArticleList/DefaultArticlesContainer'
import { FilteredArticlesContainer } from '@/components/ArticleList/FilteredArticlesContainer'
import { FilterButton } from '@/components/Filter'

export default function Home() {
  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([])

  const onFilterSubmit = (ids: string[]) => {
    setSelectedSourceIds(ids)
  }

  return (
    <div className="py-4">
      <div className="pb-4 text-right">
        <FilterButton onSubmit={onFilterSubmit} />
      </div>
      {selectedSourceIds.length > 0 ? (
        <FilteredArticlesContainer sourceIds={selectedSourceIds} />
      ) : (
        <DefaultArticlesContainer />
      )}
    </div>
  )
}
