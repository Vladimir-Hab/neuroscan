import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface PrivacyPolicyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/neuroscan/Politics.md')
      .then(res => res.text())
      .then(text => setContent(text))
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Политика конфиденциальности</DialogTitle>
          <DialogDescription>
            В отношении обработки персональных данных
          </DialogDescription>
        </DialogHeader>
        <div className="h-[60vh] overflow-y-auto pr-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return (
                  <h2 key={index} className="text-lg font-bold mt-4 mb-2">
                    {line.replace('# ', '')}
                  </h2>
                )
              }
              if (line.startsWith('## ')) {
                return (
                  <h3 key={index} className="text-base font-semibold mt-3 mb-1">
                    {line.replace('## ', '')}
                  </h3>
                )
              }
              if (line.startsWith('### ')) {
                return (
                  <h4 key={index} className="text-sm font-semibold mt-2 mb-1">
                    {line.replace('### ', '')}
                  </h4>
                )
              }
              if (line.startsWith('* **')) {
                return (
                  <li key={index} className="ml-4 list-disc">
                    {line.replace('* **', '').replace('**', '')}
                  </li>
                )
              }
              if (line.startsWith('* ')) {
                return (
                  <li key={index} className="ml-4 list-disc">
                    {line.replace('* ', '')}
                  </li>
                )
              }
              if (line.trim() === '') {
                return <br key={index} />
              }
              return (
                <p key={index} className="text-sm leading-relaxed">
                  {line}
                </p>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}