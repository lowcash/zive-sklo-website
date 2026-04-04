import { ImageResponse } from 'next/og'

import { TITLE } from '@/lib/content'

export const alt = TITLE
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

export default function OpenGraphImage() {
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
        ZIVE SKLO
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 920 }}>
        <div style={{ fontSize: 72, lineHeight: 1.04, fontWeight: 700 }}>
          Mobilni sklarska dilna
        </div>
        <div style={{ fontSize: 34, lineHeight: 1.24, opacity: 0.94 }}>
          Ohen, sklo a zazitek na firemni akce, skoly i mestske slavnosti.
        </div>
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
        <div>akce.zivesklo.cz</div>
        <div style={{ color: '#ffbf00', fontWeight: 700 }}>VSETIN</div>
      </div>
    </div>,
    size
  )
}
