import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MouseEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Article } from '@/data'
import { cn, getDateStr, getTimeStr } from '@/lib/utils'

import placeHolderImage from '../../public/newspaper.jpeg'
import { useTitleMap } from './TitleEditorContext'
import { useLastView } from './ViewHistoryContext'

const CardImage = ({ src, alt, ...rest }: any) => {
  const [hasError, setHasError] = useState(false)
  const onError = () => {
    setHasError(true)
  }

  if (hasError) {
    return (
      <Image
        src={placeHolderImage}
        alt={alt}
        width={480}
        height={360}
        className="aspect-[3/2] w-full rounded-t-md object-cover"
        placeholder="blur"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={480}
      height={360}
      className="aspect-[3/2] w-full rounded-t-md object-cover"
      onError={onError}
      {...rest}
    />
  )
}

const ArticleCard = ({
  article,
  onEditTitle,
}: {
  article: Article
  onEditTitle: () => void
}) => {
  const router = useRouter()
  const { titleMap } = useTitleMap()
  const lastView = useLastView(article.title)
  const displayTitle = titleMap[article.title] ?? article.title

  const onCardClick = () => router.push(`/article/${article.slug}`)
  const onEdit = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onEditTitle()
  }

  return (
    <Card
      className="group flex cursor-pointer flex-col overflow-hidden transition duration-300 hover:z-10 hover:scale-110 focus:scale-110"
      onClick={onCardClick}
      tabIndex={0}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden',
          'bg-gradient-to-t from-black/90 via-black/50 to-transparent'
        )}
      >
        {article.urlToImage ? (
          <CardImage src={article.urlToImage} alt={article.title} unoptimized />
        ) : (
          <CardImage
            src={placeHolderImage}
            alt={article.title}
            placeholder="blur"
          />
        )}
        <div
          className={cn(
            'absolute bottom-0 left-0 h-0 w-full text-sm text-muted-foreground group-hover:h-[100%] transition-all duration-300 flex flex-col justify-end',
            'bg-gradient-to-t from-black/90 via-black/50 to-transparent'
          )}
        >
          <p className="invisible p-4 text-sm text-white transition delay-150 duration-500 group-hover:visible">
            {article.description || article.content}
          </p>
        </div>
      </div>
      <CardHeader>
        <p className="text-sm text-muted-foreground">
          {getDateStr(article.publishedAt)}
        </p>
        <div className="inline">
          <CardTitle className="text-lg">
            {displayTitle}
            <Button
              variant="outline"
              size="icon"
              className="ml-2 h-6 w-6 rounded-full"
              onClick={onEdit}
            >
              <Pencil className="h-3 w-3 text-muted-foreground" />
            </Button>
          </CardTitle>
          {lastView && (
            <p className="mt-4 text-sm italic text-muted-foreground">
              Last viewed: {getTimeStr(lastView)}
            </p>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}

export { ArticleCard }
