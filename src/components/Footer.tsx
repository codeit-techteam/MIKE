import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] pb-10 pt-16">
      <div className="container grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-display text-3xl tracking-tight">Mike</p>
          <p className="mt-1 text-sm text-[var(--muted-dim)]">{SITE.company}</p>
          <p className="mt-3 max-w-sm text-[var(--muted)]">{SITE.category}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-6 inline-block text-[var(--accent-warm)] underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:justify-items-end">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container mt-12 border-t border-[var(--border-subtle)] pt-6">
        <p className="text-sm text-[var(--muted-dim)]">© 2026 Mike AI</p>
      </div>
    </footer>
  );
}
