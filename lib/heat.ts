/**
 * Pure helpers for the "--heat" temperature variable (0 = molten, 1 = cold glass).
 */

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.min(1, Math.max(0, value))
}

/** Scroll progress through the document, 0 at the top and 1 at the bottom. */
export function scrollHeat(scrollY: number, scrollHeight: number, viewportHeight: number): number {
  const max = scrollHeight - viewportHeight

  return max > 0 ? clamp01(scrollY / max) : 0
}

/** Stepped value used when motion is reduced: the temperature jumps, it never tweens. */
export function parseTemp(raw: string | undefined): number | null {
  if (raw === undefined || raw.trim() === '') {
    return null
  }

  const value = Number.parseFloat(raw)

  return Number.isFinite(value) ? clamp01(value) : null
}
