import Link from "next/link";
import { GuidePage } from "@/components/GuidePage";
import { FAQ_ITEMS } from "@/lib/faq";
import { createPageMetadata, faqPageSchema, PAGES } from "@/lib/seo";

const page = PAGES.faq;

export const metadata = createPageMetadata(page);

export default function FaqPage() {
  return (
    <GuidePage
      page={page}
      eyebrow="FAQ"
      h1="Questions about Mike"
      lead="Mike is a personal AI memory assistant for iPhone. These answers match how Mike works today."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "FAQ", path: page.path },
      ]}
      related={[
        { href: "/features", label: "Explore Mike's features" },
        { href: "/how-it-works", label: "How Mike works" },
        { href: "/privacy", label: "Mike's privacy policy" },
        { href: "/support", label: "Mike support" },
      ]}
      extraJsonLd={[faqPageSchema(FAQ_ITEMS)]}
    >
      {FAQ_ITEMS.map((item) => (
        <section key={item.id} className="privacy-section" aria-labelledby={item.id}>
          <h2 id={item.id} className="privacy-h2">
            {item.question}
          </h2>
          <p className="privacy-body">{item.answer}</p>
        </section>
      ))}
      <p className="privacy-body">
        Storage, dictation and account deletion are described in full in{" "}
        <Link href="/privacy" className="privacy-inline-link">
          Mike&apos;s privacy policy
        </Link>
        .
      </p>
    </GuidePage>
  );
}
