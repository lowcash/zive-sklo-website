import type { ReactNode } from 'react'

export type ContainerProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * Container primitive - provides consistent max-width and horizontal padding
 * NO BRAND STYLES - purely semantic layout container
 */
export function Container({ children, size = 'lg' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]}`}>
      {children}
    </div>
  )
}
