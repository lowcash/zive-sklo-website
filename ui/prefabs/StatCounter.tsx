interface StatCounterProps {
  numericValue: number
  suffix?: string
}

/**
 * StatCounter - RSC (Server Component)
 * Renders the real value in the HTML, so SSR, no-JS and print show the final number.
 */
export function StatCounter({ numericValue, suffix = '' }: StatCounterProps) {
  const formattedFinal = numericValue.toLocaleString('cs-CZ')
  const suffixDisplay = suffix.replace(/^\s+/, '\u00A0')
  return (
    <div
      data-testid='stat-counter'
      className={`font-display text-fg inline-flex max-w-full items-baseline justify-start text-[clamp(2.75rem,2rem+3.5vw,4.5rem)] leading-none font-normal tracking-[-0.02em] whitespace-nowrap`}
    >
      <span className='sr-only'>
        {formattedFinal}
        {suffixDisplay}
      </span>
      <span data-testid='stat-value' aria-hidden='true'>
        {formattedFinal}
      </span>
      <span
        data-testid='stat-suffix'
        className='text-fg-3 text-[0.45em] tracking-normal whitespace-nowrap'
        aria-hidden='true'
      >
        {suffixDisplay}
      </span>
    </div>
  )
}
