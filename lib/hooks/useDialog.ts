'use client'

import { useEffect, useRef } from 'react'

type UseDialogOptions = {
  open: boolean
  onClose: () => void
  /** When true, sets aria-hidden/inert on document body children outside the dialog. */
  inertBackground?: boolean
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Focus trap, Escape-to-close, and focus restore for modal dialogs.
 */
export function useDialog({ open, onClose, inertBackground = true }: UseDialogOptions) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current

    const focusFirst = () => {
      const focusable = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      const first = focusable?.[0]
      if (first) {
        first.focus()
      } else {
        dialog?.focus()
      }
    }

    // Defer so the dialog is in the DOM.
    const focusTimer = window.setTimeout(focusFirst, 0)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialog) {
        return
      }

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
      )

      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    const inerted: HTMLElement[] = []
    if (inertBackground && dialog) {
      for (const child of Array.from(document.body.children)) {
        if (!(child instanceof HTMLElement)) continue
        if (child.contains(dialog) || dialog.contains(child) || child === dialog) continue
        if (child.hasAttribute('aria-hidden')) continue
        child.setAttribute('aria-hidden', 'true')
        child.inert = true
        inerted.push(child)
      }
    }

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      for (const el of inerted) {
        el.removeAttribute('aria-hidden')
        el.inert = false
      }
      previouslyFocusedRef.current?.focus?.()
    }
  }, [open, onClose, inertBackground])

  return dialogRef
}
