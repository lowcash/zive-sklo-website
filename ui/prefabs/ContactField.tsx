'use client'

import type { ChangeEvent, ReactNode } from 'react'

const FIELD_INPUT_CLASS =
  'w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf00]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]'

const FIELD_SELECT_CLASS =
  'w-full border-b border-[#5045324d] bg-[#131313] px-0 py-3 text-[#e5e2e1] focus:border-[#ffbf00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbf00]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]'

type ContactFieldProps = {
  id: string
  name: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}

export function ContactField({ id, name, label, required, error, children }: ContactFieldProps) {
  return (
    <div className='space-y-2'>
      <label htmlFor={id} className='font-label block text-xs tracking-widest text-[#e5e2e199] uppercase'>
        {label}
        {required ? (
          <>
            {'\u00A0'}*
          </>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`error-${name}`} role='alert' className='text-sm text-red-300'>
          {error}
        </p>
      ) : null}
    </div>
  )
}

type TextInputProps = {
  id: string
  name: string
  type?: string
  value: string
  placeholder?: string
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  pattern?: string
  maxLength?: number
  required?: boolean
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function ContactTextInput({
  id,
  name,
  type = 'text',
  value,
  placeholder,
  autoComplete,
  inputMode,
  pattern,
  maxLength,
  required,
  error,
  onChange,
}: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      inputMode={inputMode}
      pattern={pattern}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={FIELD_INPUT_CLASS}
      aria-required={required}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `error-${name}` : undefined}
    />
  )
}

type TextSelectProps = {
  id: string
  name: string
  value: string
  required?: boolean
  error?: string
  options: Array<{ value: string; label: string }>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export function ContactSelect({ id, name, value, required, error, options, onChange }: TextSelectProps) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={FIELD_SELECT_CLASS}
      aria-required={required}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `error-${name}` : undefined}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

type ContactTextareaProps = {
  id: string
  name: string
  value: string
  placeholder?: string
  rows?: number
  maxLength?: number
  error?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export function ContactTextarea({
  id,
  name,
  value,
  placeholder,
  rows = 4,
  maxLength,
  error,
  onChange,
}: ContactTextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={FIELD_INPUT_CLASS + ' resize-y'}
      aria-invalid={!!error}
      aria-describedby={error ? `error-${name}` : undefined}
    />
  )
}
