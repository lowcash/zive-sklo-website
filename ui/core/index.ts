/**
 * Core UI Primitives
 *
 * These are unbranded, semantic primitives that provide the foundation
 * for building the application. They contain NO brand-specific styles
 * and should be consumed by prefabs in ui/prefabs.
 *
 * Architecture Rules:
 * - NO brand colors, fonts, or visual identity in these components
 * - Pure semantic HTML with minimal, reusable styling
 * - Props should support variant/spacing/alignment but not brand decisions
 * - These components are the "building blocks" layer
 *
 * RSC/Client Boundary Conventions:
 * - Most primitives are Server Components by default
 * - Only interactive leaf components (like form fields, buttons with client logic)
 *   should use 'use client' directive
 * - NO section-level or parent-level components should propagate client boundaries
 * - Browser APIs allowed ONLY in smallest interactive leaf components
 */

export { Container } from './Container'
export type { ContainerProps } from './Container'

export { Stack, Grid } from './Layout'
export type { StackProps, GridProps } from './Layout'

export { Block } from './Block'
export type { BlockProps } from './Block'

export { Center } from './Center'
export type { CenterProps } from './Center'

export { Text, Heading } from './Typography'
export type { TextProps, HeadingProps } from './Typography'

export { Button } from './Button'
export type { ButtonProps } from './Button'

export { Section } from './Section'
export type { SectionProps } from './Section'

export { Card } from './Card'
export type { CardProps } from './Card'

export { Input, Textarea, Select, Checkbox } from './Fields'
export type { InputProps, TextareaProps, SelectProps, CheckboxProps } from './Fields'

export { ResponsiveVisibility } from './ResponsiveVisibility'
export type { ResponsiveVisibilityProps } from './ResponsiveVisibility'
