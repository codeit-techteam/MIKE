import type { Metadata } from "next";
import { MIKE_SCHEMA_DESCRIPTION, OG_IMAGE_ALT, SITE } from "@/lib/constants";
import { PRIVACY } from "@/lib/privacy";

export type SitePage = {
  path: string;
  title: string;
  description: string;
  lastModified: string;
  summary: string;
};

const CONTENT_UPDATED = "2026-09-23";

export const PAGES = {
  home: {
    path: "/",
    title: SITE.title,
    description: SITE.description,
    lastModified: CONTENT_UPDATED,
    summary: "Mike, a personal AI memory assistant for iPhone.",
  },
  howItWorks: {
    path: "/how-it-works",
    title: "How Mike Works — Personal AI Memory Assistant",
    description:
      "See how Mike, a personal AI memory assistant, takes what you text, say or share, files it into pages, and returns it when you ask.",
    lastModified: CONTENT_UPDATED,
    summary: "How Mike captures, files and returns what you send.",
  },
  features: {
    path: "/features",
    title: "Mike AI Features — Personal AI Memory Assistant",
    description:
      "Mike's features for remembering on iPhone: text, dictation, sharing links and documents, wiki pages, questions, and a history you can restore.",
    lastModified: CONTENT_UPDATED,
    summary: "What Mike can do with the information you choose to send.",
  },
  aiMemory: {
    path: "/ai-memory",
    title: "AI Memory — Personal AI Memory | Mike AI",
    description:
      "AI memory in Mike means the information you choose to send, kept as pages about people, places, plans, documents and things, and returned when you ask.",
    lastModified: CONTENT_UPDATED,
    summary: "How Mike remembers information as pages you can ask about.",
  },
  personalAi: {
    path: "/personal-ai-assistant",
    title: "Personal AI Assistant for iPhone | Mike AI",
    description:
      "Mike is a personal AI assistant for information you want to remember. Text, speak, or share it on iPhone, then ask for it later.",
    lastModified: CONTENT_UPDATED,
    summary: "Mike as a personal AI assistant for information you want to remember.",
  },
  secondBrain: {
    path: "/second-brain",
    title: "AI Second Brain — Personal Wiki | Mike AI",
    description:
      "Mike's second brain is a personal wiki: one current page for each person, place, plan and thing you choose to remember, without folders or tags.",
    lastModified: CONTENT_UPDATED,
    summary: "Mike's personal wiki for people, places, plans and things.",
  },
  faq: {
    path: "/faq",
    title: "Questions About Mike — Personal AI Memory Assistant",
    description:
      "Answers about Mike, a personal AI memory assistant for iPhone: what it remembers, how asking works, where memory is stored, and how to delete an account.",
    lastModified: CONTENT_UPDATED,
    summary: "Answers about using Mike, memory, privacy and availability.",
  },
  privacy: {
    path: "/privacy",
    title: "Mike Privacy Policy — Personal AI Memory Assistant | Mike AI",
    description:
      "Read Mike AI's Privacy Policy to understand how the personal AI memory assistant stores memory, processes information, handles dictation, and supports account deletion.",
    lastModified: PRIVACY.lastUpdatedIso,
    summary: "How Mike stores memory, processes information, handles dictation, and deletes accounts.",
  },
  terms: {
    path: "/terms",
    title: "Mike Terms of Service | Mike AI",
    description: "Read the Terms of Service for Mike AI, the personal AI memory assistant.",
    lastModified: CONTENT_UPDATED,
    summary: "Terms for using Mike during the private iPhone test.",
  },
  support: {
    path: "/support",
    title: "Mike Support — Personal AI Memory Assistant",
    description:
      "Get help with Mike, the personal AI memory assistant for iPhone. Find answers about using Mike, memory, dictation, accounts and more.",
    lastModified: CONTENT_UPDATED,
    summary: "Help with using Mike, memory, dictation and accounts.",
  },
  blog: {
    path: "/blog",
    title: "Mike AI Blog — Memory, Personal AI and Knowledge",
    description:
      "Ideas on memory, personal AI and knowledge from Mike AI. Notes on personal AI memory assistants, second brains, and remembering what matters.",
    lastModified: CONTENT_UPDATED,
    summary: "Editorial notes on memory, personal AI and knowledge from Mike AI.",
  },
} as const satisfies Record<string, SitePage>;

export const INDEXABLE_PAGES: SitePage[] = Object.values(PAGES);

export function absoluteUrl(path: string) {
  if (path === "/") return SITE.url;
  return `${SITE.url}${path}`;
}

export function createPageMetadata(page: SitePage): Metadata {
  const url = absoluteUrl(page.path);

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE.name,
      title: page.title,
      description: page.description,
      ...(page.path === "/"
        ? {}
        : {
            images: [
              {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: OG_IMAGE_ALT,
              },
            ],
          }),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      ...(page.path === "/" ? {} : { images: ["/twitter-image"] }),
    },
  };
}

const WEBSITE_ID = `${SITE.url}/#website`;
const APP_ID = `${SITE.url}/#app`;
const ORG_ID = `${SITE.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.company,
    url: absoluteUrl("/"),
    email: SITE.email,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: absoluteUrl("/"),
    description: MIKE_SCHEMA_DESCRIPTION,
    publisher: { "@id": ORG_ID },
  };
}

export function softwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE.name,
    alternateName: SITE.company,
    applicationCategory: "ProductivityApplication",
    applicationSubCategory: "Personal Knowledge Management",
    operatingSystem: "iOS",
    url: absoluteUrl("/"),
    description: MIKE_SCHEMA_DESCRIPTION,
    provider: { "@id": ORG_ID },
  };
}

export function webPageSchema(page: SitePage) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(page.path)}#webpage`,
    name: page.title,
    url: absoluteUrl(page.path),
    description: page.description,
    dateModified: page.lastModified,
    isPartOf: { "@id": WEBSITE_ID },
    about: [
      { "@id": APP_ID },
      { "@type": "Thing", "name": "Mike AI" },
      { "@type": "Thing", "name": "Personal AI Memory Assistant" },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
