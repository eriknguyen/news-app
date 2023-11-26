import { ChangeEvent, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { useTitleMap } from './TitleEditorContext'

const TitleEditor = ({
  title: rawTitle,
  onOpenChange,
}: {
  title: string
  onOpenChange: (open: boolean) => void
}) => {
  const [newTitle, setNewTitle] = useState(rawTitle)
  const { titleMap, updateTitle } = useTitleMap()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (titleMap[rawTitle]) {
      setNewTitle(titleMap[rawTitle])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value
    setNewTitle(value)

    if (value.length > 255) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }

  const onSubmit = () => {
    if (!hasError) {
      updateTitle(rawTitle, newTitle)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={!!rawTitle} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit title</DialogTitle>
          <DialogDescription>
            Create your customised news title here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="rawTitle">Original title</Label>
            <div className="flex items-center space-x-2">
              <Textarea id="rawTitle" defaultValue={rawTitle} readOnly />
            </div>
          </div>
          <div>
            <Label htmlFor="newTitle">New title</Label>
            <Textarea
              id="newTitle"
              value={newTitle}
              onChange={onTitleChange}
              className={cn(hasError && 'focus-visible:ring-destructive')}
            />
            {hasError && (
              <p className="text-sm text-destructive">
                Title should be up to 255 characters.
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={hasError} onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { TitleEditor }
