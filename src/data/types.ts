import { z } from 'zod'

type Source = z.infer<typeof Source>
const Source = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string(),
  category: z.string(),
  language: z.string(),
  country: z.string(),
})

type SourceOverview = z.infer<typeof SourceOverview>
const SourceOverview = z.object({
  id: z.string().nullable(),
  name: z.string(),
})

type Article = z.infer<typeof Article>
const Article = z.object({
  slug: z.string().optional(),
  source: SourceOverview,
  author: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string(),
  urlToImage: z.string().nullable(),
  publishedAt: z.string(),
  content: z.string().nullable(),
})

export { Article, Source }
