import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * Container primitive: one max width and one gutter for the whole page.
 * Narrow sizes are used by the legal pages only.
 */
export function Container({ children, size = 'lg' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: '',
    xl: '',
    full: 'max-w-full',
  }

  return <div className={`wrap ${sizeClasses[size]}`}>{children}</div>
}
