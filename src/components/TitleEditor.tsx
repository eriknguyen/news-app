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

const TitleEditor = ({
  title,
  onOpenChange,
}: {
  title: string | null
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Dialog open={!!title} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit title</DialogTitle>
          <DialogDescription>
            Create your customised news title here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="rawTitle">Original title</Label>
            <div className="flex items-center space-x-2">
              <Textarea id="rawTitle" defaultValue={title ?? ''} readOnly />
            </div>
          </div>
          <div>
            <Label htmlFor="newTitle">New title</Label>
            <Textarea id="newTitle" defaultValue={title ?? ''} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { TitleEditor }
