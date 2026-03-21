'use client'

import { useRef } from 'react'

import Image from 'next/image'

/**
 * GalleryScroll - Client leaf component for horizontal momentum scroll
 * Handles browser scroll APIs
 */
export function GalleryScroll({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto overflow-y-hidden scrollbar-hide"
      style={{
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="flex gap-6 px-6 md:px-12 pb-6">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="flex-none w-[280px] md:w-[340px] aspect-[3/4] rounded-xl overflow-hidden"
            style={{ scrollSnapAlign: "start" }}
          >
            <Image
              src={src}
              alt={`Galerie ${index + 1}`}
              width={340}
              height={453}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              quality={85}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
