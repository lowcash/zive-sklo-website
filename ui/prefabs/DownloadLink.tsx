'use client'

import type { FormEvent } from 'react'

import { Text } from '@/ui/core'

/**
 * DownloadLink - Client leaf component for download link with interaction
 */
export function DownloadLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (href === '#') {
      e.preventDefault()
      alert('Informační list bude brzy k dispozici.')
    }
  }

  return (
    <a
      href={href}
      className='inline-flex items-center gap-2 text-accent-ice hover:text-accent-amber transition-colors'
      onClick={handleClick}
    >
      <span>📄</span>
      <Text size='base' as='span'>
        {label}
      </Text>
    </a>
  )
}
