import { Container, Section } from '@/ui/core'

import { BENEFITS } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { DownloadLink } from './DownloadLink'

/**
 * BenefitsSection - RSC (Server Component)
 * Benefits grid with download link
 */
export function BenefitsSection() {
  return (
    <Section id='benefity' spacing='xl'>
      <Container>
        <div className='mb-20 max-w-3xl'>
          <h2 className='font-display text-4xl font-bold tracking-tight'>
            {applyCzechNbsp(BENEFITS.heading)}
          </h2>
        </div>

        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 xl:grid-cols-4'>
          {BENEFITS.items.map((benefit) => (
            <div key={benefit.title} className='space-y-4'>
              <span className='material-symbols-outlined !text-[28px] text-[#9accf3]'>
                {benefit.icon}
              </span>
              <h3 className='font-display text-xl font-bold'>
                {applyCzechNbsp(benefit.title)}
              </h3>
              <p className='text-sm leading-relaxed text-[#e5e2e180]'>
                {applyCzechNbsp(benefit.description)}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-16'>
          <DownloadLink
            href={BENEFITS.downloadHref}
            label={applyCzechNbsp(BENEFITS.downloadLabel)}
          />
        </div>
      </Container>
    </Section>
  )
}
