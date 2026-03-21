import { Container, Heading, Section, Text } from '@/ui/core'

import { GALLERY } from '@/lib/content'

import { GalleryScroll } from './GalleryScroll'

/**
 * GallerySection - RSC (Server Component)
 * Horizontal scrollable gallery (client leaf for scroll behavior)
 */
export function GallerySection() {
  return (
    <Section id="galerie" spacing="xl" surface="subtle">
      <Container>
        {/* Heading */}
        <div className="mb-8">
          <Heading level={2} size="4xl" align="center">
            {GALLERY.heading}
          </Heading>
        </div>

        {/* Hint */}
        <div className="mb-12">
          <Text size="sm" color="secondary" align="center">
            {GALLERY.hint}
          </Text>
        </div>
      </Container>

      {/* Scrollable Gallery (client leaf) */}
      <GalleryScroll images={GALLERY.images} />
    </Section>
  )
}
