import { AUDIENCE } from '@/lib/content'
import { Container, Section } from '@/ui/core'

/**
 * AudienceSection - RSC (Server Component)
 * Audience segment cards
 */
export function AudienceSection() {
  return (
    <Section id='pro-koho' spacing='xl'>
      <Container>
        <h2 className='mb-20 font-display text-4xl font-bold tracking-tight'>
          {AUDIENCE.heading}
        </h2>

        <div className='grid grid-cols-1 gap-px bg-[#50453226] md:grid-cols-2'>
          {AUDIENCE.segments.map((segment) => (
            <div key={segment.heading} className='flex gap-8 bg-[#1c1b1b] p-12'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center bg-[#131313]'>
                <span className='material-symbols-outlined !text-[24px] text-[#9accf3]'>
                  {segment.icon}
                </span>
              </div>
              <div>
                <h4 className='mb-4 text-xl font-bold'>{segment.heading}</h4>
                <p className='text-[#e5e2e199]'>{segment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
