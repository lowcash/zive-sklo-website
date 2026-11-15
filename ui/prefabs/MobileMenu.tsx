'use client'

import type { MouseEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { NAV } from '@/lib/content'
import { useDialog } from '@/lib/hooks/useDialog'
import { BRAND } from '@/lib/site-config'
import { applyCzechNbsp, scrollToHashWithNavOffset } from '@/lib/utils'

/**
 * MobileMenu - Client leaf component for mobile navigation
 * Hamburger menu with full-screen overlay and Framer Motion animations
 */
export function MobileMenu({ activeHref }: { activeHref: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const closeMenu = useCallback(() => setIsOpen(false), [])
  const dialogRef = useDialog({ open: isOpen, onClose: closeMenu })
  const overlayId = 'mobile-nav-overlay'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, mounted])

  const toggleMenu = () => setIsOpen((open) => !open)

  const handleAnchorNavigation = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    closeMenu()

    window.setTimeout(() => {
      scrollToHashWithNavOffset(href)
    }, 0)
  }

  const menuOverlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          id={overlayId}
          tabIndex={-1}
          role='dialog'
          aria-modal='true'
          aria-label='Navigace'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className='bg-panel fixed inset-0 z-70 flex min-h-dvh w-screen flex-col items-center justify-center'
        >
          <div className='absolute inset-x-0 top-0 mx-auto flex max-w-360 items-center justify-between px-(--gutter) py-3'>
            <a
              href='#top'
              onClick={handleAnchorNavigation('#top')}
              className='font-display text-fg hover:text-amber-hi inline-flex min-h-11 items-center text-xl font-bold tracking-[0.14em] uppercase transition-colors'
              aria-label='Přejít na začátek stránky'
            >
              {applyCzechNbsp(BRAND.name)}
            </a>

            <button
              onClick={closeMenu}
              className='text-fg border-line-strong flex h-11 w-11 items-center justify-center border'
              aria-label='Zavřít navigaci'
            >
              <span className='material-symbols-outlined text-[24px]! leading-none' aria-hidden='true'>
                close
              </span>
            </button>
          </div>

          {/* mt-16 shifts items below the visual centre – feels more grounded */}
          <nav className='mt-16 flex flex-col items-center gap-10' aria-label='Mobilní navigace'>
            {NAV.links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleAnchorNavigation(link.href)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                aria-current={activeHref === link.href ? 'true' : undefined}
                className={`font-display hover:text-amber-hi text-step-4 font-medium transition-colors duration-300 ${
                  activeHref === link.href ? 'text-amber' : 'text-fg'
                }`}
              >
                {applyCzechNbsp(link.label)}
              </motion.a>
            ))}
            <motion.a
              href={NAV.ctaHref}
              onClick={handleAnchorNavigation(NAV.ctaHref)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: NAV.links.length * 0.06, duration: 0.3 }}
              className='ui-cta-primary font-display mt-4 inline-flex items-center justify-center px-8 py-4 font-bold'
            >
              {applyCzechNbsp(NAV.ctaLabel)}
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Hamburger Button */}
      <button
        type='button'
        data-testid='mobile-menu-toggle'
        onClick={toggleMenu}
        className='border-line-strong flex h-11 w-11 flex-col items-center justify-center gap-1.5 border'
        aria-label={isOpen ? 'Zavřít navigaci' : 'Otevřít navigaci'}
        aria-expanded={isOpen}
        aria-controls={isOpen ? overlayId : undefined}
      >
        <span
          className={`bg-fg h-0.5 w-6 transition-transform duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span className={`bg-fg h-0.5 w-6 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <span
          className={`bg-fg h-0.5 w-6 transition-transform duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </button>

      {mounted ? createPortal(menuOverlay, document.body) : null}
    </>
  )
}
