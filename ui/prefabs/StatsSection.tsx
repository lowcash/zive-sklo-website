import { Container, Section, Text } from '@/ui/core'

import { STATS } from '@/lib/content'

import { StatCounter } from './StatCounter'

/**
 * StatsSection - RSC (Server Component)
 * Stats with count-up animation (client leaf)
 */
/**
 * StatsSection - RSC (Server Component)
 * Stats with count-up animation (client leaf)
 */
export function StatsSection() {
  return (
    <Section id='statistiky' spacing='xl'>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {STATS.items.map((stat) => (
            <div key={stat.label} className='text-center space-y-4'>
              {/* Animated Value (client leaf) */}
              <StatCounter value={stat.value} />

              {/* Label */}
              <Text size='base' color='secondary' align='center'>
                {stat.label}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
