import { Button, Container, ResponsiveVisibility } from '@/ui/core'

import { NAV, BRAND } from '@/lib/content'

import { MobileMenu } from './MobileMenu'

/**
 * Navigation - RSC with client leaf for mobile menu
 * Sticky glass nav with mobile hamburger
 */
/**
 * Navigation - RSC with client leaf for mobile menu
 * Sticky glass nav with mobile hamburger
 */
export function Navigation() {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-[var(--glass-blur)] bg-[var(--glass-bg)] border-b border-[var(--glass-border)]'>
      <Container>
        <div className='flex items-center justify-between h-20'>
          {/* Brand */}
          <a
            href='#'
            className='font-display text-2xl font-bold hover:text-accent-amber transition-colors'
          >
            {BRAND.name}
          </a>

          {/* Desktop Navigation */}
          <ResponsiveVisibility showOn={['md', 'lg', 'xl']}>
            <div className='flex items-center gap-8'>
              {NAV.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className='text-text-secondary hover:text-text-primary transition-colors'
                >
                  {link.label}
                </a>
              ))}
              <Button variant='primary' size='sm'>
                <a href={NAV.ctaHref}>{NAV.ctaLabel}</a>
              </Button>
            </div>
          </ResponsiveVisibility>

          {/* Mobile Menu (client leaf) */}
          <ResponsiveVisibility hideOn={['md', 'lg', 'xl']}>
            <MobileMenu />
          </ResponsiveVisibility>
        </div>
      </Container>
    </nav>
  )
}
