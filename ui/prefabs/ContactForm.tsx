'use client'

import type { FormEvent } from 'react'

import { useState } from 'react'

import {
  Button,
  Checkbox,
  Input,
  Select,
  Textarea,
} from '@/ui/core'

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
    if (!formData.eventType) newErrors.eventType = 'Vyberte typ akce'
    if (!formData.datePlace.trim()) newErrors.datePlace = 'Datum a místo jsou povinné'
    if (!formData.participants.trim()) newErrors.participants = 'Počet účastníků je povinný'
    if (!formData.gdpr) newErrors.gdpr = 'Musíte souhlasit se zpracováním údajů'

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Name */}
      <div>
        <Input
          name='name'
          label={CONTACT.fields.name.label}
          placeholder={CONTACT.fields.name.placeholder}
          value={formData.name}
          onChange={handleChange}
          required={CONTACT.fields.name.required}
          error={errors.name}
        />
      </div>

      {/* Email */}
      <div>
        <Input
          name='email'
          type='email'
          label={CONTACT.fields.email.label}
          placeholder={CONTACT.fields.email.placeholder}
          value={formData.email}
          onChange={handleChange}
          required={CONTACT.fields.email.required}
          error={errors.email}
        />
      </div>

      {/* Phone */}
      <div>
        <Input
          name='phone'
          type='tel'
          label={CONTACT.fields.phone.label}
          placeholder={CONTACT.fields.phone.placeholder}
          value={formData.phone}
          onChange={handleChange}
          required={CONTACT.fields.phone.required}
          error={errors.phone}
        />
      </div>

      {/* Event Type */}
      <div>
        <Select
          name='eventType'
          label={CONTACT.fields.eventType.label}
          options={CONTACT.fields.eventType.options}
          value={formData.eventType}
          onChange={handleChange}
          required={CONTACT.fields.eventType.required}
          error={errors.eventType}
        />
      </div>

      {/* Date and Place */}
      <div>
        <Input
          name='datePlace'
          label={CONTACT.fields.datePlace.label}
          placeholder={CONTACT.fields.datePlace.placeholder}
          value={formData.datePlace}
          onChange={handleChange}
          required={CONTACT.fields.datePlace.required}
          error={errors.datePlace}
        />
      </div>

      {/* Participants */}
      <div>
        <Input
          name='participants'
          label={CONTACT.fields.participants.label}
          placeholder={CONTACT.fields.participants.placeholder}
          value={formData.participants}
          onChange={handleChange}
          required={CONTACT.fields.participants.required}
          error={errors.participants}
        />
      </div>

      {/* Message */}
      <div>
        <Textarea
          name='message'
          label={CONTACT.fields.message.label}
          placeholder={CONTACT.fields.message.placeholder}
          value={formData.message}
          onChange={handleChange}
          rows={5}
        />
      </div>

      {/* GDPR */}
      <div>
        <Checkbox
          name='gdpr'
          label={CONTACT.fields.gdpr.label}
          checked={formData.gdpr}
          onChange={handleChange}
          required={CONTACT.fields.gdpr.required}
          error={errors.gdpr}
        />
      </div>

      {/* Submit */}
      <Button
        type='submit'
        variant='primary'
        size='lg'
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Odesílám...' : CONTACT.submitLabel}
      </Button>
    </form>
  )
}
