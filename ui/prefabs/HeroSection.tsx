import Image from 'next/image'

import { HERO } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { HeroScrollCue } from './HeroScrollCue'

/**
 * HeroSection - RSC (Server Component)
 * Full-height hero: one static photo, the decorative glass orb and the copy.
 * The h1 is the LCP element: no animation, opacity or transform on it.
 * Uses min-h-dvh (Dynamic Viewport Height) to prevent content hiding
 * behind iOS Safari's browser toolbar.
 */
export function HeroSection() {
  const [heroImage] = HERO.backgroundImages

  return (
    <header
      data-temp='0'
      className='relative flex min-h-svh items-center overflow-clip pt-28 pb-24 md:min-h-dvh md:pt-28 md:pb-16'
    >
      <div className='absolute inset-0 z-0' aria-hidden='true'>
        <Image
          src={heroImage}
          alt=''
          fill
          sizes='100vw'
          className='mask-[linear-gradient(to_right,transparent,black_70%)] object-cover opacity-30'
          priority
          quality={75}
        />
      </div>

      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-[6%] -right-[18vw] z-0 aspect-square w-[min(78vw,34rem)] opacity-55 md:top-1/2 md:right-[5vw] md:w-[min(34vw,30rem)] md:-translate-y-1/2 md:opacity-100'
      >
        <div className='orb motion-ok:animate-float' />
      </div>

      <div className='relative z-10 mx-auto w-full max-w-360 px-(--gutter)'>
        <div className='flex max-w-184 flex-col justify-center gap-6'>
          <div className='flex flex-wrap gap-2'>
            {HERO.pills.map((pill, index) => (
              <span
                key={pill.label}
                className={`text-step--1 inline-flex items-center rounded-full border px-3.5 py-1 leading-snug font-semibold tracking-[0.1em] uppercase ${
                  index === 0 || pill.accent ? 'border-ice text-ice' : 'border-line-strong text-fg-2'
                }`}
              >
                {applyCzechNbsp(pill.label)}
              </span>
            ))}
          </div>

          <h1 className='text-step-display leading-[1.04] font-medium tracking-[-0.025em] [font-stretch:92%]'>
            {applyCzechNbsp(HERO.h1Prefix)} <br />
            <em className='text-amber font-normal italic'>{applyCzechNbsp(HERO.h1Highlight)}</em> <br />
            {applyCzechNbsp(HERO.h1Suffix)}
          </h1>

          <p className='text-step-1 text-fg-2 max-w-160 leading-[1.55]'>{applyCzechNbsp(HERO.subtitle)}</p>

          <p className='font-label text-step--1 text-fg-3 leading-normal font-semibold tracking-[0.16em] uppercase'>
            {applyCzechNbsp(HERO.trustLine)}
          </p>

          <div className='flex flex-wrap items-center gap-x-6 gap-y-4 pt-2'>
            <a
              href={HERO.ctaHref}
              className='ui-cta-primary inline-flex items-center justify-center px-8 py-4 text-center font-bold'
            >
              {applyCzechNbsp(HERO.ctaLabel)}
            </a>
            <a
              href={HERO.secondaryCtaHref}
              className='link-arrow font-display text-fg inline-flex items-center justify-center gap-2 py-3 text-center font-semibold'
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
