import type { PortableTextBlock } from "@portabletext/types";

const WORDS_PER_MINUTE = 220;

function collectText(value: unknown, parts: string[]): void {
  if (!value) return;
  if (typeof value === "string") {
    parts.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectText(item, parts);
    return;
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.text === "string") parts.push(record.text);
    if (Array.isArray(record.children)) collectText(record.children, parts);
    if (Array.isArray(record.body)) collectText(record.body, parts);
  }
}

export function estimateReadingMinutes(
  body: PortableTextBlock[] | null | undefined,
  wordCount?: number | null
): number {
  let words = wordCount ?? 0;
  if (!words && body?.length) {
    const parts: string[] = [];
    collectText(body, parts);
    words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  }
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
