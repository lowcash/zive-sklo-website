import { z } from 'zod'

const allowedEventTypes = ['teambuilding', 'school', 'city-market', 'creative-workshop', 'other'] as const

const participantPattern = /^\d{1,4}$/
const phonePattern = /^\+?[\d\s]{8,20}$/

function sanitizeText(value: string) {
  return (
    value
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

const contactSchema = z.object({
  name: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(2, 'Jméno a příjmení je povinné').max(100, 'Jméno je příliš dlouhé')),
  email: z
    .string()
    .transform((value) => value.trim().toLowerCase())
    .pipe(z.email('Zadejte platný e-mail')),
  phone: z.string().transform(sanitizeText).pipe(z.string().regex(phonePattern, 'Zadejte platné telefonní číslo')),
  eventType: z.enum(allowedEventTypes, {
    error: 'Vyberte typ akce',
  }),
  datePlace: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(3, 'Datum a místo jsou povinné').max(160, 'Text je příliš dlouhý')),
  participants: z
    .string()
    .transform((value) => value.trim())
    .pipe(
      z
        .string()
        .regex(participantPattern, 'Počet účastníků musí být číslo')
        .refine((value) => Number(value) > 0, 'Počet účastníků musí být větší než 0'),
    ),
  message: z.string().transform(sanitizeText).pipe(z.string().max(1200, 'Zpráva je příliš dlouhá')).optional(),
  gdpr: z.boolean().refine((value) => value, 'Souhlas se zpracováním je povinný'),
})

export type ContactSubmission = z.infer<typeof contactSchema>

type ContactFieldErrors = Partial<Record<keyof ContactSubmission, string>>

export function validateContactSubmission(input: {
  name: string
  email: string
  phone: string
  eventType: string
  datePlace: string
  participants: string
  message: string
  gdpr: boolean
}) {
  const result = contactSchema.safeParse(input)

  if (result.success) {
    return {
      success: true as const,
      data: result.data,
      errors: {},
    }
  }

  const flattenedErrors = result.error.flatten().fieldErrors

  const errors: ContactFieldErrors = {
    name: flattenedErrors.name?.[0],
    email: flattenedErrors.email?.[0],
    phone: flattenedErrors.phone?.[0],
    eventType: flattenedErrors.eventType?.[0],
    datePlace: flattenedErrors.datePlace?.[0],
    participants: flattenedErrors.participants?.[0],
    message: flattenedErrors.message?.[0],
    gdpr: flattenedErrors.gdpr?.[0],
  }

  return {
    success: false as const,
    data: null,
    errors,
  }
}
