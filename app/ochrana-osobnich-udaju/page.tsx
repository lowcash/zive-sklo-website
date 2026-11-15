import type { Metadata } from 'next'
import Link from 'next/link'

import { PRIVACY_NOTICE } from '@/lib/content'
import { resolveReturnToFromSearchParams } from '@/lib/return-to'
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, SITE_NAME, SITE_URL } from '@/lib/site-config'
import { applyCzechNbsp } from '@/lib/utils'

import { Container, Section } from '@/ui/core'

export const metadata: Metadata = {
  title: `${PRIVACY_NOTICE.page.title} | ${SITE_NAME}`,
  description: PRIVACY_NOTICE.page.intro,
  alternates: {
    canonical: '/ochrana-osobnich-udaju',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: `${PRIVACY_NOTICE.page.title} | ${SITE_NAME}`,
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
  const returnTo = await resolveReturnToFromSearchParams(searchParams)

  return (
    <main className='min-h-screen pt-28 pb-20 md:pt-36 md:pb-28'>
      <Section spacing='md'>
        <Container size='md'>
          <div className='glass space-y-6 p-8 md:p-10'>
            <p>
              <Link
                href={returnTo}
                className='border-line-strong text-ember-hi hover:border-ember-hi border-b text-sm transition-colors'
              >
                Zpět na web Živé Sklo
              </Link>
            </p>
            <p className='eyebrow'>{applyCzechNbsp(PRIVACY_NOTICE.page.eyebrow)}</p>
            <div className='space-y-4'>
              <h1 className='text-step-5'>{applyCzechNbsp(PRIVACY_NOTICE.page.title)}</h1>
              <p className='text-fg-2 max-w-3xl text-base leading-relaxed'>
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
              <article key={section.title} className='glass p-8 md:p-10'>
                <div className='space-y-4'>
                  <h2 className='text-step-3'>{applyCzechNbsp(section.title)}</h2>
                  <p className='text-fg-2 text-base leading-relaxed'>{applyCzechNbsp(section.description)}</p>
                  <ul className='text-fg-2 space-y-3 text-sm leading-relaxed'>
                    {section.items.map((item) => (
                      <li key={item} className='border-line-strong border-l pl-4'>
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
          <div className='glass text-fg-2 p-8 text-sm leading-relaxed md:p-10'>
            <p>{applyCzechNbsp(PRIVACY_NOTICE.page.contactNote)}</p>
            <p className='mt-4'>
              <a
                href={CONTACT_EMAIL_HREF}
                className='border-line-strong text-ember-hi hover:border-ember-hi border-b transition-colors'
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
