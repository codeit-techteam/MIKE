import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLdScript } from "@/components/JsonLdScript";
import { breadcrumbSchema, webPageSchema, type SitePage } from "@/lib/seo";

type GuidePageProps = {
  page: SitePage;
  eyebrow: string;
  h1: string;
  lead: string;
  breadcrumbs: { name: string; path: string }[];
  related: { href: string; label: string }[];
  extraJsonLd?: object[];
  children: React.ReactNode;
};

export function GuidePage({
  page,
  eyebrow,
  h1,
  lead,
  breadcrumbs,
  related,
  extraJsonLd = [],
  children,
}: GuidePageProps) {
  return (
    <>
      <JsonLdScript data={webPageSchema(page)} />
      <JsonLdScript data={breadcrumbSchema(breadcrumbs)} />
      {extraJsonLd.map((data) => (
        <JsonLdScript key={"@type" in data ? String(data["@type"]) : "extra"} data={data} />
      ))}
      <Header />
      <main className="privacy-page">
        <div className="privacy-shell container">
          <article className="privacy-article">
            <header className="border-b border-[var(--border-subtle)] pb-12">
              <Breadcrumbs items={breadcrumbs} />
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="display mt-2 text-[clamp(2.6rem,7vw,4.75rem)] tracking-tight">{h1}</h1>
              <p className="mt-6 max-w-[42rem] text-[clamp(1.15rem,2.4vw,1.4rem)] leading-relaxed text-[var(--accent-warm)]">
                {lead}
              </p>
            </header>
            {children}
            <nav
              className="mt-4 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-10"
              aria-label="Related pages"
            >
              {related.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--accent-warm)] underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
