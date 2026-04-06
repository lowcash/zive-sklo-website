import { Container } from '@/ui/core'

import { FOOTER } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

/**
 * FooterSection - RSC (Server Component)
 * Footer with brand, navigation, contact, and social links
 */
export function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='w-full border-t border-[#51453226] bg-[#0E0E0E] py-20'>
      <Container>
        <div className='grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]'>
          <div className='space-y-4'>
            <p className='font-display text-2xl text-[#E5E2E1]'>{applyCzechNbsp(FOOTER.brand.name)}</p>
            <p className='max-w-xs text-sm leading-relaxed text-[#E5E2E199]'>{applyCzechNbsp(FOOTER.brand.tagline)}</p>
          </div>

          <div className='space-y-4'>
            <p className='font-label text-xs tracking-[0.18em] text-[#e5e2e1b3] uppercase'>Navigace</p>
            <div className='flex flex-col gap-3 text-sm'>
              {FOOTER.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className='text-[#E5E2E199] transition-colors hover:text-[#FFD79B]'
                >
                  {applyCzechNbsp(item.label)}
                </a>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='font-label text-xs tracking-[0.18em] text-[#e5e2e1b3] uppercase'>Kontakt</p>
            <div className='flex flex-col gap-3 text-sm'>
              {FOOTER.contacts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className='text-[#E5E2E199] transition-colors hover:text-[#FFD79B]'
                >
                  {applyCzechNbsp(item.label)}
                </a>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='font-label text-xs tracking-[0.18em] text-[#e5e2e1b3] uppercase'>Sociální sítě</p>
            <div className='flex flex-col gap-3 text-sm'>
              {FOOTER.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#E5E2E199] transition-colors hover:text-[#FFD79B]'
                >
                  {applyCzechNbsp(`${item.label} ${item.value}`)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-12 border-t border-[#51453226] pt-8'>
          <p className='font-label text-xs tracking-widest text-[#e5e2e1b3] uppercase'>
            {applyCzechNbsp(`© ${currentYear} ${FOOTER.copyrightOwner}. ${FOOTER.copyrightRights}`)}
          </p>
        </div>
      </Container>
    </footer>
  )
}
