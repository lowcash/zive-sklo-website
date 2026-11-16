import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  size?: 'md' | 'lg'
}

/**
 * Container primitive: one max width and one gutter for the whole page.
 * `md` (narrow) is used by the legal pages only.
 */
export function Container({ children, size = 'lg' }: ContainerProps) {
  const sizeClasses = {
    md: 'max-w-4xl',
    lg: '',
  }

  return <div className={`wrap ${sizeClasses[size]}`}>{children}</div>
}
