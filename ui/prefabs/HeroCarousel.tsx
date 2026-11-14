'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

/**
 * HeroCarousel - Client leaf component for auto-crossfade carousel.
 * Pauses auto-advance when the user prefers reduced motion.
 */
export function HeroCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  const CAROUSEL_INTERVAL_MS = 5600
  const CAROUSEL_FADE_MS = 1600

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduceMotion(motionQuery.matches)
    syncMotion()
    motionQuery.addEventListener('change', syncMotion)
    return () => motionQuery.removeEventListener('change', syncMotion)
  }, [])

  useEffect(() => {
    if (reduceMotion || images.length <= 1) {
      return
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, CAROUSEL_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [images.length, reduceMotion])

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
              transitionDuration: reduceMotion ? '0ms' : `${CAROUSEL_FADE_MS}ms`,
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
