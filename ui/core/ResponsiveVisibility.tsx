import { ReactNode } from 'react'

export type ResponsiveVisibilityProps = {
  children: ReactNode
  hideOn?: ('sm' | 'md' | 'lg' | 'xl')[]
  showOn?: ('sm' | 'md' | 'lg' | 'xl')[]
  className?: string
}

/**
 * Responsive visibility primitive - controls element visibility by breakpoint
 * NO BRAND STYLES - purely semantic responsive utility
 * Avoids hydration anti-patterns by using CSS display utilities
 */
export function ResponsiveVisibility({
  children,
  hideOn = [],
  showOn = [],
  className = '',
}: ResponsiveVisibilityProps) {
  let visibilityClasses = ''

  // If showOn is specified, hide by default and show on specified breakpoints
  if (showOn.length > 0) {
    visibilityClasses = 'hidden'
    if (showOn.includes('sm')) visibilityClasses += ' sm:block'
    if (showOn.includes('md')) visibilityClasses += ' md:block'
    if (showOn.includes('lg')) visibilityClasses += ' lg:block'
    if (showOn.includes('xl')) visibilityClasses += ' xl:block'
  }

  // If hideOn is specified, hide on specified breakpoints
  if (hideOn.length > 0) {
    if (hideOn.includes('sm')) visibilityClasses += ' sm:hidden'
    if (hideOn.includes('md')) visibilityClasses += ' md:hidden'
    if (hideOn.includes('lg')) visibilityClasses += ' lg:hidden'
    if (hideOn.includes('xl')) visibilityClasses += ' xl:hidden'
  }

  return <div className={`${visibilityClasses} ${className}`}>{children}</div>
}
