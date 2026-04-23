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

  return (
    <div ref={containerRef} className='scrollbar-hide flex gap-8 overflow-x-auto overflow-y-hidden scroll-smooth pb-6'>
      {images.map((src, index) => (
        <button
          type='button'
          key={`${src}-${index}`}
          onClick={() => onImageClick?.(index)}
          aria-label={`Zobrazit fotografii: ${alts[index] ?? `Galerie živého skla ${index + 1}`}`}
          className={`group relative h-[500px] flex-none cursor-pointer overflow-hidden text-left ${widthPattern[index % widthPattern.length]}`}
        >
          <Image
            src={src}
            alt={alts[index] ?? `Galerie živého skla ${index + 1}`}
            width={960}
            height={1200}
            sizes='(max-width: 768px) 80vw, 400px'
            className='h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.02] group-hover:grayscale-0'
            quality={85}
          />
        </button>
      ))}
    </div>
  )
}
