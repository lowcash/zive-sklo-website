'use client'

import { useRef } from 'react'

import Image from 'next/image'

/**
 * GalleryScroll - Client leaf component for horizontal momentum scroll
 * Handles browser scroll APIs
 */
export function GalleryScroll({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const widthPattern = ['w-[400px]', 'w-[600px]', 'w-[400px]', 'w-[400px]']

  return (
    <div
      ref={scrollRef}
      className='flex overflow-x-auto overflow-y-hidden gap-8 px-6 pb-6 md:px-20 scrollbar-hide'
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
