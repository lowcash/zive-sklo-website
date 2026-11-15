interface StatCounterProps {
  numericValue: number
  suffix?: string
  tone?: 'amber' | 'ice'
}

/**
 * StatCounter - RSC (Server Component)
 * Renders the real value in the HTML, so SSR, no-JS and print show the final number.
 */
export function StatCounter({ numericValue, suffix = '', tone = 'amber' }: StatCounterProps) {
  const formattedFinal = numericValue.toLocaleString('cs-CZ')
  const suffixDisplay = suffix.replace(/^\s+/, '\u00A0')
  const gradient =
    tone === 'ice'
      ? 'bg-[linear-gradient(100deg,var(--color-ice),var(--color-fg))]'
      : 'bg-[linear-gradient(100deg,var(--color-amber),var(--color-ember))]'

  return (
    <div
      data-testid='stat-counter'
      className={`font-display inline-flex max-w-full items-baseline justify-start bg-clip-text text-[clamp(3rem,2rem+5vw,6rem)] leading-none font-light tracking-[-0.03em] whitespace-nowrap text-transparent [font-stretch:90%] ${gradient}`}
    >
      <span className='sr-only'>
        {formattedFinal}
        {suffixDisplay}
      </span>
      <span data-testid='stat-value' aria-hidden='true'>
        {formattedFinal}
      </span>
      <span data-testid='stat-suffix' className='text-[0.45em] tracking-normal whitespace-nowrap' aria-hidden='true'>
        {suffixDisplay}
      </span>
    </div>
  )
}
