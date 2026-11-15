'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Container } from '@/ui/core'

import { GalleryModal } from './GalleryModal'
import { GalleryScroll } from './GalleryScroll'

type GalleryControlsProps = {
  heading: string
  hint: string
  images: string[]
  alts: string[]
}

/**
 * GalleryControls - Client leaf for horizontal scroll state and modal browsing.
 */
export function GalleryControls({ heading, hint, images, alts }: GalleryControlsProps) {
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

    let frameId: number | null = null

    const updateScrollState = () => {
      const threshold = 4
      setCanScrollPrev(element.scrollLeft > threshold)
      setCanScrollNext(element.scrollLeft + element.clientWidth < element.scrollWidth - threshold)
    }

    const scheduleUpdate = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        updateScrollState()
      })
    }

    updateScrollState()

    element.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      element.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
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

  const showPreviousImage = useCallback(() => {
    setActiveImageIndex((prev) => {
      if (prev === null) {
        return prev
      }

      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [images.length])

  const showNextImage = useCallback(() => {
    setActiveImageIndex((prev) => {
      if (prev === null) {
        return prev
      }

      return prev === images.length - 1 ? 0 : prev + 1
    })
  }, [images.length])

  const closeModal = useCallback(() => {
    setActiveImageIndex(null)
  }, [])

  useEffect(() => {
    if (activeImageIndex === null) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev === null ? prev : prev === 0 ? images.length - 1 : prev - 1))
      }

      if (event.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev === null ? prev : prev === images.length - 1 ? 0 : prev + 1))
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeImageIndex, images.length])

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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    element.scrollBy({
      left: leftOffset,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <>
      <Container>
        <div className='reveal mb-12 flex items-end justify-between gap-6'>
          <div className='space-y-3'>
            <h2>{heading}</h2>
            <p className='font-label text-fg-3 text-step--1 font-semibold tracking-[0.12em] uppercase'>{hint}</p>
          </div>
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => scrollGallery('prev')}
              disabled={!canScrollPrev}
              aria-label='Posunout galerii doleva'
              className='border-line-strong text-fg hover:border-ice hover:text-ice disabled:hover:border-line-strong disabled:hover:text-fg flex h-12 w-12 cursor-pointer items-center justify-center border bg-transparent transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40'
            >
              <span className='material-symbols-outlined text-[24px]!' aria-hidden='true'>
                arrow_back
              </span>
            </button>
            <button
              type='button'
              onClick={() => scrollGallery('next')}
              disabled={!canScrollNext}
              aria-label='Posunout galerii doprava'
              className='border-line-strong text-fg hover:border-ice hover:text-ice disabled:hover:border-line-strong disabled:hover:text-fg flex h-12 w-12 cursor-pointer items-center justify-center border bg-transparent transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40'
            >
              <span className='material-symbols-outlined text-[24px]!' aria-hidden='true'>
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </Container>

      <Container>
        <GalleryScroll images={images} alts={alts} scrollRef={scrollRef} onImageClick={setActiveImageIndex} />
      </Container>

      <GalleryModal
        images={images}
        alts={alts}
        activeImageIndex={activeImageIndex}
        onClose={closeModal}
        onPrevious={showPreviousImage}
        onNext={showNextImage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </>
  )
}
