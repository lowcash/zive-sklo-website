import { AUDIENCE } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section, SectionHead } from '@/ui/core'

import { InquiryLink } from './InquiryLink'

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
            <article
              key={segment.heading}
              className='reveal card-hit card-hit-rule border-line-strong flex flex-col border-t pt-6'
            >
              <p className='eyebrow before:hidden'>{applyCzechNbsp(segment.label)}</p>
              <h3 className='mt-5 lg:min-h-[2.4em]'>{applyCzechNbsp(segment.heading)}</h3>
              <p className='text-fg-2 mt-5'>{applyCzechNbsp(segment.description)}</p>
              <ul className='text-fg-2 mt-8 mb-10 space-y-3'>
                {segment.bullets.map((bullet) => (
                  <li key={bullet} className='border-line relative border-t pt-3 text-[0.95rem] leading-[1.5]'>
                    {applyCzechNbsp(bullet)}
                  </li>
                ))}
              </ul>
              <InquiryLink
                href={segment.ctaHref}
                label={segment.ctaLabel}
                context={segment.heading}
                className='mt-auto self-start'
              />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
