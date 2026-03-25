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
          className='fixed inset-0 z-[70] flex cursor-pointer items-center justify-center bg-black/78 p-4 backdrop-blur-md sm:p-6 xl:p-8'
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
            className='relative flex w-full max-w-6xl cursor-default flex-col gap-3 rounded-[28px] border border-white/10 bg-[#141414]/96 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:gap-4 sm:p-4'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='flex items-center justify-between gap-4 rounded-[20px] bg-white/4 px-4 py-3'>
              <div className='min-w-0'>
                <p className='font-label text-[11px] uppercase tracking-[0.18em] text-white/60'>
                  Galerie
                </p>
                <p className='truncate text-sm text-white/85 sm:text-base'>
                  {currentImageIndex + 1} / {images.length}
                </p>
              </div>

              <button
                type='button'
                onClick={onClose}
                className='flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/8 text-white transition hover:bg-white/16'
                aria-label='Zavřít náhled'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            <div
              className='relative w-full overflow-hidden rounded-[24px] bg-[#0b0b0b]'
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className='relative h-[58vh] min-h-[280px] w-full sm:h-[64vh] lg:h-[70vh]'>
                <Image
                  src={images[currentImageIndex]}
                  alt={currentAlt}
                  fill
                  quality={90}
                  className='object-contain p-2 sm:p-4'
                  sizes='(min-width: 1440px) 1280px, (min-width: 1024px) 88vw, 94vw'
                  priority
                />
              </div>
            </div>

            <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[20px] bg-white/4 p-2 sm:gap-3'>
              <button
                type='button'
                onClick={onPrevious}
                className='flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/8 text-white transition hover:bg-white/16'
                aria-label='Předchozí fotografie'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>

              <p className='truncate px-2 text-center text-sm text-white/72 sm:text-base'>
                {currentAlt}
              </p>

              <button
                type='button'
                onClick={onNext}
                className='flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/8 text-white transition hover:bg-white/16'
                aria-label='Další fotografie'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
