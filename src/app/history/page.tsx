'use client'

import { Button } from '@/components/ui/button'
import { useViewHistory } from '@/components/ViewHistoryContext'
import { getTimeStr } from '@/lib/utils'

export default function Page() {
  const { viewHistory, clearHistory } = useViewHistory()
  const hasHistory = Object.keys(viewHistory).length > 0

  const viewDisplay = Object.entries(viewHistory).reduce((prev, curr) => {
    const [title, views] = curr
    const newViews = views.map((view) => [view, title] as [number, string])
    prev.push(...newViews)
    return prev
  }, [] as [number, string][])

  return (
    <div className="my-8">
      <div className="flex gap-4">
        <h1 className="mb-8 items-center text-4xl font-bold">View History</h1>
        {hasHistory && (
          <Button size="sm" variant="outline" onClick={clearHistory}>
            Clear all
          </Button>
        )}
      </div>
      {viewDisplay.map(([timestamp, title]) => (
        <li
          key={timestamp}
          className="flex w-full flex-col justify-between gap-2 border-b-[1px] py-4 last-of-type:border-b-0 sm:flex-row"
        >
          <span>{title}</span>
          <span className="self-end text-sm italic text-muted-foreground sm:shrink-0">
            {getTimeStr(timestamp)}
          </span>
        </li>
      ))}
    </div>
  )
}
