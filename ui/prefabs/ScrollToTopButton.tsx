'use client'

import { useEffect, useState } from 'react'

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 700)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <button
      type='button'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label='Posunout na začátek stránky'
      className='fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#50453266] bg-[rgba(28,27,27,0.82)] text-[#E5E2E1] backdrop-blur-[20px] transition-colors duration-300 hover:bg-[#ffbf00] hover:text-[#402d00] md:bottom-8 md:right-8'
    >
      <span className='material-symbols-outlined !text-[24px]'>
        arrow_upward
      </span>
    </button>
  )
}