import {
  AboutSection,
  AudienceSection,
  BenefitsSection,
  ContactSection,
  FaqSection,
  FooterSection,
  GallerySection,
  HeroSection,
  Navigation,
  OfferSection,
  ProcessSection,
  ScrollToTopButton,
  VideoSection,
} from '@/ui/prefabs'

export default function HomePage() {
  const showCookieInformation = process.env.NODE_ENV !== 'production' || Boolean(process.env.NEXT_PUBLIC_GA_TRACKING_ID)

  return (
    <>
      <Navigation />
      <main id='top'>
        <HeroSection />
        <AboutSection />
        <VideoSection />
        <ProcessSection />
        <OfferSection />
        <AudienceSection />
        <GallerySection />
        <BenefitsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <FooterSection showCookieInformation={showCookieInformation} />
      <ScrollToTopButton />
    </>
  )
}
