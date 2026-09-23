"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool === true) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-sm text-[var(--foreground)] shadow-lg"
    >
      Disable draft mode
    </a>
  );
}
