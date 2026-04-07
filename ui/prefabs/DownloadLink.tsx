/**
 * DownloadLink - Client leaf component for download link with interaction
 */
export function DownloadLink({ href, label }: { href: string; label: string }) {
  if (href === '#') {
    return (
      <span
        aria-disabled='true'
        className='inline-flex cursor-not-allowed items-center gap-2 border border-[#3b3b3b] bg-[#141414] px-4 py-2 text-[#e5e2e180]'
      >
        <span aria-hidden='true'>📄</span>
        <span className='text-base leading-normal'>{label}</span>
      </span>
    )
  }

  return (
    <a
      href={href}
      className='inline-flex items-center gap-2 border border-[#3b3b3b] bg-[#141414] px-4 py-2 text-[#e5e2e1] transition-colors duration-300 hover:bg-[#1f1f1f] focus:outline-none focus-visible:ring-0 focus-visible:outline-none'
    >
      <span aria-hidden='true'>📄</span>
      <span className='text-base leading-normal'>{label}</span>
    </a>
  )
}
