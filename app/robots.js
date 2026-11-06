import { SITE_URL } from "../data/site";

/**
 * @returns {import("next").MetadataRoute.Robots}
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "CCBot",
          "Google-Extended",
          "PerplexityBot",
          "Bytespider",
          "Applebot-Extended",
          "cohere-ai",
          "Diffbot",
        ],
        disallow: "/",
      },
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}
