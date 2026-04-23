'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

/**
 * HeroCarousel - Client leaf component for auto-crossfade carousel
 * Handles browser APIs (setTimeout) and parallax effect
 */
export function HeroCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const CAROUSEL_INTERVAL_MS = 5600
  const CAROUSEL_FADE_MS = 1600

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, CAROUSEL_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [images.length, CAROUSEL_INTERVAL_MS])

  return (
    <div className='absolute inset-0'>
      {images.map((src, index) => {
        return (
          <div
            key={src}
            className='absolute inset-0 ease-linear will-change-[opacity]'
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: `${CAROUSEL_FADE_MS}ms`,
            }}
          >
            <Image
              src={src}
              alt=''
              fill
              sizes='100vw'
              className='object-cover opacity-40'
              priority={index < 2}
              quality={80}
            />
          </div>
        )
      })}
    </div>
  )
}
