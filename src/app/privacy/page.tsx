import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLdScript } from "@/components/JsonLdScript";
import { PrivacyArticle } from "@/components/privacy/PrivacyArticle";
import { PRIVACY_FAQS } from "@/lib/privacy";
import {
  breadcrumbSchema,
  createPageMetadata,
  faqPageSchema,
  PAGES,
  webPageSchema,
} from "@/lib/seo";

export const metadata = createPageMetadata(PAGES.privacy);

function PrivacyJsonLd() {
  return (
    <>
      <JsonLdScript data={webPageSchema(PAGES.privacy)} />
      <JsonLdScript
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <JsonLdScript data={faqPageSchema(PRIVACY_FAQS)} />
    </>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PrivacyJsonLd />
      <Header />
      <main className="privacy-page">
        <div className="privacy-shell container">
          <PrivacyArticle />
        </div>
      </main>
      <Footer />
    </>
  );
}
