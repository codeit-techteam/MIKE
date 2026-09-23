import { GuidePage } from "@/components/GuidePage";
import { createPageMetadata, PAGES } from "@/lib/seo";

const page = PAGES.features;

export const metadata = createPageMetadata(page);

export default function FeaturesPage() {
  return (
    <GuidePage
      page={page}
      eyebrow="Features"
      h1="What Mike can do"
      lead="Mike is a personal AI memory assistant for iPhone. These are the things he does with information you choose to send."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Features", path: page.path },
      ]}
      related={[
        { href: "/how-it-works", label: "How Mike works" },
        { href: "/faq", label: "Questions about Mike" },
      ]}
    >
      <section className="privacy-section" aria-labelledby="capture-heading">
        <h2 id="capture-heading" className="privacy-h2">
          Ways to give Mike something
        </h2>
        <ul className="privacy-list">
          <li>Text it.</li>
          <li>Hold to talk, then let go. Slide to cancel, or slide up to keep talking hands-free.</li>
          <li>Share a link, a photo, or a PDF from the iPhone share sheet.</li>
          <li>Keep a document whole on the phone, and ask for it later.</li>
        </ul>
      </section>

      <section className="privacy-section" aria-labelledby="pages-heading">
        <h2 id="pages-heading" className="privacy-h2">
          Pages, not a pile of notes
        </h2>
        <p className="privacy-body">
          Mike keeps a wiki: one page for a person, a place, a plan, a document, or a thing. The
          page fills in as you mention it and stays current as it changes. You can read any page
          like a document.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="ask-heading">
        <h2 id="ask-heading" className="privacy-h2">
          Ask, and see the work
        </h2>
        <ul className="privacy-list">
          <li>Ask in ordinary language, including a vague memory of the thing.</li>
          <li>Get an answer from what you told Mike. If the pages have no answer, he says so.</li>
          <li>Read every change in plain words, and restore an earlier version of a page.</li>
        </ul>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-feature-heading">
        <h2 id="privacy-feature-heading" className="privacy-h2">
          Memory stays on the phone
        </h2>
        <p className="privacy-body">
          Private details are kept on the device. Your Mike memory — messages, pages, history and
          documents — is stored on your iPhone. Mike is in a small private test, and it is free
          while it is in testing.
        </p>
      </section>
    </GuidePage>
  );
}
