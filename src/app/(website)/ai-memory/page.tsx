import Link from "next/link";
import { GuidePage } from "@/components/GuidePage";
import { createPageMetadata, PAGES } from "@/lib/seo";

const page = PAGES.aiMemory;

export const metadata = createPageMetadata(page);

export default function AiMemoryPage() {
  return (
    <GuidePage
      page={page}
      eyebrow="AI memory"
      h1="What AI memory means in Mike"
      lead="AI memory, in Mike, is the information you choose to send, kept as pages you can ask about later."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "AI memory", path: page.path },
      ]}
      related={[
        { href: "/personal-ai-assistant", label: "Personal AI assistant" },
        { href: "/second-brain", label: "AI second brain" },
        { href: "/how-it-works", label: "How Mike works" },
        { href: "/privacy", label: "Mike's privacy policy" },
      ]}
    >
      <section className="privacy-section" aria-labelledby="memory-is-heading">
        <h2 id="memory-is-heading" className="privacy-h2">
          Memory is what you send
        </h2>
        <p className="privacy-body">
          Mike is a personal AI memory assistant. He does not browse your life in the background.
          Memory starts when you text, speak, or share something you want to keep: a person, a
          place, a plan, a document, or a thing.
        </p>
        <p className="privacy-body">
          That material is filed into pages. A later mention updates the page, so the memory you
          ask for is the current one, not only the first note.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="ask-memory-heading">
        <h2 id="ask-memory-heading" className="privacy-h2">
          You get it back by asking
        </h2>
        <p className="privacy-body">
          You retrieve AI memory in Mike with a natural-language question. The answer comes from
          your pages. If they do not contain it, Mike says so.
        </p>
        <p className="privacy-body">
          The pages themselves are the Wiki. You can read one when you want to browse.{" "}
          <Link href="/second-brain" className="privacy-inline-link">
            Mike&apos;s personal wiki
          </Link>{" "}
          is that set of pages.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="where-memory-heading">
        <h2 id="where-memory-heading" className="privacy-h2">
          Where the memory lives
        </h2>
        <p className="privacy-body">
          Messages, pages, history and documents are stored on your iPhone. They are not copied to
          Mike&apos;s server. Private details stay on the device. The privacy policy explains what
          is sent when Mike needs an AI model to understand a message, and what is deleted with
          your account.
        </p>
      </section>
    </GuidePage>
  );
}
