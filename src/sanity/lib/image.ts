import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = createImageUrlBuilder(client);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export function resolveImageUrl(
  source: SanityImageSource | null | undefined,
  width = 1200
): string | undefined {
  if (!source) return undefined;
  try {
    return urlForImage(source).width(width).auto("format").url();
  } catch {
    return undefined;
  }
}
