/**
 * Seed Mike blog baseline content into the production dataset.
 * Run: npx sanity exec scripts/seed-blog.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

function block(
  style: string,
  text: string,
  marks: string[] = []
): Record<string, unknown> {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 10),
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: Math.random().toString(36).slice(2, 10),
        text,
        marks,
      },
    ],
  };
}

async function upsert(doc: { _id: string; _type: string } & Record<string, unknown>) {
  await client.createOrReplace(doc);
  console.log(`Upserted ${doc._type}: ${doc._id}`);
}

async function main() {
  await upsert({
    _id: "author-mike",
    _type: "author",
    name: "Mike AI",
    slug: { _type: "slug", current: "mike-ai" },
    bio: "Mike is a personal AI memory assistant for iPhone.",
  });

  const categories = [
    {
      _id: "category-personal-ai",
      title: "Personal AI",
      slug: "personal-ai",
      description: "Thinking about personal AI assistants and everyday memory.",
    },
    {
      _id: "category-ai-memory",
      title: "AI Memory",
      slug: "ai-memory",
      description: "How AI memory works, and how it differs from notes.",
    },
    {
      _id: "category-second-brain",
      title: "Second Brain",
      slug: "second-brain",
      description: "Personal knowledge systems and AI second brains.",
    },
  ] as const;

  for (const category of categories) {
    await upsert({
      _id: category._id,
      _type: "category",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
      seoTitle: `${category.title} — Mike AI Blog`,
      seoDescription: category.description,
    });
  }

  const tags = [
    { _id: "tag-personal-ai-memory-assistant", title: "Personal AI memory assistant", slug: "personal-ai-memory-assistant" },
    { _id: "tag-ai-memory", title: "AI memory", slug: "ai-memory" },
    { _id: "tag-second-brain", title: "AI second brain", slug: "ai-second-brain" },
  ] as const;

  for (const tag of tags) {
    await upsert({
      _id: tag._id,
      _type: "tag",
      title: tag.title,
      slug: { _type: "slug", current: tag.slug },
    });
  }

  const publishedAt = "2026-09-23T10:00:00.000Z";

  await upsert({
    _id: "post-what-is-a-personal-ai-memory-assistant",
    _type: "post",
    title: "What Is a Personal AI Memory Assistant?",
    slug: {
      _type: "slug",
      current: "what-is-a-personal-ai-memory-assistant",
    },
    excerpt:
      "A personal AI memory assistant helps you capture everyday information and retrieve it later with natural-language questions — without turning your life into another pile of notes.",
    featured: true,
    publishedAt,
    author: { _type: "reference", _ref: "author-mike" },
    category: { _type: "reference", _ref: "category-personal-ai" },
    tags: [
      { _type: "reference", _ref: "tag-personal-ai-memory-assistant", _key: "t1" },
      { _type: "reference", _ref: "tag-ai-memory", _key: "t2" },
    ],
    seo: {
      seoTitle: "What Is a Personal AI Memory Assistant? | Mike AI",
      metaDescription:
        "A personal AI memory assistant captures what you choose to remember and returns it when you ask — unlike chatbots or note apps alone.",
      ogTitle: "What Is a Personal AI Memory Assistant?",
      ogDescription:
        "How personal AI memory assistants work, and how Mike keeps the details you normally forget.",
      noIndex: false,
    },
    noIndex: false,
    faq: [
      {
        _key: "f1",
        question: "What is a personal AI memory assistant?",
        answer:
          "A personal AI memory assistant is software that helps a person capture information from everyday life and retrieve it later using natural-language questions.",
      },
      {
        _key: "f2",
        question: "How is that different from a chatbot?",
        answer:
          "A chatbot answers in the moment. A memory assistant is built to keep what you send, organize it, and hand it back when you ask later.",
      },
      {
        _key: "f3",
        question: "How does Mike fit in?",
        answer:
          "Mike is a personal AI memory assistant for iPhone. You text, speak, or share what you want to remember, and later ask Mike for it.",
      },
    ],
    body: [
      block(
        "normal",
        "A personal AI memory assistant is software that helps a person capture information from everyday life and retrieve it later using natural-language questions."
      ),
      block(
        "normal",
        "That sounds simple, but it is different from both a chatbot and a notes app. The point is not another conversation, and it is not another folder. The point is memory you can ask for."
      ),
      block("h2", "The short answer"),
      block(
        "normal",
        "You give the assistant the details you do not want to lose — a plan, a name, a document, a place — and later you ask in your own words. The assistant returns what it has, without making you remember the exact phrasing or the date you saved it."
      ),
      block("h2", "How it works"),
      block(
        "normal",
        "Most personal AI memory assistants follow a similar path: capture, understand, organize, update, retrieve. You send information however it arrives. The system files it into durable pages or records. When you ask, it answers from what you chose to keep."
      ),
      block(
        "normal",
        "With Mike, that organization becomes a personal wiki: pages about people, places, plans, documents and things. Each page stays current as you mention the same subject again."
      ),
      block("h2", "Personal AI vs note-taking"),
      block(
        "normal",
        "Notes are useful when you know where you put something. Memory is useful when you only know what you need. A personal AI memory assistant is built for the second case: retrieval by meaning, not by folder."
      ),
      block("h2", "Why Mike exists"),
      block(
        "normal",
        "Mike is a personal AI memory assistant for iPhone. You can text, speak, or share what you want to remember, then ask Mike for it later. The goal is keeping the details of ordinary life close at hand — without turning every day into a filing job."
      ),
      block("h2", "Conclusion"),
      block(
        "normal",
        "If you need another chat window, a chatbot is enough. If you need somewhere to dump text, a notes app is enough. If you need to keep and recover the facts of your own life, a personal AI memory assistant is the clearer fit."
      ),
    ],
  });

  console.log("\nSeed complete. Open /blog and /blog/what-is-a-personal-ai-memory-assistant");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
