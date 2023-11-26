'use client'

import { QueryKey, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useTitleMap } from '@/components/TitleEditorContext'
import { Button } from '@/components/ui/button'
import { useLastView, useViewHistory } from '@/components/ViewHistoryContext'
import { Article, searchArticle } from '@/data'
import { cn, getDateStr, getTimeStr } from '@/lib/utils'

export default function Page({ params }: { params: { slug: string } }) {
  const queryClient = useQueryClient()
  const headlinesQueries = queryClient.getQueriesData({
    queryKey: ['top-headlines'],
  }) as [QueryKey, Article[]][]

  const article = searchArticle(headlinesQueries, params.slug)

  const { titleMap } = useTitleMap()
  const { addView } = useViewHistory()

  const lastView = useLastView(article?.title)

  const [showFullImage, setShowFullImage] = useState(false)
  const toggleFullImage = () => {
    setShowFullImage(!showFullImage)
  }

  if (!article) {
    return (
      <div className="mx-auto my-16 max-w-xs text-center">
        <h1 className="mb-4 text-4xl font-bold">
          I cannot find the article you are looking for
        </h1>

        <Button asChild>
          <Link className="text-primary" href="/">
            Back to home
          </Link>
        </Button>
      </div>
    )
  }

  const {
    title,
    source,
    author,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  } = article
  const displayTitle = titleMap[title] ?? title

  const onOpenArticle = () => {
    addView(title)
    window.open(url, '_blank')
  }

  return (
    <article className="mx-auto my-12 max-w-4xl">
      {urlToImage && (
        <div className="relative">
          <Image
            src={urlToImage}
            alt={title}
            width={1600}
            height={1200}
            className={cn(
              'w-full rounded-t-md object-cover',
              !showFullImage && 'aspect-[16/9]'
            )}
            unoptimized
          />
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 opacity-80"
            onClick={toggleFullImage}
          >
            Toggle size
          </Button>
        </div>
      )}

      <div className="mt-8">
        <p className="mb-2 text-xl text-muted-foreground">
          {source.name} - {getDateStr(publishedAt)}
        </p>
        <h1 className="mb-4 text-4xl font-bold">{displayTitle}</h1>
        {author && <p className="mb-4 text-muted-foreground">By {author}</p>}
        <p className="mb-4">{description}</p>
        <p className="mb-4">{content}</p>

        {lastView && (
          <p className="text-sm italic">Last viewed: {getTimeStr(lastView)}</p>
        )}
        <Button variant="default" className="mt-4" onClick={onOpenArticle}>
          Read full
        </Button>
      </div>
    </article>
  )
}
