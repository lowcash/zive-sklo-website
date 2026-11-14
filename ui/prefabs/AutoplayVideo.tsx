'use client'

import { useEffect, useRef, useState } from 'react'

type AutoplayVideoProps = {
  src: string
  poster: string
  ariaLabel: string
}

/**
 * AutoplayVideo - Client leaf
 * Ambient muted loop that starts when approaching the viewport.
 * No chrome controls; respects prefers-reduced-motion (poster only).
 * Uses preload=metadata to avoid fetching the full MP4 up front.
 */
export function AutoplayVideo({ src, poster, ariaLabel }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduceMotion(motionQuery.matches)
    syncMotion()
    motionQuery.addEventListener('change', syncMotion)
    return () => motionQuery.removeEventListener('change', syncMotion)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduceMotion) {
      return
    }

    const playSafe = () => {
      void video.play().catch(() => {
        // Autoplay may still be blocked on some browsers.
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return
        }

        if (entry.isIntersecting) {
          playSafe()
          return
        }

        video.pause()
      },
      {
        // Start while the section is still approaching.
        rootMargin: '45% 0px 20% 0px',
        threshold: [0, 0.05, 0.2],
      },
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [reduceMotion])

  if (reduceMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- decorative poster fallback for reduced motion
      <img
        src={poster}
        alt=''
        className='aspect-video w-full bg-[#0E0E0E] object-cover'
        aria-hidden='true'
      />
    )
  }

  return (
    <video
      ref={videoRef}
      className='aspect-video w-full bg-[#0E0E0E] object-cover'
      muted
      loop
      playsInline
      preload='metadata'
      poster={poster}
      aria-label={ariaLabel}
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
    >
      <source src={src} type='video/mp4' />
    </video>
  )
}
