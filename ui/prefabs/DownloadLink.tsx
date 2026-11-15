/**
 * DownloadLink - quiet outlined action for the organiser information sheet.
 */
const ICON = (
  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' aria-hidden='true' className='size-5'>
    <path d='M12 4v11m0 0-4-4m4 4 4-4M5 19h14' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
)

export function DownloadLink({ href, label }: { href: string; label: string }) {
  if (href === '#') {
    return (
      <span
        aria-disabled='true'
        className='ui-cta-ghost text-fg-3 inline-flex cursor-not-allowed items-center gap-3 px-6 py-3'
      >
        {ICON}
        <span>{label}</span>
      </span>
    )
  }

  return (
    <a href={href} className='ui-cta-ghost inline-flex min-h-12 items-center gap-3 px-6 py-3'>
      {ICON}
      <span>{label}</span>
    </a>
  )
}
