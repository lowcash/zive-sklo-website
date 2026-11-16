import Image from 'next/image'

import { HERO } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

/**
 * HeroSection - RSC (Server Component)
 * Full-bleed photograph, left-anchored headline on the 12-column grid, one primary action.
 * The h1 is the LCP element: no animation, opacity or transform on it.
 */
export function HeroSection() {
  return (
    <header className='surface-ink relative isolate flex min-h-svh flex-col justify-end overflow-clip md:min-h-dvh'>
      <div className='absolute inset-0 -z-10' aria-hidden='true'>
        <Image
          src={HERO.image}
          alt=''
          fill
          sizes='100vw'
          className='object-cover object-[66%_50%] md:object-center'
          priority
          quality={80}
        />
        <div className='absolute inset-0 bg-[linear-gradient(to_top,rgb(20_17_14/0.94)_0%,rgb(20_17_14/0.7)_38%,rgb(20_17_14/0.25)_75%,rgb(20_17_14/0.5)_100%)] md:bg-[linear-gradient(to_right,rgb(20_17_14/0.88)_0%,rgb(20_17_14/0.55)_48%,rgb(20_17_14/0.05)_80%),linear-gradient(to_top,rgb(20_17_14/0.85)_0%,transparent_45%)]' />
      </div>

      <div className='wrap pt-32 pb-10 md:pb-14'>
        <div className='grid-12'>
          <div className='md:col-span-9 xl:col-span-8'>
            <h1 className='text-step-display leading-[0.98] tracking-[-0.03em]'>
              {applyCzechNbsp(HERO.h1Prefix)}{' '}
              <em className='text-ember font-normal italic'>{applyCzechNbsp(HERO.h1Highlight)}</em>{' '}
              {applyCzechNbsp(HERO.h1Suffix)}
            </h1>

            <p className='fade-in lead mt-7 max-w-[46ch]'>{applyCzechNbsp(HERO.subtitle)}</p>

            <div className='fade-in-late mt-9 flex flex-wrap items-center gap-x-8 gap-y-5'>
              <a href={HERO.ctaHref} className='ui-cta-primary'>
                {applyCzechNbsp(HERO.ctaLabel)}
              </a>
              <a href={HERO.secondaryCtaHref} className='link-arrow'>
                {applyCzechNbsp(HERO.secondaryCtaLabel)}
                <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
        </div>

        <ul className='border-line mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t pt-5 md:mt-16 md:gap-x-12'>
          {HERO.pills.map((pill) => (
            <li key={pill.label} className='text-fg-2 text-step--1 font-semibold tracking-[0.12em] uppercase'>
              <span>{applyCzechNbsp(pill.label)}</span>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
