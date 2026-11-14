'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { startTransition, useActionState, useEffect, useRef, useState } from 'react'

import type { ContactActionState } from '@/app/actions/contact'
import { submitContactAction } from '@/app/actions/contact'
import { validateContactFormClient } from '@/lib/schemas/contact-client'

const initialContactActionState: ContactActionState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
}

const emptyFormData = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  datePlace: '',
  participants: '',
  message: '',
  gdpr: false,
  companyName: '',
}

function sanitizeParticipantsValue(value: string) {
  return value.replace(/\D/g, '').slice(0, 4)
}

function sanitizePhoneValue(value: string) {
  const compact = value.replace(/[^\d+\s]/g, '')
  const normalizedPlus = compact.replace(/(?!^)\+/g, '')
  return normalizedPlus.slice(0, 20)
}

export function useContactForm() {
  const [actionState, submitAction, isSubmitting] = useActionState(submitContactAction, initialContactActionState)

  const [formData, setFormData] = useState(emptyFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [startedAt, setStartedAt] = useState(() => Date.now().toString())
  const [showActionMessage, setShowActionMessage] = useState(true)
  const submitGuardRef = useRef(false)

  useEffect(() => {
    if (!isSubmitting) {
      submitGuardRef.current = false
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

    setFormData(emptyFormData)
    setErrors({})
    setStartedAt(Date.now().toString())
  }, [actionState.status])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (submitGuardRef.current || isSubmitting) {
      return
    }

    const nextErrors = validateContactFormClient({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventType: formData.eventType,
      datePlace: formData.datePlace,
      participants: formData.participants,
      message: formData.message,
      gdpr: formData.gdpr,
    })

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
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

  return {
    formData,
    actionState,
    isSubmitting,
    startedAt,
    showActionMessage,
    handleSubmit,
    handleChange,
    getFieldError,
  }
}
