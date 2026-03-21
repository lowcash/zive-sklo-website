import { Button, Container, Heading, Text } from '@/ui/core'

import { HERO } from '@/lib/content'

import { HeroCarousel } from './HeroCarousel'

/**
 * HeroSection - RSC (Server Component)
 * Full-height hero with auto-carousel background (client leaf)
 */
/**
 * HeroSection - RSC (Server Component)
 * Full-height hero with auto-carousel background (client leaf)
 */
export function HeroSection() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Carousel (client leaf) */}
      <HeroCarousel images={HERO.backgroundImages} />

      {/* Overlay for text readability */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60' />

      {/* Content */}
      <div className='relative z-10 text-center'>
        <Container>
          <div className='max-w-4xl mx-auto space-y-8'>
            {/* H1 */}
            <Heading
              level={1}
              size='6xl'
              align='center'
              leading='tight'
            >
              {HERO.h1}
            </Heading>

            {/* Subtitle */}
            <div className='max-w-3xl mx-auto'>
              <Text size='xl' align='center' leading='relaxed'>
                {HERO.subtitle}
              </Text>
            </div>

            {/* Trust Line */}
            <Text size='sm' color='secondary' align='center'>
              {HERO.trustLine}
            </Text>

            {/* Pills */}
            <div className='flex flex-wrap justify-center gap-4 pt-4'>
              {HERO.pills.map((pill) => (
                <div
                  key={pill.label}
                  className='flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20'
                >
                  <span className='text-xl'>{pill.icon}</span>
                  <Text size='sm' as='span'>
                    {pill.label}
                  </Text>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className='pt-8'>
              <Button variant='primary' size='lg'>
                <a href={HERO.ctaHref}>{HERO.ctaLabel}</a>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
