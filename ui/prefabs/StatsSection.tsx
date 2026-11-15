import { STATS } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { StatCounter } from './StatCounter'

/**
 * StatsSection - RSC (Server Component)
 * Stats with real values in the HTML (no hydration, no count-up).
 */
export function StatsSection() {
  return (
    <section data-temp='0.74' className='bg-scrim py-(--section-y)'>
      <div className='mx-auto max-w-360 px-(--gutter)'>
        <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-8 xl:gap-12'>
          {STATS.items.map((stat, index) => (
            <div key={stat.label} className='reveal border-line-strong min-w-0 border-t pt-4'>
              <StatCounter numericValue={stat.numericValue} suffix={stat.suffix} tone={index === 2 ? 'ice' : 'amber'} />
              <p className='text-fg-2 mt-3 max-w-[28ch]'>{applyCzechNbsp(stat.label)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
