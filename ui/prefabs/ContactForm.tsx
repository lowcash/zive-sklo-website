'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

import { CONTACT } from '@/lib/content'

/**
 * ContactForm - Client leaf component for form validation
 * Handles form state and client-side validation
 */
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    datePlace: '',
    participants: '',
    message: '',
    gdpr: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Jméno je povinné'
    if (!formData.email.trim()) newErrors.email = 'E-mail je povinný'
    if (!formData.phone.trim()) newErrors.phone = 'Telefon je povinný'
    if (!formData.eventType) newErrors.eventType = 'Typ akce je povinný'
    if (!formData.datePlace.trim()) newErrors.datePlace = 'Datum a místo jsou povinné'
    if (!formData.participants.trim()) newErrors.participants = 'Počet účastníků je povinný'
    if (!formData.gdpr) newErrors.gdpr = 'Souhlas se zpracováním je povinný'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // TODO: Implement actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert('Děkujeme za poptávku! Brzy se vám ozveme.')

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      datePlace: '',
      participants: '',
      message: '',
      gdpr: false,
    })
    setErrors({})
    setIsSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const nextValue = type === 'checkbox' && 'checked' in e.target ? e.target.checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
      aria-label="Formulář pro poptávku sklářské akce"
      noValidate
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="field-name"
            className="font-label block text-xs tracking-widest text-[#e5e2e199] uppercase"
          >
            {CONTACT.fields.name.label}
          </label>
          <input
            id="field-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder={CONTACT.fields.name.placeholder}
            className="w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none"
            aria-required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'error-name' : undefined}
          />
          {errors.name && (
            <p id="error-name" role="alert" className="text-sm text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="field-email"
            className="font-label block text-xs tracking-widest text-[#e5e2e199] uppercase"
          >
            {CONTACT.fields.email.label}
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={CONTACT.fields.email.placeholder}
            className="w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none"
            aria-required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'error-email' : undefined}
          />
          {errors.email && (
            <p id="error-email" role="alert" className="text-sm text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="field-phone"
            className="font-label block text-xs tracking-widest text-[#e5e2e199] uppercase"
          >
            {CONTACT.fields.phone.label}
          </label>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder={CONTACT.fields.phone.placeholder}
            className="w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none"
            aria-required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
          />
          {errors.phone && (
            <p id="error-phone" role="alert" className="text-sm text-red-300">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="field-eventType"
            className="font-label block text-xs tracking-widest text-[#e5e2e199] uppercase"
          >
            {CONTACT.fields.eventType.label}
          </label>
          <select
            id="field-eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full border-b border-[#5045324d] bg-[#131313] px-0 py-3 text-[#e5e2e1] focus:border-[#ffbf00] focus:outline-none"
            aria-required
            aria-invalid={!!errors.eventType}
            aria-describedby={errors.eventType ? 'error-eventType' : undefined}
          >
            {CONTACT.fields.eventType.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p id="error-eventType" role="alert" className="text-sm text-red-300">
              {errors.eventType}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="field-datePlace"
            className="font-label block text-xs tracking-widest text-[#e5e2e199] uppercase"
          >
            {CONTACT.fields.datePlace.label}
          </label>
          <input
            id="field-datePlace"
            name="datePlace"
            type="text"
            value={formData.datePlace}
            onChange={handleChange}
            placeholder={CONTACT.fields.datePlace.placeholder}
            className="w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none"
            aria-required
            aria-invalid={!!errors.datePlace}
            aria-describedby={errors.datePlace ? 'error-datePlace' : undefined}
          />
          {errors.datePlace && (
            <p id="error-datePlace" role="alert" className="text-sm text-red-300">
              {errors.datePlace}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="field-participants"
            className="font-label block text-xs tracking-widest text-[#e5e2e199] uppercase"
          >
            {CONTACT.fields.participants.label}
          </label>
          <input
            id="field-participants"
            name="participants"
            type="text"
            value={formData.participants}
            onChange={handleChange}
            placeholder={CONTACT.fields.participants.placeholder}
            className="w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none"
            aria-required
            aria-invalid={!!errors.participants}
            aria-describedby={errors.participants ? 'error-participants' : undefined}
          />
          {errors.participants && (
            <p id="error-participants" role="alert" className="text-sm text-red-300">
              {errors.participants}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="field-message"
          className="font-label block text-xs tracking-widest text-[#e5e2e199] uppercase"
        >
          {CONTACT.fields.message.label}
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={CONTACT.fields.message.placeholder}
          className="w-full resize-y border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        <label className="group flex items-start gap-3 text-sm text-[#e5e2e1cc]">
          <input
            name="gdpr"
            type="checkbox"
            checked={formData.gdpr}
            onChange={handleChange}
            aria-invalid={!!errors.gdpr}
            aria-describedby={errors.gdpr ? 'error-gdpr' : undefined}
            className="peer sr-only"
          />
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-[#6c5a38] bg-[#171717] transition-colors duration-300 peer-checked:border-[#ffbf00] peer-checked:bg-[#ffbf00] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ffbf00]">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-3.5 w-3.5 text-[#402d00] opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
            >
              <path
                d="M5 10.5 8.2 13.5 15 6.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="leading-relaxed transition-colors duration-300 group-hover:text-[#fff1cd]">
            {CONTACT.fields.gdpr.label}
          </span>
        </label>
        {errors.gdpr && (
          <p id="error-gdpr" role="alert" className="text-sm text-red-300">
            {errors.gdpr}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#ffbf00] py-5 text-sm font-bold tracking-widest text-[#402d00] uppercase transition-all hover:bg-[#ffbf00e6] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Odesílám...' : CONTACT.submitLabel}
      </button>
    </form>
  )
}
