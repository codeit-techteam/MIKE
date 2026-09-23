import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";

/**
 * Shared Sanity client. Stega is configured for Visual Editing overlays;
 * metadata/sitemap fetches must pass stega: false.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl,
  },
});
