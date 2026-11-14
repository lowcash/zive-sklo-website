import { GALLERY } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/typography'

import { Section } from '@/ui/core'

import { GalleryControls } from './GalleryControls'

/**
 * GallerySection - RSC (Server Component)
 * Section chrome is server-rendered; scroll/modal interaction lives in GalleryControls.
 */
export function GallerySection() {
  return (
    <Section id='galerie' spacing='xl' surface='subtle'>
      <GalleryControls
        heading={applyCzechNbsp(GALLERY.heading)}
        hint={applyCzechNbsp(GALLERY.hint)}
        images={GALLERY.images}
        alts={GALLERY.alts}
      />
    </Section>
  )
}
