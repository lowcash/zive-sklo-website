import type { ReactNode } from 'react'

export type BlockProps = {
  children: ReactNode
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  textAlign?: 'left' | 'center' | 'right'
}

/**
 * Block primitive - vertical spacing without flexbox
 * Used for simple wrapper divs and heading/content groups
 * NO BRAND STYLES - purely semantic layout block
 */
export function Block({ children, spacing = 'md', textAlign = 'left' }: BlockProps) {
  const spacingClasses = {
    xs: 'space-y-2',
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12',
    '2xl': 'space-y-16',
    '3xl': 'space-y-24',
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return <div className={`${spacingClasses[spacing]} ${alignClasses[textAlign]}`}>{children}</div>
}
