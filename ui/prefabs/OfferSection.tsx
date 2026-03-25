import { Container } from '@/ui/core'

import { OFFER } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

/**
 * OfferSection - RSC (Server Component)
 * Offer section with primary and secondary program cards
 */
export function OfferSection() {
  return (
    <section id='nabidka' className='bg-[#0e0e0e] py-20 md:py-32'>
      <Container>
        <div className='mb-12 max-w-3xl md:mb-20'>
          <h2 className='mb-6 font-display text-4xl font-bold tracking-tight'>
            {applyCzechNbsp(OFFER.heading)}
          </h2>
          <p className='text-lg leading-relaxed text-[#e5e2e1b3]'>
            {applyCzechNbsp(OFFER.subtitle)}
          </p>
        </div>

        <div className='grid grid-cols-1 gap-px bg-[#5045324d] lg:grid-cols-3'>
          {OFFER.primary.map((card, index) => (
            <a
              key={card.title}
              href={card.ctaHref}
              aria-label={`${card.title} – ${card.ctaLabel}`}
              className='group flex h-full flex-col bg-[#131313] p-8 transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e] lg:p-10'
            >
              <div className={`mb-8 ${index === 1 ? 'text-[#ffbf00]' : 'text-[#9accf3]'}`}>
                <span className='material-symbols-outlined !text-4xl'>
                  {card.icon}
                </span>
              </div>

              <h3 className='mb-4 text-2xl font-bold'>{applyCzechNbsp(card.title)}</h3>
              <p className='mb-10 leading-relaxed text-[#e5e2e199]'>
                {applyCzechNbsp(card.description)}
              </p>

              <div className='space-y-3 pb-10 text-sm text-[#e5e2e1b3]'>
                <p>
                  <span className='font-label uppercase tracking-widest text-[#e5e2e166]'>
                    Vhodné pro
                  </span>
                  <br />
                  {applyCzechNbsp(card.suitableFor)}
                </p>
                {card.duration ? (
                  <p>
                    <span className='font-label uppercase tracking-widest text-[#e5e2e166]'>
                      Délka
                    </span>
                    <br />
                    {applyCzechNbsp(card.duration)}
                  </p>
                ) : null}
              </div>

              <div className='mt-auto'>
                <p className='mb-1 font-label text-xs uppercase tracking-widest text-[#e5e2e166]'>
                  Cena od
                </p>
                <p className='font-display text-3xl font-bold text-[#ffbf00]'>
                  {applyCzechNbsp(card.price)}
                </p>
              </div>

              <span className='mt-10 inline-flex items-center gap-2 font-display font-bold text-[#e5e2e1] transition-colors group-hover:text-[#FFD79B]'>
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
              className='group flex h-full flex-col bg-[#131313] p-8 transition-colors hover:bg-[#201f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e] lg:p-10'
            >
              <h3 className='mb-4 text-xl font-bold'>{applyCzechNbsp(card.title)}</h3>
              <p className='mb-8 leading-relaxed text-[#e5e2e199]'>
                {applyCzechNbsp(card.description)}
              </p>
              {card.price ? (
                <p className='mb-6 font-label text-xs uppercase tracking-widest text-[#e5e2e166]'>
                  Cena od
                  <br />
                  <span className='mt-2 inline-block font-display text-2xl font-bold normal-case tracking-normal text-[#ffbf00]'>
                    {applyCzechNbsp(card.price)}
                  </span>
                </p>
              ) : null}
              <span className='mt-auto inline-flex items-center gap-2 font-display font-bold text-[#e5e2e1] transition-colors group-hover:text-[#FFD79B]'>
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
