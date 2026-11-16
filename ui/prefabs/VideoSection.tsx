import { VIDEO } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

import { StatsSection } from './StatsSection'
import { VideoPlayer } from './VideoPlayer'

/**
 * VideoSection - RSC (Server Component)
 * Vertical event reel (it was shot vertically) next to the headline and the three key figures.
 * Poster first, playback only after a click.
 */
export function VideoSection() {
  return (
    <Section id='video' tone='ink'>
      <Container>
        <div className='grid-12 items-center gap-y-12'>
          <div className='reveal md:col-span-6 md:col-start-1'>
            <p className='eyebrow mb-6'>{applyCzechNbsp(VIDEO.eyebrow)}</p>
            <h2 className='max-w-[14ch]'>{applyCzechNbsp(VIDEO.heading)}</h2>
            <p className='lead mt-6 max-w-[40ch]'>{applyCzechNbsp(VIDEO.subtitle)}</p>
          </div>

          <div className='reveal mx-auto w-full max-w-[22rem] md:col-span-5 md:col-start-8 md:max-w-none'>
            <VideoPlayer src={VIDEO.src} poster={VIDEO.poster} ariaLabel={VIDEO.ariaLabel} />
          </div>
        </div>

        <StatsSection />
      </Container>
    </Section>
  )
}
