'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { Container, SectionHead } from '@/ui/core'

import { GalleryModal } from './GalleryModal'

type GalleryControlsProps = {
  eyebrow: string
  heading: string
  images: string[]
  alts: string[]
}

const TILE_LAYOUT = [
  { box: 'col-span-2 aspect-4/3 md:col-span-8 md:aspect-auto md:h-[30rem]', sizes: '(min-width: 768px) 66vw, 100vw' },
  { box: 'aspect-square md:col-span-4 md:aspect-auto md:h-[30rem]', sizes: '(min-width: 768px) 33vw, 50vw' },
  { box: 'aspect-square md:col-span-4 md:aspect-auto md:h-[20rem]', sizes: '(min-width: 768px) 33vw, 50vw' },
  { box: 'col-span-2 aspect-16/10 md:col-span-4 md:aspect-auto md:h-[20rem]', sizes: '(min-width: 768px) 33vw, 100vw' },
  { box: 'col-span-2 aspect-16/10 md:col-span-4 md:aspect-auto md:h-[20rem]', sizes: '(min-width: 768px) 33vw, 100vw' },
] as const

/**
 * GalleryControls - Client leaf: photo mosaic on the 12-column grid plus modal browsing.
 */
export function GalleryControls({ eyebrow, heading, images, alts }: GalleryControlsProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

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

  return (
    <>
      <Container>
        <SectionHead eyebrow={eyebrow} heading={heading} className='mb-12 md:mb-16' />

        <div role='group' aria-label='Galerie fotografií' className='grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-6'>
          {images.map((src, index) => {
            const layout = TILE_LAYOUT[index % TILE_LAYOUT.length]
            return (
              <button
                type='button'
                key={`${src}-${index}`}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`Zobrazit fotografii: ${alts[index] ?? `Galerie živého skla ${index + 1}`}`}
                className={`tile reveal relative cursor-pointer overflow-hidden text-left ${layout.box}`}
              >
                <Image
                  src={src}
                  alt={alts[index] ?? `Galerie živého skla ${index + 1}`}
                  fill
                  sizes={layout.sizes}
                  className='object-cover'
                  quality={80}
                />
              </button>
            )
          })}
        </div>
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
