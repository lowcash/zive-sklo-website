import { Container, Section } from '@/ui/core'

import { GALLERY } from '@/lib/content'

import { GalleryScroll } from './GalleryScroll'

/**
 * GallerySection - RSC (Server Component)
 * Horizontal scrollable gallery (client leaf for scroll behavior)
 */
export function GallerySection() {
  return (
    <Section id='galerie' spacing='xl' surface='subtle'>
      <Container>
        <div className='mb-12 flex items-end justify-between'>
          <h2 className='font-display text-4xl font-bold tracking-tight'>
            Galerie zážitků
          </h2>
          <div className='flex gap-4'>
            <button className='flex h-12 w-12 items-center justify-center border border-[#504532] transition-colors hover:bg-[#ffbf00] hover:text-[#402d00]'>
              <span className='material-symbols-outlined'>arrow_back</span>
            </button>
            <button className='flex h-12 w-12 items-center justify-center border border-[#504532] transition-colors hover:bg-[#ffbf00] hover:text-[#402d00]'>
              <span className='material-symbols-outlined'>arrow_forward</span>
            </button>
          </div>
        </div>
      </Container>

      <GalleryScroll images={GALLERY.images} />
    </Section>
  )
}
