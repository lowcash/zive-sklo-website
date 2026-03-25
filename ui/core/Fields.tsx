import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  fullWidth?: boolean
}

/**
 * Input field primitive - semantic form input
 * NO BRAND STYLES - purely semantic form element
 */
export function Input({
  label,
  error,
  fullWidth = true,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="text-text-primary mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`bg-opacity-10 w-full border bg-white px-4 py-3 ${
          error ? 'border-red-500' : 'border-border'
        } text-text-primary placeholder-text-secondary focus:ring-accent-amber rounded-lg transition-all focus:border-transparent focus:ring-2 focus:outline-none ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
  fullWidth?: boolean
}

/**
 * Textarea field primitive - semantic form textarea
 * NO BRAND STYLES - purely semantic form element
 */
export function Textarea({
  label,
  error,
  fullWidth = true,
  className = '',
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={textareaId} className="text-text-primary mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`bg-opacity-10 w-full border bg-white px-4 py-3 ${
          error ? 'border-red-500' : 'border-border'
        } text-text-primary placeholder-text-secondary focus:ring-accent-amber resize-vertical rounded-lg transition-all focus:border-transparent focus:ring-2 focus:outline-none ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
  fullWidth?: boolean
  options: { value: string; label: string }[]
}

/**
 * Select field primitive - semantic form select
 * NO BRAND STYLES - purely semantic form element
 */
export function Select({
  label,
  error,
  fullWidth = true,
  className = '',
  id,
  options,
  ...props
}: SelectProps) {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={selectId} className="text-text-primary mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`bg-opacity-10 w-full border bg-white px-4 py-3 ${
          error ? 'border-red-500' : 'border-border'
        } text-text-primary focus:ring-accent-amber rounded-lg transition-all focus:border-transparent focus:ring-2 focus:outline-none ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-surface-dark text-text-primary"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

/**
 * Checkbox field primitive - semantic form checkbox
 * NO BRAND STYLES - purely semantic form element
 */
export function Checkbox({ label, error, className = '', id, ...props }: CheckboxProps) {
  const checkboxId = id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div>
      <div className="flex items-start">
        <input
          type="checkbox"
          id={checkboxId}
          className={`bg-opacity-10 border-border text-accent-amber focus:ring-accent-amber mt-1 h-4 w-4 rounded border bg-white focus:ring-2 ${className}`}
          {...props}
        />
        <label htmlFor={checkboxId} className="text-text-primary ml-3 text-sm">
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
