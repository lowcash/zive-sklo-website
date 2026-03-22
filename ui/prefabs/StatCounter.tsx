'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * StatCounter - Client leaf component for count-up animation
 * Animates on first view using Intersection Observer
 */
/**
 * StatCounter - Client leaf component for count-up animation
 * Animates on first view using Intersection Observer
 */
export function StatCounter({ value }: { value: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative z-10 font-display text-6xl font-bold text-accent-amber transition-opacity duration-700 md:text-7xl ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {value}
    </div>
  )
}
