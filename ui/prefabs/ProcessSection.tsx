import { PROCESS } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section, SectionHead } from '@/ui/core'

import { ProcessSteps } from './ProcessSteps'

/**
 * ProcessSection - RSC (Server Component)
 * 4-step process with a client leaf for scroll-triggered highlighting on mobile.
 */
export function ProcessSection() {
  return (
    <Section id='jak-to-funguje' tone='light'>
      <Container>
        <SectionHead eyebrow={PROCESS.eyebrow} heading={PROCESS.heading} className='mb-12 md:mb-20' />

        <ProcessSteps steps={PROCESS.steps} />

        <p className='text-fg-2 mt-6 max-w-[56ch] md:mt-10'>{applyCzechNbsp(PROCESS.trustLine)}</p>
      </Container>
    </Section>
  )
}
