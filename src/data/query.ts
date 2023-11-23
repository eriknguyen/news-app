import { Article } from './types'
import mockHeadlines from './__mocks__/headlines.json'
import { z } from 'zod'

type HeadlinesResponse = z.infer<typeof HeadlinesResponse>
const HeadlinesResponse = z.object({
  status: z.literal('ok'),
  totalResults: z.number(),
  articles: z.array(Article),
})

const useHeadlines = () => {
  return mockHeadlines as HeadlinesResponse
}

export { useHeadlines }
