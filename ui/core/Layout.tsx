import type { ReactNode } from 'react'

export type StackProps = {
  children: ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

/**
 * Stack primitive - vertical flexbox layout with consistent spacing
 * NO BRAND STYLES - purely semantic layout primitive
 */
export function Stack({
  children,
  gap = 'md',
  align = 'stretch',
}: StackProps) {
  const gapClasses = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
    '2xl': 'gap-16',
    '3xl': 'gap-24',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  return (
    <div className={`flex flex-col ${gapClasses[gap]} ${alignClasses[align]}`}>
      {children}
    </div>
  )
}

export type GridProps = {
  children: ReactNode
  cols?: { base?: number; sm?: number; md?: number; lg?: number }
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

/**
 * Grid primitive - responsive grid layout
 * NO BRAND STYLES - purely semantic layout primitive
 */
export function Grid({
  children,
  cols = { base: 1, md: 2, lg: 3 },
  gap = 'md',
  align = 'stretch',
}: GridProps) {
  const gapClasses = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
    '2xl': 'gap-16',
    '3xl': 'gap-24',
  }

  // Build column classes with proper Tailwind classes
  const colClasses: string[] = []
  if (cols.base === 1) colClasses.push('grid-cols-1')
  if (cols.base === 2) colClasses.push('grid-cols-2')
  if (cols.base === 3) colClasses.push('grid-cols-3')
  if (cols.base === 4) colClasses.push('grid-cols-4')

  if (cols.sm === 1) colClasses.push('sm:grid-cols-1')
  if (cols.sm === 2) colClasses.push('sm:grid-cols-2')
  if (cols.sm === 3) colClasses.push('sm:grid-cols-3')
  if (cols.sm === 4) colClasses.push('sm:grid-cols-4')

  if (cols.md === 1) colClasses.push('md:grid-cols-1')
  if (cols.md === 2) colClasses.push('md:grid-cols-2')
  if (cols.md === 3) colClasses.push('md:grid-cols-3')
  if (cols.md === 4) colClasses.push('md:grid-cols-4')

  if (cols.lg === 1) colClasses.push('lg:grid-cols-1')
  if (cols.lg === 2) colClasses.push('lg:grid-cols-2')
  if (cols.lg === 3) colClasses.push('lg:grid-cols-3')
  if (cols.lg === 4) colClasses.push('lg:grid-cols-4')

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  return (
    <div
      className={`grid ${colClasses.join(' ')} ${gapClasses[gap]} ${alignClasses[align]}`}
    >
      {children}
    </div>
  )
}
