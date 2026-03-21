import type { ReactNode } from 'react'

import Image from 'next/image'

import { ABOUT } from '@/lib/content'
import { Block, Container, Grid, Heading, Section, Text } from '@/ui/core'

/**
 * AboutSection - RSC (Server Component)
 * About section with text and image
 */
export function AboutSection() {
  return (
    <Section id="o-projektu" spacing="xl">
      <Container>
        <Grid cols={{ base: 1, md: 2 }} gap="xl" align="center">
          {/* Text Content */}
          <Block spacing="lg">
            <Heading level={2} size="4xl">
              {ABOUT.heading}
            </Heading>
            <Text size="lg" leading="relaxed">
              {ABOUT.text}
            </Text>
          </Block>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={ABOUT.image}
              alt="Živé Sklo - sklářská dílna"
              fill
              className="object-cover"
              quality={85}
            />
          </div>
        </Grid>
      </Container>
    </Section>
  )
}
