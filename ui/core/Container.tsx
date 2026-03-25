import type { ReactNode } from 'react'

export type ContainerProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * Container primitive aligned to reference layout rhythm.
 */
export function Container({ children, size = 'lg' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-[1440px]',
    xl: 'max-w-[1440px]',
    full: 'max-w-full',
  }

  return <div className={`mx-auto px-6 md:px-20 ${sizeClasses[size]}`}>{children}</div>
}
