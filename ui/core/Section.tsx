import { ReactNode } from 'react'

type SectionProps = {
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
    sm: 'py-10 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-(--section-y)',
    xl: 'py-(--section-y)',
  }

  const surfaceClasses = {
    none: '',
    subtle: 'bg-scrim',
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
