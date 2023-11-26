import { QueryKey } from '@tanstack/react-query'

import { Article } from './types'

const searchArticle = (
  headlinesQueries: [QueryKey, Article[]][],
  slug: string
): Article | null => {
  for (let headlinesQuery of headlinesQueries) {
    const [_, data] = headlinesQuery
    const article = data?.find((article: Article) => article.slug === slug)
    if (article) {
      return article
    }
  }

  return null
}

export { searchArticle }
