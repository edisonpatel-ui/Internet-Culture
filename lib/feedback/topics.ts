/** Informational topic cards shown above the unified feedback form. */
export const FEEDBACK_TOPIC_CARDS = [
  {
    id: "report",
    title: "Report a Problem",
    description:
      "Help us fix accuracy and presentation issues in published entries.",
    examples: [
      "Incorrect information",
      "Broken links",
      "Broken images",
      "Typos",
      "Outdated content",
    ],
  },
  {
    id: "suggest-article",
    title: "Suggest an Article",
    description:
      "Request a topic that is missing from the encyclopedia catalog.",
    examples: [
      "Missing meme",
      "Missing slang",
      "Missing person",
      "Missing trend",
      "Missing event",
    ],
  },
  {
    id: "improvements",
    title: "Suggest Improvements",
    description:
      "Point out how an existing entry could be clearer or more complete.",
    examples: [
      "Better explanation",
      "More history",
      "Better references",
      "Better examples",
      "Additional media",
    ],
  },
  {
    id: "general",
    title: "General Feedback",
    description:
      "Share broader thoughts about the site — what works, what does not.",
    examples: [
      "Feature ideas",
      "Things you enjoyed",
      "Design feedback",
      "Confusing navigation",
    ],
  },
] as const;
