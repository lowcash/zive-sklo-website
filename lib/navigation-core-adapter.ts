import { NAV } from '@/lib/content'
import {
  buildSectionBoundaries,
  buildSectionUrl,
  computeActiveSection,
  createSectionRegistry,
  normalizeHash,
  resolveScrollBehavior,
  shouldWriteSectionUrl,
} from '@/packages/navigation-core'
import type { HashWriteMode, ScrollTargetOptions } from '@/packages/navigation-core'

const TOP_SECTION_ID = 'top'
const NAV_SECTION_IDS = NAV.links.map((link) => link.href.replace('#', ''))
const navSectionRegistry = createSectionRegistry({ sectionIds: NAV_SECTION_IDS })

function getCurrentUrl() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

function toHref(sectionId: string) {
  return `#${sectionId}`
}

function normalizeHrefToSectionId(href: string) {
  const normalizedHref = href.startsWith('#') ? href : `#${href}`
  const normalizedHash = normalizeHash(normalizedHref)
  if (!normalizedHash) {
    return null
  }

  if (normalizedHash === TOP_SECTION_ID) {
    return TOP_SECTION_ID
  }

  return navSectionRegistry.parseSectionId(normalizedHash)
}

export function setSectionHash(href: string, mode: HashWriteMode = 'replace') {
  const sectionId = normalizeHrefToSectionId(href)
  if (!sectionId) {
    return false
  }

  const nextUrl = buildSectionUrl({
    pathname: window.location.pathname,
    search: window.location.search,
    sectionId,
    clearSectionId: TOP_SECTION_ID,
  })

  if (!shouldWriteSectionUrl(getCurrentUrl(), nextUrl)) {
    return true
  }

  if (mode === 'push') {
    window.history.pushState(null, '', nextUrl)
  } else {
    window.history.replaceState(null, '', nextUrl)
  }

  return true
}

export function scrollToHashWithOffset(
  href: string,
  {
    navSelector = 'nav[data-nav-root="true"]',
    behavior = 'smooth',
    updateHash = true,
  }: ScrollTargetOptions & { navSelector?: string } = {},
) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  const sectionId = normalizeHrefToSectionId(href)
  if (!sectionId) {
    return false
  }

  const target = document.getElementById(sectionId)
  if (!target) {
    return false
  }

  const resolvedBehavior = resolveScrollBehavior(
    behavior,
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const nav = document.querySelector<HTMLElement>(navSelector)
  const navHeight = nav?.getBoundingClientRect().height ?? 0
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight

  window.scrollTo({
    top: Math.max(0, Math.round(targetTop)),
    behavior: resolvedBehavior,
  })

  if (updateHash) {
    setSectionHash(toHref(sectionId), 'replace')
  }

  return true
}

export function resolveActiveHref() {
  const boundaries = buildSectionBoundaries({
    sectionIds: NAV_SECTION_IDS,
    resolveOffsetTop: (sectionId) => {
      const section = document.getElementById(sectionId)
      if (!section) {
        return null
      }

      return section.offsetTop
    },
  })

  const activeSectionId = computeActiveSection({
    scrollY: window.scrollY,
    sections: boundaries,
    offset: window.innerHeight * 0.45,
    innerHeight: window.innerHeight,
    documentHeight: document.documentElement.scrollHeight,
  })

  return activeSectionId ? toHref(activeSectionId) : ''
}
