export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what-is-mike",
    question: "What is Mike?",
    answer:
      "Mike is a personal AI memory assistant for iPhone. You can text, speak, or share information with Mike, and later ask natural-language questions to retrieve what you wanted to remember.",
  },
  {
    id: "what-is-a-personal-ai-memory-assistant",
    question: "What is a personal AI memory assistant?",
    answer:
      "A personal AI memory assistant keeps information you choose to share, organizes it, and returns it when you ask. Mike does that by filing what you send into pages, then answering from those pages.",
  },
  {
    id: "how-does-mike-work",
    question: "How does Mike work?",
    answer:
      "You send Mike a typed message, something you say, or a file you share. Mike files it into pages about the people, places, plans, documents and things it relates to. Later you ask in ordinary language, and Mike answers from those pages. If the pages do not contain an answer, Mike says so.",
  },
  {
    id: "what-can-i-send",
    question: "What can I send to Mike?",
    answer:
      "You can type a message, hold to talk, or share a link, a photo, or a document such as a PDF. Documents you share stay on your phone and can be returned when you ask.",
  },
  {
    id: "how-mike-organizes-information",
    question: "How does Mike organize information?",
    answer:
      "Mike does not ask you to choose folders or tags. He writes what you send into pages, and updates those pages when you mention something new.",
  },
  {
    id: "what-is-the-wiki",
    question: "What is Mike's Wiki?",
    answer:
      "The Wiki is Mike's set of pages. There is a page for each person, place, plan and thing that matters in what you have shared. You can open a page and read it, or just ask.",
  },
  {
    id: "can-i-ask-questions",
    question: "Can I ask Mike questions about things I previously shared?",
    answer:
      "Yes. Ask in whatever words you have. Mike answers from the information you have given him, including details you may have forgotten. If your pages do not contain the answer, he says so instead of making one up.",
  },
  {
    id: "where-is-mike-available",
    question: "Where is Mike available?",
    answer:
      "Mike is currently being tested privately on iPhone. It is free while it is in testing. Join as a beta tester on this site, or email hello@michaelross.ai.",
  },
  {
    id: "how-mike-handles-privacy",
    question: "How does Mike handle privacy?",
    answer:
      "Your Mike memory is stored on your device. Private details stay on the phone and are not sent off it. Information you send so Mike can understand it can pass through Mike's server to the AI model Mike uses. Mike's server does not keep a copy of that content. The privacy policy describes dictation, account data and deletion.",
  },
  {
    id: "where-is-my-mike-memory-stored",
    question: "Where is my Mike memory stored?",
    answer:
      "On your device. Messages, pages, change history, to-dos, documents and other Mike memory data are stored on your phone. They are not copied to Mike's server.",
  },
  {
    id: "can-i-delete-my-account",
    question: "Can I delete my Mike account?",
    answer:
      "Yes. Delete account in Settings removes the server-side account information and erases the memory stored on the phone. The app asks twice because deletion cannot be undone. You can export a copy first.",
  },
  {
    id: "how-does-dictation-work",
    question: "How does Mike handle dictation?",
    answer:
      "By default, dictation audio goes from your phone to Deepgram for transcription and is not kept. The audio does not pass through Mike's server. You can turn that off in Settings and use Apple's on-device speech recognition instead. Dictation on the private notes screen is never sent anywhere.",
  },
];
