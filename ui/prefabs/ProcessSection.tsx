import { PROCESS } from '@/lib/content'
import { Container, Section } from '@/ui/core'

/**
 * ProcessSection - RSC (Server Component)
 * 4-step process section
 */
export function ProcessSection() {
  return (
    <Section id='jak-to-funguje' spacing='xl'>
      <Container>
        <h2 className='mb-24 text-center font-display text-4xl font-bold tracking-tight'>
          {PROCESS.heading}
        </h2>

        <div className='grid grid-cols-1 gap-12 md:grid-cols-4'>
          {PROCESS.steps.map((step) => (
            <div
              key={step.number}
              tabIndex={0}
              className='group relative border-t-2 border-[#5045324d] bg-[#201f1f] p-8 transition-colors duration-300 hover:border-[#ffbf00] focus-visible:border-[#ffbf00] focus-visible:outline-none'
            >
              <span className='absolute -top-6 left-8 font-display text-6xl font-bold text-[#e5e2e10d] transition-colors duration-300 group-hover:text-[#ffbf0033] group-focus-visible:text-[#ffbf0033]'>
                {step.number}
              </span>
              <h3 className='pb-4 pt-4 text-xl font-bold transition-colors duration-300 group-hover:text-[#ffdf8a] group-focus-visible:text-[#ffdf8a]'>
                {step.title}
              </h3>
              <p className='leading-relaxed text-[#e5e2e199]'>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <p className='mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-[#e5e2e180] md:text-base'>
          {PROCESS.trustLine}
        </p>
      </Container>
    </Section>
  )
}
