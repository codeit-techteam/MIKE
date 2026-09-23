"use client";

import { FormEvent, useRef, useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SITE } from "@/lib/constants";
import {
  BETA_FIELD_LIMITS,
  WEB3FORMS_ENDPOINT,
  buildWeb3FormsPayload,
  validateBetaRequestData,
  type BetaRequestData,
  type BetaRequestResponse,
} from "@/lib/beta-request";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

const COUNTRIES = [
  "United States",
  "India",
  "United Kingdom",
  "Canada",
  "Australia",
  "Other",
] as const;

const EMPTY_FORM: BetaRequestData = {
  name: "",
  email: "",
  country: "United States",
  iphoneModel: "",
  source: "",
  memoryInterest: "",
};

export function BetaSection() {
  const rootRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<BetaRequestData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useGSAP(
    () => {
      registerGsap();
      const panel = rootRef.current?.querySelector(".beta-panel");
      if (!panel) return;

      if (prefersReducedMotion()) return;

      gsap.fromTo(
        panel,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
          },
        }
      );
    },
    { scope: rootRef }
  );

  const focusForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    nameInputRef.current?.focus();
  };

  const updateField = <K extends keyof BetaRequestData>(key: K, value: BetaRequestData[K]) => {
    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setSuccessMessage("");
    setErrorMessage("");

    const validationError = validateBetaRequestData(form);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const formElement = event.currentTarget;
    const honeypot =
      (formElement.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    // Autofill sometimes fills honeypots — never fake a success that looks real.
    // Silently drop spam without showing the success state.
    if (honeypot.trim()) {
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      console.error("[beta-form] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not configured");
      setErrorMessage("Something went wrong. Please try again later.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(buildWeb3FormsPayload(form, accessKey)),
      });

      let result: BetaRequestResponse | null = null;
      try {
        result = (await response.json()) as BetaRequestResponse;
      } catch {
        result = null;
      }

      if (response.ok && result?.success === true) {
        setSuccessMessage(
          "You're on the list. We'll be in touch when a Mike build is ready."
        );
        setForm(EMPTY_FORM);
        return;
      }

      console.error("[beta-form] Beta request failed", {
        status: response.status,
        message: result?.message,
      });
      setErrorMessage(result?.message || "Something went wrong. Please try again.");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonLabel = isSubmitting
    ? "Sending request…"
    : successMessage
      ? "Beta request received"
      : "Request beta access";

  return (
    <section
      id="access"
      ref={rootRef}
      className="section border-t border-[var(--border-subtle)]"
      aria-labelledby="beta-heading"
    >
      <div className="container">
        <div className="beta-panel overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]">
          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="border-b border-[var(--border-subtle)] p-8 md:p-12 lg:border-b-0 lg:border-r">
              <SectionEyebrow>Private beta</SectionEyebrow>
              <h2 id="beta-heading" className="display text-[clamp(2.5rem,5vw,4.75rem)]">
                Try Mike before everyone else.
              </h2>
              <p className="mt-6 max-w-xl text-[var(--muted)] md:text-lg">
                Mike is currently in a small private test on iPhone. Ask for a build and we&apos;ll
                send you one. You&apos;ll be among the first to know when Mike is available on the
                App Store.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CTAButton onClick={focusForm}>Ask for a build</CTAButton>
                <CTAButton href="/how-it-works" variant="secondary">
                  Learn how Mike works
                </CTAButton>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-5 inline-block text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
              >
                {SITE.email}
              </a>

              <p className="mt-4 min-h-6 text-sm text-[var(--muted-dim)]">
                Free while it&apos;s in testing.
              </p>
            </div>

            <div className="p-8 md:p-12">
              <form
                ref={formRef}
                className="space-y-4"
                onSubmit={handleFormSubmit}
                noValidate
              >
                {/* Honeypot — hidden from users; name avoids common autofill heuristics */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="beta-website">Website</label>
                  <input
                    id="beta-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>

                <label className="block" htmlFor="beta-name">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    Name
                  </span>
                  <input
                    ref={nameInputRef}
                    id="beta-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={BETA_FIELD_LIMITS.name}
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    disabled={isSubmitting}
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)] disabled:opacity-60"
                  />
                </label>

                <label className="block" htmlFor="beta-email">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    Email
                  </span>
                  <input
                    id="beta-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={BETA_FIELD_LIMITS.email}
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    disabled={isSubmitting}
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)] disabled:opacity-60"
                  />
                </label>

                <label className="block" htmlFor="beta-country">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    Country
                  </span>
                  <select
                    id="beta-country"
                    name="country"
                    required
                    autoComplete="country-name"
                    value={form.country}
                    onChange={(event) => updateField("country", event.target.value)}
                    disabled={isSubmitting}
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)] disabled:opacity-60"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block" htmlFor="beta-iphone-model">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    iPhone model
                  </span>
                  <input
                    id="beta-iphone-model"
                    name="iphoneModel"
                    type="text"
                    placeholder="e.g. iPhone 15 Pro"
                    required
                    maxLength={BETA_FIELD_LIMITS.iphoneModel}
                    value={form.iphoneModel}
                    onChange={(event) => updateField("iphoneModel", event.target.value)}
                    disabled={isSubmitting}
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)] disabled:opacity-60"
                  />
                </label>

                <label className="block" htmlFor="beta-source">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    How did you hear about Mike?
                  </span>
                  <input
                    id="beta-source"
                    name="source"
                    type="text"
                    required
                    maxLength={BETA_FIELD_LIMITS.source}
                    value={form.source}
                    onChange={(event) => updateField("source", event.target.value)}
                    disabled={isSubmitting}
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)] disabled:opacity-60"
                  />
                </label>

                <label className="block" htmlFor="beta-memory-interest">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    What would you most like Mike to remember?
                  </span>
                  <textarea
                    id="beta-memory-interest"
                    name="memoryInterest"
                    rows={3}
                    required
                    maxLength={BETA_FIELD_LIMITS.memoryInterest}
                    value={form.memoryInterest}
                    onChange={(event) => updateField("memoryInterest", event.target.value)}
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)] disabled:opacity-60"
                  />
                </label>

                {errorMessage ? (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="text-sm text-[#e8b4b4]"
                  >
                    {errorMessage}
                  </div>
                ) : null}

                {successMessage ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="text-sm text-[var(--accent-warm)]"
                  >
                    {successMessage}
                  </div>
                ) : null}

                <CTAButton
                  type="submit"
                  className="w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  <span className="inline-flex items-center gap-2">
                    {isSubmitting ? (
                      <span
                        className="beta-submit-dot h-1.5 w-1.5 rounded-full bg-current"
                        aria-hidden="true"
                      />
                    ) : null}
                    {buttonLabel}
                  </span>
                </CTAButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
