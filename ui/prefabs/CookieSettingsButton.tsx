'use client'

import { COOKIE_SETTINGS_OPEN_EVENT } from '@/lib/cookie-consent'
import { applyCzechNbsp } from '@/lib/utils'

type CookieSettingsButtonProps = {
  label: string
  className?: string
}

export function CookieSettingsButton({ label, className }: CookieSettingsButtonProps) {
  const handleOpenSettings = () => {
    window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_OPEN_EVENT))
  }

  return (
    <button type='button' onClick={handleOpenSettings} className={className}>
      {applyCzechNbsp(label)}
    </button>
  )
}
