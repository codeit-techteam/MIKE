"use client";

import {
  FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { CTAButton } from "@/components/CTAButton";
import { WhatsAppQrStep } from "@/components/WhatsAppQrStep";
import {
  BUILD_ACCESS_COUNTRIES,
  BUILD_ACCESS_STEPS,
  formatMaskedPhone,
  maskE164Display,
  openMikeWhatsApp,
  type BuildAccessCountryId,
  type FlowStep,
} from "@/lib/build-access";
import {
  BETA_FIELD_LIMITS,
  WEB3FORMS_ENDPOINT,
  buildWeb3FormsPayload,
  digitsOnly,
  validatePhoneDigits,
  validateProfileData,
  type BetaRequestData,
  type BetaRequestResponse,
} from "@/lib/beta-request";
import { mikeWhatsAppChatUrl } from "@/lib/whatsapp";

type BuildAccessModalProps = {
  open: boolean;
  onClose: () => void;
};

const EMPTY_PROFILE = {
  firstName: "",
  lastName: "",
  email: "",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

async function submitBuildRequest(
  payload: BetaRequestData,
  accessKey: string
): Promise<{ ok: boolean; message?: string }> {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(buildWeb3FormsPayload(payload, accessKey)),
  });

  let result: BetaRequestResponse | null = null;
  try {
    result = (await response.json()) as BetaRequestResponse;
  } catch {
    result = null;
  }

  if (response.ok && result?.success === true) {
    return { ok: true };
  }

  return { ok: false, message: result?.message };
}

export function BuildAccessModal({ open, onClose }: BuildAccessModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [step, setStep] = useState<FlowStep>("phone");
  const [countryId, setCountryId] = useState<BuildAccessCountryId>("in");
  const [nationalDigits, setNationalDigits] = useState("");
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);

  const selectedCountry =
    BUILD_ACCESS_COUNTRIES.find((entry) => entry.id === countryId) ?? BUILD_ACCESS_COUNTRIES[0];
  const maskedNational = formatMaskedPhone(nationalDigits);
  const stepIndex = BUILD_ACCESS_STEPS.findIndex((entry) => entry.id === step);

  const resetFlow = () => {
    setStep("phone");
    setCountryId("in");
    setNationalDigits("");
    setProfile(EMPTY_PROFILE);
    setSubmittedPhone("");
    setIsSubmitting(false);
    setErrorMessage("");
    setLeadCaptured(false);
  };

  const clearError = () => {
    if (errorMessage) setErrorMessage("");
  };

  useEffect(() => {
    if (open) return;
    resetFlow();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      phoneInputRef.current?.focus();
      if (!phoneInputRef.current) {
        dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      }
    }, 20);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, isSubmitting]);

  const appendPhoneDigits = (incoming: string) => {
    setNationalDigits((current) =>
      (current + digitsOnly(incoming)).slice(0, selectedCountry.nationalLength)
    );
  };

  const handlePhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === "Backspace") {
      event.preventDefault();
      clearError();
      setNationalDigits((current) => current.slice(0, -1));
      return;
    }

    if (event.key === "Delete") {
      event.preventDefault();
      clearError();
      setNationalDigits("");
      return;
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      clearError();
      appendPhoneDigits(event.key);
    }
  };

  const handlePhonePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    clearError();
    let pasted = digitsOnly(event.clipboardData.getData("text"));
    if (!pasted) return;

    if (pasted.startsWith(selectedCountry.dial)) {
      pasted = pasted.slice(selectedCountry.dial.length);
    }

    setNationalDigits(pasted.slice(0, selectedCountry.nationalLength));
  };

  const handlePhoneContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();

    const formElement = event.currentTarget;
    const honeypot =
      (formElement.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    if (honeypot.trim()) return;

    const fullDigits = `${selectedCountry.dial}${nationalDigits}`;
    const validationError = validatePhoneDigits(fullDigits);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (nationalDigits.length < Math.min(8, selectedCountry.nationalLength)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    setSubmittedPhone(`+${fullDigits}`);
    setStep("profile");
  };

  const handleProfileContinue = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    clearError();

    const formElement = event.currentTarget;
    const honeypot =
      (formElement.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    if (honeypot.trim()) return;

    const validationError = validateProfileData(profile);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!submittedPhone) {
      setErrorMessage("Please enter your phone number first.");
      setStep("phone");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      console.error("[build-access] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not configured");
      setErrorMessage("Something went wrong. Please try again later.");
      return;
    }

    const payload: BetaRequestData = {
      phone: submittedPhone,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
    };

    setIsSubmitting(true);

    try {
      let result = await submitBuildRequest(payload, accessKey);

      // One silent retry for transient network / API blips — never lose the lead.
      if (!result.ok) {
        await new Promise((resolve) => window.setTimeout(resolve, 450));
        result = await submitBuildRequest(payload, accessKey);
      }

      if (!result.ok) {
        console.error("[build-access] Build request failed", result.message);
        setErrorMessage(result.message || "Something went wrong. Please try again.");
        return;
      }

      setLeadCaptured(true);
      setStep("whatsapp");

      // Open WhatsApp only after the lead is safely captured.
      window.setTimeout(() => {
        openMikeWhatsApp(mikeWhatsAppChatUrl());
      }, 350);
    } catch (error) {
      console.error("[build-access] Build request error", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  const fieldClass =
    "min-h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--muted-dim)] focus:border-[rgba(245,245,242,0.35)] focus:shadow-[0_0_0_3px_rgba(245,245,242,0.06)] disabled:opacity-60";

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(0,0,0,0.72)] backdrop-blur-[2px] animate-[beta-step-in_200ms_ease-out]"
        aria-label="Close ask for a build"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-[1] flex max-h-[min(92vh,44rem)] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_80px_rgba(0,0,0,0.55)] animate-[beta-step-in_240ms_ease-out] sm:rounded-[1.5rem]"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">
              Private beta
            </p>
            <p className="mt-0.5 text-sm text-[var(--muted)]">Ask for a Mike build</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[rgba(245,245,242,0.35)] hover:text-[var(--foreground)] disabled:opacity-50"
            aria-label="Close"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <div className="mb-7 flex items-center justify-center gap-2" aria-label="Progress">
            {BUILD_ACCESS_STEPS.map((entry, index) => {
              const active = index === stepIndex;
              const done = index < stepIndex;
              return (
                <div key={entry.id} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span
                      className={`h-px w-6 sm:w-10 ${done || active ? "bg-[rgba(245,245,242,0.35)]" : "bg-[var(--border)]"}`}
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-[0.65rem] font-semibold tracking-wide transition-colors ${
                        active
                          ? "bg-[#F5F5F2] text-[#050505]"
                          : done
                            ? "bg-[rgba(245,245,242,0.18)] text-[var(--foreground)]"
                            : "border border-[var(--border)] text-[var(--muted-dim)]"
                      }`}
                      aria-current={active ? "step" : undefined}
                    >
                      {done ? "✓" : index + 1}
                    </span>
                    <span
                      className={`hidden text-[0.65rem] uppercase tracking-[0.12em] sm:block ${
                        active ? "text-[var(--foreground)]" : "text-[var(--muted-dim)]"
                      }`}
                    >
                      {entry.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {step === "phone" ? (
            <form
              className="mx-auto w-full max-w-md animate-[beta-step-in_280ms_ease-out]"
              onSubmit={handlePhoneContinue}
              noValidate
            >
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="build-website">Website</label>
                <input
                  id="build-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>

              <div className="text-center">
                <h2 id={titleId} className="display text-[clamp(1.85rem,4vw,2.4rem)] leading-[1.1]">
                  Sign in to Mike
                </h2>
                <p
                  id={descriptionId}
                  className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base"
                >
                  Enter your number. Digits stay private on screen — we only use it to reach you
                  about your build.
                </p>
              </div>

              <div className="mt-8">
                <span className="mb-2 block text-center text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">
                  Phone number
                </span>
                <div className="flex min-h-14 items-center rounded-2xl border border-[var(--border)] bg-[var(--background)] px-1 transition-[border-color,box-shadow] focus-within:border-[rgba(245,245,242,0.28)] focus-within:shadow-[0_0_0_3px_rgba(245,245,242,0.05)]">
                  <label htmlFor="build-country" className="sr-only">
                    Country
                  </label>
                  <div className="relative shrink-0">
                    <select
                      id="build-country"
                      name="country"
                      value={countryId}
                      onChange={(event) => {
                        clearError();
                        setCountryId(event.target.value as BuildAccessCountryId);
                        setNationalDigits("");
                      }}
                      className="h-11 cursor-pointer appearance-none rounded-xl border-0 bg-transparent py-2 pl-3 pr-8 text-sm text-[var(--foreground)] outline-none transition-colors hover:bg-[rgba(245,245,242,0.04)]"
                      aria-label="Country code"
                    >
                      {BUILD_ACCESS_COUNTRIES.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <span
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[0.55rem] text-[var(--muted-dim)]"
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </div>

                  <span
                    className="mx-1 h-6 w-px shrink-0 bg-[rgba(245,245,242,0.14)]"
                    aria-hidden="true"
                  />

                  <input
                    ref={phoneInputRef}
                    id="build-phone"
                    name="phone"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    required
                    maxLength={14}
                    placeholder="XXXX XXX XXXX"
                    value={maskedNational}
                    onChange={() => {
                      /* Digits handled in keydown/paste so the field never shows numbers. */
                    }}
                    onKeyDown={handlePhoneKeyDown}
                    onPaste={handlePhonePaste}
                    aria-label="Phone number, digits are masked"
                    className="min-w-0 flex-1 bg-transparent py-3 pl-3 pr-4 font-mono text-[1.05rem] tracking-[0.18em] text-[var(--foreground)] outline-none placeholder:tracking-[0.18em] placeholder:text-[var(--muted-dim)]"
                  />
                </div>
                <p className="mt-2 text-center text-xs text-[var(--muted-dim)]">
                  Shown as XXXX while you type
                </p>
              </div>

              {errorMessage ? (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mt-4 text-center text-sm text-[#e8b4b4]"
                >
                  {errorMessage}
                </div>
              ) : null}

              <p className="mt-6 text-center text-xs leading-relaxed text-[var(--muted-dim)]">
                By continuing, you agree to Mike&apos;s{" "}
                <a
                  href="/terms"
                  className="underline underline-offset-2 hover:text-[var(--foreground)]"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-[var(--foreground)]"
                >
                  Privacy Policy
                </a>
                .
              </p>

              <CTAButton type="submit" className="mt-5 w-full">
                Continue →
              </CTAButton>
            </form>
          ) : null}

          {step === "profile" ? (
            <form
              className="mx-auto w-full max-w-md animate-[beta-step-in_280ms_ease-out]"
              onSubmit={handleProfileContinue}
              noValidate
            >
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="build-website-profile">Website</label>
                <input
                  id="build-website-profile"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>

              <div className="text-center">
                <h2 id={titleId} className="display text-[clamp(1.85rem,4vw,2.4rem)] leading-[1.1]">
                  Tell us who you are
                </h2>
                <p
                  id={descriptionId}
                  className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base"
                >
                  We&apos;ll email you about your build. Your number stays private on this screen.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <label className="block" htmlFor="build-first-name">
                  <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">
                    First name
                  </span>
                  <input
                    id="build-first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    maxLength={BETA_FIELD_LIMITS.firstName}
                    value={profile.firstName}
                    onChange={(event) => {
                      clearError();
                      setProfile((current) => ({
                        ...current,
                        firstName: event.target.value,
                      }));
                    }}
                    disabled={isSubmitting}
                    className={fieldClass}
                  />
                </label>

                <label className="block" htmlFor="build-last-name">
                  <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">
                    Last name
                  </span>
                  <input
                    id="build-last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    maxLength={BETA_FIELD_LIMITS.lastName}
                    value={profile.lastName}
                    onChange={(event) => {
                      clearError();
                      setProfile((current) => ({
                        ...current,
                        lastName: event.target.value,
                      }));
                    }}
                    disabled={isSubmitting}
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className="mt-3 block" htmlFor="build-email">
                <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">
                  Email
                </span>
                <input
                  id="build-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={BETA_FIELD_LIMITS.email}
                  placeholder="you@example.com"
                  value={profile.email}
                  onChange={(event) => {
                    clearError();
                    setProfile((current) => ({
                      ...current,
                      email: event.target.value,
                    }));
                  }}
                  disabled={isSubmitting}
                  className={fieldClass}
                />
              </label>

              {errorMessage ? (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mt-4 text-center text-sm text-[#e8b4b4]"
                >
                  {errorMessage}
                </div>
              ) : null}

              <p className="mt-5 text-center font-mono text-sm tracking-wide text-[var(--muted-dim)]">
                {submittedPhone ? maskE164Display(submittedPhone) : "XXXX XXX XXXX"}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <CTAButton
                  type="button"
                  variant="secondary"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    clearError();
                    setStep("phone");
                  }}
                  disabled={isSubmitting}
                >
                  ← Back
                </CTAButton>
                <CTAButton
                  type="submit"
                  className="w-full flex-1 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Saving your details…" : "Continue →"}
                </CTAButton>
              </div>
            </form>
          ) : null}

          {step === "whatsapp" ? (
            <div className="animate-[beta-step-in_280ms_ease-out]">
              {leadCaptured ? (
                <p className="mb-4 text-center text-sm text-[var(--accent-warm)]" role="status">
                  You&apos;re on the list. Opening WhatsApp…
                </p>
              ) : null}
              <WhatsAppQrStep
                onStartOver={() => {
                  resetFlow();
                }}
                onClose={onClose}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
