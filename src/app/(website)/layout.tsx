import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { BuildAccessProvider } from "@/components/build-access/BuildAccessProvider";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive } from "@/sanity/lib/live";
import { isSanityConfigured } from "@/sanity/env";

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <BuildAccessProvider>
      {children}
      {isSanityConfigured ? <SanityLive /> : null}
      {isEnabled ? (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      ) : null}
    </BuildAccessProvider>
  );
}
