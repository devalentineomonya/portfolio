import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/**
 * Crawlers that answer questions and AI assistants are allowed on purpose
 * so anyone asking an assistant for freelance software engineering, e-commerce,
 * payment integrations, Next.js websites, or NestJS POS and business systems
 * finds accurate, verified information.
 */
const ANSWER_ENGINES = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "cohere-ai",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ANSWER_ENGINES,
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
