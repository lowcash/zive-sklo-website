import { Button, Card, Container, Grid, Heading, Section, Text } from '@/ui/core'

import { OFFER } from '@/lib/content'

/**
 * OfferSection - RSC (Server Component)
 * Offer section with primary and secondary program cards
 */
/**
 * OfferSection - RSC (Server Component)
 * Offer section with primary and secondary program cards
 */
export function OfferSection() {
  return (
    <Section id='co-nabizime' spacing='xl'>
      <Container>
        {/* Heading */}
        <div className='text-center mb-16 space-y-4'>
          <Heading level={2} size='4xl'>
            {OFFER.heading}
          </Heading>
          <div className='max-w-3xl mx-auto'>
            <Text size='lg' color='secondary'>
              {OFFER.subtitle}
            </Text>
          </div>
        </div>

        {/* Primary Programs */}
        <div className='mb-12'>
          <Grid cols={{ base: 1, md: 3 }} gap='lg'>
            {OFFER.primary.map((program) => (
              <Card
                key={program.title}
                variant='glass'
                padding='lg'
                layout='column'
                gap='lg'
              >
                <div className='flex-grow space-y-4'>
                  <Heading level={3} size='2xl'>
                    {program.title}
                  </Heading>

                  <Text
                    size='base'
                    color='secondary'
                    leading='relaxed'
                  >
                    {program.description}
                  </Text>

                  <div className='space-y-2 pt-4'>
                    <Text size='sm' color='secondary'>
                      <span className='font-semibold text-text-primary'>
                        Vhodné pro:
                      </span>
                      {' '}
                      {program.suitableFor}
                    </Text>

                    {program.duration && (
                      <Text size='sm' color='secondary'>
                        <span className='font-semibold text-text-primary'>
                          Délka:
                        </span>
                        {' '}
                        {program.duration}
                      </Text>
                    )}

                    <span className='block text-lg font-bold text-accent-amber pt-2'>
                      {program.price}
                    </span>
                  </div>
                </div>

                <Button variant='primary' fullWidth>
                  <a href={program.ctaHref}>{program.ctaLabel}</a>
                </Button>
              </Card>
            ))}
          </Grid>
        </div>

        {/* Secondary Programs */}
        <Grid cols={{ base: 1, sm: 2, md: 3 }} gap='lg'>
          {OFFER.secondary.map((program) => (
            <Card
              key={program.title}
              variant='outlined'
              padding='md'
              layout='column'
              gap='md'
            >
              <Heading level={4} size='lg'>
                {program.title}
              </Heading>

              <Text size='sm' color='secondary'>
                {program.description}
              </Text>

              {program.price && (
                <span className='block text-base font-semibold text-accent-amber'>
                  {program.price}
                </span>
              )}

              <Button variant='secondary' size='sm' fullWidth>
                <a href={program.ctaHref}>{program.ctaLabel}</a>
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
