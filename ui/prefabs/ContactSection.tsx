import { Center, Container, Heading, Section, Text } from '@/ui/core'

import { CONTACT } from '@/lib/content'

import { ContactForm } from './ContactForm'

/**
 * ContactSection - RSC (Server Component)
 * Contact form section (form validation as client leaf)
 */
export function ContactSection() {
  return (
    <Section id="kontakt" spacing="xl" surface="subtle">
      <Container>
        <Center maxWidth="md">
          {/* Heading */}
          <div className="text-center mb-12 space-y-4">
            <Heading level={2} size="4xl">
              {CONTACT.heading}
            </Heading>
            <Text size="lg" color="secondary">
              {CONTACT.subtitle}
            </Text>
          </div>

          {/* Form (client leaf) */}
          <ContactForm />
        </Center>
      </Container>
    </Section>
  )
}
