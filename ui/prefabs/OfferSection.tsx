import { OFFER } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container } from '@/ui/core'

/**
 * OfferSection - RSC (Server Component)
 * Offer section with primary and secondary program cards
 */
export function OfferSection() {
  return (
    <section id='nabidka' data-temp='0.5' className='py-(--section-y)'>
      <Container>
        <div className='reveal mb-12 max-w-3xl space-y-6 md:mb-20'>
          <h2>{applyCzechNbsp(OFFER.heading)}</h2>
          <p className='text-step-1 text-fg-2 leading-[1.55]'>{applyCzechNbsp(OFFER.subtitle)}</p>
        </div>

        <div className='border-line bg-line grid grid-cols-1 gap-px border lg:grid-cols-3'>
          {OFFER.primary.map((card) => (
            <a
              key={card.title}
              href={card.ctaHref}
              className='glass reveal group flex h-full flex-col border-0 p-6 shadow-none md:p-8 lg:p-10'
            >
              <div className='mb-6'>
                <div className='border-line flex h-12 w-12 items-center justify-center border bg-white/5'>
                  <span className='material-symbols-outlined text-ice text-[24px]!' aria-hidden='true'>
                    {card.icon}
                  </span>
                </div>
              </div>

              <h3 className='mb-4'>{applyCzechNbsp(card.title)}</h3>
              <p className='text-fg-2 mb-10'>{applyCzechNbsp(card.description)}</p>

              <div className='text-fg-2 text-step--1 space-y-3 pb-10'>
                <p>
                  <span className='font-label text-fg-3 font-semibold tracking-[0.14em] uppercase'>Vhodné pro</span>
                  <br />
                  {applyCzechNbsp(card.suitableFor)}
                </p>
                {card.duration ? (
                  <p>
                    <span className='font-label text-fg-3 font-semibold tracking-[0.14em] uppercase'>Délka</span>
                    <br />
                    {applyCzechNbsp(card.duration)}
                  </p>
                ) : null}
              </div>

              <div className='mt-auto'>
                <p className='font-label text-fg-3 text-step--1 mb-1 font-semibold tracking-[0.14em] uppercase'>
                  Cena od
                </p>
                <p className='font-display text-step-3 text-amber leading-[1.1] font-medium'>
                  {applyCzechNbsp(card.price)}
                </p>
              </div>

              <span className='link-arrow font-display text-fg group-hover:text-amber-hi mt-10 inline-flex items-center gap-2 font-semibold'>
                <span aria-hidden='true'>→</span>
                {applyCzechNbsp(card.ctaLabel)}
              </span>
            </a>
          ))}
        </div>

        <div className='border-line bg-line mt-10 grid grid-cols-1 gap-px border md:mt-16 lg:grid-cols-3'>
          {OFFER.secondary.map((card) => (
            <a
              key={card.title}
              href={card.ctaHref}
              className='glass reveal group flex h-full flex-col border-0 p-6 shadow-none md:p-8 lg:p-10'
            >
              <h3 className='mb-4'>{applyCzechNbsp(card.title)}</h3>
              <p className='text-fg-2 mb-8'>{applyCzechNbsp(card.description)}</p>
              {card.price ? (
                <p className='font-label text-fg-3 text-step--1 mb-6 font-semibold tracking-[0.14em] uppercase'>
                  Cena od
                  <br />
                  <span className='font-display text-step-2 text-amber mt-2 inline-block font-medium tracking-normal normal-case'>
                    {applyCzechNbsp(card.price)}
                  </span>
                </p>
              ) : null}
              <span className='link-arrow font-display text-fg group-hover:text-amber-hi mt-auto inline-flex items-center gap-2 font-semibold'>
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
