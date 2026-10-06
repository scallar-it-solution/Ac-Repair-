import type { Faq, PhotoKey } from "../site";

/**
 * Article body blocks. Text fields support two inline marks:
 *   [label](/internal-path)   → crawlable internal link
 *   **bold**                   → <strong>
 */
export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; id: string; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; caption: string; head: string[]; rows: string[][] }
  | { t: "callout"; title: string; text: string }
  | { t: "defs"; items: [term: string, definition: string][] };

export type ClusterId = "troubleshooting" | "gas" | "maintenance" | "buying" | "reference";

export type Guide = {
  slug: string;
  cluster: ClusterId;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  /** Answer-first TL;DR shown above the article and used as the AI-quotable summary. */
  answer: string;
  published: string;
  updated: string;
  photo: PhotoKey;
  blocks: Block[];
  faqs: Faq[];
  /** Service slugs this guide supports (drives guide → service and service → guide links). */
  related: string[];
  /** Hand-picked sibling guides; same-cluster guides fill any remaining slots. */
  relatedGuides?: string[];
  /** Verified external sources for statistics and facts quoted in the guide. */
  sources?: { label: string; url: string }[];
};
