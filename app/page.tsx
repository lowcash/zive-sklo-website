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
  return (
    <>
      <Navigation />
      <main id="top">
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
      <FooterSection />
      <ScrollToTopButton />
    </>
  )
}
