'use client'

import { useEffect, useRef, useState } from 'react'

import { GALLERY } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

import { GalleryModal } from './GalleryModal'
import { GalleryScroll } from './GalleryScroll'

/**
 * GallerySection - RSC (Server Component)
 * Horizontal scrollable gallery (client leaf for scroll behavior)
 */
export function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  useEffect(() => {
    const element = scrollRef.current

    if (!element) {
      return
    }

    const updateScrollState = () => {
      const threshold = 4
      setCanScrollPrev(element.scrollLeft > threshold)
      setCanScrollNext(element.scrollLeft + element.clientWidth < element.scrollWidth - threshold)
    }

    updateScrollState()

    element.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      element.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  useEffect(() => {
    if (activeImageIndex === null) {
      return
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [activeImageIndex])

  const showPreviousImage = () => {
    setActiveImageIndex((prev) => {
      if (prev === null) {
        return prev
      }

      return prev === 0 ? GALLERY.images.length - 1 : prev - 1
    })
  }

  const showNextImage = () => {
    setActiveImageIndex((prev) => {
      if (prev === null) {
        return prev
      }

      return prev === GALLERY.images.length - 1 ? 0 : prev + 1
    })
  }

  useEffect(() => {
    if (activeImageIndex === null) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImageIndex(null)
      }

      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev === null ? prev : prev === 0 ? GALLERY.images.length - 1 : prev - 1))
      }

      if (event.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev === null ? prev : prev === GALLERY.images.length - 1 ? 0 : prev + 1))
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeImageIndex])

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) {
      return
    }

    const touch = event.changedTouches[0]
    const dx = touch.clientX - touchStartRef.current.x
    const dy = touch.clientY - touchStartRef.current.y

    touchStartRef.current = null

    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) {
      return
    }

    if (dx < 0) {
      showNextImage()
      return
    }

    showPreviousImage()
  }

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
          <div className='space-y-3'>
            <h2 className='font-display text-4xl font-bold tracking-tight'>{applyCzechNbsp(GALLERY.heading)}</h2>
            <p className='font-label text-xs tracking-[0.18em] text-[#e5e2e1b3] uppercase'>
              {applyCzechNbsp(GALLERY.hint)}
            </p>
          </div>
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => scrollGallery('prev')}
              disabled={!canScrollPrev}
              aria-label='Posunout galerii doleva'
              className='flex h-12 w-12 cursor-pointer items-center justify-center border border-[#3b3b3b] bg-[#141414] text-[#e5e2e1] ring-0 transition-colors duration-300 hover:bg-[#1f1f1f] focus:ring-0 focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#141414] disabled:hover:text-[#e5e2e1]'
            >
              <span className='material-symbols-outlined text-[24px]!'>arrow_back</span>
            </button>
            <button
              type='button'
              onClick={() => scrollGallery('next')}
              disabled={!canScrollNext}
              aria-label='Posunout galerii doprava'
              className='flex h-12 w-12 cursor-pointer items-center justify-center border border-[#3b3b3b] bg-[#141414] text-[#e5e2e1] ring-0 transition-colors duration-300 hover:bg-[#1f1f1f] focus:ring-0 focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#141414] disabled:hover:text-[#e5e2e1]'
            >
              <span className='material-symbols-outlined text-[24px]!'>arrow_forward</span>
            </button>
          </div>
        </div>
      </Container>

      <Container>
        <GalleryScroll
          images={GALLERY.images}
          alts={GALLERY.alts}
          scrollRef={scrollRef}
          onImageClick={setActiveImageIndex}
        />
      </Container>

      <GalleryModal
        images={GALLERY.images}
        alts={GALLERY.alts}
        activeImageIndex={activeImageIndex}
        onClose={() => setActiveImageIndex(null)}
        onPrevious={showPreviousImage}
        onNext={showNextImage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </Section>
  )
}
