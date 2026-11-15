import Image from 'next/image'

import { ABOUT } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

/**
 * AboutSection - RSC (Server Component)
 * Story on the left, one portrait photo on the right, three proof facts taken from the copy.
 */
export function AboutSection() {
  return (
    <Section id='o-projektu' tone='light'>
      <Container>
        <div className='grid-12 items-start gap-y-14'>
          <div className='reveal md:col-span-7'>
            <p className='eyebrow mb-6'>{applyCzechNbsp(ABOUT.eyebrow)}</p>
            <h2 className='max-w-[20ch]'>{applyCzechNbsp(ABOUT.heading)}</h2>
            <p className='text-fg-2 mt-8 max-w-[58ch] md:mt-10'>{applyCzechNbsp(ABOUT.text)}</p>
          </div>

          <figure className='reveal md:col-span-5 md:col-start-8'>
            <div className='relative aspect-4/5 overflow-hidden'>
              <Image
                src={ABOUT.image}
                alt={ABOUT.imageAlt}
                fill
                className='object-cover'
                quality={80}
                sizes='(min-width: 768px) 38vw, 100vw'
              />
            </div>
          </figure>
        </div>

        <dl className='border-line-strong mt-16 grid grid-cols-1 border-t md:mt-24 md:grid-cols-3'>
          {ABOUT.facts.map((fact, index) => (
            <div
              key={fact.value}
              className={`border-line flex flex-col gap-2 py-6 md:py-8 ${index > 0 ? 'border-t md:border-t-0 md:border-l md:pl-8' : ''} ${index < 2 ? 'md:pr-8' : ''}`}
            >
              <dt className='font-display text-step-4 leading-none tracking-[-0.02em]'>{applyCzechNbsp(fact.value)}</dt>
              <dd className='text-fg-2 text-step--1 max-w-[30ch]'>{applyCzechNbsp(fact.label)}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
