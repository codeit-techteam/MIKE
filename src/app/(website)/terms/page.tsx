import Link from "next/link";
import { GuidePage } from "@/components/GuidePage";
import { SITE } from "@/lib/constants";
import { createPageMetadata, PAGES } from "@/lib/seo";

const page = PAGES.terms;

export const metadata = createPageMetadata(page);

export default function TermsPage() {
  return (
    <GuidePage
      page={page}
      eyebrow="Last updated 23 September 2026"
      h1="Mike Terms of Service"
      lead="These terms cover use of Mike, a personal AI memory assistant, during the private iPhone test."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Terms", path: page.path },
      ]}
      related={[
        { href: "/privacy", label: "Mike's privacy policy" },
        { href: "/support", label: "Mike support" },
        { href: "/", label: "Back to Mike" },
      ]}
    >
      <section className="privacy-section" aria-labelledby="service-heading">
        <h2 id="service-heading" className="privacy-h2">
          The service
        </h2>
        <p className="privacy-body">
          Mike AI offers Mike, a personal AI memory assistant for iPhone. You can text, speak, or
          share information you want to remember, and later ask natural-language questions to
          retrieve it. Mike organizes that information into pages about people, places, plans,
          documents and things.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="test-heading">
        <h2 id="test-heading" className="privacy-h2">
          The private test
        </h2>
        <p className="privacy-body">
          Mike is in a small private test on iPhone. It is free while it is in testing. A build is
          available by asking{" "}
          <a href={`mailto:${SITE.email}`} className="privacy-inline-link">
            {SITE.email}
          </a>
          . Availability can change while the test is underway.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="eligibility-heading">
        <h2 id="eligibility-heading" className="privacy-h2">
          Who Mike is for
        </h2>
        <p className="privacy-body">
          Mike is for people aged 13 and over. It is not directed at children under 13.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="information-heading">
        <h2 id="information-heading" className="privacy-h2">
          Your information
        </h2>
        <p className="privacy-body">
          You choose what you send to Mike. How memory is stored, what is processed, how dictation
          works, and how account deletion works are set out in{" "}
          <Link href="/privacy" className="privacy-inline-link">
            Mike&apos;s privacy policy
          </Link>
          . You can delete your account in Settings. Deletion cannot be undone. Export is available
          first if you want a copy.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="privacy-h2">
          Contact
        </h2>
        <p className="privacy-body">
          Questions about these terms go to{" "}
          <a href={`mailto:${SITE.email}`} className="privacy-inline-link">
            {SITE.email}
          </a>
          .
        </p>
      </section>
    </GuidePage>
  );
}
