/** HEAD client empty-field strings — keep distinct from server schema copy. */
export const CONTACT_CLIENT_EMPTY_MESSAGES = {
  name: 'Jméno je povinné',
  email: 'E-mail je povinný',
  phone: 'Telefon je povinný',
  eventType: 'Typ akce je povinný',
  datePlace: 'Datum a místo jsou povinné',
  participants: 'Počet účastníků je povinný',
  gdpr: 'Souhlas se zpracováním je povinný',
} as const

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[\d\s]{8,20}$/
const participantPattern = /^\d{1,4}$/
const MESSAGE_MAX_LENGTH = 1200

export type ContactFormClientInput = {
  name: string
  email: string
  phone: string
  eventType: string
  datePlace: string
  participants: string
  message: string
  gdpr: boolean
}

/**
 * Client-side validation matching HEAD ContactForm behaviour, plus message max length.
 * Empty date/place only requires trim (no min-3), unlike the server schema.
 */
export function validateContactFormClient(formData: ContactFormClientInput): Record<string, string> {
  const newErrors: Record<string, string> = {}

  if (!formData.name.trim()) newErrors.name = CONTACT_CLIENT_EMPTY_MESSAGES.name
  if (!formData.email.trim()) {
    newErrors.email = CONTACT_CLIENT_EMPTY_MESSAGES.email
  } else if (!emailPattern.test(formData.email.trim())) {
    newErrors.email = 'Zadejte platný e-mail'
  }
  if (!formData.phone.trim()) {
    newErrors.phone = CONTACT_CLIENT_EMPTY_MESSAGES.phone
  } else if (!phonePattern.test(formData.phone.trim())) {
    newErrors.phone = 'Zadejte platné telefonní číslo'
  }
  if (!formData.eventType) newErrors.eventType = CONTACT_CLIENT_EMPTY_MESSAGES.eventType
  if (!formData.datePlace.trim()) newErrors.datePlace = CONTACT_CLIENT_EMPTY_MESSAGES.datePlace
  if (!formData.participants.trim()) {
    newErrors.participants = CONTACT_CLIENT_EMPTY_MESSAGES.participants
  } else if (!participantPattern.test(formData.participants.trim())) {
    newErrors.participants = 'Počet účastníků musí být číslo'
  } else if (Number(formData.participants.trim()) <= 0) {
    newErrors.participants = 'Počet účastníků musí být větší než 0'
  }
  if (formData.message.trim().length > MESSAGE_MAX_LENGTH) {
    newErrors.message = 'Zpráva je příliš dlouhá'
  }
  if (!formData.gdpr) newErrors.gdpr = CONTACT_CLIENT_EMPTY_MESSAGES.gdpr

  return newErrors
}
