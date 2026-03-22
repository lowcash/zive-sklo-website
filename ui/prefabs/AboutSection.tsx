import Image from 'next/image'

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
          <div className='group relative'>
            <div className='absolute -inset-4 translate-x-4 translate-y-4 border border-[#50453233] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2' />
            <Image
              src='https://lh3.googleusercontent.com/aida-public/AB6AXuBRtfyewayp5M6M43DiS5g0q6xbvXAEOjtea7Q_v2iU1Ann1byelshZtSHVbQjkEdlKQsl8fo0JxRn_JMCqgckOORyWfvzy-szfkJm12MuU5MNOgl1F2I72NqgmsCpzKYezS1Bq4xZf19V85c2IeUPJ4xx8mHnWqndN3n7EAB0QJ0-D0NOlKMs_cxz0LLFKbsjbJWGV_H8GI8LWbcYYSnwle7eaGyopUs03F-yQcaivd507oB3068z-DzzdtS7i3sH8zurqKDRWAS0'
              alt='Craftsman working with molten glass'
              width={900}
              height={1100}
              className='relative z-10 aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0'
              quality={85}
            />
          </div>

          <div className='space-y-10'>
            <h2 className='font-display text-4xl font-bold tracking-tight md:text-5xl'>
              Když se oheň <br />
              stane uměním
            </h2>

            <div className='space-y-6 text-lg leading-relaxed text-[#e5e2e1b3]'>
              <p>
                Živé Sklo není jen ukázka řemesla. Je to performativní zážitek,
                který vnáší do firemních eventů prvek autenticity a luxusu.
                Naším cílem je ukázat krásu sklářství způsobem, který rezonuje s
                moderními standardy B2B akcí.
              </p>
              <p>
                S naší mobilní pecí jsme schopni operovat v interiéru i
                exteriéru, přičemž klademe maximální důraz na bezpečnost a
                čistotu provedení.
              </p>
            </div>

            <div className='pt-6'>
              <a
                href='#'
                className='border-b border-[#9accf34d] pb-1 font-display font-bold text-[#9accf3] transition-all hover:border-[#9accf3]'
              >
                Naše filozofie řemesla
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
    </div>
  )
}
