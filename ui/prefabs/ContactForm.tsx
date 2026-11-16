'use client'

import { CONTACT } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/typography'

import { ContactField, ContactSelect, ContactTextInput, ContactTextarea } from './ContactField'
import { PolicyLink } from './PolicyLink'
import { useContactForm } from './useContactForm'

/**
 * ContactForm - Client leaf for inquiry form validation and submission.
 */
export function ContactForm() {
  const {
    formData,
    actionState,
    isSubmitting,
    startedAt,
    showActionMessage,
    handleSubmit,
    handleChange,
    getFieldError,
  } = useContactForm()

  return (
    <form onSubmit={handleSubmit} className='space-y-7' aria-label='Formulář pro poptávku sklářské akce' noValidate>
      <p className='text-fg-3 text-step--1'>Pole označená * jsou povinná.</p>

      <div className='grid grid-cols-1 gap-8 @md:grid-cols-2 @md:gap-x-8 @md:gap-y-8'>
        <ContactField
          id='field-name'
          name='name'
          label={CONTACT.fields.name.label}
          required
          error={getFieldError('name')}
        >
          <ContactTextInput
            id='field-name'
            name='name'
            autoComplete='name'
            value={formData.name}
            onChange={handleChange}
            placeholder={CONTACT.fields.name.placeholder}
            required
            error={getFieldError('name')}
          />
        </ContactField>

        <ContactField
          id='field-email'
          name='email'
          label={CONTACT.fields.email.label}
          required
          error={getFieldError('email')}
        >
          <ContactTextInput
            id='field-email'
            name='email'
            type='email'
            inputMode='email'
            autoComplete='email'
            value={formData.email}
            onChange={handleChange}
            placeholder={CONTACT.fields.email.placeholder}
            required
            error={getFieldError('email')}
          />
        </ContactField>

        <ContactField
          id='field-phone'
          name='phone'
          label={CONTACT.fields.phone.label}
          required
          error={getFieldError('phone')}
        >
          <ContactTextInput
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
            required
            error={getFieldError('phone')}
          />
        </ContactField>

        <ContactField
          id='field-eventType'
          name='eventType'
          label={CONTACT.fields.eventType.label}
          required
          error={getFieldError('eventType')}
        >
          <ContactSelect
            id='field-eventType'
            name='eventType'
            value={formData.eventType}
            onChange={handleChange}
            options={CONTACT.fields.eventType.options}
            required
            error={getFieldError('eventType')}
          />
        </ContactField>

        <ContactField
          id='field-datePlace'
          name='datePlace'
          label={CONTACT.fields.datePlace.label}
          required
          error={getFieldError('datePlace')}
        >
          <ContactTextInput
            id='field-datePlace'
            name='datePlace'
            autoComplete='off'
            enterKeyHint='next'
            value={formData.datePlace}
            onChange={handleChange}
            placeholder={CONTACT.fields.datePlace.placeholder}
            required
            error={getFieldError('datePlace')}
          />
        </ContactField>

        <ContactField
          id='field-participants'
          name='participants'
          label={CONTACT.fields.participants.label}
          required
          error={getFieldError('participants')}
        >
          <ContactTextInput
            id='field-participants'
            name='participants'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={4}
            value={formData.participants}
            onChange={handleChange}
            placeholder={CONTACT.fields.participants.placeholder}
            required
            error={getFieldError('participants')}
          />
        </ContactField>
      </div>

      <ContactField
        id='field-message'
        name='message'
        label={CONTACT.fields.message.label}
        error={getFieldError('message')}
      >
        <ContactTextarea
          id='field-message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          placeholder={CONTACT.fields.message.placeholder}
          maxLength={1200}
          error={getFieldError('message')}
        />
      </ContactField>

      <div className='space-y-3'>
        <label className='group text-fg-2 flex cursor-pointer items-start gap-3 text-sm'>
          <input
            name='gdpr'
            type='checkbox'
            checked={formData.gdpr}
            onChange={handleChange}
            aria-invalid={!!getFieldError('gdpr')}
            aria-describedby={getFieldError('gdpr') ? 'error-gdpr' : undefined}
            className='peer sr-only'
          />
          <span className='border-line-strong bg-field peer-checked:border-ember peer-checked:bg-ember peer-focus-visible:outline-ice mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center border transition-colors duration-300 peer-checked:*:opacity-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2'>
            <svg
              viewBox='0 0 20 20'
              aria-hidden='true'
              className='text-on-ember h-3.5 w-3.5 opacity-0 transition-opacity duration-200'
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
          <span className='group-hover:text-fg leading-relaxed transition-colors duration-300'>
            {applyCzechNbsp(CONTACT.fields.gdpr.label)}
            {'\u00A0'}*
          </span>
        </label>
        <div className='text-fg-3 text-step--1 pl-8 leading-relaxed'>
          <p>{applyCzechNbsp(CONTACT.fields.gdpr.detailsText)}</p>
          <PolicyLink
            href={CONTACT.fields.gdpr.detailsHref}
            className='tap-target border-line-strong text-ember-hi hover:border-ember-hi mt-1 inline-flex border-b transition-colors'
          >
            {applyCzechNbsp(CONTACT.fields.gdpr.detailsLabel)}
          </PolicyLink>
        </div>
        {getFieldError('gdpr') && (
          <p id='error-gdpr' role='alert' className='text-danger text-sm'>
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
        disabled={isSubmitting}
        className='ui-cta-primary w-full disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70'
      >
        {isSubmitting ? 'Odesílám...' : CONTACT.submitLabel}
      </button>

      {showActionMessage && actionState.message ? (
        <p
          role={actionState.status === 'error' ? 'alert' : 'status'}
          className={actionState.status === 'error' ? 'text-danger text-sm' : 'text-fg text-sm'}
        >
          {actionState.message}
        </p>
      ) : null}
    </form>
  )
}
