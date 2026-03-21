import { Card, Container, Grid, Heading, Section, Text } from '@/ui/core'

import { BENEFITS } from '@/lib/content'

import { DownloadLink } from './DownloadLink'

/**
 * BenefitsSection - RSC (Server Component)
 * Benefits grid with download link
 */
export function BenefitsSection() {
  return (
    <Section id="benefity" spacing="xl">
      <Container>
        {/* Heading */}
        <div className="mb-16">
          <Heading level={2} size="4xl" align="center">
            {BENEFITS.heading}
          </Heading>
        </div>

        {/* Benefits Grid */}
        <div className="mb-12">
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="lg">
            {BENEFITS.items.map((benefit) => (
              <Card
                key={benefit.title}
                variant="outlined"
                padding="lg"
                layout="column"
                gap="md"
              >
                <Heading level={3} size="xl">
                  {benefit.title}
                </Heading>

                <Text size="sm" color="secondary">
                  {benefit.description}
                </Text>
              </Card>
            ))}
          </Grid>
        </div>

        {/* Download Link (client leaf) */}
        <div className="text-center">
          <DownloadLink
            href={BENEFITS.downloadHref}
            label={BENEFITS.downloadLabel}
          />
        </div>
      </Container>
    </Section>
  )
}
