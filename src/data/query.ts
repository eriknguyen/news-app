import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { strToSlug } from '@/lib/utils'

import { api, DEFAULT_STALE_TIME } from './api'
import { Article, Source } from './types'

const decorateArticles = (articles: Article[]) => {
  return articles
    .filter((article) => article.title !== '[Removed]')
    .map((article) => ({
      ...article,
      slug: strToSlug(article.title),
    }))
}

const useHeadlines = () => {
  return useQuery({
    queryKey: ['top-headlines'],
    queryFn: () =>
      api
        .get('top-headlines', { params: { country: 'us' } })
        .then((response) => response.data.articles)
        .then(z.array(Article).parse)
        .then(decorateArticles),
    staleTime: DEFAULT_STALE_TIME,
  })
}

const useSources = () => {
  return useQuery({
    queryKey: ['sources'],
    queryFn: () =>
      api
        .get('sources')
        .then((response) => response.data.sources)
        .then(z.array(Source).parse),
    staleTime: DEFAULT_STALE_TIME,
  })
}

export { useHeadlines, useSources }
