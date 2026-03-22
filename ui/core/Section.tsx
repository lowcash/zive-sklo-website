import { ReactNode } from 'react'

export type SectionProps = {
  children: ReactNode
  id?: string
  'aria-labelledby'?: string
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  surface?: 'none' | 'subtle'
}

/**
 * Section shell primitive - semantic section wrapper.
 */
export function Section({
  children,
  id,
  'aria-labelledby': ariaLabelledBy,
  spacing = 'lg',
  surface = 'none',
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32',
  }

  const surfaceClasses = {
    none: '',
    subtle: 'bg-[#1c1b1b]',
  }

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`${spacingClasses[spacing]} ${surfaceClasses[surface]}`}
    >
      {children}
    </section>
  )
}
