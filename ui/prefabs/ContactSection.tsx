import Image from 'next/image'

import { CONTACT } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

import { ContactForm } from './ContactForm'

/**
 * ContactSection - RSC (Server Component)
 * Contact form section (form validation as client leaf)
 *
 * Portrait sits in a fixed-width grid column whose height comes only from the
 * contact list (no in-flow image sizing), so the figure stays visible, never
 * taller than the details, and close to the text. Form on the right from lg.
 */
export function ContactSection() {
  return (
    <Section id='kontakt' spacing='xl' surface='subtle'>
      <Container>
        <div className='space-y-10 md:space-y-12'>
          <div className='max-w-3xl'>
            <h2 className='font-display mb-4 text-5xl font-bold tracking-tight md:mb-6'>
              {applyCzechNbsp(CONTACT.heading)}
            </h2>
            <p className='text-lg leading-relaxed text-[#e5e2e199]'>{applyCzechNbsp(CONTACT.subtitle)}</p>
          </div>

          <div className='flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16 xl:gap-24'>
            <div className='grid w-fit max-w-full shrink-0 grid-cols-[auto_10rem] items-stretch gap-x-5 sm:grid-cols-[auto_11rem] sm:gap-x-6 md:grid-cols-[auto_12rem] md:gap-x-8 lg:grid-cols-[auto_11rem] xl:grid-cols-[auto_12rem]'>
              <div className='relative z-10 min-w-0 space-y-6 sm:space-y-8'>
                {CONTACT.details.map((detail) => {
                  const nowrap = 'nowrap' in detail && detail.nowrap
                  const secondary = 'secondary' in detail ? detail.secondary : undefined
                  const content = (
                    <>
                      <span className='flex h-11 w-11 shrink-0 items-center justify-center bg-[#131313] sm:h-12 sm:w-12'>
                        <span className='material-symbols-outlined text-[22px]! text-[#ffbf00] sm:text-[24px]!'>
                          {detail.icon}
                        </span>
                      </span>
                      <div className='min-w-0'>
                        <p
                          className={`font-label text-xs text-[#e5e2e1b3] uppercase ${nowrap ? 'whitespace-nowrap' : 'break-normal'}`}
                        >
                          {applyCzechNbsp(detail.label)}
                        </p>
                        <p className={`text-sm font-bold break-normal sm:text-base ${nowrap ? 'whitespace-nowrap' : ''}`}>
                          {applyCzechNbsp(detail.value)}
                        </p>
                        {secondary ? (
                          <p className='text-sm font-bold break-normal sm:text-base'>{applyCzechNbsp(secondary)}</p>
                        ) : null}
                      </div>
                    </>
                  )

                  if ('href' in detail && detail.href) {
                    const isExternal = 'external' in detail && detail.external

                    return (
                      <a
                        key={detail.label}
                        href={detail.href}
                        className='flex items-center gap-3 transition-colors hover:text-[#FFD79B] sm:gap-5'
                        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {content}
                      </a>
                    )
                  }

                  return (
                    <div key={detail.label} className='flex items-center gap-3 sm:gap-5'>
                      {content}
                    </div>
                  )
                })}
              </div>

              <div className='relative z-0 min-h-0'>
                <Image
                  src={CONTACT.portrait.src}
                  alt={CONTACT.portrait.alt}
                  fill
                  className='object-contain object-bottom'
                  style={{
                    maskImage: 'linear-gradient(to bottom, #000 72%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 72%, transparent 100%)',
                  }}
                  quality={90}
                  sizes='(min-width: 1280px) 12rem, (min-width: 1024px) 11rem, (min-width: 768px) 12rem, (min-width: 640px) 11rem, 10rem'
                />
              </div>
            </div>

            <div className='@container w-full min-w-0 flex-1 border border-[#50453226] bg-[#131313] p-6 md:p-8 lg:p-8'>
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
