import { applyCzechNbsp } from '@/lib/utils'

type SectionHeadProps = {
  eyebrow: string
  heading: string
  lead?: string
  id?: string
  className?: string
}

/**
 * Shared section heading: eyebrow, h2 and an optional lead paragraph.
 */
export function SectionHead({ eyebrow, heading, lead, id, className = '' }: SectionHeadProps) {
  return (
    <div className={`reveal space-y-5 ${className}`}>
      <p className='eyebrow'>{applyCzechNbsp(eyebrow)}</p>
      <h2 id={id} className='max-w-[22ch]'>
        {applyCzechNbsp(heading)}
      </h2>
      {lead ? <p className='lead max-w-[56ch]'>{applyCzechNbsp(lead)}</p> : null}
    </div>
  )
}
