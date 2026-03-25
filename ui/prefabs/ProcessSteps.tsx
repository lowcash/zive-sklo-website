'use client'

import { useEffect, useRef, useState } from 'react'

import { applyCzechNbsp } from '@/lib/utils'

type Step = {
  number: string
  title: string
  description: string
}

interface ProcessStepsProps {
  steps: Step[]
}

/**
 * ProcessSteps - Client leaf component for scroll-triggered step highlighting.
 * On mobile, the active step in the viewport is highlighted with amber border and coloured number.
 * On desktop, existing group-hover effects take over.
 */
export function ProcessSteps({ steps }: ProcessStepsProps) {
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let observers: IntersectionObserver[] = []
    const mediaQuery = window.matchMedia('(max-width: 1023px)')

    const clearObservers = () => {
      observers.forEach((observer) => observer.disconnect())
      observers = []
    }

    const setupObservers = () => {
      clearObservers()

      const isMobile = mediaQuery.matches
      setIsMobileViewport(isMobile)

      if (!isMobile) {
        setActiveIndex(null)
        return
      }

      stepRefs.current.forEach((el, index) => {
        if (!el) return

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveIndex(index)
            }
          },
          {
            threshold: 0.55,
            rootMargin: '-5% 0px -30% 0px',
          },
        )

        observer.observe(el)
        observers.push(observer)
      })
    }

    setupObservers()
    mediaQuery.addEventListener('change', setupObservers)

    return () => {
      mediaQuery.removeEventListener('change', setupObservers)
      clearObservers()
    }
  }, [])

  return (
    <div className='grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10 xl:grid-cols-4 xl:gap-12'>
      {steps.map((step, index) => {
        const isActive = isMobileViewport && activeIndex === index
        return (
          <div
            key={step.number}
            ref={(el) => {
              stepRefs.current[index] = el
            }}
            tabIndex={0}
            data-testid='process-step'
            className='group relative flex h-full flex-col focus-visible:outline-none'
          >
            {/* Number overlaps the card edge on all breakpoints. */}
            <span
              aria-hidden='true'
              className={`pointer-events-none absolute left-6 top-0 z-10 -translate-y-1/2 font-display text-5xl font-bold leading-none whitespace-nowrap transition-colors duration-300 md:left-8 md:text-6xl ${
                isActive
                  ? 'text-[#ffdf8a99]'
                  : 'text-[#e5e2e10f] group-hover:text-[#ffdf8a80] group-focus-visible:text-[#ffdf8a80]'
              }`}
            >
              {step.number}
            </span>

            {/* Bordered card body */}
            <div
              className={`flex min-h-[16rem] flex-1 flex-col border-t-2 bg-[#201f1f] px-8 pb-8 pt-10 transition-colors duration-300 lg:min-h-[17rem] xl:min-h-[18rem] ${
                isActive
                  ? 'border-[#ffbf00]'
                  : 'border-[#5045324d] group-hover:border-[#ffbf00] group-focus-visible:border-[#ffbf00]'
              }`}
            >
              <h3
                className={`pb-4 text-xl font-bold transition-colors duration-300 ${
                  isActive
                    ? 'text-[#ffdf8a]'
                    : 'group-hover:text-[#ffdf8a] group-focus-visible:text-[#ffdf8a]'
                }`}
              >
                {applyCzechNbsp(step.title)}
              </h3>
              <p className='leading-relaxed text-[#e5e2e199]'>
                {applyCzechNbsp(step.description)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
