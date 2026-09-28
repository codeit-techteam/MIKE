export const SITE = {
  name: "Mike",
  company: "Mike AI",
  tagline: "Your personal AI memory.",
  category: "Personal AI memory assistant",
  url: "https://michaelross.ai",
  email: "hello@michaelross.ai",
  mailto: "mailto:hello@michaelross.ai?subject=I%20want%20to%20try%20Mike",
  title: "Mike — Your Personal AI Memory Assistant",
  description:
    "Mike is a personal AI memory assistant for iPhone. Text, speak, or share what you want to remember, then ask Mike for it later.",
} as const;

export const MIKE_DEFINITION =
  "Mike is a personal AI memory assistant for iPhone. You can text, speak, or share information with Mike, and later ask natural-language questions to retrieve what you wanted to remember.";

export const MIKE_SCHEMA_DESCRIPTION =
  "Mike is a personal AI memory assistant that helps users remember information by organizing what they share into continuously updated pages.";

export const OG_IMAGE_ALT = "Mike, a personal AI memory assistant for iPhone";

export const NAV_LINKS = [
  { href: "/#ask", label: "Getting it back" },
  { href: "/#how", label: "How it works" },
  { href: "/#manners", label: "Good manners" },
  { href: "/blog", label: "Blog" },
] as const;

export const FOOTER_LINKS = [
  { href: "/how-it-works", label: "How Mike works" },
  { href: "/features", label: "Mike's features" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "Questions about Mike" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
  { href: "/#access", label: "Join as Beta Tester" },
] as const;
