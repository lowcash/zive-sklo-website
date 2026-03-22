"use client"

import { useEffect, useState } from 'react'

import { NAV, BRAND } from '@/lib/content'

import { MobileMenu } from './MobileMenu'

/**
 * Navigation - RSC with client leaf for mobile menu
 * Sticky glass nav with mobile hamburger
 */
export function Navigation() {
  const [activeHref, setActiveHref] = useState(NAV.links[0]?.href ?? '')

  useEffect(() => {
    const resolveActiveSection = () => {
      if (!NAV.links.length) {
        return
      }

      const atPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      if (atPageBottom) {
        setActiveHref(NAV.links[NAV.links.length - 1].href)
        return
      }

      const marker = window.scrollY + window.innerHeight * 0.45
      let nextActiveHref = NAV.links[0].href

      for (const link of NAV.links) {
        const sectionId = link.href.replace('#', '')
        const section = document.getElementById(sectionId)

        if (!section) {
          continue
        }

        if (section.offsetTop <= marker) {
          nextActiveHref = link.href
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
      <div className='mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-10'>
        <span className='font-display text-xl tracking-tighter text-[#E5E2E1]'>
          {BRAND.name}
        </span>

        <div className='hidden items-center gap-8 font-display text-lg font-bold tracking-tight md:flex'>
          {NAV.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={
                activeHref === link.href
                  ? 'border-b-2 border-[#FFB300] pb-1 text-[#FFB300] transition-colors duration-300'
                  : 'border-b-2 border-transparent pb-1 text-[#E5E2E1] transition-colors duration-300 hover:text-[#FFD79B]'
              }
              onClick={() => setActiveHref(link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={NAV.ctaHref}
          className='hidden bg-[#ffbf00] px-6 py-3 font-bold text-[#402d00] transition-colors duration-300 hover:bg-[#ffbf00e6] md:block'
        >
          {NAV.ctaLabel}
        </a>

        <div className='md:hidden'>
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}
