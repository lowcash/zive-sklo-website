import type { Metadata } from 'next'
import Link from 'next/link'

import { PRIVACY_NOTICE, SITE_URL } from '@/lib/content'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

export const metadata: Metadata = {
  title: `${PRIVACY_NOTICE.page.title} | Živé Sklo`,
  description: PRIVACY_NOTICE.page.intro,
  alternates: {
    canonical: '/ochrana-osobnich-udaju',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: `${PRIVACY_NOTICE.page.title} | Živé Sklo`,
    description: PRIVACY_NOTICE.page.intro,
    url: `${SITE_URL}/ochrana-osobnich-udaju`,
    type: 'article',
  },
}

type PrivacyPageProps = {
  searchParams?: Promise<{
    returnTo?: string | string[]
  }>
}

export default async function PrivacyPage({ searchParams }: PrivacyPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const returnTo =
    typeof resolvedSearchParams?.returnTo === 'string' && resolvedSearchParams.returnTo.startsWith('/')
      ? resolvedSearchParams.returnTo
      : '/'

  return (
    <main className='bg-surface-dark min-h-screen pt-28 pb-20 md:pt-36 md:pb-28'>
      <Section spacing='md'>
        <Container size='md'>
          <div className='space-y-6 border border-[#50453226] bg-[#1c1b1b] p-8 md:p-10'>
            <p>
              <Link
                href={returnTo}
                className='ui-surface-hover border-b border-[#6c5a38] text-sm text-[#FFD79B] hover:border-[#FFD79B]'
              >
                Zpět na web Živé Sklo
              </Link>
            </p>
            <p className='font-label text-xs tracking-[0.22em] text-[#ffcf42cc] uppercase'>
              {applyCzechNbsp(PRIVACY_NOTICE.page.eyebrow)}
            </p>
            <div className='space-y-4'>
              <h1 className='font-display text-4xl font-bold tracking-tight text-[#E5E2E1] md:text-5xl'>
                {applyCzechNbsp(PRIVACY_NOTICE.page.title)}
              </h1>
              <p className='max-w-3xl text-base leading-relaxed text-[#E5E2E1CC]'>
                {applyCzechNbsp(PRIVACY_NOTICE.page.intro)}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing='md'>
        <Container size='md'>
          <div className='grid gap-6'>
            {PRIVACY_NOTICE.page.sections.map((section) => (
              <article key={section.title} className='border border-[#50453226] bg-[#171717] p-8 md:p-10'>
                <div className='space-y-4'>
                  <h2 className='font-display text-3xl font-bold tracking-tight text-[#E5E2E1]'>
                    {applyCzechNbsp(section.title)}
                  </h2>
                  <p className='text-base leading-relaxed text-[#E5E2E1CC]'>{applyCzechNbsp(section.description)}</p>
                  <ul className='text-text-secondary space-y-3 text-sm leading-relaxed'>
                    {section.items.map((item) => (
                      <li key={item} className='border-l border-[#6c5a38] pl-4'>
                        {applyCzechNbsp(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing='sm'>
        <Container size='md'>
          <div className='border border-[#50453226] bg-[#1c1b1b] p-8 text-sm leading-relaxed text-[#E5E2E1CC] md:p-10'>
            <p>{applyCzechNbsp(PRIVACY_NOTICE.page.contactNote)}</p>
            <p className='mt-4'>
              <a
                href='mailto:info@zivesklo.cz'
                className='ui-surface-hover border-b border-[#6c5a38] text-[#FFD79B] hover:border-[#FFD79B]'
              >
                info@zivesklo.cz
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
