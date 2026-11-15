'use client'

import { useCallback, useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { useRafScroll } from '@/lib/hooks/useRafScroll'

// Hysteresis thresholds to prevent flickering near the show/hide boundary
const SHOW_SCROLL_THRESHOLD = 320
const HIDE_SCROLL_THRESHOLD = 220

/**
 * ScrollToTopButton - Client leaf component.
 * Appears after scrolling down, hides when footer comes into view.
 * Respects iOS safe-area-inset-bottom and uses GPU-composited animation.
 */
export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => (prev ? window.scrollY > HIDE_SCROLL_THRESHOLD : window.scrollY > SHOW_SCROLL_THRESHOLD))
  }, [])

  useRafScroll(toggleVisibility)

  useEffect(() => {
    const footerEl = document.querySelector('footer')
    if (!footerEl) return

    const observer = new IntersectionObserver(([entry]) => setIsFooterVisible(entry.isIntersecting), {
      threshold: 0,
      rootMargin: '0px 0px -20px 0px',
    })
    observer.observe(footerEl)
    return () => observer.disconnect()
  }, [])

  const canShow = isVisible && !isFooterVisible

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className='pointer-events-none fixed inset-x-0 bottom-6 z-40 md:bottom-8'>
      <div className='wrap flex justify-end'>
        <motion.button
          type='button'
          initial={false}
          animate={{
            opacity: canShow ? 1 : 0,
            scale: canShow ? 1 : 0.88,
            y: canShow ? 0 : 10,
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onClick={scrollToTop}
          className={`border-line-strong bg-card text-fg hover:bg-ember hover:text-on-ember pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${canShow ? '' : 'pointer-events-none'}`}
          style={{
            marginBottom: 'env(safe-area-inset-bottom)',
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
          }}
          aria-label='Posunout na začátek stránky'
          aria-hidden={!canShow}
          tabIndex={canShow ? 0 : -1}
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.6'
            aria-hidden='true'
            className='size-5'
          >
            <path d='M12 19V5m0 0-6 6m6-6 6 6' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </motion.button>
      </div>
    </div>
  )
}
