import { Container } from '@/ui/core'

import { STATS } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { StatCounter } from './StatCounter'

/**
 * StatsSection - RSC (Server Component)
 * Stats with count-up animation (client leaf)
 */
export function StatsSection() {
  return (
    <section className="border-y border-[#5045321a] bg-[#131313] py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-10">
          {STATS.items.map((stat) => (
            <div key={stat.label} className="relative min-w-0 px-1">
              <StatCounter numericValue={stat.numericValue} suffix={stat.suffix} />
              <p className="relative z-10 mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-[#e5e2e1] md:max-w-[13rem] lg:mt-4 lg:max-w-xs">
                {applyCzechNbsp(stat.label)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
