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
      className={`text-6xl md:text-7xl font-display font-bold text-accent-amber transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {value}
    </div>
  )
}
