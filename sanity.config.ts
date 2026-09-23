"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { resolve } from "@/sanity/presentation/resolve";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://michaelross.ai";

export default defineConfig({
  name: "mike-blog",
  title: "Mike Blog",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: siteUrl,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
