import Link from "next/link";
import { GuidePage } from "@/components/GuidePage";
import { createPageMetadata, PAGES } from "@/lib/seo";

const page = PAGES.personalAi;

export const metadata = createPageMetadata(page);

export default function PersonalAiAssistantPage() {
  return (
    <GuidePage
      page={page}
      eyebrow="Personal AI assistant"
      h1="A personal AI assistant for your information"
      lead="Mike is a personal AI assistant for the people, places, plans, documents and things you want to remember."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Personal AI assistant", path: page.path },
      ]}
      related={[
        { href: "/ai-memory", label: "AI memory" },
        { href: "/features", label: "Explore Mike's features" },
        { href: "/how-it-works", label: "How Mike works" },
      ]}
    >
      <section className="privacy-section" aria-labelledby="for-information-heading">
        <h2 id="for-information-heading" className="privacy-h2">
          Built for personal information
        </h2>
        <p className="privacy-body">
          You text, speak, or share something with Mike. He files it into pages. Later you ask a
          natural-language question and he answers from those pages. That is the job of this
          personal AI assistant: personal knowledge you chose to keep, returned when you ask.
        </p>
        <p className="privacy-body">
          Mike is on iPhone, in a small private test. It is free while it is in testing.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="what-you-can-ask-heading">
        <h2 id="what-you-can-ask-heading" className="privacy-h2">
          What you can ask him to hold
        </h2>
        <ul className="privacy-list">
          <li>People you mention, and what you said about them.</li>
          <li>Places, including the detail you would otherwise lose.</li>
          <li>Plans and the facts attached to them.</li>
          <li>Documents you share, kept whole on the phone.</li>
          <li>Other things you want filed and retrieved later.</li>
        </ul>
        <p className="privacy-body">
          <Link href="/ai-memory" className="privacy-inline-link">
            How Mike&apos;s AI memory works
          </Link>{" "}
          describes how those pages stay current.
        </p>
      </section>
    </GuidePage>
  );
}
