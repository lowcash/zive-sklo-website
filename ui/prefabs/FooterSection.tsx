import { Container, Grid, Text } from '@/ui/core'

import { FOOTER } from '@/lib/content'

/**
 * FooterSection - RSC (Server Component)
 * Footer with brand, navigation, contact, and social links
 */
export function FooterSection() {
  return (
    <footer className='bg-black border-t border-border py-16'>
      <Container>
        <Grid cols={{ base: 1, md: 3 }} gap='xl'>
          <div className='mb-12 col-span-1'>
            {/* Brand */}
            <div className='space-y-4'>
              <h3 className='font-display text-2xl font-bold'>
                {FOOTER.brand.name}
              </h3>
              <Text size='sm' color='secondary'>
                {FOOTER.brand.tagline}
              </Text>
            </div>
          </div>

          <div className='mb-12 col-span-1'>
            {/* Navigation */}
            <div className='space-y-4'>
              <Text size='sm' weight='semibold'>
                Navigace
              </Text>
              <div className='space-y-2'>
                {FOOTER.navigation.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className='block text-sm text-text-secondary hover:text-text-primary transition-colors'
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className='mb-12 col-span-1'>
            {/* Contact */}
            <div className='space-y-4'>
              <Text size='sm' weight='semibold'>
                Kontakt
              </Text>
              <div className='space-y-2'>
                <a
                  href={`mailto:${FOOTER.contact.email}`}
                  className='block text-sm text-text-secondary hover:text-text-primary transition-colors'
                >
                  {FOOTER.contact.email}
                </a>
                <a
                  href={`tel:${FOOTER.contact.phone.replace(/\s/g, '')}`}
                  className='block text-sm text-text-secondary hover:text-text-primary transition-colors'
                >
                  {FOOTER.contact.phone}
                </a>
              </div>

              {/* Social */}
              <div className='space-y-2 pt-4'>
                {FOOTER.social.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block text-sm text-accent-ice hover:text-accent-amber transition-colors'
                  >
                    {social.platform} {social.handle || social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Grid>

        {/* Copyright */}
        <div className='pt-8 border-t border-border'>
          <Text size='xs' color='secondary' align='center'>
            {FOOTER.copyright}
          </Text>
        </div>
      </Container>
    </footer>
  )
}
