import type { ReactNode } from 'react'

export type CenterProps = {
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * Center primitive - horizontally centered block with optional max-width
 * Used for wrapped heading + subtitle groups, centered text blocks
 * NO BRAND STYLES - purely semantic layout center
 */
export function Center({ children, maxWidth = 'lg' }: CenterProps) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
  }

  return <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>{children}</div>
}
