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

export { HeroSection } from './HeroSection'
export { AboutSection } from './AboutSection'
export { ProcessSection } from './ProcessSection'
export { OfferSection } from './OfferSection'
export { AudienceSection } from './AudienceSection'

export { StatsSection } from './StatsSection'

export { GallerySection } from './GallerySection'

export { BenefitsSection } from './BenefitsSection'

export { ContactSection } from './ContactSection'

export { FooterSection } from './FooterSection'
export { ScrollToTopButton } from './ScrollToTopButton'
