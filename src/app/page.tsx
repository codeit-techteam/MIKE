import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { EntityFacts } from "@/components/EntityFacts";
import { GettingItBack } from "@/components/GettingItBack";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorks } from "@/components/HowItWorks";
import { WikiSection } from "@/components/wiki/WikiSection";
import { ContextSection } from "@/components/ContextSection";
import { HistorySection } from "@/components/HistorySection";
import { PrivacySection } from "@/components/PrivacySection";
import { BetaSection } from "@/components/BetaSection";
import { Coda } from "@/components/Coda";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AmbientBackground } from "@/components/AmbientBackground";
import { JsonLdScript } from "@/components/JsonLdScript";
import { createPageMetadata, PAGES, webPageSchema } from "@/lib/seo";

export const metadata = {
  ...createPageMetadata(PAGES.home),
  keywords: [
    "Mike",
    "Mike AI",
    "personal AI memory assistant",
    "AI memory assistant",
    "personal knowledge management",
    "personal wiki",
    "AI second brain",
    "iPhone AI assistant",
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={webPageSchema(PAGES.home)} />
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <WikiSection />
        <GettingItBack />
        <ContextSection />
        <HistorySection />
        <PrivacySection />
        <EntityFacts />
        <BetaSection />
        <Coda />
      </main>
      <Reveal>
        <Footer />
      </Reveal>
      {/* Created last so their triggers measure the page after every pin spacer exists. */}
      <ScrollProgress />
      <AmbientBackground />
    </>
  );
}
