import Image from 'next/image'

import { Container, Section } from '@/ui/core'

import { ABOUT } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

/**
 * AboutSection - RSC (Server Component)
 * About section with text and image
 */
export function AboutSection() {
  return (
    <div className="overflow-hidden">
      <Section id="o-projektu" spacing="xl" surface="subtle">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="relative mx-auto w-full max-w-lg md:max-w-xl lg:max-w-none">
              <Image
                src={ABOUT.image}
                alt="Sklář tvarující skleněnou ozdobu v dílně"
                width={900}
                height={1100}
                className="ui-hover-media relative z-10 aspect-4/5 w-full object-cover grayscale hover:grayscale-0"
                quality={85}
              />
            </div>

            <div className="space-y-10">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                {applyCzechNbsp(ABOUT.heading)}
              </h2>

              <div className="max-w-2xl text-lg leading-relaxed text-[#e5e2e1b3]">
                <p>{applyCzechNbsp(ABOUT.text)}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
