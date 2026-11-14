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
      <div className='mx-auto flex w-full max-w-360 justify-end px-6 md:px-10'>
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
          className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#50453266] bg-[rgba(28,27,27,0.82)] text-[#E5E2E1] backdrop-blur-[20px] transition-colors duration-300 hover:bg-[#ffbf00] hover:text-[#402d00] ${canShow ? '' : 'pointer-events-none'}`}
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
          <span className='material-symbols-outlined text-[24px]!' aria-hidden='true'>
            arrow_upward
          </span>
        </motion.button>
      </div>
    </div>
  )
}
