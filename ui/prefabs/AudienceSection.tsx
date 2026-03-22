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
        <h2 className='mb-20 max-w-3xl font-display text-4xl font-bold tracking-tight'>
          {AUDIENCE.heading}
        </h2>

        <div className='grid grid-cols-1 gap-px bg-[#50453226] lg:grid-cols-3'>
          {AUDIENCE.segments.map((segment) => (
            <a
              key={segment.heading}
              href={segment.ctaHref}
              aria-label={`${segment.heading} – ${segment.ctaLabel}`}
              className='group flex h-full flex-col gap-8 bg-[#1c1b1b] p-12 transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]'
            >
              <div className='flex h-12 w-12 items-center justify-center bg-[#131313]'>
                <span className='material-symbols-outlined !text-[24px] text-[#9accf3]'>
                  {segment.icon}
                </span>
              </div>
              <div className='space-y-6'>
                <div className='space-y-3'>
                  <p className='font-label text-xs uppercase tracking-[0.18em] text-[#9accf3]'>
                    {segment.label}
                  </p>
                  <p className='font-label text-sm uppercase tracking-[0.18em] text-[#e5e2e166]'>
                    {segment.title}
                  </p>
                  <h3 className='font-display text-2xl font-bold tracking-tight'>
                    {segment.heading}
                  </h3>
                </div>
                <p className='leading-relaxed text-[#e5e2e199]'>
                  {segment.description}
                </p>
                <ul className='space-y-3 text-sm leading-relaxed text-[#e5e2e1cc]'>
                  {segment.bullets.map((bullet) => (
                    <li key={bullet} className='flex gap-3'>
                      <span className='mt-1 text-[#ffbf00]' aria-hidden='true'>
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <span className='mt-auto inline-flex items-center gap-2 font-display font-bold text-[#e5e2e1] transition-colors group-hover:text-[#FFD79B]'>
                <span aria-hidden='true'>→</span>
                {segment.ctaLabel}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  )
}
