"use client"

import { useCallback, useEffect, useRef, useState } from 'react'

import { Container, Section } from '@/ui/core'

import { GALLERY } from '@/lib/content'

import { GalleryScroll } from './GalleryScroll'

/**
 * GallerySection - RSC (Server Component)
 * Horizontal scrollable gallery (client leaf for scroll behavior)
 */
export function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollState = useCallback(() => {
    const element = scrollRef.current

    if (!element) {
      return
    }

    const threshold = 4
    setCanScrollPrev(element.scrollLeft > threshold)
    setCanScrollNext(
      element.scrollLeft + element.clientWidth < element.scrollWidth - threshold
    )
  }, [])

  useEffect(() => {
    const element = scrollRef.current

    if (!element) {
      return
    }

    updateScrollState()

    const handleResize = () => updateScrollState()

    element.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      element.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', handleResize)
    }
  }, [updateScrollState])

  const scrollGallery = (direction: 'prev' | 'next') => {
    const element = scrollRef.current

    if (!element) {
      return
    }

    const scrollDelta = Math.min(520, Math.round(element.clientWidth * 0.82))
    const leftOffset = direction === 'next' ? scrollDelta : -scrollDelta

    element.scrollBy({
      left: leftOffset,
      behavior: 'smooth',
    })
  }

  return (
    <Section id='galerie' spacing='xl' surface='subtle'>
      <Container>
        <div className='mb-12 flex items-end justify-between'>
          <h2 className='font-display text-4xl font-bold tracking-tight'>
            Galerie zážitků
          </h2>
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => scrollGallery('prev')}
              disabled={!canScrollPrev}
              aria-label='Posunout galerii doleva'
              className='flex h-12 w-12 items-center justify-center border border-border transition-colors duration-300 hover:bg-[#ffbf00] hover:text-[#402d00] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit'
            >
              <span className='material-symbols-outlined !text-[24px]'>
                arrow_back
              </span>
            </button>
            <button
              type='button'
              onClick={() => scrollGallery('next')}
              disabled={!canScrollNext}
              aria-label='Posunout galerii doprava'
              className='flex h-12 w-12 items-center justify-center border border-border transition-colors duration-300 hover:bg-[#ffbf00] hover:text-[#402d00] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit'
            >
              <span className='material-symbols-outlined !text-[24px]'>
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </Container>

      <GalleryScroll images={GALLERY.images} scrollRef={scrollRef} />
    </Section>
  )
}
