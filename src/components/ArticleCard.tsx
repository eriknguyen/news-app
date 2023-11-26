import { Pencil } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Article } from '@/data'
import { getDateStr, getTimeStr } from '@/lib/utils'

import placeHolderImage from '../../public/newspaper.jpeg'
import { useTitleMap } from './TitleEditorContext'
import { useLastView } from './ViewHistoryContext'

const CardImage = ({ src, alt, ...rest }: any) => (
  <Image
    src={src}
    alt={alt}
    width={480}
    height={360}
    className="aspect-[3/2] w-full rounded-t-md object-cover"
    {...rest}
  />
)

const ArticleCard = ({
  article,
  onEditTitle,
}: {
  article: Article
  onEditTitle: () => void
}) => {
  const { titleMap } = useTitleMap()
  const lastView = useLastView(article.title)
  const displayTitle = titleMap[article.title] ?? article.title

  return (
    <Card className="relative">
      {article.urlToImage ? (
        <CardImage src={article.urlToImage} alt={article.title} unoptimized />
      ) : (
        <CardImage
          src={placeHolderImage}
          alt={article.title}
          placeholder="blur"
        />
      )}
      <CardHeader>
        <p className="text-muted-foreground">
          {getDateStr(article.publishedAt)}
        </p>
        <div className="inline">
          <CardTitle className="text-xl">
            {displayTitle}
            <Button
              variant="outline"
              size="icon"
              className="ml-2 h-6 w-6 rounded-full"
              onClick={onEditTitle}
            >
              <Pencil className="h-3 w-3 text-muted-foreground" />
            </Button>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p className="mb-4">{article.description || article.content}</p>
        {lastView && (
          <p className="text-sm italic">Last viewed: {getTimeStr(lastView)}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link className="text-primary" href={`/article/${article.title}`}>
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { ArticleCard }
