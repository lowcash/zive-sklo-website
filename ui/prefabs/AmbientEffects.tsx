'use client'

import { useEffect } from 'react'

import { parseTemp, scrollHeat } from '@/lib/heat'

/**
 * AmbientEffects - Client leaf, renders nothing.
 * 1. Temperature driver for the "--heat" variable (see design spec section 1):
 *    - native scroll timelines + motion allowed: CSS does everything, JS stays idle
 *    - no timeline support + motion allowed: rAF-throttled passive scroll listener
 *    - reduced motion: stepped values from [data-temp] sections, never a tween
 * 2. Pointer glow on .glass cards (fine pointers, motion allowed only).
 */
export function AmbientEffects() {
  useEffect(() => {
    const root = document.documentElement
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const nativeTimeline = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()')

    let frameId = 0
    let observer: IntersectionObserver | null = null
    let cleanupMode: () => void = () => {}

    const setHeat = (value: number) => root.style.setProperty('--heat', value.toFixed(3))

    const applyMode = () => {
      cleanupMode()
      root.style.removeProperty('--heat')

      if (motionQuery.matches) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const temp = parseTemp(entry.target instanceof HTMLElement ? entry.target.dataset.temp : undefined)
              if (entry.isIntersecting && temp !== null) {
                setHeat(temp)
              }
            })
          },
          { rootMargin: '-45% 0px -50% 0px' },
        )
        document.querySelectorAll('[data-temp]').forEach((element) => observer?.observe(element))

        const onBottom = () => {
          if (window.innerHeight + window.scrollY >= root.scrollHeight - 4) {
            setHeat(1)
          }
        }
        setHeat(0)
        window.addEventListener('scroll', onBottom, { passive: true })
        cleanupMode = () => {
          observer?.disconnect()
          observer = null
          window.removeEventListener('scroll', onBottom)
        }
        return
      }

      if (nativeTimeline) {
        cleanupMode = () => {}
        return
      }

      const update = () => setHeat(scrollHeat(window.scrollY, root.scrollHeight, window.innerHeight))
      const onScroll = () => {
        if (!frameId) {
          frameId = window.requestAnimationFrame(() => {
            frameId = 0
            update()
          })
        }
      }
      update()
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanupMode = () => {
        window.removeEventListener('scroll', onScroll)
        if (frameId) {
          window.cancelAnimationFrame(frameId)
          frameId = 0
        }
      }
    }

    applyMode()
    motionQuery.addEventListener('change', applyMode)

    const onPointerMove = (event: PointerEvent) => {
      if (motionQuery.matches || !(event.target instanceof Element)) {
        return
      }

      const card = event.target.closest<HTMLElement>('.glass')
      if (!card) {
        return
      }

      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (finePointer) {
      document.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    return () => {
      cleanupMode()
      motionQuery.removeEventListener('change', applyMode)
      document.removeEventListener('pointermove', onPointerMove)
      root.style.removeProperty('--heat')
    }
  }, [])

  return null
}
