'use client'

import type { MouseEvent } from 'react'
import { useEffect, useState } from 'react'

import { BRAND, NAV } from '@/lib/content'
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
    const resolveActiveSection = () => {
      if (!NAV.links.length) {
        return
      }

      const sections = NAV.links
        .map((link) => {
          const sectionId = link.href.replace('#', '')
          const section = document.getElementById(sectionId)
          return section
            ? {
                href: link.href,
                offsetTop: section.offsetTop,
              }
            : null
        })
        .filter((section): section is { href: string; offsetTop: number } => Boolean(section))

      if (!sections.length) {
        setActiveHref('')
        return
      }

      const marker = window.scrollY + window.innerHeight * 0.45
      const firstSectionTop = sections[0].offsetTop

      if (marker < firstSectionTop) {
        setActiveHref('')
        if (window.location.hash) {
          window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
        }
        return
      }

      const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      if (atPageBottom) {
        const lastHref = sections[sections.length - 1].href
        setActiveHref(lastHref)
        const lastUrl = `${window.location.pathname}${window.location.search}${lastHref}`
        if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== lastUrl) {
          window.history.replaceState(null, '', lastUrl)
        }
        return
      }

      let nextActiveHref = ''
      for (const section of sections) {
        if (section.offsetTop <= marker) {
          nextActiveHref = section.href
        }
      }

      setActiveHref(nextActiveHref)

      // Sync URL hash with active section on organic scroll
      const nextUrl = nextActiveHref
        ? `${window.location.pathname}${window.location.search}${nextActiveHref}`
        : `${window.location.pathname}${window.location.search}`
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
      if (currentUrl !== nextUrl) {
        window.history.replaceState(null, '', nextUrl)
      }
    }

    resolveActiveSection()
    window.addEventListener('scroll', resolveActiveSection, { passive: true })
    window.addEventListener('resize', resolveActiveSection)

    return () => {
      window.removeEventListener('scroll', resolveActiveSection)
      window.removeEventListener('resize', resolveActiveSection)
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
