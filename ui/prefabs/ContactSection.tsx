import { Container, Section } from '@/ui/core'

import { CONTACT } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { ContactForm } from './ContactForm'

/**
 * ContactSection - RSC (Server Component)
 * Contact form section (form validation as client leaf)
 */
export function ContactSection() {
  return (
    <Section id='kontakt' spacing='xl' surface='subtle'>
      <Container>
        <div className='grid grid-cols-1 gap-12 md:gap-20 lg:grid-cols-5'>
          <div className='space-y-10 md:space-y-12 lg:col-span-2'>
            <div>
              <h2 className='mb-4 font-display text-5xl font-bold tracking-tight md:mb-6'>
                {applyCzechNbsp(CONTACT.heading)}
              </h2>
              <p className='text-lg leading-relaxed text-[#e5e2e199]'>
                {applyCzechNbsp(CONTACT.subtitle)}
              </p>
            </div>

            <div className='space-y-8'>
              {CONTACT.details.map((detail) => (
                <a
                  key={detail.label}
                  href={detail.href}
                  className='flex items-center gap-6 transition-colors hover:text-[#FFD79B]'
                >
                  <span className='material-symbols-outlined !text-[24px] text-[#ffbf00]'>
                    {detail.icon}
                  </span>
                  <div>
                    <p className='font-label text-xs uppercase text-[#e5e2e166]'>
                      {applyCzechNbsp(detail.label)}
                    </p>
                    <p className='font-bold'>{applyCzechNbsp(detail.value)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className='border border-[#50453226] bg-[#131313] p-8 md:p-12 lg:col-span-3'>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  )
}
