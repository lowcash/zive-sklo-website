import { Container } from '@/ui/core'

import { FOOTER } from '@/lib/content'

/**
 * FooterSection - RSC (Server Component)
 * Footer with brand, navigation, contact, and social links
 */
export function FooterSection() {
  return (
    <footer className='w-full border-t border-[#51453226] bg-[#0E0E0E] py-20'>
      <Container>
        <div className='mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 md:flex-row'>
          <span className='font-display text-2xl text-[#E5E2E1]'>
            {FOOTER.brand.name}
          </span>

          <div className='font-label flex flex-wrap justify-center gap-8 text-sm uppercase tracking-wide'>
            {FOOTER.legal.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className='text-[#E5E2E199] transition-colors hover:text-[#FFD79B]'
              >
                {item.label}
              </a>
            ))}
          </div>

          <p className='font-label text-xs uppercase tracking-widest text-[#E5E2E166]'>
            {FOOTER.copyright}
          </p>
        </div>
      </Container>
    </footer>
  )
}
