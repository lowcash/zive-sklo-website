import { BENEFITS } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

import { DownloadLink } from './DownloadLink'

/**
 * BenefitsSection - RSC (Server Component)
 * Benefits grid with download link
 */
export function BenefitsSection() {
  return (
    <Section id='benefity' spacing='xl'>
      <Container>
        <div className='reveal mb-16 max-w-3xl'>
          <h2>{applyCzechNbsp(BENEFITS.heading)}</h2>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4'>
          {BENEFITS.items.map((benefit) => (
            <div key={benefit.title} className='reveal border-line-strong space-y-3 border-t pt-4'>
              <div className='border-line flex h-12 w-12 items-center justify-center border bg-transparent'>
                <span className='material-symbols-outlined text-fg-2 text-[24px]!' aria-hidden='true'>
                  {benefit.icon}
                </span>
              </div>
              <h3 className='text-step-1'>{applyCzechNbsp(benefit.title)}</h3>
              <p className='text-fg-2 text-step--1 leading-[1.65]'>{applyCzechNbsp(benefit.description)}</p>
            </div>
          ))}
        </div>

        <div className='mt-16'>
          <DownloadLink href={BENEFITS.downloadHref} label={applyCzechNbsp(BENEFITS.downloadLabel)} />
        </div>
      </Container>
    </Section>
  )
}
