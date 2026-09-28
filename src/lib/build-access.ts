export type FlowStep = "phone" | "profile" | "whatsapp";

export const BUILD_ACCESS_COUNTRIES = [
  { id: "in", code: "+91", label: "India", dial: "91", flag: "🇮🇳", nationalLength: 10, groups: [5, 5], placeholder: "98765 43210" },
  { id: "us", code: "+1", label: "United States", dial: "1", flag: "🇺🇸", nationalLength: 10, groups: [3, 3, 4], placeholder: "415 555 0132" },
  { id: "gb", code: "+44", label: "United Kingdom", dial: "44", flag: "🇬🇧", nationalLength: 10, groups: [4, 6], placeholder: "7911 123456" },
  { id: "au", code: "+61", label: "Australia", dial: "61", flag: "🇦🇺", nationalLength: 9, groups: [3, 3, 3], placeholder: "412 345 678" },
  { id: "ca", code: "+1", label: "Canada", dial: "1", flag: "🇨🇦", nationalLength: 10, groups: [3, 3, 4], placeholder: "416 555 0132" },
] as const;

export type BuildAccessCountry = (typeof BUILD_ACCESS_COUNTRIES)[number];
export type BuildAccessCountryId = BuildAccessCountry["id"];

export const BUILD_ACCESS_STEPS: { id: FlowStep; label: string }[] = [
  { id: "phone", label: "Number" },
  { id: "profile", label: "About you" },
  { id: "whatsapp", label: "WhatsApp" },
];

/**
 * Turns whatever the user typed, pasted, or autofilled into national digits:
 * drops the country code and a leading trunk 0 when they push past the expected length.
 */
export function normalizeNationalDigits(raw: string, country: BuildAccessCountry): string {
  let digits = raw.replace(/\D/g, "");
  const hadPlus = raw.trim().startsWith("+");

  if ((hadPlus || digits.length > country.nationalLength) && digits.startsWith(country.dial)) {
    digits = digits.slice(country.dial.length);
  }
  if (digits.length > country.nationalLength && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return digits.slice(0, country.nationalLength);
}

/** Groups digits progressively as they are typed, e.g. 98765 43210. */
export function formatNationalPhone(digits: string, country: BuildAccessCountry): string {
  const parts: string[] = [];
  let index = 0;
  for (const size of country.groups) {
    if (index >= digits.length) break;
    parts.push(digits.slice(index, index + size));
    index += size;
  }
  if (index < digits.length) parts.push(digits.slice(index));
  return parts.join(" ");
}

/** Position in the formatted string that sits right after the nth digit. */
export function caretAfterDigits(formatted: string, digitCount: number): number {
  if (digitCount <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i += 1) {
    if (/\d/.test(formatted[i])) seen += 1;
    if (seen === digitCount) return i + 1;
  }
  return formatted.length;
}

export function formatInternationalPhone(digits: string, country: BuildAccessCountry): string {
  return `${country.code} ${formatNationalPhone(digits, country)}`;
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
