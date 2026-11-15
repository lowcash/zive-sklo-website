import { GALLERY } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/typography'

import { Section } from '@/ui/core'

import { GalleryControls } from './GalleryControls'

/**
 * GallerySection - RSC (Server Component)
 * Section chrome is server-rendered; modal interaction lives in GalleryControls.
 */
export function GallerySection() {
  return (
    <Section id='galerie' tone='light'>
      <GalleryControls
        eyebrow={GALLERY.eyebrow}
        heading={applyCzechNbsp(GALLERY.heading)}
        images={GALLERY.images}
        alts={GALLERY.alts}
      />
    </Section>
  )
}
