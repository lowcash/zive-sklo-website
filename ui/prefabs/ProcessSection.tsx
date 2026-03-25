import { Container, Section } from '@/ui/core'

import { PROCESS } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { ProcessSteps } from './ProcessSteps'

/**
 * ProcessSection - RSC (Server Component)
 * 4-step process section with client leaf for scroll-triggered highlighting.
 */
export function ProcessSection() {
  return (
    <Section id="jak-to-funguje" spacing="xl">
      <Container>
        <h2 className="font-display mb-14 text-center text-4xl font-bold tracking-tight md:mb-24">
          {applyCzechNbsp(PROCESS.heading)}
        </h2>

        <ProcessSteps steps={PROCESS.steps} />

        <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-[#e5e2e180] md:text-base">
          {applyCzechNbsp(PROCESS.trustLine)}
        </p>
      </Container>
    </Section>
  )
}
