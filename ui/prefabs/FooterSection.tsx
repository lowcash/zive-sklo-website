import { FOOTER } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container } from '@/ui/core'

import { CookieSettingsButton } from './CookieSettingsButton'
import { PolicyLink } from './PolicyLink'

/**
 * FooterSection - RSC (Server Component)
 * Footer with brand, navigation, contact, and social links
 */
type FooterSectionProps = {
  showCookieInformation?: boolean
}

export function FooterSection({ showCookieInformation = false }: FooterSectionProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='border-line bg-scrim w-full border-t py-16'>
      <Container>
        <div className='grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]'>
          <div className='space-y-4'>
            <p className='font-display text-step-2 text-fg'>{applyCzechNbsp(FOOTER.brand.name)}</p>
            <p className='text-fg-2 max-w-xs text-sm leading-relaxed'>{applyCzechNbsp(FOOTER.brand.tagline)}</p>
          </div>

          <div className='space-y-4'>
            <p className='font-label text-fg-3 text-step--1 font-semibold tracking-[0.14em] uppercase'>Navigace</p>
            <div className='flex flex-col gap-3 text-sm'>
              {FOOTER.nav.map((item) => (
                <a key={item.label} href={item.href} className='text-fg-2 hover:text-fg transition-colors'>
                  {applyCzechNbsp(item.label)}
                </a>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='font-label text-fg-3 text-step--1 font-semibold tracking-[0.14em] uppercase'>Kontakt</p>
            <div className='flex flex-col gap-3 text-sm'>
              {FOOTER.contacts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className='text-fg-2 hover:text-fg transition-colors'
                  {...('external' in item && item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {applyCzechNbsp(item.label)}
                </a>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <p className='font-label text-fg-3 text-step--1 font-semibold tracking-[0.14em] uppercase'>Sociální sítě</p>
            <div className='flex flex-col gap-3 text-sm'>
              {FOOTER.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-fg-2 hover:text-fg transition-colors'
                >
                  {applyCzechNbsp(`${item.label} ${item.value}`)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='border-line mt-12 border-t pt-8'>
          <div className='flex flex-col gap-5 md:flex-row md:items-end md:justify-between'>
            <div className='max-w-2xl space-y-3'>
              {showCookieInformation ? (
                <p className='text-fg-2 text-sm leading-relaxed'>{applyCzechNbsp(FOOTER.legal.note)}</p>
              ) : null}
              <div className='flex flex-wrap items-center gap-x-5 gap-y-2 text-sm'>
                <PolicyLink href={FOOTER.legal.privacyHref} className='text-fg-2 hover:text-fg transition-colors'>
                  {applyCzechNbsp(FOOTER.legal.privacyLabel)}
                </PolicyLink>
                {showCookieInformation ? (
                  <>
                    <PolicyLink href={FOOTER.legal.cookiesHref} className='text-fg-2 hover:text-fg transition-colors'>
                      {applyCzechNbsp(FOOTER.legal.cookiesLabel)}
                    </PolicyLink>
                    <CookieSettingsButton
                      label={FOOTER.legal.settingsLabel}
                      className='text-fg-2 hover:text-fg transition-colors'
                    />
                  </>
                ) : null}
              </div>
            </div>

            <p className='font-label text-fg-3 text-step--1 tracking-[0.1em] uppercase'>
              {applyCzechNbsp(`© ${currentYear} ${FOOTER.copyrightOwner}. ${FOOTER.copyrightRights}`)}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
