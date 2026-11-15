'use client'

import type { RefObject } from 'react'
import { useRef } from 'react'

import Image from 'next/image'

/**
 * GalleryScroll - Client leaf component for horizontal momentum scroll
 * Handles browser scroll APIs
 */
type GalleryScrollProps = {
  images: string[]
  alts?: string[]
  scrollRef?: RefObject<HTMLDivElement | null>
  onImageClick?: (index: number) => void
}

export function GalleryScroll({ images, alts = [], scrollRef, onImageClick }: GalleryScrollProps) {
  const internalScrollRef = useRef<HTMLDivElement>(null)
  const containerRef = scrollRef ?? internalScrollRef
  // Responsive widths: narrower on mobile to avoid overflow, wider on desktop
  const widthPattern = [
    'w-[85vw] md:w-[400px]',
    'w-[85vw] md:w-[600px]',
    'w-[85vw] md:w-[400px]',
    'w-[85vw] md:w-[400px]',
  ]
  const sizesPattern = [
    '(max-width: 768px) 85vw, 400px',
    '(max-width: 768px) 85vw, 600px',
    '(max-width: 768px) 85vw, 400px',
    '(max-width: 768px) 85vw, 400px',
  ]

  return (
    <div
      ref={containerRef}
      role='region'
      aria-label='Galerie fotografií'
      tabIndex={0}
      className='flex snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:var(--color-line-strong)_transparent] gap-4 overflow-x-auto overflow-y-hidden pb-4 motion-safe:scroll-smooth'
    >
      {images.map((src, index) => (
        <button
          type='button'
          key={`${src}-${index}`}
          onClick={() => onImageClick?.(index)}
          aria-label={`Zobrazit fotografii: ${alts[index] ?? `Galerie živého skla ${index + 1}`}`}
          className={`tile group border-line relative h-[500px] flex-none cursor-pointer snap-start overflow-hidden border text-left ${widthPattern[index % widthPattern.length]}`}
        >
          <Image
            src={src}
            alt={alts[index] ?? `Galerie živého skla ${index + 1}`}
            width={960}
            height={1200}
            sizes={sizesPattern[index % sizesPattern.length]}
            className='h-full w-full object-cover'
            quality={85}
          />
        </button>
      ))}
    </div>
  )
}
