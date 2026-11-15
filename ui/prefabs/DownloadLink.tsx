/**
 * DownloadLink - Client leaf component for download link with interaction
 */
export function DownloadLink({ href, label }: { href: string; label: string }) {
  if (href === '#') {
    return (
      <span
        aria-disabled='true'
        className='border-line-strong text-fg-3 inline-flex cursor-not-allowed items-center gap-2 border px-4 py-2'
      >
        <span aria-hidden='true'>📄</span>
        <span className='text-base leading-normal'>{label}</span>
      </span>
    )
  }

  return (
    <a href={href} className='ui-cta-ghost inline-flex min-h-12 items-center gap-2 px-5 py-2'>
      <span aria-hidden='true'>📄</span>
      <span className='text-base leading-normal'>{label}</span>
    </a>
  )
}
