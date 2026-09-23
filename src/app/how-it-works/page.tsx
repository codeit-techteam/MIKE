import { GuidePage } from "@/components/GuidePage";
import { createPageMetadata, PAGES } from "@/lib/seo";

const page = PAGES.howItWorks;

export const metadata = createPageMetadata(page);

export default function HowItWorksPage() {
  return (
    <GuidePage
      page={page}
      eyebrow="How it works"
      h1="How Mike works"
      lead="You say it once. Mike files it into pages about your life, and hands it back when you ask."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "How Mike works", path: page.path },
      ]}
      related={[
        { href: "/features", label: "Explore Mike's features" },
        { href: "/privacy", label: "Mike's privacy policy" },
        { href: "/faq", label: "Questions about Mike" },
      ]}
    >
      <section className="privacy-section" aria-labelledby="send-it-heading">
        <h2 id="send-it-heading" className="privacy-h2">
          You send it however it arrives
        </h2>
        <p className="privacy-body">
          Mike is a personal AI memory assistant. There is no folder to pick and no tag to remember.
          You give him the thing while you still have it.
        </p>
        <ul className="privacy-list">
          <li>Type it, the way you would text yourself.</li>
          <li>
            Hold to talk. Press the mic, say it, and let go. Slide to cancel, or slide up to lock
            the mic and keep talking with your hands free.
          </li>
          <li>
            Share it from elsewhere on the phone: a link in Safari, a photo, or a PDF from Files.
            Mike sits in the share sheet, so you do not retype it.
          </li>
        </ul>
        <p className="privacy-body">
          A document stays on your phone as it arrived, and comes back when you ask for it.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="pages-heading">
        <h2 id="pages-heading" className="privacy-h2">
          Mike files it into pages
        </h2>
        <p className="privacy-body">
          Each message is read alongside what Mike already keeps for you, then written onto the
          pages it belongs to. A person, a place, a plan, a document, a thing. The page grows and
          changes as you mention it again, so what you get back later is current.
        </p>
        <p className="privacy-body">
          The path is capture, understand, connect, organize, update, retrieve. You do not manage
          that sequence. You send the thing, and later you ask.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="ask-heading">
        <h2 id="ask-heading" className="privacy-h2">
          You ask in your own words
        </h2>
        <p className="privacy-body">
          Retrieval is a natural-language question. You do not need the words you used the first
          time, or a date to scroll back to. Mike answers from the pages built out of what you
          sent. When those pages hold no answer, he says so.
        </p>
        <p className="privacy-body">
          You can also open a page and read it. Most of the time, asking is quicker.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="history-heading">
        <h2 id="history-heading" className="privacy-h2">
          Changes stay readable
        </h2>
        <p className="privacy-body">
          When a page changes, Mike records what changed in plain words. You can open that history
          and restore an earlier version. Nothing he writes is permanent.
        </p>
      </section>
    </GuidePage>
  );
}
