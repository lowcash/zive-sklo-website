'use client'

import { useState } from 'react'

import { NAV } from '@/lib/content'

/**
 * MobileMenu - Client leaf component for mobile navigation
 * Hamburger menu with full-screen overlay
 */
/**
 * MobileMenu - Client leaf component for mobile navigation
 * Hamburger menu with full-screen overlay
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className='flex flex-col gap-1.5 w-8 h-8 items-center justify-center'
        aria-label='Toggle menu'
      >
        <span
          className={`w-6 h-0.5 bg-text-primary transition-transform ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-text-primary transition-opacity ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-text-primary transition-transform ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Full-Screen Overlay */}
      {isOpen && (
        <div className='fixed inset-0 bg-surface-dark z-50 flex flex-col items-center justify-center'>
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className='absolute top-8 right-6 text-4xl text-text-primary'
            aria-label='Close menu'
          >
            ×
          </button>

          {/* Navigation Links */}
          <div className='flex flex-col items-center gap-8 text-2xl'>
            {NAV.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className='text-text-primary hover:text-accent-amber transition-colors'
              >
                {link.label}
              </a>
            ))}
            <a
              href={NAV.ctaHref}
              onClick={closeMenu}
              className='mt-4 px-8 py-4 bg-accent-amber text-surface-dark rounded-lg font-medium hover:bg-opacity-90 transition-all'
            >
              {NAV.ctaLabel}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
