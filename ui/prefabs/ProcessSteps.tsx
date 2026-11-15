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
  const [highlightMode, setHighlightMode] = useState<'scroll' | 'hover' | 'none'>('hover')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1279px)')
    let rafId = 0

    const clearRaf = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      rafId = 0
    }

    const resolveActiveByViewport = () => {
      clearRaf()
      rafId = requestAnimationFrame(() => {
        const markerY = window.innerHeight * 0.5
        const activationRange = window.innerHeight * 0.24
        let nextIndex: number | null = null
        let bestDistance = Number.POSITIVE_INFINITY

        stepRefs.current.forEach((element, index) => {
          if (!element) {
            return
          }

          const rect = element.getBoundingClientRect()
          if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
            return
          }

          const centerY = rect.top + rect.height * 0.5
          const distance = Math.abs(centerY - markerY)

          if (distance > activationRange) {
            return
          }

          if (distance < bestDistance) {
            bestDistance = distance
            nextIndex = index
          }
        })

        setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex))
      })
    }

    const setupObservers = () => {
      clearRaf()
      window.removeEventListener('scroll', resolveActiveByViewport)
      window.removeEventListener('resize', resolveActiveByViewport)

      if (mobileQuery.matches) {
        setHighlightMode('scroll')
        setActiveIndex((currentIndex) => currentIndex ?? 0)
        resolveActiveByViewport()
        window.addEventListener('scroll', resolveActiveByViewport, {
          passive: true,
        })
        window.addEventListener('resize', resolveActiveByViewport)

        return
      }

      if (tabletQuery.matches) {
        setHighlightMode('none')
        setActiveIndex(null)
        return
      }

      setHighlightMode('hover')
      setActiveIndex(null)
    }

    setupObservers()
    mobileQuery.addEventListener('change', setupObservers)
    tabletQuery.addEventListener('change', setupObservers)

    return () => {
      window.removeEventListener('scroll', resolveActiveByViewport)
      window.removeEventListener('resize', resolveActiveByViewport)
      mobileQuery.removeEventListener('change', setupObservers)
      tabletQuery.removeEventListener('change', setupObservers)
      clearRaf()
    }
  }, [])

  const numeralTones = ['text-ember', 'text-amber', 'text-[oklch(0.82_0.08_160)]', 'text-ice']

  return (
    <div className='steps-line relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10 xl:grid-cols-4 xl:gap-10'>
      {steps.map((step, index) => {
        const isActive = activeIndex === index && highlightMode === 'scroll'
        return (
          <div
            key={step.number}
            ref={(el) => {
              stepRefs.current[index] = el
            }}
            data-testid='process-step'
            data-active={isActive ? 'true' : 'false'}
            className='group reveal relative flex h-full cursor-default flex-col'
          >
            {/* Outline numeral overlaps the card edge on all breakpoints. */}
            <span
              aria-hidden='true'
              className={`font-display pointer-events-none absolute top-0 left-5 z-10 -translate-y-[46%] text-[3.2rem] leading-none font-light tracking-[-0.03em] whitespace-nowrap transition-[color,-webkit-text-stroke-color] duration-300 [-webkit-text-stroke:1.5px_currentColor] sm:left-6 sm:text-[3.45rem] xl:left-8 xl:text-[3.6rem] ${numeralTones[index % numeralTones.length]} ${
                isActive ? '[-webkit-text-fill-color:currentColor]' : '[-webkit-text-fill-color:transparent]'
              } group-hover:[-webkit-text-fill-color:currentColor]`}
            >
              {step.number}
            </span>

            {/* Glass card body */}
            <div
              className={`glass flex min-h-53 flex-1 flex-col px-6 pt-9 pb-7 md:min-h-55 md:px-7 md:pt-12 md:pb-8 xl:min-h-60 xl:px-8 xl:pt-10 ${
                isActive ? 'bg-card-hi border-ice/40' : ''
              }`}
            >
              <h3 className='pb-3 text-xl font-semibold'>{applyCzechNbsp(step.title)}</h3>
              <p className='text-fg-2 text-sm leading-relaxed md:text-[0.95rem]'>{applyCzechNbsp(step.description)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
