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

  const linkClass = 'text-fg-2 hover:text-fg transition-colors'
  const headClass = 'text-fg-3 text-step--1 font-semibold tracking-[0.14em] uppercase'

  return (
    <footer className='border-line w-full border-t bg-[#0e0c0a] py-16 md:py-20'>
      <Container>
        <div className='grid-12 gap-y-12'>
          <div className='space-y-5 md:col-span-5'>
            <p className='font-display text-step-4 leading-none tracking-[-0.02em]'>
              {applyCzechNbsp(FOOTER.brand.name)}
            </p>
            <p className='text-fg-2 max-w-[34ch]'>{applyCzechNbsp(FOOTER.brand.tagline)}</p>
          </div>

          <nav aria-label='Navigace v patičce' className='space-y-4 md:col-span-2 md:col-start-7'>
            <p className={headClass}>Navigace</p>
            <ul className='flex flex-col gap-3'>
              {FOOTER.nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={linkClass}>
                    {applyCzechNbsp(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className='space-y-4 md:col-span-3'>
            <p className={headClass}>Kontakt</p>
            <ul className='flex flex-col gap-3'>
              {FOOTER.contacts.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={linkClass}
                    {...('external' in item && item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {applyCzechNbsp(item.label)}
                  </a>
                </li>
              ))}
              {FOOTER.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target='_blank' rel='noopener noreferrer' className={linkClass}>
                    {applyCzechNbsp(`${item.label} ${item.value}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-line mt-14 border-t pt-8'>
          <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
            <div className='max-w-2xl space-y-3'>
              {showCookieInformation ? (
                <p className='text-fg-3 text-step--1 leading-relaxed'>{applyCzechNbsp(FOOTER.legal.note)}</p>
              ) : null}
              <div className='text-step--1 flex flex-wrap items-center gap-x-6 gap-y-2'>
                <PolicyLink href={FOOTER.legal.privacyHref} className={linkClass}>
                  {applyCzechNbsp(FOOTER.legal.privacyLabel)}
                </PolicyLink>
                {showCookieInformation ? (
                  <>
                    <PolicyLink href={FOOTER.legal.cookiesHref} className={linkClass}>
                      {applyCzechNbsp(FOOTER.legal.cookiesLabel)}
                    </PolicyLink>
                    <CookieSettingsButton label={FOOTER.legal.settingsLabel} className={linkClass} />
                  </>
                ) : null}
              </div>
            </div>

            <p className='text-fg-3 text-step--1'>
              {applyCzechNbsp(`© ${currentYear} ${FOOTER.copyrightOwner}. ${FOOTER.copyrightRights}`)}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
