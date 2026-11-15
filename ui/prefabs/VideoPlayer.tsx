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
 * The source clip is a vertical phone reel (pillarboxed inside a 16:9 file), so the player
 * crops to the centre 9:16 band. Nothing is fetched or played until the visitor presses play.
 */
export function VideoPlayer({ src, poster, ariaLabel }: VideoPlayerProps) {
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const start = () => {
    setStarted(true)
    window.requestAnimationFrame(() => {
      const video = videoRef.current
      if (!video) {
        return
      }

      void video.play().catch(() => {
        // Playback blocked: the play/pause button stays available.
      })
    })
  }

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (video.paused) {
      void video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }

  return (
    <div className='border-line relative aspect-9/16 overflow-hidden border bg-black md:ml-auto md:max-w-sm'>
      {started ? (
        <video
          ref={videoRef}
          className='absolute top-0 left-1/2 h-full max-w-none -translate-x-1/2'
          style={{ aspectRatio: '16 / 9' }}
          playsInline
          preload='auto'
          poster={poster}
          aria-label={ariaLabel}
          muted={muted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src={src} type='video/mp4' />
        </video>
      ) : (
        <>
          <Image
            src={poster}
            alt=''
            fill
            sizes='(min-width: 768px) 24rem, 22rem'
            className='object-cover'
            quality={80}
          />
          <div
            className='absolute inset-0 bg-[linear-gradient(to_top,rgb(20_17_14/0.55),transparent_50%)]'
            aria-hidden='true'
          />
          <button
            type='button'
            data-testid='video-play'
            onClick={start}
            aria-label={`Přehrát: ${ariaLabel}`}
            className='border-fg/70 bg-bg/60 text-fg hover:bg-ember hover:text-on-ember hover:border-ember absolute inset-0 m-auto grid size-20 place-items-center rounded-full border backdrop-blur-sm transition-colors duration-240 ease-out'
          >
            <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='ml-1 size-6'>
              <path d='M6 4l14 8-14 8z' />
            </svg>
          </button>
        </>
      )}
      {started ? (
        <div className='absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-[linear-gradient(to_top,rgb(20_17_14/0.8),transparent)] p-3 pt-10'>
          <button
            type='button'
            onClick={togglePlayback}
            aria-label={playing ? 'Pozastavit video' : 'Přehrát video'}
            className='border-fg/60 bg-bg/70 text-fg grid size-11 place-items-center rounded-full border'
          >
            <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='size-4'>
              {playing ? <path d='M6 4h4v16H6zM14 4h4v16h-4z' /> : <path d='M6 4l14 8-14 8z' />}
            </svg>
          </button>
          <button
            type='button'
            onClick={() => setMuted((value) => !value)}
            aria-pressed={muted}
            className='border-fg/60 bg-bg/70 text-fg text-step--1 min-h-11 border px-4 font-semibold tracking-[0.08em] uppercase'
          >
            {muted ? 'Zapnout zvuk' : 'Ztlumit'}
          </button>
        </div>
      ) : null}
    </div>
  )
}
