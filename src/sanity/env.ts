/**
 * Mike Sanity project (public identifiers).
 * https://www.sanity.io/manage/project/6imjn5c8
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6imjn5c8";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
  "https://mike-ai.sanity.studio";


/** True when a real Sanity project ID is configured. */
export const isSanityConfigured = Boolean(
  projectId && projectId !== "placeholder"
);
