'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useViewHistory } from '@/components/ViewHistoryContext'
import { getTimeStr } from '@/lib/utils'

export default function Page() {
  const { viewHistory, clearHistory } = useViewHistory()
  const hasHistory = Object.keys(viewHistory).length > 0

  const historyList = Object.entries(viewHistory).reduce((prev, curr) => {
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

      {historyList.length > 0 ? (
        <>
          <div className="flex items-center justify-between gap-2 border-b-2 pb-2 text-xl font-bold">
            <h2>Articles</h2>
            <h2>Last viewed</h2>
          </div>

          <ul>
            {historyList.map(([timestamp, title]) => (
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
          </ul>
        </>
      ) : (
        <div>
          Your history is empty. Check out some latest news{' '}
          <Link className="font-bold underline" href="/">
            here
          </Link>
          .
        </div>
      )}
    </div>
  )
}
