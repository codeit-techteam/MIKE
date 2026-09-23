import Link from "next/link";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { ENTITY_FACTS, HOME_LINKS } from "@/lib/entity";

export function EntityFacts() {
  return (
    <section
      id="what-mike-is"
      className="section border-t border-[var(--border-subtle)]"
      aria-labelledby="what-mike-is-heading"
    >
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="max-w-xl">
          <SectionEyebrow>What Mike is</SectionEyebrow>
          <h2
            id="what-mike-is-heading"
            className="display text-[clamp(2.4rem,5vw,4.5rem)] text-[var(--foreground)]"
          >
            A personal AI memory assistant.
          </h2>
          <p className="mt-6 text-[var(--muted)] md:text-lg">
            Mike files what you choose to send into pages, and hands it back when you ask.
          </p>
        </div>

        <div>
          <dl className="m-0">
            {ENTITY_FACTS.map((fact) => (
              <div
                key={fact.question}
                className="border-b border-[var(--border-subtle)] py-4"
              >
                <dt className="text-[var(--foreground)]">{fact.question}</dt>
                <dd className="mt-1 text-[var(--muted)]">{fact.answer}</dd>
              </div>
            ))}
          </dl>

          <nav className="mt-8" aria-label="More about Mike">
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {HOME_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--accent-warm)] underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
