import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Mike" },
  description: "That address isn't a page on michaelross.ai.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="privacy-page">
        <div className="privacy-shell container">
          <p className="eyebrow">404</p>
          <h1 className="display mt-2 text-[clamp(2.6rem,7vw,4.75rem)] tracking-tight">
            This page isn&apos;t available.
          </h1>
          <p className="privacy-body">
            That address isn&apos;t a page on michaelross.ai. It may have moved, or the link may be
            mistyped.
          </p>
          <nav className="mt-8 flex flex-col gap-3" aria-label="Recovery">
            <Link
              href="/"
              className="text-[var(--accent-warm)] underline-offset-4 hover:underline"
            >
              Back to Mike
            </Link>
            <Link
              href="/support"
              className="text-[var(--accent-warm)] underline-offset-4 hover:underline"
            >
              Mike support
            </Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
