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
  scrollRef?: RefObject<HTMLDivElement | null>
}

export function GalleryScroll({ images, scrollRef }: GalleryScrollProps) {
  const internalScrollRef = useRef<HTMLDivElement>(null)
  const containerRef = scrollRef ?? internalScrollRef
  const widthPattern = ['w-[400px]', 'w-[600px]', 'w-[400px]', 'w-[400px]']

  return (
    <div
      ref={containerRef}
      className='scroll-smooth flex gap-8 overflow-x-auto overflow-y-hidden px-6 pb-6 scrollbar-hide md:px-20'
    >
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={`relative h-[500px] flex-none ${widthPattern[index % widthPattern.length]}`}
        >
          <Image
            src={src}
            alt={`Galerie ${index + 1}`}
            fill
            sizes='(max-width: 768px) 80vw, (max-width: 1280px) 50vw, 600px'
            className={`object-cover transition-all duration-500 hover:grayscale-0 ${
              index % 2 === 0 ? 'grayscale' : ''
            }`}
            quality={85}
          />
        </div>
      ))}
    </div>
  )
}
