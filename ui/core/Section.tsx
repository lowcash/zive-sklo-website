import { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  id?: string
  'aria-labelledby'?: string
  spacing?: 'sm' | 'md' | 'lg'
  tone?: 'ink' | 'light' | 'paper'
}

/**
 * Section shell primitive: semantic wrapper with one vertical rhythm and a surface tone.
 * Sections alternate between ink (dark) and light/paper (ivory) tones.
 */
export function Section({
  children,
  id,
  'aria-labelledby': ariaLabelledBy,
  spacing = 'lg',
  tone = 'ink',
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-10 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-(--section-y)',
  }

  const toneClasses = {
    ink: 'surface-ink',
    light: 'surface-light',
    paper: 'surface-paper',
  }

  return (
    <section id={id} aria-labelledby={ariaLabelledBy} className={`${spacingClasses[spacing]} ${toneClasses[tone]}`}>
      {children}
    </section>
  )
}
