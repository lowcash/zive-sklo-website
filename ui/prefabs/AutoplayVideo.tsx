'use client'

import { useEffect, useRef } from 'react'

type AutoplayVideoProps = {
  src: string
  poster: string
  ariaLabel: string
}

/**
 * AutoplayVideo - Client leaf
 * Ambient muted loop that starts before the section is fully in view.
 * No chrome controls; respects prefers-reduced-motion.
 */
export function AutoplayVideo({ src, poster, ariaLabel }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      return
    }

    const playSafe = () => {
      void video.play().catch(() => {
        // Autoplay may still be blocked on some browsers.
      })
    }

    // Warm the buffer early so the poster→frame swap is less noticeable.
    video.preload = 'auto'

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
  }, [])

  return (
    <video
      ref={videoRef}
      className='aspect-video w-full bg-[#0E0E0E] object-cover'
      muted
      loop
      playsInline
      autoPlay
      preload='auto'
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
