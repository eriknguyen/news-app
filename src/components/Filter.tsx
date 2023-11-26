import { Loader2, SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useSources } from '@/data'

const FilterButton = ({
  onSubmit,
}: {
  onSubmit: (sourceIds: string[]) => void
}) => {
  const { toast } = useToast()
  const { data: sources, isSuccess, isError } = useSources()

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'An error occurred while fetching sources',
        description:
          'Please try again later. You can still browse the headlines without using the filter.',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  const [selectedSources, setSelectedSources] = useState(new Set<string>())
  const onSourceAdd = (id: string) => {
    setSelectedSources((prevSources) => {
      prevSources.add(id)
      return new Set(prevSources)
    })
  }

  const onSourceRemove = (id: string) => {
    setSelectedSources((prevSources) => {
      prevSources.delete(id)
      return new Set(prevSources)
    })
  }

  const onSourceChange = (sourceId: string) => (checked: boolean) => {
    if (checked) {
      onSourceAdd(sourceId)
    } else {
      onSourceRemove(sourceId)
    }
  }

  const handleSubmit = () => {
    onSubmit(Array.from(selectedSources))
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={!isSuccess}>
            {isSuccess ? (
              <>
                Filter
                <SlidersHorizontal className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Loading sources...
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-auto">
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
            <DialogDescription>
              Select the sources you want for your headlines.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            {sources?.map((source) => (
              <div key={source.id} className="flex items-center gap-2">
                <Checkbox
                  id={source.id}
                  checked={selectedSources.has(source.id)}
                  onCheckedChange={onSourceChange(source.id)}
                />
                <Label htmlFor={source.id} className="cursor-pointer">
                  {source.name}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { FilterButton }
