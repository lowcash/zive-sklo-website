import { PROCESS } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

import { ProcessSteps } from './ProcessSteps'

/**
 * ProcessSection - RSC (Server Component)
 * 4-step process section with client leaf for scroll-triggered highlighting.
 */
export function ProcessSection() {
  return (
    <Section id='jak-to-funguje' spacing='xl' surface='subtle' temp={0.38}>
      <Container>
        <h2 className='reveal mb-14 md:mb-20'>{applyCzechNbsp(PROCESS.heading)}</h2>

        <ProcessSteps steps={PROCESS.steps} />

        <p className='text-fg-3 text-step--1 mt-12 max-w-[56ch] font-semibold tracking-[0.12em] uppercase'>
          {applyCzechNbsp(PROCESS.trustLine)}
        </p>
      </Container>
    </Section>
  )
}
