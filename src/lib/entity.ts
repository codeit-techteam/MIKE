export const ENTITY_FACTS = [
  {
    question: "What is Mike?",
    answer: "Mike is a personal AI memory assistant.",
  },
  {
    question: "What does Mike remember?",
    answer:
      "Mike organizes information you choose to send into pages about people, places, plans, documents and things.",
  },
  {
    question: "How do you give Mike information?",
    answer:
      "You can text, speak, or share information such as links, photos and documents.",
  },
  {
    question: "How do you retrieve information?",
    answer: "You ask Mike natural-language questions.",
  },
  {
    question: "What is the Wiki?",
    answer:
      "The Wiki is Mike's organization of remembered information into pages around the things that matter to you.",
  },
  {
    question: "Where is Mike available?",
    answer: "Mike is currently being tested privately on iPhone.",
  },
] as const;

export const HOME_LINKS = [
  { href: "/how-it-works", label: "How Mike works" },
  { href: "/features", label: "Explore Mike's features" },
  { href: "/ai-memory", label: "AI memory" },
  { href: "/personal-ai-assistant", label: "Personal AI assistant" },
  { href: "/second-brain", label: "AI second brain" },
  { href: "/faq", label: "Questions about Mike" },
  { href: "/privacy", label: "Mike's privacy policy" },
  { href: "/support", label: "Mike support" },
] as const;
