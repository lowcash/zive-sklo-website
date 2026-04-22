'use client'

import type { MouseEvent, ReactNode } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type PolicyLinkProps = {
  href: string
  className?: string
  children: ReactNode
}

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

function buildPolicyHref(href: string) {
  const targetUrl = new URL(href, window.location.origin)
  const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`

  targetUrl.searchParams.set('returnTo', returnTo)

  return `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`
}

export function PolicyLink({ href, className, children }: PolicyLinkProps) {
  const router = useRouter()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || isModifiedEvent(event)) {
      return
    }

    event.preventDefault()
    router.push(buildPolicyHref(href))
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
