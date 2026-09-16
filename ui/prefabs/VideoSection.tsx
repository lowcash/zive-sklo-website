import { VIDEO } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

import { AutoplayVideo } from './AutoplayVideo'

/**
 * VideoSection - RSC (Server Component)
 * Ambient event video — muted looping showcase without control chrome.
 */
export function VideoSection() {
  return (
    <Section id='video' spacing='xl'>
      <Container>
        <div className='mx-auto mb-10 max-w-3xl space-y-4 text-center md:mb-14'>
          <h2 className='font-display text-4xl font-bold tracking-tight text-balance md:text-5xl'>
            {applyCzechNbsp(VIDEO.heading)}
          </h2>
          <p className='text-lg leading-relaxed text-pretty text-[#e5e2e199]'>{applyCzechNbsp(VIDEO.subtitle)}</p>
        </div>

        <div className='mx-auto max-w-5xl overflow-hidden border border-[#50453226] bg-[#131313]'>
          <AutoplayVideo src={VIDEO.src} poster={VIDEO.poster} ariaLabel={VIDEO.ariaLabel} />
        </div>
      </Container>
    </Section>
  )
}
