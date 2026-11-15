import { FAQ } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

/**
 * FaqSection - RSC (Server Component)
 * Native details/summary: no JS, keyboard and screen-reader friendly. Answers restate existing copy.
 */
export function FaqSection() {
  return (
    <Section id='faq' tone='light'>
      <Container>
        <div className='grid-12 gap-y-12'>
          <div className='reveal md:col-span-4'>
            <p className='eyebrow mb-6'>{applyCzechNbsp(FAQ.eyebrow)}</p>
            <h2 className='max-w-[12ch]'>{applyCzechNbsp(FAQ.heading)}</h2>
            <a href={FAQ.ctaHref} className='ui-cta-primary mt-10 hidden md:inline-flex'>
              {applyCzechNbsp(FAQ.ctaLabel)}
            </a>
          </div>

          <div className='faq reveal md:col-span-8'>
            {FAQ.items.map((item) => (
              <details key={item.question} className='border-line-strong group border-t last:border-b'>
                <summary className='flex items-center justify-between gap-6 py-6 md:py-7'>
                  <h3 className='text-step-1 font-display'>{applyCzechNbsp(item.question)}</h3>
                  <span
                    aria-hidden='true'
                    className='faq-plus text-ember font-display grid size-8 shrink-0 place-items-center text-3xl leading-none'
                  >
                    +
                  </span>
                </summary>
                <p className='text-fg-2 max-w-[60ch] pb-7'>{applyCzechNbsp(item.answer)}</p>
              </details>
            ))}
          </div>

          <a href={FAQ.ctaHref} className='ui-cta-primary md:hidden'>
            {applyCzechNbsp(FAQ.ctaLabel)}
          </a>
        </div>
      </Container>
    </Section>
  )
}
