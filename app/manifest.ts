import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Živé Sklo - mobilní sklářská dílna',
    short_name: 'Živé Sklo',
    description:
      'Přivezeme živou sklářskou dílnu na firemní akce, školní programy i městské slavnosti.',
    start_url: '/',
    display: 'standalone',
    background_color: '#131313',
    theme_color: '#131313',
    lang: 'cs',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
