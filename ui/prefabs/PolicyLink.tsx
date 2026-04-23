'use client'

import type { MouseEvent, ReactNode } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { appendReturnToParam } from '@/lib/return-to'

type PolicyLinkProps = {
  href: string
  className?: string
  children: ReactNode
}

export function PolicyLink({ href, className, children }: PolicyLinkProps) {
  const router = useRouter()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!shouldHandleClientNavigation(event)) {
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

function shouldHandleClientNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return !event.defaultPrevented && event.button === 0 && !isModifiedEvent(event)
}

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

function buildPolicyHref(href: string) {
  return appendReturnToParam(href, getCurrentReturnTo())
}

function getCurrentReturnTo() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}
