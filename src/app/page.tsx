'use client'
import { Search } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'

import { DefaultArticlesContainer } from '@/components/ArticleList/DefaultArticlesContainer'
import { FilteredArticlesContainer } from '@/components/ArticleList/FilteredArticlesContainer'
import { SearchedArticlesContainer } from '@/components/ArticleList/SearchedArticlesContainer'
import { FilterButton } from '@/components/Filter'
import { InputWithIcon } from '@/components/ui/input'
import { debounce } from '@/lib/utils'

enum ViewMode {
  Default = 'Default',
  Filter = 'Filter',
  Search = 'Search',
}

export default function Home() {
  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([])
  const onFilterSubmit = (ids: string[]) => {
    setSelectedSourceIds(ids)
  }

  const [searchInput, setSearchInput] = useState<string>('')
  const onSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  })

  const [currentMode, setCurrentMode] = useState<ViewMode>(ViewMode.Default)
  useEffect(() => {
    if (searchInput.length > 0) {
      setCurrentMode(ViewMode.Search)
    } else if (selectedSourceIds.length > 0) {
      setCurrentMode(ViewMode.Filter)
    } else {
      setCurrentMode(ViewMode.Default)
    }
  }, [selectedSourceIds, searchInput])

  return (
    <div className="py-4">
      <div className="flex w-full flex-wrap items-center gap-4 sm:flex-nowrap">
        <div className="flex w-full">
          <InputWithIcon
            type="text"
            placeholder="Search for headlines..."
            icon={<Search />}
            onChange={onSearch}
          />
        </div>
        <FilterButton onSubmit={onFilterSubmit} />
      </div>

      {currentMode === ViewMode.Search && (
        <SearchedArticlesContainer query={searchInput} />
      )}
      {currentMode === ViewMode.Filter && (
        <FilteredArticlesContainer sourceIds={selectedSourceIds} />
      )}
      {currentMode === ViewMode.Default && <DefaultArticlesContainer />}
    </div>
  )
}
