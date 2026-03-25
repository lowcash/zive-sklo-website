import { HERO } from '@/lib/content'

import { HeroCarousel } from './HeroCarousel'

/**
 * HeroSection - RSC (Server Component)
 * Full-height hero with auto-carousel background (client leaf).
 * Uses min-h-dvh (Dynamic Viewport Height) to prevent content hiding
 * behind iOS Safari's browser toolbar.
 */
export function HeroSection() {
  return (
    <header className='relative flex min-h-dvh items-center overflow-hidden pt-20'>
      <div className='absolute inset-0 z-0'>
        <HeroCarousel images={HERO.backgroundImages} />
        <div className='absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313cc] to-transparent' />
        <div className='absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#ffbf00]/10 blur-[120px]' />
      </div>

      <div className='relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-6 md:px-20 lg:grid-cols-2'>
        <div className='flex flex-col justify-center space-y-8'>
          {/* Badges: wrap on mobile, single row on desktop */}
          <div className='flex flex-wrap gap-2 md:flex-nowrap md:gap-3'>
            {HERO.pills.map((pill, index) => (
              <span
                key={pill.label}
                className={`inline-flex items-center border px-3 py-1 text-[0.65rem] font-medium tracking-widest uppercase md:px-4 md:text-xs ${
                  index === 0 || pill.accent
                    ? 'border-[#5045324d] text-[#9accf3]'
                    : 'border-[#5045324d] text-[#e5e2e199]'
                }`}
              >
                {pill.label}
              </span>
            ))}
          </div>

          <h1 className='font-display text-5xl font-bold leading-tight tracking-tighter text-white md:text-7xl'>
            {HERO.h1Prefix}
            <br />
            <span className='text-[#ffbf00]'>{HERO.h1Highlight}</span>
            <br />
            {HERO.h1Suffix}
          </h1>

          <p className='max-w-xl text-lg leading-relaxed text-[#e5e2e1cc] md:text-xl'>
            {HERO.subtitle}
          </p>

          <p className='max-w-xl font-label text-sm uppercase tracking-[0.18em] text-[#e5e2e180]'>
            {HERO.trustLine}
          </p>

          <div className='flex flex-col gap-6 pt-4 sm:flex-row'>
            <a
              href={HERO.ctaHref}
              className='bg-[#ffbf00] px-10 py-5 text-center font-bold text-[#402d00] transition-all hover:shadow-[0_0_30px_rgba(255,191,0,0.3)]'
            >
              {HERO.ctaLabel}
            </a>
            <a
              href={HERO.secondaryCtaHref}
              className='inline-flex items-center justify-center gap-2 text-center font-display font-bold text-[#e5e2e1] transition-colors hover:text-[#FFD79B]'
            >
              <span aria-hidden='true'>→</span>
              {HERO.secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue – offset by safe-area to stay above iOS home indicator */}
      <a
        href='#o-projektu'
        aria-label='Posunout na další sekci'
        className='group absolute left-1/2 z-10 -translate-x-1/2 text-[#e5e2e180] transition-colors hover:text-[#9accf3]'
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <span className='material-symbols-outlined !text-[30px] motion-safe:animate-bounce'>
          keyboard_arrow_down
        </span>
      </a>
    </header>
  )
}
