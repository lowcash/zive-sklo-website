import type { ReactNode } from 'react'

import { AUDIENCE } from '@/lib/content'
import { Button, Card, Container, Grid, Heading, Section, Text } from '@/ui/core'

/**
 * AudienceSection - RSC (Server Component)
 * Audience segment cards
 */
export function AudienceSection() {
  return (
    <Section id="pro-koho-jsme" spacing="xl" surface="subtle">
      <Container>
        {/* Heading */}
        <div className="mb-16">
          <Heading level={2} size="4xl" align="center">
            {AUDIENCE.heading}
          </Heading>
        </div>

        {/* Segments */}
        <Grid cols={{ base: 1, md: 3 }} gap="lg">
          {AUDIENCE.segments.map((segment) => (
            <Card
              key={segment.label}
              variant="glass"
              padding="xl"
              layout="column"
              gap="lg"
            >
              {/* Label */}
              <span className="text-sm text-accent-amber uppercase tracking-wider font-semibold">
                {segment.label}
              </span>

              {/* Heading */}
              <Heading level={3} size="2xl">
                {segment.heading}
              </Heading>

              {/* Description */}
              <Text size="base" color="secondary" leading="relaxed">
                {segment.description}
              </Text>

              {/* Features */}
              <ul className="space-y-2">
                {segment.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent-amber mt-1">✓</span>
                    <Text size="sm" color="secondary">
                      {feature}
                    </Text>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button variant="primary" fullWidth>
                <a href={segment.ctaHref}>{segment.ctaLabel}</a>
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
