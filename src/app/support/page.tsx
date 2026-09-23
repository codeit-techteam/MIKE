import Link from "next/link";
import { GuidePage } from "@/components/GuidePage";
import { SITE } from "@/lib/constants";
import { createPageMetadata, PAGES } from "@/lib/seo";

const page = PAGES.support;

export const metadata = createPageMetadata(page);

export default function SupportPage() {
  return (
    <GuidePage
      page={page}
      eyebrow="Support"
      h1="Mike Support"
      lead="Get help with Mike, the personal AI memory assistant for iPhone."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Support", path: page.path },
      ]}
      related={[
        { href: "/faq", label: "Questions about Mike" },
        { href: "/privacy", label: "Mike's privacy policy" },
        { href: "/", label: "Back to Mike" },
      ]}
    >
      <section className="privacy-section" aria-labelledby="email-heading">
        <h2 id="email-heading" className="privacy-h2">
          Email
        </h2>
        <p className="privacy-body">
          Write to{" "}
          <a href={`mailto:${SITE.email}`} className="privacy-inline-link">
            {SITE.email}
          </a>{" "}
          for help with a build, an account, or something on this site. Mike is in a small private
          iPhone test. The same address is where you ask for a build.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="using-heading">
        <h2 id="using-heading" className="privacy-h2">
          Using Mike
        </h2>
        <p className="privacy-body">
          <Link href="/how-it-works" className="privacy-inline-link">
            How Mike works
          </Link>{" "}
          explains text, speech, sharing, pages and asking.{" "}
          <Link href="/features" className="privacy-inline-link">
            Explore Mike&apos;s features
          </Link>{" "}
          for the same capabilities as a list.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="memory-help-heading">
        <h2 id="memory-help-heading" className="privacy-h2">
          Memory
        </h2>
        <p className="privacy-body">
          Mike organizes what you send into pages.{" "}
          <Link href="/faq#where-is-my-mike-memory-stored" className="privacy-inline-link">
            Where Mike memory is stored
          </Link>{" "}
          and{" "}
          <Link href="/ai-memory" className="privacy-inline-link">
            how AI memory works
          </Link>{" "}
          cover the common questions.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="dictation-help-heading">
        <h2 id="dictation-help-heading" className="privacy-h2">
          Dictation
        </h2>
        <p className="privacy-body">
          <Link href="/faq#how-does-dictation-work" className="privacy-inline-link">
            How Mike handles dictation
          </Link>
          , including Deepgram, on-device recognition, and private notes. The privacy policy has
          the full account under{" "}
          <Link href="/privacy#dictation-heading" className="privacy-inline-link">
            dictation and transcription
          </Link>
          .
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="accounts-heading">
        <h2 id="accounts-heading" className="privacy-h2">
          Accounts
        </h2>
        <p className="privacy-body">
          You can sign in with Apple or Google.{" "}
          <Link href="/faq#can-i-delete-my-account" className="privacy-inline-link">
            Deleting a Mike account
          </Link>{" "}
          removes the server-side account and erases the memory stored on the phone. Export is
          available first. Details are in{" "}
          <Link href="/privacy#deletion-heading" className="privacy-inline-link">
            the privacy policy
          </Link>
          .
        </p>
      </section>
    </GuidePage>
  );
}
