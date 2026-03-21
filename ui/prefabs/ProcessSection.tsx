import { Container, Grid, Heading, Section, Text } from '@/ui/core'

import { PROCESS } from '@/lib/content'

/**
 * ProcessSection - RSC (Server Component)
 * 4-step process section
 */
/**
 * ProcessSection - RSC (Server Component)
 * 4-step process section
 */
export function ProcessSection() {
  return (
    <Section id='jak-to-funguje' spacing='xl' surface='subtle'>
      <Container>
        {/* Heading */}
        <div className='mb-16'>
          <Heading level={2} size='4xl' align='center'>
            {PROCESS.heading}
          </Heading>
        </div>

        {/* Steps */}
        <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap='lg'>
          {PROCESS.steps.map((step) => (
            <div key={step.number} className='text-center space-y-4'>
              {/* Number */}
              <div className='text-6xl font-display font-bold text-accent-amber'>
                {step.number}
              </div>

              {/* Title */}
              <Heading level={3} size='xl'>
                {step.title}
              </Heading>

              {/* Description */}
              <Text size='base' color='secondary'>
                {step.description}
              </Text>
            </div>
          ))}
        </Grid>

        {/* Trust Line */}
        <div className='mt-12'>
          <Text size='sm' color='secondary' align='center'>
            {PROCESS.trustLine}
          </Text>
        </div>
      </Container>
    </Section>
  )
}
