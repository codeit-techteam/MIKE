export type WikiIconName =
  | "person"
  | "restaurant"
  | "heart"
  | "home"
  | "car"
  | "personAlt"
  | "check";

export type WikiPage = {
  id: string;
  title: string;
  description: string;
  updated: string;
  icon: WikiIconName;
  detail: {
    lines: string[];
    recentMention: string;
    related: string[];
  };
};

export const WIKI_PAGES: WikiPage[] = [
  {
    id: "sam",
    title: "Sam",
    description: "From college. You owe him ₹2,400.",
    updated: "now",
    icon: "person",
    detail: {
      lines: ["From college.", "You owe him ₹2,400."],
      recentMention: "Need to send Sam the money.",
      related: ["College", "Naru", "₹2,400"],
    },
  },
  {
    id: "naru",
    title: "Naru",
    description: "Bandra. The miso cod. Sam's find.",
    updated: "now",
    icon: "restaurant",
    detail: {
      lines: ["Bandra.", "The miso cod.", "Sam's find."],
      recentMention: "Quiet corner table. Book again if the list opens.",
      related: ["Sam", "Bandra", "Miso cod"],
    },
  },
  {
    id: "mums-medicines",
    title: "Mum's medicines",
    description: "Telmisartan 5mg, morning and night.",
    updated: "1d",
    icon: "heart",
    detail: {
      lines: ["Telmisartan 5mg.", "Morning and night."],
      recentMention: "Retest scheduled with her doctor.",
      related: ["Mum", "Morning", "Night"],
    },
  },
  {
    id: "the-flat",
    title: "The flat",
    description: "Third floor. Landlord Suresh. Lease till March.",
    updated: "3d",
    icon: "home",
    detail: {
      lines: ["Third floor.", "Landlord Suresh.", "Lease till March."],
      recentMention: "Geyser guy came by last week.",
      related: ["Suresh", "March", "Third floor"],
    },
  },
  {
    id: "the-car",
    title: "The car",
    description: "Insurance renews 14 November.",
    updated: "4d",
    icon: "car",
    detail: {
      lines: ["Insurance renews 14 November."],
      recentMention: "Parked P3, bay 41.",
      related: ["Insurance", "November", "P3"],
    },
  },
  {
    id: "anita",
    title: "Anita",
    description: "Birthday in March. Loved the ceramics class.",
    updated: "1w",
    icon: "personAlt",
    detail: {
      lines: ["Birthday in March.", "Loved the ceramics class."],
      recentMention: "Prefers morning calls.",
      related: ["March", "Ceramics", "Morning"],
    },
  },
];
