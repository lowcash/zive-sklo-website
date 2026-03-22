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
        <div className='grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]'>
          <div className='space-y-4'>
            <p className='font-display text-2xl text-[#E5E2E1]'>
              {FOOTER.brand.name}
            </p>
            <p className='max-w-xs text-sm leading-relaxed text-[#E5E2E199]'>
              {FOOTER.brand.tagline}
            </p>
          </div>

          <div className='space-y-4'>
            <p className='font-label text-xs uppercase tracking-[0.18em] text-[#E5E2E166]'>
              Navigace
            </p>
            <div className='flex flex-col gap-3 text-sm'>
              {FOOTER.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className='text-[#E5E2E199] transition-colors hover:text-[#FFD79B]'
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='font-label text-xs uppercase tracking-[0.18em] text-[#E5E2E166]'>
              Kontakt
            </p>
            <div className='flex flex-col gap-3 text-sm'>
              {FOOTER.contacts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className='text-[#E5E2E199] transition-colors hover:text-[#FFD79B]'
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='font-label text-xs uppercase tracking-[0.18em] text-[#E5E2E166]'>
              Sociální sítě
            </p>
            <div className='flex flex-col gap-3 text-sm'>
              {FOOTER.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className='text-[#E5E2E199] transition-colors hover:text-[#FFD79B]'
                >
                  {item.label} {item.value}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-12 border-t border-[#51453226] pt-8'>
          <p className='font-label text-xs uppercase tracking-widest text-[#E5E2E166]'>
            {FOOTER.copyright}
          </p>
        </div>
      </Container>
    </footer>
  )
}
