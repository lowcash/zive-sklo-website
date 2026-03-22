'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { BRAND, NAV } from '@/lib/content'

/**
 * MobileMenu - Client leaf component for mobile navigation
 * Hamburger menu with full-screen overlay and Framer Motion animations
 */
export function MobileMenu({ activeHref }: { activeHref: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

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

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const menuOverlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className='fixed inset-0 z-[70] flex min-h-dvh w-screen flex-col items-center justify-center bg-[rgba(28,27,27,0.72)] backdrop-blur-[20px]'
        >
          <a
            href='#top'
            onClick={closeMenu}
            className='absolute left-6 top-6 font-display text-xl tracking-tighter text-[#E5E2E1] transition-colors hover:text-[#FFD79B]'
            aria-label='Přejít na začátek stránky'
          >
            {BRAND.name}
          </a>

          {/* Close Button */}
          <button
            onClick={closeMenu}
            className='absolute right-6 top-6 flex h-8 w-8 items-center justify-center text-[#E5E2E1]'
            aria-label='Close menu'
          >
            <span className='material-symbols-outlined !text-[24px] leading-none'>
              close
            </span>
          </button>

          {/* Navigation Links */}
          <nav className='flex flex-col items-center gap-10'>
            {NAV.links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                className={`font-display text-3xl font-bold transition-colors duration-300 hover:text-[#FFD79B] ${
                  activeHref === link.href ? 'text-[#FFB300]' : 'text-[#E5E2E1]'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={NAV.ctaHref}
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: NAV.links.length * 0.06, duration: 0.3 }}
              className='mt-4 bg-[#ffbf00] px-8 py-4 font-display font-bold text-[#402d00] transition-colors hover:bg-[#FFB300]/90'
            >
              {NAV.ctaLabel}
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
        onClick={toggleMenu}
        className='flex h-8 w-8 flex-col items-center justify-center gap-1.5'
        aria-label='Toggle menu'
      >
        <span
          className={`h-0.5 w-6 bg-[#E5E2E1] transition-transform duration-300 ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-[#E5E2E1] transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-[#E5E2E1] transition-transform duration-300 ${
            isOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {mounted ? createPortal(menuOverlay, document.body) : null}
    </>
  )
}
