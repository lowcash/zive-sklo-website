import { AUDIENCE } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section, SectionHead } from '@/ui/core'

/**
 * AudienceSection - RSC (Server Component)
 * Three audience segments as ruled columns, each ending in the same inquiry action.
 */
export function AudienceSection() {
  return (
    <Section id='pro-koho' tone='ink'>
      <Container>
        <SectionHead eyebrow={AUDIENCE.eyebrow} heading={AUDIENCE.heading} className='mb-12 md:mb-20' />

        <div className='grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-3'>
          {AUDIENCE.segments.map((segment) => (
            <article key={segment.heading} className='reveal border-line-strong flex flex-col border-t pt-6'>
              <p className='eyebrow before:hidden'>{applyCzechNbsp(segment.label)}</p>
              <h3 className='mt-5 lg:min-h-[2.4em]'>{applyCzechNbsp(segment.heading)}</h3>
              <p className='text-fg-2 mt-5'>{applyCzechNbsp(segment.description)}</p>
              <ul className='text-fg-2 mt-8 space-y-3'>
                {segment.bullets.map((bullet) => (
                  <li key={bullet} className='border-line relative border-t pt-3 text-[0.95rem] leading-[1.5]'>
                    {applyCzechNbsp(bullet)}
                  </li>
                ))}
              </ul>
              <a href={segment.ctaHref} className='link-arrow mt-auto self-start pt-10'>
                {applyCzechNbsp(segment.ctaLabel)}
                <span aria-hidden='true'>→</span>
              </a>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
