import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@tucc/ui/dialog"
import { Button } from "@tucc/ui/button"
import { AlertTriangle } from "lucide-react"

interface WarningModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function WarningModal({ isOpen, onClose, onConfirm }: WarningModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center text-amber-500">
            <AlertTriangle className="mr-2" />
            Warning: In-App Browser Detected
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          It appears you may be using an In-App browser (like those found in Facebook, Instagram, or LinkedIn apps). For
          security reasons, we recommend using your default browser (e.g., Safari, Chrome) instead.
          <br />
          <br />
          Are you sure you want to proceed with the login?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
