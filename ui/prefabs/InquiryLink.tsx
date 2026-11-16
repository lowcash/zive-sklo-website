import { applyCzechNbsp } from '@/lib/utils'

type InquiryLinkProps = {
  href: string
  label: string
  /** Card title, announced after the label so each link has a unique accessible name. */
  context: string
  className?: string
}

/**
 * InquiryLink - the single interactive element of a clickable card.
 * Its ::after (`.card-link`) stretches over the nearest `.card-hit` ancestor, so the whole card
 * is the hit area while the DOM keeps exactly one link (no nested interactive elements).
 */
export function InquiryLink({ href, label, context, className = '' }: InquiryLinkProps) {
  return (
    <a href={href} className={`card-link link-arrow min-h-11 ${className}`}>
      {applyCzechNbsp(label)}
      <span className='sr-only'> – {context}</span>
      <span aria-hidden='true'>→</span>
    </a>
  )
}
