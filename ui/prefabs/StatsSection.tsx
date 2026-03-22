import { Container } from '@/ui/core'

import { STATS } from '@/lib/content'

import { StatCounter } from './StatCounter'

/**
 * StatsSection - RSC (Server Component)
 * Stats with count-up animation (client leaf)
 */
export function StatsSection() {
  return (
    <section className='border-y border-[#5045321a] bg-[#131313] py-24'>
      <Container>
        <div className='grid grid-cols-1 gap-12 text-center md:grid-cols-3'>
          {STATS.items.map((stat) => (
            <div key={stat.label}>
              <StatCounter value={stat.value} />
              <p className='mx-auto mt-4 max-w-xs text-sm leading-relaxed text-[#e5e2e1]'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
