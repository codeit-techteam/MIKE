import { MIKE_DEFINITION, SITE } from "@/lib/constants";
import { ENTITY_FACTS } from "@/lib/entity";
import { INDEXABLE_PAGES, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const pages = INDEXABLE_PAGES.map((page) => `- [${page.summary}](${absoluteUrl(page.path)})`).join(
    "\n"
  );

  const facts = ENTITY_FACTS.map((fact) => `${fact.question} ${fact.answer}`).join("\n");

  const body = `# Mike

> ${MIKE_DEFINITION}

Mike is Mike AI, a personal AI memory assistant. Mike organizes information you choose to send into continuously updated pages about people, places, plans, documents and things. That organization is the Wiki. Mike is currently being tested privately on iPhone.

## Facts

${facts}

## Website

${pages}

## Product

- Personal AI memory assistant
- Personal knowledge management
- Personal wiki
- AI memory
- iPhone, private test

## Contact

${SITE.email}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
