/**
 * Prefab Components
 *
 * Branded, composed components built from core primitives.
 * These components contain brand-specific styling and content structure.
 *
 * Architecture Rules:
 * - Section-level components are RSC (Server Components)
 * - Only smallest interactive leaf components use 'use client'
 * - Browser APIs allowed ONLY in client leaf components
 * - NO upward propagation of client boundaries
 */

export { Navigation } from './Navigation'
export { MobileMenu } from './MobileMenu'

export { HeroSection } from './HeroSection'
export { HeroCarousel } from './HeroCarousel'

export { AboutSection } from './AboutSection'
export { ProcessSection } from './ProcessSection'
export { ProcessSteps } from './ProcessSteps'
export { OfferSection } from './OfferSection'
export { AudienceSection } from './AudienceSection'

export { StatsSection } from './StatsSection'
export { StatCounter } from './StatCounter'

export { GallerySection } from './GallerySection'
export { GalleryScroll } from './GalleryScroll'

export { BenefitsSection } from './BenefitsSection'
export { DownloadLink } from './DownloadLink'

export { ContactSection } from './ContactSection'
export { ContactForm } from './ContactForm'

export { FooterSection } from './FooterSection'
export { ScrollToTopButton } from './ScrollToTopButton'

export { EntranceAnimation } from './EntranceAnimation'
