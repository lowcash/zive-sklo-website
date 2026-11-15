import { AUDIENCE } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

/**
 * AudienceSection - RSC (Server Component)
 * Audience segment cards
 */
export function AudienceSection() {
  return (
    <Section id='pro-koho' spacing='xl' temp={0.62}>
      <Container>
        <h2 className='reveal mb-12 max-w-3xl md:mb-20'>{applyCzechNbsp(AUDIENCE.heading)}</h2>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {AUDIENCE.segments.map((segment) => (
            <a
              key={segment.heading}
              href={segment.ctaHref}
              className='glass reveal group flex h-full flex-col gap-5 p-6 md:p-8 lg:gap-6 lg:p-10'
            >
              <div className='border-line flex h-12 w-12 items-center justify-center border bg-white/5'>
                <span className='material-symbols-outlined text-ice text-[24px]' aria-hidden='true'>
                  {segment.icon}
                </span>
              </div>
              <div className='space-y-5'>
                <div className='space-y-2.5'>
                  <p className='eyebrow text-amber!'>{applyCzechNbsp(segment.title)}</p>
                  <h3>{applyCzechNbsp(segment.heading)}</h3>
                </div>
                <p className='text-fg-2'>{applyCzechNbsp(segment.description)}</p>
                <ul className='text-fg-2 text-step--1 space-y-2 leading-[1.55]'>
                  {segment.bullets.map((bullet) => (
                    <li key={bullet} className='relative pl-6'>
                      <span className='bg-ice absolute top-[0.8em] left-0 h-px w-3' aria-hidden='true' />
                      <span>{applyCzechNbsp(bullet)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <span className='link-arrow font-display text-fg group-hover:text-amber-hi mt-auto inline-flex items-center gap-2 font-semibold'>
                <span aria-hidden='true'>→</span>
                {applyCzechNbsp(segment.ctaLabel)}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  )
}
