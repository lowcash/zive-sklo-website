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
    <nav data-nav-root='true' className='glass-nav fixed top-0 z-50 w-full'>
      <div className='mx-auto flex max-w-360 items-center justify-between px-(--gutter) py-3 min-[1280px]:py-4'>
        <a
          href='#top'
          onClick={handleAnchorNavigation('#top')}
          className='font-display text-fg hover:text-amber-hi inline-flex min-h-11 items-center text-xl font-bold tracking-[0.14em] uppercase transition-colors duration-300'
          aria-label='Přejít na začátek stránky'
        >
          {applyCzechNbsp(BRAND.name)}
        </a>

        <div className='hidden items-center gap-8 xl:flex'>
          {NAV.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? 'true' : undefined}
              className={
                activeHref === link.href
                  ? 'nav-link text-step--1 text-amber font-semibold tracking-[0.04em]'
                  : 'nav-link text-step--1 text-fg-2 hover:text-fg font-semibold tracking-[0.04em]'
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
          className='ui-cta-primary text-step--1 hidden min-h-11 items-center justify-center px-6 py-2 font-bold xl:inline-flex'
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
