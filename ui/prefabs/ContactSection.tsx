import { Container, Section } from '@/ui/core'

import { ContactForm } from './ContactForm'

/**
 * ContactSection - RSC (Server Component)
 * Contact form section (form validation as client leaf)
 */
export function ContactSection() {
  return (
    <Section id='kontakt' spacing='xl' surface='subtle'>
      <Container>
        <div className='grid grid-cols-1 gap-20 lg:grid-cols-5'>
          <div className='space-y-12 lg:col-span-2'>
            <div>
              <h2 className='mb-6 font-display text-5xl font-bold tracking-tight'>
                Pojďme <br />
                společně tvořit
              </h2>
              <p className='text-lg leading-relaxed text-[#e5e2e199]'>
                Máte dotaz nebo chcete rovnou rezervovat termín? Vyplňte
                formulář a my se vám ozveme do 24 hodin s detailní nabídkou.
              </p>
            </div>

            <div className='space-y-8'>
              <div className='flex items-center gap-6'>
                <span className='material-symbols-outlined !text-[24px] text-[#ffbf00]'>
                  mail
                </span>
                <div>
                  <p className='font-label text-xs uppercase text-[#e5e2e166]'>
                    E-mail
                  </p>
                  <p className='font-bold'>akce@zivesklo.cz</p>
                </div>
              </div>

              <div className='flex items-center gap-6'>
                <span className='material-symbols-outlined !text-[24px] text-[#ffbf00]'>
                  phone_iphone
                </span>
                <div>
                  <p className='font-label text-xs uppercase text-[#e5e2e166]'>
                    Telefon
                  </p>
                  <p className='font-bold'>+420 777 123 456</p>
                </div>
              </div>
            </div>
          </div>

          <div className='border border-[#50453226] bg-[#131313] p-12 lg:col-span-3'>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  )
}
