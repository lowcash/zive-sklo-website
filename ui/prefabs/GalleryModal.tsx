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

  return (
    <AnimatePresence>
      {activeImageIndex !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[70] flex cursor-default items-center justify-center bg-black/70 p-4 backdrop-blur-md md:p-8'
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
            className='relative flex w-full max-w-5xl cursor-default items-center justify-center'
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type='button'
              onClick={onClose}
              className='absolute top-3 right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65'
              aria-label='Zavřít náhled'
            >
              <X className='h-5 w-5' />
            </button>

            <button
              type='button'
              onClick={onPrevious}
              className='absolute left-3 z-10 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 md:flex'
              aria-label='Předchozí fotografie'
            >
              <ChevronLeft className='h-5 w-5' />
            </button>

            <div
              className='relative w-full overflow-hidden rounded-2xl'
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className='relative aspect-4/3 max-h-[82vh] w-full'>
                <Image
                  src={images[activeImageIndex]}
                  alt={alts[activeImageIndex] ?? `Galerie živého skla ${activeImageIndex + 1}`}
                  fill
                  quality={90}
                  className='object-contain'
                  sizes='(min-width: 1280px) 1200px, 92vw'
                  priority
                />
              </div>
            </div>

            <button
              type='button'
              onClick={onNext}
              className='absolute right-3 z-10 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65 md:flex'
              aria-label='Další fotografie'
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
