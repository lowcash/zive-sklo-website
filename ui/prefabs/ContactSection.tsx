import { CONTACT } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

import { ContactForm } from './ContactForm'

/**
 * ContactSection - RSC (Server Component)
 * Contact form section (form validation as client leaf)
 *
 * Contact details on the left; form on the right from lg
 * (1→2 cols via container query).
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
            <div className='min-w-0 space-y-6 sm:space-y-8'>
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
                      <p className='font-label text-xs text-[#e5e2e1b3] uppercase'>{applyCzechNbsp(detail.label)}</p>
                      <p className={`text-sm font-bold sm:text-base ${nowrap ? 'whitespace-nowrap' : 'break-words'}`}>
                        {applyCzechNbsp(detail.value)}
                      </p>
                      {secondary ? (
                        <p className='text-sm font-bold whitespace-nowrap sm:text-base'>
                          {applyCzechNbsp(secondary)}
                        </p>
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

            <div className='@container w-full min-w-0 flex-1 border border-[#50453226] bg-[#131313] p-6 md:p-8 lg:p-8'>
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
