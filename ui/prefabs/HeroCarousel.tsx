'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

/**
 * HeroCarousel - Client leaf component for auto-crossfade carousel
 * Handles browser APIs (setTimeout) and parallax effect
 */
export function HeroCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000) // 5 seconds per image

    return () => clearInterval(interval)
  }, [images.length])

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='absolute inset-0'>
      {images.map((src, index) => (
        <div
          key={src}
          className='absolute inset-0 transition-opacity duration-1000'
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <Image
            src={src}
            alt=''
            fill
            sizes='100vw'
            className='object-cover'
            priority={index === 0}
            quality={85}
          />
        </div>
      ))}
    </div>
  )
}
