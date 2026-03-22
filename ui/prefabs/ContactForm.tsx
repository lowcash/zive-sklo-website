'use client'

import type { FormEvent } from 'react'

import { useState } from 'react'

/**
 * ContactForm - Client leaf component for form validation
 * Handles form state and client-side validation
 */
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventTypeGuests: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Jméno je povinné'
    if (!formData.email.trim()) newErrors.email = 'E-mail je povinný'
    if (!formData.eventTypeGuests.trim()) {
      newErrors.eventTypeGuests = 'Typ akce a počet hostů je povinný'
    }

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
      eventTypeGuests: '',
      message: '',
    })
    setErrors({})
    setIsSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='space-y-2'>
          <label className='block text-xs uppercase tracking-widest text-[#e5e2e199]'>
            Jméno a příjmení
          </label>
          <input
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='Jan Novák'
            className='w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
            required
          />
          {errors.name && <p className='text-sm text-red-400'>{errors.name}</p>}
        </div>

        <div className='space-y-2'>
          <label className='block text-xs uppercase tracking-widest text-[#e5e2e199]'>
            E-mail
          </label>
          <input
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='email@firma.cz'
            className='w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
            required
          />
          {errors.email && <p className='text-sm text-red-400'>{errors.email}</p>}
        </div>
      </div>

      <div className='space-y-2'>
        <label className='block text-xs uppercase tracking-widest text-[#e5e2e199]'>
          Typ akce & počet hostů
        </label>
        <input
          name='eventTypeGuests'
          type='text'
          value={formData.eventTypeGuests}
          onChange={handleChange}
          placeholder='Např. Vánoční večírek, 100 osob'
          className='w-full border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
          required
        />
        {errors.eventTypeGuests && (
          <p className='text-sm text-red-400'>{errors.eventTypeGuests}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label className='block text-xs uppercase tracking-widest text-[#e5e2e199]'>
          Vaše zpráva
        </label>
        <textarea
          name='message'
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder='Povězte nám více o vaší představě...'
          className='w-full resize-y border-b border-[#5045324d] bg-transparent px-0 py-3 text-[#e5e2e1] transition-colors placeholder:text-[#e5e2e199] focus:border-[#ffbf00] focus:outline-none'
        />
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-[#ffbf00] py-5 text-sm font-bold uppercase tracking-widest text-[#402d00] transition-all hover:bg-[#ffbf00e6] disabled:cursor-not-allowed disabled:opacity-70'
      >
        {isSubmitting ? 'Odesílám...' : 'Odeslat nezávaznou poptávku'}
      </button>
    </form>
  )
}
