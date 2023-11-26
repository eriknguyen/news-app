import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { api, DEFAULT_STALE_TIME } from './api'
import { Article } from './types'

const Articles = z.array(Article)

const decorateArticles = (articles: Article[]) => {
  return articles.filter((article) => article.title !== '[Removed]')
}

const useHeadlines = () => {
  return useQuery({
    queryKey: ['top-headlines'],
    queryFn: () =>
      api
        .get('top-headlines', { params: { country: 'us' } })
        .then((response) => response.data.articles)
        .then(Articles.parse)
        .then(decorateArticles),
    staleTime: DEFAULT_STALE_TIME,
  })
}

export { useHeadlines }
