'use client'

import { useCallback, useState } from 'react'

import { useRafScroll } from '@/lib/hooks/useRafScroll'

interface HeroScrollCueProps {
  href: string
  ariaLabel: string
}

/**
 * Scroll cue is visible only near the top of the page.
 * This prevents overlap with content while preserving the initial hint.
 */
export function HeroScrollCue({ href, ariaLabel }: HeroScrollCueProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY <= 12)
  }, [])

  useRafScroll(handleScroll)

  if (!isVisible) {
    return null
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className='fixed bottom-6 left-1/2 z-20 -translate-x-1/2 text-[#e5e2e180] transition-colors hover:text-[#9accf3] motion-safe:animate-bounce'
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <span className='material-symbols-outlined !text-[30px]' aria-hidden='true'>
        keyboard_arrow_down
      </span>
    </a>
  )
}
