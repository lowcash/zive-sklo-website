"use client"

import { useEffect, useState } from 'react'

import { NAV, BRAND } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { MobileMenu } from './MobileMenu'

/**
 * Navigation - client component for active section tracking
 * Sticky glass nav with mobile hamburger
 */
export function Navigation() {
  const [activeHref, setActiveHref] = useState('')

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
        return
      }

      const atPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      if (atPageBottom) {
        setActiveHref(sections[sections.length - 1].href)
        return
      }

      let nextActiveHref = ''
      for (const section of sections) {
        if (section.offsetTop <= marker) {
          nextActiveHref = section.href
        }
      }

      setActiveHref(nextActiveHref)
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
    <nav className='glass-nav fixed top-0 z-50 w-full bg-gradient-to-b from-[#131313] to-transparent shadow-[0_20px_40px_rgba(255,186,56,0.05)]'>
      <div className='mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-8 xl:px-10'>
        <a
          href='#top'
          className='font-display text-xl tracking-tighter text-[#E5E2E1] transition-colors duration-300 hover:text-[#FFD79B]'
          aria-label='Přejít na začátek stránky'
        >
          {applyCzechNbsp(BRAND.name)}
        </a>

        <div className='hidden items-center gap-7 font-display text-base font-bold tracking-tight xl:flex'>
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
              onClick={() => setActiveHref(link.href)}
            >
              {applyCzechNbsp(link.label)}
            </a>
          ))}
        </div>

        <a
          href={NAV.ctaHref}
          className='hidden bg-[#ffbf00] px-6 py-3 font-bold text-[#402d00] transition-colors duration-300 hover:bg-[#ffbf00e6] xl:block'
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
