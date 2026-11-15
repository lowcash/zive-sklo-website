import Image from 'next/image'

import { ABOUT } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

/**
 * AboutSection - RSC (Server Component)
 * About section with text and a image
 */
export function AboutSection() {
  return (
    <div className='overflow-hidden'>
      <Section id='o-projektu' spacing='xl' surface='subtle'>
        <Container>
          <div className='grid grid-cols-1 items-center gap-12 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:gap-24'>
            <figure className='reveal relative mx-auto w-full max-w-lg min-[900px]:max-w-none'>
              <Image
                src={ABOUT.image}
                alt='Sklář tvarující skleněnou ozdobu v dílně'
                width={900}
                height={1100}
                className='aspect-4/5 w-full object-cover'
                quality={85}
                sizes='(min-width: 900px) 50vw, (min-width: 768px) 42rem, 100vw'
              />
            </figure>

            <div className='reveal space-y-8'>
              <h2 className='max-w-[22ch]'>{applyCzechNbsp(ABOUT.heading)}</h2>

              <div className='text-fg-2 max-w-[62ch]'>
                <p>{applyCzechNbsp(ABOUT.text)}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
