import Link from "next/link";
import { GuidePage } from "@/components/GuidePage";
import { createPageMetadata, PAGES } from "@/lib/seo";

const page = PAGES.secondBrain;

export const metadata = createPageMetadata(page);

export default function SecondBrainPage() {
  return (
    <GuidePage
      page={page}
      eyebrow="Personal wiki"
      h1="A second brain made of pages"
      lead="Mike's second brain is a personal wiki: one page for every person, plan and thing you choose to remember."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "AI second brain", path: page.path },
      ]}
      related={[
        { href: "/ai-memory", label: "AI memory" },
        { href: "/features", label: "Explore Mike's features" },
        { href: "/faq", label: "Questions about Mike" },
      ]}
    >
      <section className="privacy-section" aria-labelledby="wiki-heading">
        <h2 id="wiki-heading" className="privacy-h2">
          A personal wiki, kept current
        </h2>
        <p className="privacy-body">
          Personal knowledge management in Mike is not a stack of notes in the order you wrote
          them. It is a wiki. Each person, place, plan, document and thing gets a page. The page
          fills in as you mention it, and it changes when the underlying fact changes.
        </p>
        <p className="privacy-body">
          You do not file it yourself. There are no folders and no tags to maintain. You text,
          speak, or share, and Mike writes the page.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="use-it-heading">
        <h2 id="use-it-heading" className="privacy-h2">
          Browse it, or just ask
        </h2>
        <p className="privacy-body">
          The wiki is there when you want to read. Most of the time you ask a natural-language
          question, and Mike answers from the pages. If a page does not contain the answer, he says
          so.
        </p>
        <p className="privacy-body">
          When he edits a page, the change is written in plain words, and you can restore the
          earlier version.{" "}
          <Link href="/ai-memory" className="privacy-inline-link">
            AI memory in Mike
          </Link>{" "}
          is this same set of pages, asked about later.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="where-heading">
        <h2 id="where-heading" className="privacy-h2">
          On your iPhone
        </h2>
        <p className="privacy-body">
          Mike is being tested privately on iPhone. The pages are stored on your device. You can
          read how that storage works in{" "}
          <Link href="/privacy" className="privacy-inline-link">
            Mike&apos;s privacy policy
          </Link>
          .
        </p>
      </section>
    </GuidePage>
  );
}
