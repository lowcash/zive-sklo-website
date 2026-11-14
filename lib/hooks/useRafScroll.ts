'use client'

import { useEffect } from 'react'

/**
 * Subscribe to window scroll/resize with a single rAF-throttled callback.
 */
export function useRafScroll(onFrame: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    let frameId: number | null = null

    const schedule = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        onFrame()
      })
    }

    onFrame()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [enabled, onFrame])
}
