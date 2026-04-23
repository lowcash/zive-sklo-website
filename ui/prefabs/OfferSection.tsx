import { OFFER } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container } from '@/ui/core'

/**
 * OfferSection - RSC (Server Component)
 * Offer section with primary and secondary program cards
 */
export function OfferSection() {
  return (
    <section id='nabidka' className='bg-[#0e0e0e] py-20 md:py-32'>
      <Container>
        <div className='mb-12 max-w-3xl md:mb-20'>
          <h2 className='font-display mb-6 text-4xl font-bold tracking-tight'>{applyCzechNbsp(OFFER.heading)}</h2>
          <p className='text-lg leading-relaxed text-[#e5e2e1b3]'>{applyCzechNbsp(OFFER.subtitle)}</p>
        </div>

        <div className='grid grid-cols-1 gap-px bg-[#5045324d] lg:grid-cols-3'>
          {OFFER.primary.map((card) => (
            <a
              key={card.title}
              href={card.ctaHref}
              aria-label={`${card.title} – ${card.ctaLabel}`}
              className='ui-surface-hover group flex h-full flex-col bg-[#131313] p-6 hover:bg-[#201f1f] focus-visible:ring-2 focus-visible:ring-[#ffbf00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e] focus-visible:outline-none md:p-8 lg:p-10'
            >
              <div className='mb-6'>
                <div className='flex h-12 w-12 items-center justify-center bg-[#1c1b1b]'>
                  <span className='material-symbols-outlined text-[24px]! text-[#9accf3]'>{card.icon}</span>
                </div>
              </div>

              <h3 className='mb-4 text-2xl font-bold'>{applyCzechNbsp(card.title)}</h3>
              <p className='mb-10 leading-relaxed text-[#e5e2e199]'>{applyCzechNbsp(card.description)}</p>

              <div className='space-y-3 pb-10 text-sm text-[#e5e2e1b3]'>
                <p>
                  <span className='font-label tracking-widest text-[#e5e2e1b3] uppercase'>Vhodné pro</span>
                  <br />
                  {applyCzechNbsp(card.suitableFor)}
                </p>
                {card.duration ? (
                  <p>
                    <span className='font-label tracking-widest text-[#e5e2e1b3] uppercase'>Délka</span>
                    <br />
                    {applyCzechNbsp(card.duration)}
                  </p>
                ) : null}
              </div>

              <div className='mt-auto'>
                <p className='font-label mb-1 text-xs tracking-widest text-[#e5e2e1b3] uppercase'>Cena od</p>
                <p className='font-display text-3xl font-bold text-[#ffbf00]'>{applyCzechNbsp(card.price)}</p>
              </div>

              <span className='font-display mt-10 inline-flex items-center gap-2 font-bold text-[#e5e2e1] transition-colors group-hover:text-[#FFD79B]'>
                <span aria-hidden='true'>→</span>
                {applyCzechNbsp(card.ctaLabel)}
              </span>
            </a>
          ))}
        </div>

        <div className='mt-10 grid grid-cols-1 gap-px bg-[#5045324d] md:mt-16 lg:grid-cols-3'>
          {OFFER.secondary.map((card) => (
            <a
              key={card.title}
              href={card.ctaHref}
              aria-label={`${card.title} – ${card.ctaLabel}`}
              className='ui-surface-hover group flex h-full flex-col bg-[#131313] p-6 hover:bg-[#201f1f] focus-visible:ring-2 focus-visible:ring-[#ffbf00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e] focus-visible:outline-none md:p-8 lg:p-10'
            >
              <h3 className='mb-4 text-xl font-bold'>{applyCzechNbsp(card.title)}</h3>
              <p className='mb-8 leading-relaxed text-[#e5e2e199]'>{applyCzechNbsp(card.description)}</p>
              {card.price ? (
                <p className='font-label mb-6 text-xs tracking-widest text-[#e5e2e1b3] uppercase'>
                  Cena od
                  <br />
                  <span className='font-display mt-2 inline-block text-2xl font-bold tracking-normal text-[#ffbf00] normal-case'>
                    {applyCzechNbsp(card.price)}
                  </span>
                </p>
              ) : null}
              <span className='font-display mt-auto inline-flex items-center gap-2 font-bold text-[#e5e2e1] transition-colors group-hover:text-[#FFD79B]'>
                <span aria-hidden='true'>→</span>
                {applyCzechNbsp(card.ctaLabel)}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
