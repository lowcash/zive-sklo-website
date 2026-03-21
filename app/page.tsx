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
      <main>
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
    </>
  );
}
