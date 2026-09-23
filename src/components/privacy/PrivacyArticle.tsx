import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PrivacyFaq } from "@/components/privacy/PrivacyFaq";
import { PrivacyMotion } from "@/components/privacy/PrivacyMotion";
import { SITE } from "@/lib/constants";
import {
  PRIVACY,
  PRIVACY_AT_A_GLANCE,
  PRIVACY_FAQS,
  PRIVACY_STORAGE_ROWS,
} from "@/lib/privacy";

function FlowSteps({
  label,
  steps,
}: {
  label: string;
  steps: string[];
}) {
  return (
    <div className="privacy-flow mt-5" aria-label={label}>
      <p className="sr-only">{`${label}: ${steps.join(", then ")}.`}</p>
      <ol className="m-0 flex list-none flex-col gap-2 p-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <span className="privacy-flow-step inline-flex min-h-10 items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)]">
              {step}
            </span>
            {index < steps.length - 1 ? (
              <>
                <span className="pl-4 text-[var(--muted-dim)] sm:hidden" aria-hidden="true">
                  ↓
                </span>
                <span className="hidden text-[var(--muted-dim)] sm:inline" aria-hidden="true">
                  →
                </span>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PrivacyArticle() {
  return (
    <PrivacyMotion>
      <article className="privacy-article">
        <header className="privacy-reveal privacy-header border-b border-[var(--border-subtle)] pb-12">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Privacy", path: "/privacy" },
            ]}
          />
          <p className="eyebrow">Last updated {PRIVACY.lastUpdated}</p>
          <h1 className="display mt-2 text-[clamp(2.6rem,7vw,4.75rem)] tracking-tight">
            {PRIVACY.h1}
          </h1>
          <p className="mt-6 max-w-[42rem] text-[clamp(1.15rem,2.4vw,1.4rem)] leading-relaxed text-[var(--accent-warm)]">
            {PRIVACY.introLead}
          </p>
          <p className="mt-6 max-w-[42rem] text-[1.05rem] leading-relaxed text-[var(--muted)]">
            Mike is a personal AI memory assistant for iPhone. It helps you remember the people,
            places, plans, documents and details you choose to give it. This Privacy Policy explains
            what stays on your device, what information is sent for processing, what Mike&apos;s
            servers store, how dictation works, and what happens when you delete your account.
          </p>
          <p className="mt-5 max-w-[42rem] text-[1.05rem] leading-relaxed text-[var(--muted)]">
            Mike holds the details of your life, so you should know exactly where they sit and what
            touches them.
          </p>
          <nav
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]"
            aria-label="Related pages"
          >
            <Link
              href="/how-it-works"
              className="underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            >
              How Mike works
            </Link>
            <Link
              href="/terms"
              className="underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            >
              Read the Terms
            </Link>
            <Link
              href="/support"
              className="underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            >
              Visit Mike Support
            </Link>
          </nav>
        </header>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="at-a-glance-heading"
        >
          <h2 id="at-a-glance-heading" className="privacy-h2">
            At a glance
          </h2>
          <p className="privacy-lede">
            The short version of how Mike, Mike AI&apos;s personal AI memory assistant, handles
            personal data.
          </p>
          <dl className="privacy-glance mt-10">
            {PRIVACY_AT_A_GLANCE.map((row) => (
              <div key={row.label} className="privacy-glance-row">
                <dt>{row.label}</dt>
                <dd>{row.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="data-flow-heading"
        >
          <h2 id="data-flow-heading" className="privacy-h2">
            What happens when you send something to Mike
          </h2>
          <p className="privacy-lede">
            Two common paths, stated plainly. This does not change where your Mike memory lives.
          </p>

          <div className="mt-10 space-y-10">
            <div>
              <h3 className="privacy-h3">Messages and questions</h3>
              <FlowSteps
                label="Message and question flow"
                steps={[
                  "Your iPhone",
                  "Mike",
                  "Mike server",
                  "AI processing",
                  "Response returns to Mike",
                  "Your iPhone",
                ]}
              />
              <p className="mt-4 max-w-prose text-[var(--muted)]">
                Relevant information can pass through Mike&apos;s server to the AI model used by
                Mike. The server adds the AI key, counts usage, and hands the reply back. According
                to this policy, the server keeps no copy of the content that passed through.
              </p>
            </div>

            <div>
              <h3 className="privacy-h3">Dictation</h3>
              <FlowSteps
                label="Dictation flow with Deepgram"
                steps={["Your iPhone", "Dictation service", "Text", "Mike"]}
              />
              <p className="mt-4 max-w-prose text-[var(--muted)]">
                With Deepgram enabled, audio goes from your phone to the transcription service. The
                audio does not pass through Mike&apos;s server. The resulting text is then treated
                like anything else you type.
              </p>
            </div>
          </div>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="storage-heading"
        >
          <h2 id="storage-heading" className="privacy-h2">
            Where Mike stores user data
          </h2>
          <p className="privacy-lede">
            A compact view of Mike data retention and where information lives for this personal AI
            memory assistant.
          </p>

          <div className="privacy-table-wrap mt-10" tabIndex={0} role="region" aria-label="Data storage comparison">
            <table className="privacy-table">
              <thead>
                <tr>
                  <th scope="col">Information</th>
                  <th scope="col">Where it lives</th>
                  <th scope="col">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {PRIVACY_STORAGE_ROWS.map((row) => (
                  <tr key={row.information}>
                    <th scope="row">{row.information}</th>
                    <td data-label="Where it lives">{row.where}</td>
                    <td data-label="Purpose">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="on-phone-heading"
        >
          <h2 id="on-phone-heading" className="privacy-h2">
            What stays on your phone
          </h2>
          <p className="privacy-body">
            Everything Mike keeps is stored on your device. That includes your messages, the pages
            Mike writes, the history of every change, your to-dos, documents you share, and other
            Mike memory data. None of it is copied to Mike&apos;s server or anywhere else.
          </p>
          <p className="privacy-body">
            Delete the app and it is gone, which is why the app offers a way to export your data
            first. Signing out does not touch it. Your memory stays on the phone behind the sign-in
            screen, and signing back in with the same account picks up where you left off.
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="private-details-heading"
        >
          <h2 id="private-details-heading" className="privacy-h2">
            Private details
          </h2>
          <p className="privacy-body">
            Some values are held apart from everything else. When you record one, it is stored on
            the device and shown to you behind a tap. It is never included in anything sent off the
            phone, not even to Mike&apos;s own server.
          </p>
          <p className="privacy-body">
            Mike is told only what a private detail is called, never what it says. That is why Mike
            can know where something is kept without being able to read its private value.
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="account-heading"
        >
          <h2 id="account-heading" className="privacy-h2">
            Your Mike account
          </h2>
          <p className="privacy-body">
            You sign in with Apple or with Google. An account exists so Mike knows it is you, so
            the daily allowance that keeps the service fair can be counted per person, and so the
            keys that reach the AI model and the transcription service can stay on Mike&apos;s
            server instead of inside the app on your phone.
          </p>
          <p className="privacy-body">
            Apple or Google confirms who you are and provides an ID, along with your name and email
            if you choose to share them. Apple lets you hide your email behind a relay address.
            Mike never sees your Apple or Google password.
          </p>
          <p className="privacy-body">
            Mike&apos;s server, which runs on Cloudflare, keeps the following and nothing else:
          </p>
          <ul className="privacy-list">
            <li>Your account ID, and whether you signed in with Apple or Google</li>
            <li>Your email and your name, each only if shared</li>
            <li>
              The short profile you fill in yourself—your name, city, timezone, what you do, the
              people who matter to you, and anything else you want Mike to know. It is mirrored
              there so a reinstall gets it back
            </li>
            <li>
              A count of how many messages you sent and how many times you dictated each day.
              Numbers only, never what was said
            </li>
            <li>
              A sign-in session for each phone you use. The phone holds a random token, and the
              server keeps only a scrambled form of it, so the database itself cannot be used to
              sign in as you. A session unused for six months is treated as signed out
            </li>
          </ul>
          <p className="privacy-note">
            No messages, no pages, no documents and no private details are stored on the server.
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="ai-processing-heading"
        >
          <h2 id="ai-processing-heading" className="privacy-h2">
            What Mike sends for AI processing
          </h2>
          <h3 className="privacy-h3">What information is sent for AI processing?</h3>
          <p className="privacy-body">
            To understand what you send, Mike passes your message and the pages kept for you to an
            AI model run by Anthropic. This happens when you send information or ask a question.
          </p>
          <ul className="privacy-list">
            <li>User content may pass through Mike&apos;s server</li>
            <li>Mike&apos;s server handles the request and AI key, and counts one message against your day</li>
            <li>The request is sent to the AI model used by Mike</li>
            <li>
              According to this policy, the server keeps no copy of the content passed through it,
              and does not attach your email or account ID to what it forwards
            </li>
            <li>
              According to this policy, Anthropic does not train models on this material and does
              not retain it for its own use
            </li>
          </ul>
          <p className="privacy-body">
            Every hop is over an encrypted connection. Nothing you send is used to train models by
            Mike AI or by the services Mike uses, according to this policy.
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="links-heading"
        >
          <h2 id="links-heading" className="privacy-h2">
            Web links and external websites
          </h2>
          <p className="privacy-body">
            If a message contains a web link, Mike may fetch that webpage so it can understand and
            file the content. That request goes to the website being accessed.
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="dictation-heading"
        >
          <h2 id="dictation-heading" className="privacy-h2">
            Dictation and transcription
          </h2>
          <p className="privacy-lede">
            Mike dictation privacy depends on the setting you choose, and on whether you are using
            private notes.
          </p>

          <h3 className="privacy-h3">With Deepgram</h3>
          <p className="privacy-body">
            When you dictate, the recording goes from your phone to Deepgram, a transcription
            service, which turns it into text. According to this policy, Deepgram does not keep the
            recording. Mike&apos;s server hands the app a short-lived pass so it can connect, and
            counts one dictation against your day. The audio itself never passes through Mike&apos;s
            server. Mike can send names from your notes along as hints to improve recognition. The
            resulting text is then treated like anything else you type.
          </p>

          <h3 className="privacy-h3">With Apple&apos;s on-device speech recognition</h3>
          <p className="privacy-body">
            You can turn Deepgram off in Settings. With it off, dictation is transcribed on the
            phone by Apple&apos;s speech recognition. No audio leaves your device for that
            transcription path, and the transcript may be less accurate.
          </p>

          <h3 className="privacy-h3">Private notes</h3>
          <p className="privacy-body">
            Dictation on the private notes screen is never sent anywhere, whatever the dictation
            setting says, because nothing on that screen leaves the phone.
          </p>

          <p className="privacy-note">
            A microphone hears whatever is in the room, including people who are not you. That is
            worth knowing before you dictate somewhere with other people nearby.
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="does-not-heading"
        >
          <h2 id="does-not-heading" className="privacy-h2">
            What Mike does not do
          </h2>
          <ul className="privacy-list">
            <li>No analytics, no tracking, no advertising identifiers</li>
            <li>No copy of your memory held by Mike</li>
            <li>Nothing sold, shared or licensed to anyone</li>
            <li>
              Nothing you send is used to train a model, by Mike or by the services Mike uses,
              according to this policy
            </li>
          </ul>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="deletion-heading"
        >
          <h2 id="deletion-heading" className="privacy-h2">
            Deleting your account
          </h2>
          <p className="privacy-body">
            Delete account, in Settings, removes your account, your profile, your sessions and your
            usage counts from Mike&apos;s server, and erases everything on the phone. It asks
            twice, because it cannot be undone.
          </p>
          <p className="privacy-body">
            Export your pages first if you want a copy. Mike account deletion removes the
            server-side record straight away, and there is nothing left on Mike&apos;s side to ask
            about afterward.
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="children-heading"
        >
          <h2 id="children-heading" className="privacy-h2">
            Children
          </h2>
          <p className="privacy-body">
            Mike is for people aged 13 and over. It is not designed for or directed at children
            under 13, and Mike does not knowingly hold any information about them. If you believe a
            child under 13 has an account, write to{" "}
            <a href={`mailto:${SITE.email}`} className="privacy-inline-link">
              {SITE.email}
            </a>{" "}
            and it will be removed.
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="changes-heading"
        >
          <h2 id="changes-heading" className="privacy-h2">
            Changes to this Privacy Policy
          </h2>
          <p className="privacy-body">
            If what leaves your phone, or what Mike keeps, ever changes, this page changes with it.
            The date at the top moves, and the app tells you rather than leaving you to find out on
            your own.
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section"
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading" className="privacy-h2">
            Contact Mike AI
          </h2>
          <p className="privacy-body">
            Mike is operated by Mike AI (Shoaib Mustaque Ansari, until Mike AI, Inc. is formed).
            Write to{" "}
            <a href={`mailto:${SITE.email}`} className="privacy-inline-link">
              {SITE.email}
            </a>{" "}
            and a person will answer. If you want to know what is held about you, it is the list in
            this Privacy Policy, and you are welcome to ask for it.
          </p>
          <p className="mt-6 text-sm text-[var(--muted-dim)]">
            <Link href="/" className="underline-offset-4 hover:text-[var(--foreground)] hover:underline">
              Back to Mike
            </Link>
          </p>
        </section>

        <section
          className="privacy-reveal privacy-section privacy-faq-section"
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading" className="privacy-h2">
            Privacy FAQ
          </h2>
          <p className="privacy-lede">
            Direct answers about Mike privacy, AI memory assistant privacy, and how Mike handles
            personal data.
          </p>
          <div className="mt-8">
            <PrivacyFaq items={PRIVACY_FAQS} />
          </div>
        </section>
      </article>
    </PrivacyMotion>
  );
}
