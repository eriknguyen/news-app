import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { strToSlug } from '@/lib/utils'

import mockHeadlines from './__mocks__/headlines.json'
import mockSources from './__mocks__/sources.json'
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
        .catch((error) => {
          return mockHeadlines.articles
        })
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
        .catch((error) => {
          return mockSources.sources
        })
        .then(z.array(Source).parse),
    staleTime: DEFAULT_STALE_TIME,
  })
}

const useHeadlinesBySource = (sources: string[]) => {
  return useQuery({
    queryKey: ['top-headlines', ...sources],
    queryFn: () =>
      api
        .get('top-headlines', { params: { sources: sources.join(',') } })
        .then((response) => response.data.articles)
        .then(z.array(Article).parse)
        .then(decorateArticles),
    enabled: sources.length > 0,
    staleTime: DEFAULT_STALE_TIME,
  })
}

const useHeadlinesSearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ['top-headlines', searchQuery],
    enabled: searchQuery.length > 0,
    queryFn: () =>
      api
        .get('top-headlines', { params: { q: searchQuery } })
        .then((response) => response.data.articles)
        .then(z.array(Article).parse)
        .then(decorateArticles),
  })
}

export { useHeadlines, useHeadlinesBySource, useHeadlinesSearch, useSources }
