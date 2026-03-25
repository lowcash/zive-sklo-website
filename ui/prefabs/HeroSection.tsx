import { HERO } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { HeroCarousel } from './HeroCarousel'
import { HeroScrollCue } from './HeroScrollCue'

/**
 * HeroSection - RSC (Server Component)
 * Full-height hero with auto-carousel background (client leaf).
 * Uses min-h-dvh (Dynamic Viewport Height) to prevent content hiding
 * behind iOS Safari's browser toolbar.
 */
export function HeroSection() {
  return (
    <header className='relative flex min-h-svh items-center overflow-hidden px-0 pt-24 pb-24 sm:pt-28 sm:pb-26 md:min-h-dvh md:pt-20 md:pb-16'>
      <div className='absolute inset-0 z-0'>
        <HeroCarousel images={HERO.backgroundImages} />
        <div className='absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313cc] to-transparent' />
        <div className='absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#ffbf00]/10 blur-[120px]' />
      </div>

      <div className='relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-20'>
        <div className='flex max-w-4xl flex-col justify-center space-y-5 sm:space-y-6 md:space-y-8'>
          {/* Badges: wrap on mobile, single row on desktop */}
          <div className='flex flex-wrap gap-2 md:flex-nowrap md:gap-2.5'>
            {HERO.pills.map((pill, index) => (
              <span
                key={pill.label}
                className={`inline-flex items-center whitespace-nowrap border px-3 py-1 text-[0.62rem] font-medium tracking-widest uppercase md:px-3.5 md:text-[0.7rem] ${
                  index === 0 || pill.accent
                    ? 'border-[#5045324d] text-[#9accf3]'
                    : 'border-[#5045324d] text-[#e5e2e199]'
                }`}
              >
                {applyCzechNbsp(pill.label)}
              </span>
            ))}
          </div>

          <h1 className='font-display text-3xl font-bold leading-tight tracking-tighter text-white sm:text-4xl md:text-7xl'>
            {applyCzechNbsp(HERO.h1Prefix)}
            <br />
            <span className='text-[#ffbf00]'>{applyCzechNbsp(HERO.h1Highlight)}</span>
            <br />
            {applyCzechNbsp(HERO.h1Suffix)}
          </h1>

          <p className='max-w-xl text-[0.98rem] leading-relaxed text-[#e5e2e1cc] sm:text-base md:text-xl'>
            {applyCzechNbsp(HERO.subtitle)}
          </p>

          <p className='max-w-xl font-label text-sm uppercase tracking-[0.18em] text-[#e5e2e180]'>
            {applyCzechNbsp(HERO.trustLine)}
          </p>

          <div className='flex flex-col gap-4 pt-3 sm:flex-row sm:gap-6 sm:pt-4'>
            <a
              href={HERO.ctaHref}
              className='bg-[#ffbf00] px-8 py-4 text-center font-bold text-[#402d00] transition-all hover:shadow-[0_0_30px_rgba(255,191,0,0.3)] sm:px-10 sm:py-5'
            >
              {applyCzechNbsp(HERO.ctaLabel)}
            </a>
            <a
              href={HERO.secondaryCtaHref}
              className='inline-flex items-center justify-center gap-2 text-center font-display font-bold text-[#e5e2e1] transition-colors hover:text-[#FFD79B]'
            >
              <span aria-hidden='true'>→</span>
              {applyCzechNbsp(HERO.secondaryCtaLabel)}
            </a>
          </div>
        </div>
      </div>

      <HeroScrollCue href='#o-projektu' ariaLabel='Posunout na další sekci' />
    </header>
  )
}
