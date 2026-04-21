import {
  AboutSection,
  AudienceSection,
  BenefitsSection,
  ContactSection,
  FooterSection,
  GallerySection,
  HeroSection,
  Navigation,
  OfferSection,
  ProcessSection,
  ScrollToTopButton,
  StatsSection,
} from '@/ui/prefabs'

export default function HomePage() {
  const showCookieInformation = process.env.NODE_ENV !== 'production' || Boolean(process.env.NEXT_PUBLIC_GA_TRACKING_ID)

  return (
    <>
      <Navigation />
      <main id='top'>
        <HeroSection />
        <AboutSection />
        <ProcessSection />
        <OfferSection />
        <AudienceSection />
        <StatsSection />
        <GallerySection />
        <BenefitsSection />
        <ContactSection />
      </main>
      <FooterSection showCookieInformation={showCookieInformation} />
      <ScrollToTopButton />
    </>
  )
}
