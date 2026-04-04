'use client'

import { Text } from '@/ui/core'

/**
 * DownloadLink - Client leaf component for download link with interaction
 */
export function DownloadLink({ href, label }: { href: string; label: string }) {
  if (href === '#') {
    return (
      <span
        aria-disabled="true"
        className="inline-flex cursor-not-allowed items-center gap-2 text-[#e5e2e180]"
      >
        <span aria-hidden="true">📄</span>
        <Text size="base" as="span">
          {label}
        </Text>
      </span>
    )
  }

  return (
    <a
      href={href}
      className="group text-accent-ice hover:text-accent-amber inline-flex items-center gap-2 transition-colors duration-200"
    >
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5">
        📄
      </span>
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
        <Text size="base" as="span">
          {label}
        </Text>
      </span>
    </a>
  )
}
