import { z } from 'zod'

type Source = z.infer<typeof Source>
const Source = z.object({
  id: z.nullable(z.string()),
  name: z.string(),
})

type Article = z.infer<typeof Article>
const Article = z.object({
  source: Source,
  author: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string(),
  urlToImage: z.string().nullable(),
  publishedAt: z.string(),
  content: z.string(),
})

export { Source, Article }
