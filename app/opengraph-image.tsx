import { ImageResponse } from 'next/og'

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import {
  OPEN_GRAPH_IMAGE_ALT,
  OPEN_GRAPH_IMAGE_BRAND_LABEL,
  OPEN_GRAPH_IMAGE_DESCRIPTION,
  OPEN_GRAPH_IMAGE_FOOTER_LOCATION,
  OPEN_GRAPH_IMAGE_HEADLINE,
  OPEN_GRAPH_IMAGE_SIZE,
  SITE_URL,
} from '@/lib/site-config'

const MANROPE_MEDIUM_FONT = readFile(join(process.cwd(), 'app/assets/fonts/Manrope-Medium.ttf'))
const MANROPE_BOLD_FONT = readFile(join(process.cwd(), 'app/assets/fonts/Manrope-Bold.ttf'))

export const alt = OPEN_GRAPH_IMAGE_ALT
export const contentType = 'image/png'
export const size = OPEN_GRAPH_IMAGE_SIZE

const SITE_HOST = new URL(SITE_URL).host

export default async function OpenGraphImage() {
  const mediumFontBuffer = await MANROPE_MEDIUM_FONT
  const boldFontBuffer = await MANROPE_BOLD_FONT
  const mediumFontData = mediumFontBuffer.buffer.slice(
    mediumFontBuffer.byteOffset,
    mediumFontBuffer.byteOffset + mediumFontBuffer.byteLength,
  )
  const boldFontData = boldFontBuffer.buffer.slice(
    boldFontBuffer.byteOffset,
    boldFontBuffer.byteOffset + boldFontBuffer.byteLength,
  )

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:
          'radial-gradient(circle at 17% 20%, rgba(255, 191, 0, 0.3), transparent 46%), radial-gradient(circle at 80% 24%, rgba(154, 204, 243, 0.26), transparent 44%), linear-gradient(135deg, #101010 0%, #161616 100%)',
        color: '#f4f0ea',
        fontFamily: 'Manrope',
        padding: '56px 64px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: 34,
          letterSpacing: 3,
          fontWeight: 700,
        }}
      >
        {OPEN_GRAPH_IMAGE_BRAND_LABEL}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 920 }}>
        <div style={{ fontSize: 72, lineHeight: 1.04, fontWeight: 700 }}>{OPEN_GRAPH_IMAGE_HEADLINE}</div>
        <div style={{ fontSize: 34, lineHeight: 1.24, opacity: 0.94 }}>{OPEN_GRAPH_IMAGE_DESCRIPTION}</div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 28,
          opacity: 0.95,
        }}
      >
        <div>{SITE_HOST}</div>
        <div style={{ color: '#ffbf00', fontWeight: 700 }}>{OPEN_GRAPH_IMAGE_FOOTER_LOCATION}</div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Manrope',
          data: mediumFontData,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'Manrope',
          data: boldFontData,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  )
}
