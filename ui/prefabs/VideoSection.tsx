import { VIDEO } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

import { VideoPlayer } from './VideoPlayer'

/**
 * VideoSection - RSC (Server Component)
 * Event video: poster first, playback only after a click.
 */
export function VideoSection() {
  return (
    <Section id='video' spacing='xl' temp={0.25}>
      <Container>
        <div className='reveal mx-auto mb-10 max-w-3xl space-y-4 text-center md:mb-14'>
          <h2>{applyCzechNbsp(VIDEO.heading)}</h2>
          <p className='text-step-1 text-fg-2 leading-[1.55]'>{applyCzechNbsp(VIDEO.subtitle)}</p>
        </div>

        <div className='reveal mx-auto max-w-5xl'>
          <VideoPlayer src={VIDEO.src} poster={VIDEO.poster} ariaLabel={VIDEO.ariaLabel} />
        </div>
      </Container>
    </Section>
  )
}
