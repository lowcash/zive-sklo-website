import { Container } from '@/ui/core'

/**
 * OfferSection - RSC (Server Component)
 * Offer section with primary and secondary program cards
 */
export function OfferSection() {
  const cards = [
    {
      icon: 'visibility',
      iconClass: 'text-[#9accf3]',
      title: 'Exkluzivní Show',
      description:
        'Čistě vizuální zážitek. Mistr sklář vytváří umělecká díla před očima diváků s odborným komentářem.',
      price: '25 000 Kč',
    },
    {
      icon: 'back_hand',
      iconClass: 'text-[#ffbf00]',
      title: 'Workshop Zážitky',
      description:
        'Nejoblíbenější volba. Hosté si pod vedením skláře vyfouknou svůj vlastní skleněný objekt.',
      price: '38 000 Kč',
    },
    {
      icon: 'diamond',
      iconClass: 'text-[#9accf3]',
      title: 'Premium Branding',
      description:
        'Výroba dárků s logem vaší společnosti přímo na místě. Maximální marketingový dopad.',
      price: '55 000 Kč',
    },
  ]

  return (
    <section id='nabidka' className='bg-[#0e0e0e] py-32'>
      <Container>
        <div className='mb-20'>
          <h2 className='mb-4 font-display text-4xl font-bold tracking-tight'>
            Balíčky služeb
          </h2>
          <div className='h-1 w-20 bg-[#ffbf00]' />
        </div>

        <div className='grid grid-cols-1 gap-px bg-[#50453233] md:grid-cols-3'>
          {cards.map((card) => (
            <div
              key={card.title}
              className='group bg-[#131313] p-12 transition-colors hover:bg-[#201f1f]'
            >
              <div className={`mb-8 ${card.iconClass}`}>
                <span className='material-symbols-outlined text-4xl'>
                  {card.icon}
                </span>
              </div>

              <h3 className='mb-4 text-2xl font-bold'>{card.title}</h3>
              <p className='mb-10 leading-relaxed text-[#e5e2e199]'>
                {card.description}
              </p>

              <div className='mt-auto'>
                <p className='mb-1 text-xs uppercase tracking-widest text-[#e5e2e166]'>
                  Cena od
                </p>
                <p className='font-display text-3xl font-bold text-[#ffbf00]'>
                  {card.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
