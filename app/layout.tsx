import type { Metadata } from 'next'
import { Manrope, Noto_Serif } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '700'],
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Živé Sklo - Mobilní sklářská manufaktura z Vsetína',
  description:
    'Přivezeme živou sklářskou dílnu přímo k vám na firemní akce, školní exkurze i městské slavnosti. Žádné výrobky z krabice. Jen oheň, sklo a lidský dech.',
  openGraph: {
    title: 'Živé Sklo - Mobilní sklářská manufaktura z Vsetína',
    description:
      'Přivezeme živou sklářskou dílnu přímo k vám na firemní akce, školní exkurze i městské slavnosti.',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='cs'
      className={`scroll-smooth ${notoSerif.variable} ${manrope.variable}`}
    >
      <body className='antialiased'>
        {children}
      </body>
    </html>
  )
}
