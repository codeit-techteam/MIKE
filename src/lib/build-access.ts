export type FlowStep = "phone" | "profile" | "whatsapp";

export const BUILD_ACCESS_COUNTRIES = [
  { id: "in", code: "+91", label: "India", dial: "91", flag: "🇮🇳", nationalLength: 10 },
  { id: "us", code: "+1", label: "United States", dial: "1", flag: "🇺🇸", nationalLength: 10 },
  { id: "gb", code: "+44", label: "United Kingdom", dial: "44", flag: "🇬🇧", nationalLength: 10 },
  { id: "au", code: "+61", label: "Australia", dial: "61", flag: "🇦🇺", nationalLength: 9 },
  { id: "ca", code: "+1", label: "Canada", dial: "1", flag: "🇨🇦", nationalLength: 10 },
] as const;

export type BuildAccessCountryId = (typeof BUILD_ACCESS_COUNTRIES)[number]["id"];

export const BUILD_ACCESS_STEPS: { id: FlowStep; label: string }[] = [
  { id: "phone", label: "Number" },
  { id: "profile", label: "About you" },
  { id: "whatsapp", label: "WhatsApp" },
];

export function maskDigits(digits: string): string {
  return digits.replace(/\d/g, "X");
}

/** Progressive groups: XXXX XXX XXXX */
export function formatMaskedPhone(digits: string): string {
  const xs = maskDigits(digits);
  if (xs.length <= 4) return xs;
  if (xs.length <= 7) return `${xs.slice(0, 4)} ${xs.slice(4)}`;
  return `${xs.slice(0, 4)} ${xs.slice(4, 7)} ${xs.slice(7)}`;
}

export function maskE164Display(e164: string): string {
  const match = e164.match(/^(\+\d{1,3})(\d+)$/);
  if (!match) return formatMaskedPhone(e164.replace(/\D/g, ""));
  return `${match[1]} ${formatMaskedPhone(match[2])}`;
}

export function openMikeWhatsApp(url: string) {
  if (typeof window === "undefined") return;

  const mobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
  if (mobile) {
    window.location.assign(url);
    return;
  }

  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) {
    // Popup blocked — fall back to same-tab navigation.
    window.location.assign(url);
  }
}
