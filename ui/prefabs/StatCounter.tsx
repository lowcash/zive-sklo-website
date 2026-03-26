'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  numericValue: number
  suffix?: string
  durationMs?: number
}

/**
 * StatCounter - Client leaf component for count-up animation.
 * Animates once when the element first enters the viewport.
 * Respects prefers-reduced-motion: shows final value instantly without animating.
 */
export function StatCounter({ numericValue, suffix = '', durationMs = 1200 }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || hasAnimated) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setHasAnimated(true)
        observer.disconnect()

        if (prefersReducedMotion) {
          setDisplayValue(numericValue)
          return
        }

        const start = performance.now()
        const frame = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1)
          // Cubic ease-out for natural deceleration
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplayValue(Math.round(numericValue * eased))
          if (progress < 1) requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [durationMs, hasAnimated, numericValue])

  return (
    <div
      ref={ref}
      data-testid="stat-counter"
      className="font-display text-accent-amber relative z-10 inline-flex max-w-full items-baseline justify-center text-[3rem] leading-none font-bold tracking-tight whitespace-nowrap sm:text-[3.25rem] md:text-[3rem] lg:text-[3rem] xl:text-7xl"
    >
      <span data-testid="stat-value">{displayValue.toLocaleString('cs-CZ')}</span>
      <span data-testid="stat-suffix" className="whitespace-nowrap text-[0.82em]">
        {suffix.replace(/^\s+/, '\u00A0')}
      </span>
    </div>
  )
}
