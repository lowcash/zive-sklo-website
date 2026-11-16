import Image from 'next/image'

import { CONTACT } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

import { ContactForm } from './ContactForm'

/**
 * ContactSection - RSC (Server Component)
 * Ink surface: heading, direct contact details and the founder portrait on the left,
 * the inquiry form on a light card on the right.
 */
export function ContactSection() {
  return (
    <Section id='kontakt' tone='ink'>
      <Container>
        <div className='grid-12 gap-y-14'>
          <div className='reveal flex flex-col md:col-span-5'>
            <p className='eyebrow mb-6'>{applyCzechNbsp(CONTACT.eyebrow)}</p>
            <h2 className='max-w-[12ch]'>{applyCzechNbsp(CONTACT.heading)}</h2>
            <p className='lead mt-6 max-w-[34ch]'>{applyCzechNbsp(CONTACT.subtitle)}</p>

            <div className='mt-12 grid flex-1 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 sm:gap-x-6'>
              <div className='space-y-6'>
                {CONTACT.details.map((detail) => {
                  const nowrap = 'nowrap' in detail && detail.nowrap
                  const secondary = 'secondary' in detail ? detail.secondary : undefined
                  const body = (
                    <>
                      <span className='text-fg-3 text-step--1 block font-semibold tracking-[0.12em] uppercase'>
                        {applyCzechNbsp(detail.label)}
                      </span>
                      <span className={`mt-1 block ${nowrap ? 'whitespace-nowrap' : ''}`}>
                        {applyCzechNbsp(detail.value)}
                      </span>
                      {secondary ? <span className='block'>{applyCzechNbsp(secondary)}</span> : null}
                    </>
                  )

                  return (
                    <div key={detail.label} className='border-line border-t pt-4'>
                      {'href' in detail && detail.href ? (
                        <a
                          href={detail.href}
                          className='tap-target hover:text-ember block transition-colors'
                          {...('external' in detail && detail.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {body}
                        </a>
                      ) : (
                        <div>{body}</div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className='relative h-56 w-28 self-end sm:h-72 sm:w-40 lg:h-[26rem] lg:w-56'>
                <Image
                  src={CONTACT.portrait.src}
                  alt={CONTACT.portrait.alt}
                  fill
                  className='object-contain object-bottom'
                  quality={85}
                  sizes='(min-width: 1024px) 14rem, 10rem'
                />
              </div>
            </div>
          </div>

          <div className='surface-light reveal glass @container p-6 md:col-span-7 md:p-10 lg:col-span-6 lg:col-start-7'>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  )
}
