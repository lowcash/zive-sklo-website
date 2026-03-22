'use client'

import { useState } from 'react'

import { Container, Section } from '@/ui/core'

/**
 * ProcessSection - RSC (Server Component)
 * 4-step process section
 */
export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const steps = [
    {
      number: '01',
      title: 'Konzultace',
      description:
        'Definujeme formát akce, prostorové možnosti a vaše specifické požadavky na brandování.',
    },
    {
      number: '02',
      title: 'Příprava',
      description:
        'Zajistíme technické zázemí, mobilní pec a veškeré materiály potřebné pro show.',
    },
    {
      number: '03',
      title: 'Realizace',
      description:
        'Sklářská show v přímém přenosu, případně interaktivní workshop pro hosty.',
    },
    {
      number: '04',
      title: 'Expedice',
      description:
        'Hotové výrobky bezpečně zabalíme a doručíme přímo do rukou vašich hostů.',
    },
  ]

  return (
    <Section id='jak-to-funguje' spacing='xl'>
      <Container>
        <h2 className='mb-24 text-center font-display text-4xl font-bold tracking-tight'>
          Jak probíhá realizace
        </h2>

        <div className='grid grid-cols-1 gap-12 md:grid-cols-4'>
          {steps.map((step, index) => (
            <div
              key={step.number}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setActiveIndex(index)
                }
              }}
              role='button'
              tabIndex={0}
              className={`group relative border-t-2 bg-[#201f1f] p-8 transition-colors duration-300 focus:outline-none ${
                activeIndex === index
                  ? 'border-[#ffbf00]'
                  : 'border-[#5045324d] hover:border-[#ffbf00]'
              }`}
            >
              <span
                className={`absolute -top-6 left-8 font-display text-6xl font-bold transition-colors duration-300 ${
                  activeIndex === index
                    ? 'text-[#ffbf0033]'
                    : 'text-[#e5e2e10d] group-hover:text-[#ffbf0033]'
                }`}
              >
                {step.number}
              </span>
              <h3
                className={`pb-4 pt-4 text-xl font-bold transition-colors duration-300 ${
                  activeIndex === index
                    ? 'text-[#ffdf8a]'
                    : 'group-hover:text-[#ffdf8a]'
                }`}
              >
                {step.title}
              </h3>
              <p className='leading-relaxed text-[#e5e2e199]'>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
