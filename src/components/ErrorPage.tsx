import { ServerCrash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ErrorPage = () => {
  const handleHardRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <ServerCrash size={96} className="text-muted-foreground" />
      <h1 className="text-4xl">Ooops...</h1>
      <p>Something wrong</p>
      <Button onClick={handleHardRefresh}>Retry</Button>
    </div>
  )
}

export { ErrorPage }
