import { NAV, BRAND } from '@/lib/content'

import { MobileMenu } from './MobileMenu'

/**
 * Navigation - RSC with client leaf for mobile menu
 * Sticky glass nav with mobile hamburger
 */
export function Navigation() {
  return (
    <nav className='glass-nav fixed top-0 z-50 w-full bg-gradient-to-b from-[#131313] to-transparent shadow-[0_20px_40px_rgba(255,186,56,0.05)]'>
      <div className='mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-10'>
        <span className='font-display text-xl tracking-tighter text-[#E5E2E1]'>
          {BRAND.name}
        </span>

        <div className='hidden items-center gap-8 font-display text-lg font-bold tracking-tight md:flex'>
          {NAV.links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={
                index === 0
                  ? 'border-b-2 border-[#FFB300] pb-1 text-[#FFB300]'
                  : 'text-[#E5E2E1] transition-colors hover:text-[#FFD79B]'
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={NAV.ctaHref}
          className='hidden scale-95 bg-[#ffbf00] px-6 py-3 font-bold text-[#402d00] transition-transform active:scale-90 hover:bg-[#FFB300]/90 md:block'
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
