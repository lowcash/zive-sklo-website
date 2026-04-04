/**
 * DownloadLink - Client leaf component for download link with interaction
 */
export function DownloadLink({ href, label }: { href: string; label: string }) {
  if (href === '#') {
    return (
      <span
        aria-disabled="true"
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-[#1c1b1b] px-4 py-2 text-[#e5e2e180]"
      >
        <span aria-hidden="true">📄</span>
        <span className="text-base leading-normal">{label}</span>
      </span>
    )
  }

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-lg bg-[#1c1b1b] px-4 py-2 text-[#e5e2e1b3] transition-colors hover:bg-[#201f1f] hover:text-[#e5e2e1]"
    >
      <span aria-hidden="true">📄</span>
      <span className="text-base leading-normal">{label}</span>
    </a>
  )
}
