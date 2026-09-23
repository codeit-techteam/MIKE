import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { defineCliConfig } from "sanity/cli";

/** Sanity CLI does not load Next.js `.env.local` automatically. */
function loadEnvFile(filePath: string) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.resolve(__dirname, ".env.local"));
loadEnvFile(path.resolve(__dirname, ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6imjn5c8";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://michaelross.ai";
const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "https://mike-ai.sanity.studio";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "mike-ai",
  deployment: {
    appId: "vnl10kvvsoh7c3jpzyoh5w7m",
  },
  vite: {
    define: {
      "process.env.NEXT_PUBLIC_SANITY_PROJECT_ID": JSON.stringify(projectId),
      "process.env.NEXT_PUBLIC_SANITY_DATASET": JSON.stringify(dataset),
      "process.env.NEXT_PUBLIC_SANITY_API_VERSION": JSON.stringify(apiVersion),
      "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify(siteUrl),
      "process.env.NEXT_PUBLIC_SANITY_STUDIO_URL": JSON.stringify(studioUrl),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
