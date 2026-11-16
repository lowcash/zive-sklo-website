import { describe, expect, it } from 'vitest'

import { applyCzechNbsp } from '@/lib/typography'

describe('applyCzechNbsp', () => {
  it('binds single-letter Czech prepositions', () => {
    expect(applyCzechNbsp('A oheň hoří')).toBe('A\u00A0oheň hoří')
    expect(applyCzechNbsp('ve škole')).toBe('ve\u00A0škole')
  })

  it('binds consecutive single-letter words', () => {
    expect(applyCzechNbsp('a v jedné a k nám')).toBe('a\u00A0v\u00A0jedné a\u00A0k\u00A0nám')
  })

  it('keeps postal codes together', () => {
    expect(applyCzechNbsp('755 01 Vsetín')).toBe('755\u00A001 Vsetín')
  })

  it('keeps numeric units together', () => {
    expect(applyCzechNbsp('1200 °C')).toBe('1200\u00A0°C')
    expect(applyCzechNbsp('100 %')).toBe('100\u00A0%')
  })

  it('returns empty input unchanged', () => {
    expect(applyCzechNbsp('')).toBe('')
  })
})
