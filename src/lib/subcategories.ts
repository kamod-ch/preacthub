import type { LibraryCategorySlug } from "./categories";

export interface SubcategoryDefinition {
  slug: string;
  name: string;
}

export const subcategoriesByCategory: Record<
  Extract<
    LibraryCategorySlug,
    "ai-infrastructure" | "agent-frameworks" | "browser-automation" | "ai-developer-apis"
  >,
  readonly SubcategoryDefinition[]
> = {
  "ai-infrastructure": [
    { slug: "vector-databases", name: "Vector Databases" },
    { slug: "embeddings", name: "Embeddings" },
    { slug: "model-serving", name: "Model Serving" },
    { slug: "inference", name: "Inference" },
    { slug: "rag-infrastructure", name: "RAG Infrastructure" },
    { slug: "ai-gateways", name: "AI Gateways" },
    { slug: "observability", name: "Observability" },
    { slug: "prompt-management", name: "Prompt Management" },
    { slug: "evaluation", name: "Evaluation" },
    { slug: "memory-stores", name: "Memory Stores" },
  ],
  "agent-frameworks": [
    { slug: "agent-orchestration", name: "Agent Orchestration" },
    { slug: "multi-agent-systems", name: "Multi-Agent Systems" },
    { slug: "tool-calling", name: "Tool Calling" },
    { slug: "workflow-agents", name: "Workflow Agents" },
    { slug: "coding-agents", name: "Coding Agents" },
    { slug: "agent-memory", name: "Agent Memory" },
    { slug: "mcp-clients", name: "MCP Clients" },
    { slug: "mcp-servers", name: "MCP Servers" },
  ],
  "browser-automation": [
    { slug: "browser-testing", name: "Browser Testing" },
    { slug: "web-scraping", name: "Web Scraping" },
    { slug: "ai-browser-agents", name: "AI Browser Agents" },
    { slug: "headless-browsers", name: "Headless Browsers" },
    { slug: "visual-testing", name: "Visual Testing" },
    { slug: "session-management", name: "Session Management" },
    { slug: "remote-browsers", name: "Remote Browsers" },
  ],
  "ai-developer-apis": [
    { slug: "llm-apis", name: "LLM APIs" },
    { slug: "image-generation", name: "Image Generation" },
    { slug: "speech-to-text", name: "Speech-to-Text" },
    { slug: "text-to-speech", name: "Text-to-Speech" },
    { slug: "translation", name: "Translation" },
    { slug: "document-processing", name: "Document Processing" },
    { slug: "search-apis", name: "Search APIs" },
    { slug: "ai-coding-apis", name: "AI Coding APIs" },
    { slug: "moderation", name: "Moderation" },
    { slug: "structured-extraction", name: "Structured Extraction" },
  ],
};

const subcategoryMap = new Map<string, SubcategoryDefinition>();
for (const list of Object.values(subcategoriesByCategory)) {
  for (const sub of list) {
    subcategoryMap.set(sub.slug, sub);
  }
}

export function getSubcategory(slug: string): SubcategoryDefinition | undefined {
  return subcategoryMap.get(slug);
}

export function getSubcategoriesForCategory(
  categorySlug: string,
): readonly SubcategoryDefinition[] {
  return (
    subcategoriesByCategory[categorySlug as keyof typeof subcategoriesByCategory] ?? []
  );
}

export function validateSubcategories(
  categorySlug: string,
  subcategorySlugs: string[],
): string[] {
  const valid = new Set(getSubcategoriesForCategory(categorySlug).map((s) => s.slug));
  return subcategorySlugs.filter((slug) => !valid.has(slug));
}
