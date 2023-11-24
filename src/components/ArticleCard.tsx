import { StaticImport } from 'next/dist/shared/lib/get-img-props'
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
import { getDateStr } from '@/lib/utils'

import placeHolderImage from '../../public/newspaper.jpeg'

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

const ArticleCard = ({ article }: { article: Article }) => {
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
        <CardTitle className="text-xl">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {article.description || article.content}
      </CardContent>
      <CardFooter>
        <Link className="text-primary" href="#">
          Read More
        </Link>
        <Button className="ml-4" size="sm">
          Edit title
        </Button>
      </CardFooter>
    </Card>
  )
}

export { ArticleCard }
