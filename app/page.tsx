import {
  Navigation,
  HeroSection,
  AboutSection,
  ProcessSection,
  OfferSection,
  AudienceSection,
  StatsSection,
  GallerySection,
  BenefitsSection,
  ContactSection,
  FooterSection,
} from "@/ui/prefabs";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id='top'>
        <HeroSection />
        <AboutSection />
        <ProcessSection />
        <OfferSection />
        <StatsSection />
        <AudienceSection />
        <GallerySection />
        <BenefitsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
