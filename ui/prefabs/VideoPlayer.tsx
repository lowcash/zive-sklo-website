'use client'

import { useRef, useState } from 'react'

import Image from 'next/image'

type VideoPlayerProps = {
  src: string
  poster: string
  ariaLabel: string
}

/**
 * VideoPlayer - Client leaf
 * Poster plus play button. Nothing is fetched or played until the visitor
 * presses play (no autoplay anywhere, so reduced-motion users are safe too).
 */
export function VideoPlayer({ src, poster, ariaLabel }: VideoPlayerProps) {
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const start = () => {
    setStarted(true)
    window.requestAnimationFrame(() => {
      const video = videoRef.current
      if (!video) {
        return
      }

      video.focus()
      void video.play().catch(() => {
        // The native controls stay available if playback is blocked.
      })
    })
  }

  return (
    <div className='border-line relative aspect-video overflow-hidden border bg-black'>
      {started ? (
        <video
          ref={videoRef}
          className='h-full w-full object-cover'
          controls
          playsInline
          preload='auto'
          poster={poster}
          aria-label={ariaLabel}
        >
          <source src={src} type='video/mp4' />
        </video>
      ) : (
        <>
          <Image
            src={poster}
            alt=''
            fill
            sizes='(min-width: 1024px) 64rem, 100vw'
            className='object-cover opacity-80'
            quality={80}
          />
          <button
            type='button'
            data-testid='video-play'
            onClick={start}
            aria-label={`Přehrát: ${ariaLabel}`}
            className='border-fg/50 bg-card text-fg hover:bg-amber/85 hover:text-on-amber shadow-glow-amber absolute inset-0 m-auto grid size-21 place-items-center rounded-full border transition-colors duration-280 ease-out'
          >
            <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='ml-1 size-6'>
              <path d='M6 4l14 8-14 8z' />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
