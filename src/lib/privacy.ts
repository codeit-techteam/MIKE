export const PRIVACY = {
  lastUpdated: "16 September 2026",
  lastUpdatedIso: "2026-09-16",
  h1: "Mike Privacy Policy",
  introLead:
    "How Mike, a personal AI memory assistant, stores, processes and protects the information you choose to remember.",
} as const;

export const PRIVACY_AT_A_GLANCE = [
  {
    label: "Memory",
    text: "Your Mike memory is stored on your device.",
  },
  {
    label: "Account",
    text: "Your account contains limited identity, profile and usage information.",
  },
  {
    label: "AI processing",
    text: "Information you send can pass through Mike's server to the AI model used by Mike.",
  },
  {
    label: "Dictation",
    text: "Dictation can use Deepgram, or Apple's on-device speech recognition when the relevant setting is disabled.",
  },
  {
    label: "Deletion",
    text: "Account deletion removes the server-side account information and erases the memory stored on the phone.",
  },
] as const;

export const PRIVACY_STORAGE_ROWS = [
  {
    information: "Mike memory",
    where: "Your device",
    purpose: "Store your messages, pages, history, to-dos, documents and other Mike memory data",
  },
  {
    information: "Private details",
    where: "Your device",
    purpose: "Hold private values on device; never included in anything sent off the phone",
  },
  {
    information: "Account ID",
    where: "Mike server",
    purpose: "Identify your account and sign-in provider (Apple or Google)",
  },
  {
    information: "Name / email",
    where: "Mike server, if shared",
    purpose: "Account and profile information you choose to share",
  },
  {
    information: "Short user profile",
    where: "Mike server",
    purpose: "Mirror the profile you fill in so a reinstall can restore it",
  },
  {
    information: "Usage counts",
    where: "Mike server",
    purpose: "Daily message and dictation allowance (numbers only)",
  },
  {
    information: "Session information",
    where: "Mike server",
    purpose: "Authentication and session management for each phone you use",
  },
] as const;

export type PrivacyFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const PRIVACY_FAQS: PrivacyFaqItem[] = [
  {
    id: "where-memory-stored",
    question: "Where is my Mike memory stored?",
    answer:
      "Everything Mike keeps for you—messages, pages, change history, to-dos, documents and other Mike memory data—is stored on your device. It is not copied to Mike's server.",
  },
  {
    id: "messages-on-server",
    question: "Does Mike store my messages on its server?",
    answer:
      "No. Mike's server does not store messages, pages, documents or private details. Those stay on your phone.",
  },
  {
    id: "account-information",
    question: "What account information does Mike store?",
    answer:
      "You sign in with Apple or Google. Mike's server keeps your account ID and sign-in provider, your email and name if shared, the short profile you fill in, daily usage counts (numbers only), and sign-in session information. It does not store messages, pages, documents or private details.",
  },
  {
    id: "model-training",
    question: "Does Mike use my data to train AI models?",
    answer:
      "No. Nothing you send is used to train a model by Mike or by the services Mike uses. The AI model run by Anthropic does not train on this material and does not retain it for its own use, according to this policy.",
  },
  {
    id: "dictation",
    question: "How does Mike handle dictation?",
    answer:
      "By default, dictation audio goes from your phone to Deepgram for transcription and is not kept. The audio does not pass through Mike's server. You can turn this off in Settings and use Apple's on-device speech recognition instead. Dictation on the private notes screen is never sent anywhere.",
  },
  {
    id: "delete-account",
    question: "Can I delete my Mike account?",
    answer:
      "Yes. Delete account in Settings removes your account. The app asks twice because deletion cannot be undone. Export is available first if you want a copy of your data.",
  },
  {
    id: "deletion-effects",
    question: "What happens when I delete my account?",
    answer:
      "Deleting your account removes your account, profile, sessions and usage counts from Mike's server, and erases everything on the phone. Mike's server deletes its record of you straight away.",
  },
  {
    id: "children",
    question: "Is Mike available for children under 13?",
    answer:
      "No. Mike is for people aged 13 and over. It is not designed for or directed at children under 13, and Mike does not knowingly hold information about them. If you believe a child under 13 has an account, write to hello@michaelross.ai and it will be removed.",
  },
];
