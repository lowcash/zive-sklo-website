import { BENEFITS } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section, SectionHead } from '@/ui/core'

import { DownloadLink } from './DownloadLink'

/**
 * BenefitsSection - RSC (Server Component)
 * Four trust points taken from the offer copy, plus the organiser information sheet.
 */
export function BenefitsSection() {
  return (
    <Section id='benefity' tone='ink'>
      <Container>
        <SectionHead eyebrow={BENEFITS.eyebrow} heading={BENEFITS.heading} className='mb-12 md:mb-20' />

        <ul className='grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4'>
          {BENEFITS.items.map((benefit, index) => (
            <li key={benefit.title} className='reveal border-line-strong border-t pt-6'>
              <span
                aria-hidden='true'
                className='font-display text-ember text-step-2 mb-5 block leading-none tabular-nums'
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className='text-step-2'>{applyCzechNbsp(benefit.title)}</h3>
              <p className='text-fg-2 mt-3 max-w-[32ch]'>{applyCzechNbsp(benefit.description)}</p>
            </li>
          ))}
        </ul>

        <div className='mt-14 md:mt-20'>
          <DownloadLink href={BENEFITS.downloadHref} label={applyCzechNbsp(BENEFITS.downloadLabel)} />
        </div>
      </Container>
    </Section>
  )
}
