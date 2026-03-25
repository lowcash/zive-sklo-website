export function applyCzechNbsp(text: string) {
  if (!text) {
    return text
  }

  const normalizedText = text.replace(/\u00A0/g, ' ')

  // Keep one-letter Czech prepositions and conjunctions with the following word.
  const withSingleLetterWords = normalizedText.replace(
    /(^|[\s(„"'])([AaIiKkOoSsUuVvZz])\s+/g,
    '$1$2\u00A0'
  )

  // Keep common short Czech prepositions and conjunctions with the following word.
  const withShortFunctionWords = withSingleLetterWords.replace(
    /(^|[\s(„"'])(do|na|od|po|za|ve|ze|ke|se|či|že)\s+/gi,
    '$1$2\u00A0'
  )

  // Keep common abbreviations and titles with the following word.
  const withAbbreviations = withShortFunctionWords.replace(
    /(^|[\s(„"'])((?:Mgr|Ing|Bc|DiS|MUDr|PhDr|JUDr|RNDr|MVDr|PharmDr|doc|prof|akad|sv|tř|ul|nám|č|čl|např|tj|tzv|atd|apod))\.\s+/giu,
    '$1$2.\u00A0'
  )

  // Keep postal codes together.
  const withPostalCodes = withAbbreviations.replace(/(\d{3})\s+(\d{2})(?=\s|$)/g, '$1\u00A0$2')

  // Keep numeric values together with short units.
  return withPostalCodes.replace(/(\d+)\s+(%|°C|kg|g|km|m|cm|mm|min|h)\b/gi, '$1\u00A0$2')
}

type ScrollToHashOptions = {
  navSelector?: string
  behavior?: ScrollBehavior
}

export function scrollToHashWithNavOffset(
  hash: string,
  { navSelector = 'nav[data-nav-root="true"]', behavior = 'smooth' }: ScrollToHashOptions = {}
) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  const normalizedHash = hash.startsWith('#') ? hash : `#${hash}`
  const targetId = normalizedHash.slice(1)
  const target = document.getElementById(targetId)

  if (!target) {
    return false
  }

  const nav = document.querySelector<HTMLElement>(navSelector)
  const navHeight = nav?.getBoundingClientRect().height ?? 0
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight

  window.scrollTo({
    top: Math.max(0, Math.round(targetTop)),
    behavior,
  })

  if (window.location.hash !== normalizedHash) {
    window.history.pushState(null, '', normalizedHash)
  }

  return true
}
