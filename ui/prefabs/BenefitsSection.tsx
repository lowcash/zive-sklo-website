import { Container, Section } from '@/ui/core'

import { BENEFITS } from '@/lib/content'

/**
 * BenefitsSection - RSC (Server Component)
 * Benefits grid with download link
 */
export function BenefitsSection() {
  return (
    <Section id='benefity' spacing='xl'>
      <Container>
        <div className='grid grid-cols-1 gap-16 md:grid-cols-4'>
          {BENEFITS.items.map((benefit) => (
            <div key={benefit.title} className='space-y-4'>
              <h3 className='font-display text-xl font-bold'>
                {benefit.title}
              </h3>
              <p className='text-sm leading-relaxed text-[#e5e2e180]'>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
