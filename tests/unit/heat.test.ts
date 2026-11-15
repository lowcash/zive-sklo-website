import { describe, expect, it } from 'vitest'

import { clamp01, parseTemp, scrollHeat } from '@/lib/heat'

describe('clamp01', () => {
  it('clamps to the 0..1 range', () => {
    expect(clamp01(-3)).toBe(0)
    expect(clamp01(0.4)).toBe(0.4)
    expect(clamp01(9)).toBe(1)
  })

  it('maps non-finite input to 0', () => {
    expect(clamp01(Number.NaN)).toBe(0)
    expect(clamp01(Number.POSITIVE_INFINITY)).toBe(0)
  })
})

describe('scrollHeat', () => {
  it('is 0 at the top, 1 at the bottom and linear in between', () => {
    expect(scrollHeat(0, 3000, 800)).toBe(0)
    expect(scrollHeat(1100, 3000, 800)).toBeCloseTo(0.5)
    expect(scrollHeat(2200, 3000, 800)).toBe(1)
  })

  it('never leaves 0..1 (overscroll) and survives pages shorter than the viewport', () => {
    expect(scrollHeat(-50, 3000, 800)).toBe(0)
    expect(scrollHeat(5000, 3000, 800)).toBe(1)
    expect(scrollHeat(10, 500, 800)).toBe(0)
  })
})

describe('parseTemp', () => {
  it('parses data-temp step values', () => {
    expect(parseTemp('0.38')).toBe(0.38)
    expect(parseTemp('1')).toBe(1)
  })

  it('rejects missing or invalid values', () => {
    expect(parseTemp(undefined)).toBeNull()
    expect(parseTemp('')).toBeNull()
    expect(parseTemp('hot')).toBeNull()
  })
})
