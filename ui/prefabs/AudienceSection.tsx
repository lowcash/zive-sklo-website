import { Container, Section } from '@/ui/core'

import { AUDIENCE } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

/**
 * AudienceSection - RSC (Server Component)
 * Audience segment cards
 */
export function AudienceSection() {
  return (
    <Section id="pro-koho" spacing="xl">
      <Container>
        <h2 className="font-display mb-12 max-w-3xl text-4xl font-bold tracking-tight md:mb-20">
          {applyCzechNbsp(AUDIENCE.heading)}
        </h2>

        <div className="grid grid-cols-1 gap-px bg-[#5045324d] lg:grid-cols-3">
          {AUDIENCE.segments.map((segment) => (
            <a
              key={segment.heading}
              href={segment.ctaHref}
              aria-label={`${segment.heading} – ${segment.ctaLabel}`}
              className="group flex h-full flex-col gap-5 bg-[#1c1b1b] p-8 transition-colors hover:bg-[#201f1f] focus-visible:ring-2 focus-visible:ring-[#ffbf00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313] focus-visible:outline-none lg:gap-6 lg:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center bg-[#131313]">
                <span className="material-symbols-outlined text-[24px] text-[#9accf3]">
                  {segment.icon}
                </span>
              </div>
              <div className="space-y-5">
                <div className="space-y-2.5">
                  <p className="font-label text-xs tracking-[0.18em] text-[#9accf3] uppercase">
                    {applyCzechNbsp(segment.label)}
                  </p>
                  <p className="font-label text-sm tracking-[0.18em] text-[#e5e2e166] uppercase">
                    {applyCzechNbsp(segment.title)}
                  </p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {applyCzechNbsp(segment.heading)}
                  </h3>
                </div>
                <p className="leading-relaxed text-[#e5e2e199]">
                  {applyCzechNbsp(segment.description)}
                </p>
                <ul className="space-y-3 text-sm leading-relaxed text-[#e5e2e1cc]">
                  {segment.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-1 text-[#ffbf00]" aria-hidden="true">
                        •
                      </span>
                      <span>{applyCzechNbsp(bullet)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <span className="font-display mt-auto inline-flex items-center gap-2 font-bold text-[#e5e2e1] transition-colors group-hover:text-[#FFD79B]">
                <span aria-hidden="true">→</span>
                {applyCzechNbsp(segment.ctaLabel)}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  )
}
