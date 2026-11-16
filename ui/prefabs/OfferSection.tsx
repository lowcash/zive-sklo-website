import { OFFER } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section, SectionHead } from '@/ui/core'

import { InquiryLink } from './InquiryLink'

/**
 * OfferSection - RSC (Server Component)
 * Three primary programmes as priced cards, three add-ons as a quiet list.
 */
export function OfferSection() {
  return (
    <Section id='nabidka' tone='paper'>
      <Container>
        <SectionHead eyebrow={OFFER.eyebrow} heading={OFFER.heading} lead={OFFER.subtitle} className='mb-12 md:mb-20' />

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8'>
          {OFFER.primary.map((card) => (
            <article key={card.title} className='glass card-hit reveal flex flex-col p-7 md:p-9'>
              <h3>{applyCzechNbsp(card.title)}</h3>
              <p className='text-fg-2 mt-5'>{applyCzechNbsp(card.description)}</p>

              <dl className='border-line mt-8 space-y-4 border-t pt-6'>
                <div>
                  <dt className='eyebrow before:hidden'>Vhodné pro</dt>
                  <dd className='mt-1'>{applyCzechNbsp(card.suitableFor)}</dd>
                </div>
                {card.duration ? (
                  <div>
                    <dt className='eyebrow before:hidden'>Délka</dt>
                    <dd className='mt-1'>{applyCzechNbsp(card.duration)}</dd>
                  </div>
                ) : null}
              </dl>

              <div className='mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-5 pt-10'>
                <p className='font-display text-step-3 leading-none tracking-[-0.01em]'>{applyCzechNbsp(card.price)}</p>
                <InquiryLink href={card.ctaHref} label={card.ctaLabel} context={card.title} />
              </div>
            </article>
          ))}
        </div>

        <ul className='border-line-strong mt-16 grid grid-cols-1 border-t md:mt-24 lg:grid-cols-3'>
          {OFFER.secondary.map((card, index) => (
            <li
              key={card.title}
              className={`reveal card-hit border-line flex flex-col gap-4 border-b py-8 lg:border-b-0 lg:py-10 ${
                index > 0 ? 'lg:border-l lg:pl-8' : ''
              } ${index < 2 ? 'lg:pr-8' : ''}`}
            >
              <h3>{applyCzechNbsp(card.title)}</h3>
              <p className='text-fg-2'>{applyCzechNbsp(card.description)}</p>
              {card.price ? (
                <p className='font-display text-step-1 mt-auto pt-2'>{applyCzechNbsp(card.price)}</p>
              ) : null}
              <InquiryLink
                href={card.ctaHref}
                label={card.ctaLabel}
                context={card.title}
                className={`self-start ${card.price ? '' : 'mt-auto'}`}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
