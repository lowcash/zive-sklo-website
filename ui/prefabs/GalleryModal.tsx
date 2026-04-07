'use client'

import Image from 'next/image'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type GalleryModalProps = {
  images: string[]
  alts?: string[]
  activeImageIndex: number | null
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void
  onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void
}

export function GalleryModal({
  images,
  alts = [],
  activeImageIndex,
  onClose,
  onPrevious,
  onNext,
  onTouchStart,
  onTouchEnd,
}: GalleryModalProps) {
  if (images.length === 0) {
    return null
  }

  const currentImageIndex = activeImageIndex ?? 0
  const currentAlt = alts[currentImageIndex] ?? `Galerie živého skla ${currentImageIndex + 1}`

  return (
    <AnimatePresence>
      {activeImageIndex !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-70 flex cursor-pointer items-center justify-center bg-black/72 p-4 backdrop-blur-sm sm:p-6 md:p-8'
          role='dialog'
          aria-modal='true'
          aria-label='Náhled galerie'
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className='group relative flex w-full max-w-5xl cursor-default items-center justify-center'
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className='relative w-full overflow-hidden rounded-2xl bg-[#090909] shadow-[0_20px_60px_rgba(0,0,0,0.5)]'
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <button
                type='button'
                onClick={onClose}
                className='absolute top-3 right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white/90 transition hover:bg-black/60 focus:outline-none focus-visible:ring-0 focus-visible:outline-none lg:opacity-0 lg:group-hover:opacity-100'
                aria-label='Zavřít náhled'
              >
                <X className='h-5 w-5' />
              </button>

              <button
                type='button'
                onClick={onPrevious}
                className='absolute top-1/2 left-3 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white/90 transition hover:bg-black/60 focus:outline-none focus-visible:ring-0 focus-visible:outline-none md:flex lg:opacity-0 lg:group-hover:opacity-100'
                aria-label='Předchozí fotografie'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>

              <button
                type='button'
                onClick={onNext}
                className='absolute top-1/2 right-3 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white/90 transition hover:bg-black/60 focus:outline-none focus-visible:ring-0 focus-visible:outline-none md:flex lg:opacity-0 lg:group-hover:opacity-100'
                aria-label='Další fotografie'
              >
                <ChevronRight className='h-5 w-5' />
              </button>

              <div className='relative h-[56vh] min-h-70 w-full sm:h-[62vh] lg:h-[68vh]'>
                <Image
                  src={images[currentImageIndex]}
                  alt={currentAlt}
                  fill
                  quality={90}
                  className='object-contain p-2 sm:p-3 md:p-4'
                  sizes='(min-width: 1280px) 1120px, (min-width: 768px) 88vw, 94vw'
                  priority
                />
              </div>

              <p className='sr-only'>{currentAlt}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
