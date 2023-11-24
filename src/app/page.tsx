import { ArticleCard } from '@/components/ArticleCard'
import { useHeadlines } from '@/data'

export default function Home() {
  const data = useHeadlines()
  const { articles } = data

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          articles.map(article => (
            <ArticleCard key={article.title} article={article} />
          ))
        }
      </div>
    </div>
  )
}
