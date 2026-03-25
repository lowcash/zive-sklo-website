'use client'

import { useEffect, useRef, useState } from 'react'

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

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
          // On desktop the grid shows all cards at once – only scroll-trigger on mobile (narrow viewport)
          rootMargin: '-5% 0px -30% 0px',
        },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  return (
    <div className='grid grid-cols-1 gap-12 md:grid-cols-4'>
      {steps.map((step, index) => {
        const isActive = activeIndex === index
        return (
          <div
            key={step.number}
            ref={(el) => {
              stepRefs.current[index] = el
            }}
            tabIndex={0}
            className='group flex flex-col focus-visible:outline-none'
          >
            {/* Number sits above the bordered box – never crossed by the border line */}
            <span
              aria-hidden='true'
              className={`block pb-2 pl-8 font-display text-6xl font-bold leading-none transition-colors duration-300 ${
                isActive
                  ? 'text-[#ffbf0033]'
                  : 'text-[#e5e2e10d] group-hover:text-[#ffbf0033] group-focus-visible:text-[#ffbf0033]'
              }`}
            >
              {step.number}
            </span>

            {/* Bordered card body */}
            <div
              className={`border-t-2 bg-[#201f1f] p-8 transition-colors duration-300 ${
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
                {step.title}
              </h3>
              <p className='leading-relaxed text-[#e5e2e199]'>{step.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
