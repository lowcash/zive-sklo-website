import { STATS } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { StatCounter } from './StatCounter'

/**
 * StatsSection - RSC (Server Component)
 * Three key figures with real values in the HTML (no hydration, no count-up).
 */
export function StatsSection() {
  return (
    <div className='border-line-strong mt-16 grid grid-cols-1 gap-10 border-t pt-10 sm:grid-cols-3 sm:gap-8 md:mt-24'>
      {STATS.items.map((stat) => (
        <div key={stat.label} className='min-w-0'>
          <StatCounter numericValue={stat.numericValue} suffix={stat.suffix} />
          <p className='text-fg-2 text-step--1 mt-3 max-w-[22ch]'>{applyCzechNbsp(stat.label)}</p>
        </div>
      ))}
    </div>
  )
}
