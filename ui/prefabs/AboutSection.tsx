import Image from 'next/image'

import { ABOUT } from '@/lib/content'
import { Container, Section } from '@/ui/core'

/**
 * AboutSection - RSC (Server Component)
 * About section with text and image
 */
export function AboutSection() {
  return (
    <div className='overflow-hidden'>
      <Section id='o-projektu' spacing='xl' surface='subtle'>
        <Container>
          <div className='grid grid-cols-1 items-center gap-20 lg:grid-cols-2'>
            <div className='relative'>
              <div className='absolute -inset-4 translate-x-4 translate-y-4 border border-[#50453233]' />
              <Image
                src={ABOUT.image}
                alt='Živé Sklo v akci'
                width={900}
                height={1100}
                className='relative z-10 aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0'
                quality={85}
                unoptimized
              />
            </div>

            <div className='space-y-10'>
              <h2 className='font-display text-4xl font-bold tracking-tight md:text-5xl'>
                {ABOUT.heading}
              </h2>

              <div className='max-w-2xl text-lg leading-relaxed text-[#e5e2e1b3]'>
                <p>{ABOUT.text}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
