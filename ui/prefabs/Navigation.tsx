'use client'

import type { MouseEvent } from 'react'
import { useEffect, useState } from 'react'

import { NAV } from '@/lib/content'
import { resolveActiveHref, setSectionHash } from '@/lib/navigation-core-adapter'
import { BRAND } from '@/lib/site-config'
import { applyCzechNbsp, scrollToHashWithNavOffset } from '@/lib/utils'

import { MobileMenu } from './MobileMenu'

/**
 * Navigation - client component for active section tracking
 * Sticky glass nav with mobile hamburger
 */
export function Navigation() {
  const [activeHref, setActiveHref] = useState('')

  const handleAnchorNavigation = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const didScroll = scrollToHashWithNavOffset(href)
    if (!didScroll) {
      return
    }

    setActiveHref(href === '#top' ? '' : href)
  }

  useEffect(() => {
    let frameId: number | null = null

    const resolveActiveSection = () => {
      const nextActiveHref = resolveActiveHref()
      setActiveHref((current) => (current === nextActiveHref ? current : nextActiveHref))
      setSectionHash(nextActiveHref || '#top', 'replace')
    }

    const scheduleResolveActiveSection = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        resolveActiveSection()
      })
    }

    resolveActiveSection()
    window.addEventListener('scroll', scheduleResolveActiveSection, { passive: true })
    window.addEventListener('resize', scheduleResolveActiveSection)

    return () => {
      window.removeEventListener('scroll', scheduleResolveActiveSection)
      window.removeEventListener('resize', scheduleResolveActiveSection)

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <nav
      data-nav-root='true'
      className='glass-nav fixed top-0 z-50 w-full bg-linear-to-b from-[#131313] to-transparent shadow-[0_20px_40px_rgba(255,186,56,0.05)]'
    >
      <div className='mx-auto flex max-w-360 items-center justify-between px-6 py-6 md:px-8 xl:px-10'>
        <a
          href='#top'
          onClick={handleAnchorNavigation('#top')}
          className='font-display text-xl tracking-tighter text-[#E5E2E1] transition-colors duration-300 hover:text-[#FFD79B]'
          aria-label='Přejít na začátek stránky'
        >
          {applyCzechNbsp(BRAND.name)}
        </a>

        <div className='font-display hidden items-center gap-7 text-base font-bold tracking-tight xl:flex'>
          {NAV.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? 'page' : undefined}
              className={
                activeHref === link.href
                  ? 'border-b-2 border-[#FFB300] pb-1 text-[#FFB300] transition-colors duration-300'
                  : 'border-b-2 border-transparent pb-1 text-[#E5E2E1] transition-colors duration-300 hover:text-[#FFD79B]'
              }
              onClick={handleAnchorNavigation(link.href)}
            >
              {applyCzechNbsp(link.label)}
            </a>
          ))}
        </div>

        <a
          href={NAV.ctaHref}
          onClick={handleAnchorNavigation(NAV.ctaHref)}
          className='ui-cta-primary hidden px-6 py-3 font-bold xl:block'
        >
          {applyCzechNbsp(NAV.ctaLabel)}
        </a>

        <div className='xl:hidden'>
          <MobileMenu activeHref={activeHref} />
        </div>
      </div>
    </nav>
  )
}
