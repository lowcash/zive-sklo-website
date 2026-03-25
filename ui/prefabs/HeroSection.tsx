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
    <header className="relative flex min-h-svh items-center overflow-hidden px-0 pt-24 pb-24 sm:pt-28 sm:pb-26 md:min-h-dvh md:pt-20 md:pb-16">
      <div className="absolute inset-0 z-0">
        <HeroCarousel images={HERO.backgroundImages} />
        <div className="absolute inset-0 bg-linear-to-r from-[#131313] via-[#131313cc] to-transparent" />
        <div className="absolute top-1/2 left-1/4 h-150 w-150 -translate-y-1/2 rounded-full bg-[#ffbf00]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-360 px-6 md:px-20">
        <div className="flex max-w-4xl flex-col justify-center space-y-5 sm:space-y-6 md:space-y-8">
          {/* Badges: wrap on mobile, single row on desktop */}
          <div className="flex flex-wrap gap-2 md:flex-nowrap md:gap-2.5">
            {HERO.pills.map((pill, index) => (
              <span
                key={pill.label}
                className={`inline-flex items-center border px-3 py-1 text-[0.62rem] font-medium tracking-widest whitespace-nowrap uppercase md:px-3.5 md:text-[0.7rem] ${
                  index === 0 || pill.accent
                    ? 'border-[#5045324d] text-[#9accf3]'
                    : 'border-[#5045324d] text-[#e5e2e199]'
                }`}
              >
                {applyCzechNbsp(pill.label)}
              </span>
            ))}
          </div>

          <h1 className="font-display text-4xl leading-[1.08] font-bold tracking-tighter text-white sm:text-5xl md:text-7xl">
            {applyCzechNbsp(HERO.h1Prefix)}
            <br />
            <span className="text-[#ffbf00]">{applyCzechNbsp(HERO.h1Highlight)}</span>
            <br />
            {applyCzechNbsp(HERO.h1Suffix)}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[#e5e2e1cc] sm:text-lg md:text-xl">
            {applyCzechNbsp(HERO.subtitle)}
          </p>

          <p className="font-label max-w-xl text-sm tracking-[0.18em] text-[#e5e2e180] uppercase">
            {applyCzechNbsp(HERO.trustLine)}
          </p>

          <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:gap-6 sm:pt-4">
            <a
              href={HERO.ctaHref}
              className="bg-[#ffbf00] px-8 py-4 text-center font-bold text-[#402d00] transition-colors hover:bg-[#ffcf42] sm:px-10 sm:py-5"
            >
              {applyCzechNbsp(HERO.ctaLabel)}
            </a>
            <a
              href={HERO.secondaryCtaHref}
              className="font-display inline-flex items-center justify-center gap-2 text-center font-bold text-[#e5e2e1] transition-colors hover:text-[#FFD79B]"
            >
              <span aria-hidden="true">→</span>
              {applyCzechNbsp(HERO.secondaryCtaLabel)}
            </a>
          </div>
        </div>
      </div>

      <HeroScrollCue href="#o-projektu" ariaLabel="Posunout na další sekci" />
    </header>
  )
}
