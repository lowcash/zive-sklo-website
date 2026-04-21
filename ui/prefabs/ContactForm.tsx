'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { startTransition, useActionState, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { CONTACT } from '@/lib/content'

import type { ContactActionState } from '@/app/actions/contact'
import { submitContactAction } from '@/app/actions/contact'

const initialContactActionState: ContactActionState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[\d\s]{8,20}$/
const participantPattern = /^\d{1,4}$/

function sanitizeParticipantsValue(value: string) {
  return value.replace(/\D/g, '').slice(0, 4)
}

function sanitizePhoneValue(value: string) {
  const compact = value.replace(/[^\d+\s]/g, '')
  const normalizedPlus = compact.replace(/(?!^)\+/g, '')
  return normalizedPlus.slice(0, 20)
}

/**
 * ContactForm - Client leaf component for form validation
 * Handles form state and client-side validation
 */
export function ContactForm() {
  const [actionState, submitAction, isSubmitting] = useActionState(submitContactAction, initialContactActionState)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    datePlace: '',
    participants: '',
    message: '',
    gdpr: false,
    companyName: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [startedAt, setStartedAt] = useState(() => Date.now().toString())
  const [isSubmitLocked, setIsSubmitLocked] = useState(false)
  const [showActionMessage, setShowActionMessage] = useState(true)
  const submitGuardRef = useRef(false)

  useEffect(() => {
    if (!isSubmitting) {
      submitGuardRef.current = false
      setIsSubmitLocked(false)
    }
  }, [isSubmitting])

  useEffect(() => {
    if (actionState.message) {
      setShowActionMessage(true)
    }
  }, [actionState.message, actionState.status])

  useEffect(() => {
    if (actionState.status !== 'success') {
      return
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      datePlace: '',
      participants: '',
      message: '',
      gdpr: false,
      companyName: '',
    })
    setErrors({})
    setStartedAt(Date.now().toString())
  }, [actionState.status])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (submitGuardRef.current || isSubmitLocked || isSubmitting) {
      return
    }

    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Jméno je povinné'
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail je povinný'
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = 'Zadejte platný e-mail'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon je povinný'
    } else if (!phonePattern.test(formData.phone.trim())) {
      newErrors.phone = 'Zadejte platné telefonní číslo'
    }
    if (!formData.eventType) newErrors.eventType = 'Typ akce je povinný'
    if (!formData.datePlace.trim()) newErrors.datePlace = 'Datum a místo jsou povinné'
    if (!formData.participants.trim()) {
      newErrors.participants = 'Počet účastníků je povinný'
    } else if (!participantPattern.test(formData.participants.trim())) {
      newErrors.participants = 'Počet účastníků musí být číslo'
    } else if (Number(formData.participants.trim()) <= 0) {
      newErrors.participants = 'Počet účastníků musí být větší než 0'
    }
    if (!formData.gdpr) newErrors.gdpr = 'Souhlas se zpracováním je povinný'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setShowActionMessage(false)
      return
    }

    setErrors({})

    const payload = new FormData()
    payload.set('name', formData.name)
    payload.set('email', formData.email)
    payload.set('phone', formData.phone)
    payload.set('eventType', formData.eventType)
    payload.set('datePlace', formData.datePlace)
    payload.set('participants', formData.participants)
    payload.set('message', formData.message)
    payload.set('gdpr', formData.gdpr ? 'on' : '')
    payload.set('companyName', formData.companyName)
    payload.set('startedAt', startedAt)

    submitGuardRef.current = true
    setIsSubmitLocked(true)
    setShowActionMessage(true)
    startTransition(() => {
      submitAction(payload)
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    let nextValue: string | boolean = type === 'checkbox' && 'checked' in e.target ? e.target.checked : value

    if (typeof nextValue === 'string') {
      if (name === 'participants') {
        nextValue = sanitizeParticipantsValue(nextValue)
      }

      if (name === 'phone') {
        nextValue = sanitizePhoneValue(nextValue)
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }))

    setShowActionMessage(false)

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const getFieldError = (field: string) => errors[field] || actionState.fieldErrors[field]

  return (
    <form onSubmit={handleSubmit} className='space-y-8' aria-label='Formulář pro poptávku sklářské akce' noValidate>
      <p className='text-xs tracking-wide text-[#e5e2e199]'>Pole označená * jsou povinná.</p>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='space-y-2'>
          <label htmlFor='field-name' className='font-label block text-xs tracking-widest text-[#e5e2e199] uppercase'>
            {CONTACT.fields.name.label} *
          </label>
          <input
            id='field-name'
            name='name'
            type='text'
            autoComplete='name'
            value={formData.name}
            onChange={handleChange}
            placeholder={CONTACT.fields.name.placeholder}
            className='w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
            aria-required
            required
            aria-invalid={!!getFieldError('name')}
            aria-describedby={getFieldError('name') ? 'error-name' : undefined}
          />
          {getFieldError('name') && (
            <p id='error-name' role='alert' className='text-sm text-red-300'>
              {getFieldError('name')}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='field-email' className='font-label block text-xs tracking-widest text-[#e5e2e199] uppercase'>
            {CONTACT.fields.email.label} *
          </label>
          <input
            id='field-email'
            name='email'
            type='email'
            inputMode='email'
            autoComplete='email'
            value={formData.email}
            onChange={handleChange}
            placeholder={CONTACT.fields.email.placeholder}
            className='w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
            aria-required
            required
            aria-invalid={!!getFieldError('email')}
            aria-describedby={getFieldError('email') ? 'error-email' : undefined}
          />
          {getFieldError('email') && (
            <p id='error-email' role='alert' className='text-sm text-red-300'>
              {getFieldError('email')}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='field-phone' className='font-label block text-xs tracking-widest text-[#e5e2e199] uppercase'>
            {CONTACT.fields.phone.label} *
          </label>
          <input
            id='field-phone'
            name='phone'
            type='tel'
            inputMode='tel'
            autoComplete='tel'
            pattern='^\+?[0-9 ]{8,20}$'
            maxLength={20}
            value={formData.phone}
            onChange={handleChange}
            placeholder={CONTACT.fields.phone.placeholder}
            className='w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
            aria-required
            required
            aria-invalid={!!getFieldError('phone')}
            aria-describedby={getFieldError('phone') ? 'error-phone' : undefined}
          />
          {getFieldError('phone') && (
            <p id='error-phone' role='alert' className='text-sm text-red-300'>
              {getFieldError('phone')}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='field-eventType'
            className='font-label block text-xs tracking-widest text-[#e5e2e199] uppercase'
          >
            {CONTACT.fields.eventType.label} *
          </label>
          <select
            id='field-eventType'
            name='eventType'
            value={formData.eventType}
            onChange={handleChange}
            className='w-full border-b border-[#5045324d] bg-[#131313] px-0 py-3 text-[#e5e2e1] focus:border-[#ffbf00] focus:outline-none'
            aria-required
            required
            aria-invalid={!!getFieldError('eventType')}
            aria-describedby={getFieldError('eventType') ? 'error-eventType' : undefined}
          >
            {CONTACT.fields.eventType.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {getFieldError('eventType') && (
            <p id='error-eventType' role='alert' className='text-sm text-red-300'>
              {getFieldError('eventType')}
            </p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='space-y-2'>
          <label
            htmlFor='field-datePlace'
            className='font-label block text-xs tracking-widest text-[#e5e2e199] uppercase'
          >
            {CONTACT.fields.datePlace.label} *
          </label>
          <input
            id='field-datePlace'
            name='datePlace'
            type='text'
            autoComplete='off'
            value={formData.datePlace}
            onChange={handleChange}
            placeholder={CONTACT.fields.datePlace.placeholder}
            className='w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
            aria-required
            required
            aria-invalid={!!getFieldError('datePlace')}
            aria-describedby={getFieldError('datePlace') ? 'error-datePlace' : undefined}
          />
          {getFieldError('datePlace') && (
            <p id='error-datePlace' role='alert' className='text-sm text-red-300'>
              {getFieldError('datePlace')}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='field-participants'
            className='font-label block text-xs tracking-widest text-[#e5e2e199] uppercase'
          >
            {CONTACT.fields.participants.label} *
          </label>
          <input
            id='field-participants'
            name='participants'
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={4}
            value={formData.participants}
            onChange={handleChange}
            placeholder={CONTACT.fields.participants.placeholder}
            className='w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
            aria-required
            required
            aria-invalid={!!getFieldError('participants')}
            aria-describedby={getFieldError('participants') ? 'error-participants' : undefined}
          />
          {getFieldError('participants') && (
            <p id='error-participants' role='alert' className='text-sm text-red-300'>
              {getFieldError('participants')}
            </p>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        <label htmlFor='field-message' className='font-label block text-xs tracking-widest text-[#e5e2e199] uppercase'>
          {CONTACT.fields.message.label}
        </label>
        <textarea
          id='field-message'
          name='message'
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={CONTACT.fields.message.placeholder}
          className='w-full resize-y border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
        />
      </div>

      <div className='space-y-3'>
        <label className='group flex cursor-pointer items-start gap-3 text-sm text-[#e5e2e1cc]'>
          <input
            name='gdpr'
            type='checkbox'
            checked={formData.gdpr}
            onChange={handleChange}
            aria-invalid={!!getFieldError('gdpr')}
            aria-describedby={getFieldError('gdpr') ? 'error-gdpr' : undefined}
            className='peer sr-only'
          />
          <span className='mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center border border-[#6c5a38] bg-[#171717] transition-colors duration-300 peer-checked:border-[#ffbf00] peer-checked:bg-[#ffbf00] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ffbf00]'>
            <svg
              viewBox='0 0 20 20'
              aria-hidden='true'
              className='h-3.5 w-3.5 text-[#402d00] opacity-0 transition-opacity duration-200 peer-checked:opacity-100'
            >
              <path
                d='M5 10.5 8.2 13.5 15 6.8'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
          <span className='leading-relaxed transition-colors duration-300 group-hover:text-[#fff1cd]'>
            {CONTACT.fields.gdpr.label} *
          </span>
        </label>
        <p className='pl-8 text-xs leading-relaxed text-[#d4c5abb3]'>
          {CONTACT.fields.gdpr.detailsText}{' '}
          <Link
            href={CONTACT.fields.gdpr.detailsHref}
            className='ui-surface-hover border-b border-[#6c5a38] text-[#FFD79B] hover:border-[#FFD79B]'
          >
            {CONTACT.fields.gdpr.detailsLabel}
          </Link>
          .
        </p>
        {getFieldError('gdpr') && (
          <p id='error-gdpr' role='alert' className='text-sm text-red-300'>
            {getFieldError('gdpr')}
          </p>
        )}
      </div>

      <div className='absolute top-auto h-px w-px overflow-hidden' style={{ left: '-9999px' }} aria-hidden='true'>
        <label htmlFor='field-companyName'>Název firmy</label>
        <input
          id='field-companyName'
          name='companyName'
          type='text'
          autoComplete='off'
          tabIndex={-1}
          value={formData.companyName}
          onChange={handleChange}
        />
      </div>

      <input type='hidden' name='startedAt' value={startedAt} />

      <button
        type='submit'
        disabled={isSubmitting || isSubmitLocked}
        className='ui-cta-primary w-full py-5 text-sm font-bold tracking-widest uppercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70'
      >
        {isSubmitting ? 'Odesílám...' : CONTACT.submitLabel}
      </button>

      {showActionMessage && actionState.message ? (
        <p
          role={actionState.status === 'error' ? 'alert' : 'status'}
          className={actionState.status === 'error' ? 'text-sm text-red-300' : 'text-sm text-emerald-300'}
        >
          {actionState.message}
        </p>
      ) : null}
    </form>
  )
}
