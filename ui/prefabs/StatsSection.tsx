import { Container } from '@/ui/core'

import { STATS } from '@/lib/content'

/**
 * StatsSection - RSC (Server Component)
 * Stats with count-up animation (client leaf)
 */
export function StatsSection() {
  return (
    <section className='border-y border-[#5045321a] bg-[#131313] py-24'>
      <Container>
        <div className='grid grid-cols-2 gap-12 text-center md:grid-cols-4'>
          {STATS.items.map((stat) => (
            <div key={stat.label}>
              <p className='mb-2 font-display text-5xl font-bold text-[#ffbf00]'>
                {stat.value}
              </p>
              <p className='text-xs uppercase tracking-widest text-[#e5e2e180]'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
