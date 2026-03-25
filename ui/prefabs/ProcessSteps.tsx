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
  const [highlightMode, setHighlightMode] = useState<'scroll' | 'tap' | 'hover'>('hover')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let observers: IntersectionObserver[] = []
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const tabletTouchQuery = window.matchMedia(
      '(min-width: 768px) and (max-width: 1279px) and (hover: none) and (pointer: coarse)',
    )

    const clearObservers = () => {
      observers.forEach((observer) => observer.disconnect())
      observers = []
    }

    const setupObservers = () => {
      clearObservers()

      if (mobileQuery.matches) {
        setHighlightMode('scroll')
        setActiveIndex((currentIndex) => currentIndex ?? 0)

        stepRefs.current.forEach((el, index) => {
          if (!el) return

          const observer = new IntersectionObserver(
            (entries) => {
              const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0]

              if (visibleEntry) {
                setActiveIndex(index)
              }
            },
            {
              threshold: [0.35, 0.55, 0.75],
              rootMargin: '-8% 0px -32% 0px',
            },
          )

          observer.observe(el)
          observers.push(observer)
        })

        return
      }

      if (tabletTouchQuery.matches) {
        setHighlightMode('tap')
        setActiveIndex((currentIndex) => currentIndex ?? 0)
        return
      }

      setHighlightMode('hover')
      setActiveIndex(null)
    }

    setupObservers()
    mobileQuery.addEventListener('change', setupObservers)
    tabletTouchQuery.addEventListener('change', setupObservers)

    return () => {
      mobileQuery.removeEventListener('change', setupObservers)
      tabletTouchQuery.removeEventListener('change', setupObservers)
      clearObservers()
    }
  }, [])

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 xl:grid-cols-4 xl:gap-10'>
      {steps.map((step, index) => {
        const isActive = activeIndex === index && highlightMode !== 'hover'
        return (
          <div
            key={step.number}
            ref={(el) => {
              stepRefs.current[index] = el
            }}
            tabIndex={0}
            data-testid='process-step'
            className='group relative flex h-full cursor-pointer flex-col focus-visible:outline-none'
            onPointerDown={() => {
              if (highlightMode === 'tap') {
                setActiveIndex(index)
              }
            }}
            onFocus={() => {
              if (highlightMode === 'tap') {
                setActiveIndex(index)
              }
            }}
          >
            {/* Number overlaps the card edge on all breakpoints. */}
            <span
              aria-hidden='true'
              className={`pointer-events-none absolute left-5 top-0 z-10 -translate-y-[52%] font-display text-[2.9rem] font-bold leading-none tracking-[-0.05em] whitespace-nowrap drop-shadow-[0_8px_18px_rgba(0,0,0,0.32)] transition-colors duration-300 sm:left-6 sm:text-[3.2rem] md:left-5 md:text-[3rem] lg:text-[3.3rem] xl:left-8 xl:text-[4rem] ${
                isActive
                  ? 'text-[#ffd66f]'
                  : 'text-[#8f7442] group-hover:text-[#d9bd7c] group-focus-visible:text-[#d9bd7c]'
              }`}
            >
              {step.number}
            </span>

            {/* Bordered card body */}
            <div
              className={`flex min-h-[13.5rem] flex-1 flex-col border-t-2 bg-[#201f1f] px-6 pb-7 pt-8 transition-colors duration-300 md:min-h-[14.25rem] md:px-7 md:pb-8 md:pt-8 xl:min-h-[15.5rem] xl:px-8 xl:pt-9 ${
                isActive
                  ? 'border-[#ffbf00]'
                  : 'border-[#5045324d] group-hover:border-[#ffbf00] group-focus-visible:border-[#ffbf00]'
              }`}
            >
              <h3
                className={`pb-3 text-xl font-bold transition-colors duration-300 ${
                  isActive
                    ? 'text-[#ffdf8a]'
                    : 'group-hover:text-[#ffdf8a] group-focus-visible:text-[#ffdf8a]'
                }`}
              >
                {applyCzechNbsp(step.title)}
              </h3>
              <p className='text-sm leading-relaxed text-[#e5e2e199] md:text-[0.95rem]'>
                {applyCzechNbsp(step.description)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
