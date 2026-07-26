#!/usr/bin/env node
/**
 * Generates AI catalog seed entries. Run once: node scripts/generate-ai-seed.mjs
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "content", "libraries", "entries");

const aiBody = (name) => `## Introduction

${name} is listed in PreactHub's AI developer catalog for evaluation and comparison.

## Overview

Refer to the official documentation for current capabilities, integration options and deployment models.

## Key Features

Feature details are maintained by the project maintainers. Check the documentation link for the latest information.
`;

const tools = [
  // AI Infrastructure
  { slug: "qdrant", name: "Qdrant", category: "ai-infrastructure", subcategories: ["vector-databases"], projectType: "database", hostingType: "hybrid", openSource: true, languages: ["python", "rust"], runtimes: ["python", "cloud"], tags: ["vector-search", "rest-api"], homepageUrl: "https://qdrant.tech", repositoryUrl: "https://github.com/qdrant/qdrant", documentationUrl: "https://qdrant.tech/documentation/", desc: "Vector database and similarity search engine for AI applications." },
  { slug: "weaviate", name: "Weaviate", category: "ai-infrastructure", subcategories: ["vector-databases"], projectType: "database", hostingType: "hybrid", openSource: true, languages: ["go"], runtimes: ["cloud"], tags: ["vector-search", "graphql"], homepageUrl: "https://weaviate.io", repositoryUrl: "https://github.com/weaviate/weaviate", documentationUrl: "https://weaviate.io/developers/weaviate", desc: "Open-source vector database with hybrid search and modular integrations." },
  { slug: "chroma", name: "Chroma", category: "ai-infrastructure", subcategories: ["vector-databases"], projectType: "database", hostingType: "hybrid", openSource: true, languages: ["python"], runtimes: ["python", "cloud"], tags: ["embeddings", "local-models"], homepageUrl: "https://www.trychroma.com", repositoryUrl: "https://github.com/chroma-core/chroma", documentationUrl: "https://docs.trychroma.com", desc: "Embedding database for building LLM applications with semantic search." },
  { slug: "lancedb", name: "LanceDB", category: "ai-infrastructure", subcategories: ["vector-databases"], projectType: "database", hostingType: "open-source", openSource: true, languages: ["python", "javascript"], runtimes: ["python", "node"], tags: ["vector-search", "local-models"], homepageUrl: "https://lancedb.com", repositoryUrl: "https://github.com/lancedb/lancedb", documentationUrl: "https://lancedb.github.io/lancedb/", desc: "Serverless vector database built on Lance columnar format." },
  { slug: "litellm", name: "LiteLLM", category: "ai-infrastructure", subcategories: ["ai-gateways"], projectType: "platform", hostingType: "self-hosted", openSource: true, languages: ["python"], runtimes: ["python", "cloud"], tags: ["rest-api", "streaming"], homepageUrl: "https://www.litellm.ai", repositoryUrl: "https://github.com/BerriAI/litellm", documentationUrl: "https://docs.litellm.ai", desc: "Unified API gateway for calling multiple LLM providers with consistent interfaces." },
  { slug: "langfuse", name: "Langfuse", category: "ai-infrastructure", subcategories: ["observability"], projectType: "platform", hostingType: "hybrid", openSource: true, languages: ["typescript", "python"], runtimes: ["node", "python", "cloud"], tags: ["typescript-sdk", "rest-api"], homepageUrl: "https://langfuse.com", repositoryUrl: "https://github.com/langfuse/langfuse", documentationUrl: "https://langfuse.com/docs", desc: "Open-source LLM engineering platform for tracing, evaluation and prompt management." },
  { slug: "ollama", name: "Ollama", category: "ai-infrastructure", subcategories: ["inference", "model-serving"], projectType: "platform", hostingType: "self-hosted", openSource: true, languages: ["go"], runtimes: ["node", "cloud"], tags: ["local-models", "rest-api"], homepageUrl: "https://ollama.com", repositoryUrl: "https://github.com/ollama/ollama", documentationUrl: "https://github.com/ollama/ollama/blob/main/docs/api.md", desc: "Run open-source language models locally with a simple API." },

  // Agent Frameworks
  { slug: "langgraph", name: "LangGraph", category: "agent-frameworks", subcategories: ["agent-orchestration", "workflow-agents"], projectType: "framework", hostingType: "open-source", openSource: true, languages: ["python", "javascript"], runtimes: ["python", "node"], packageName: "@langchain/langgraph", tags: ["tool-calling", "structured-output", "streaming"], homepageUrl: "https://www.langchain.com/langgraph", repositoryUrl: "https://github.com/langchain-ai/langgraph", documentationUrl: "https://langchain-ai.github.io/langgraph/", desc: "Framework for building stateful, multi-step agent workflows with LLMs." },
  { slug: "mastra", name: "Mastra", category: "agent-frameworks", subcategories: ["agent-orchestration", "workflow-agents"], projectType: "framework", hostingType: "open-source", openSource: true, languages: ["typescript"], runtimes: ["node"], packageName: "@mastra/core", typescriptSupport: "native", tags: ["typescript-sdk", "tool-calling", "streaming"], homepageUrl: "https://mastra.ai", repositoryUrl: "https://github.com/mastra-ai/mastra", documentationUrl: "https://mastra.ai/docs", desc: "TypeScript framework for building AI agents, workflows and integrations." },
  { slug: "autogen", name: "AutoGen", category: "agent-frameworks", subcategories: ["multi-agent-systems"], projectType: "framework", hostingType: "open-source", openSource: true, languages: ["python"], runtimes: ["python"], tags: ["tool-calling", "multi-agent"], homepageUrl: "https://microsoft.github.io/autogen/", repositoryUrl: "https://github.com/microsoft/autogen", documentationUrl: "https://microsoft.github.io/autogen/docs/", desc: "Multi-agent conversation framework for building collaborative AI systems." },
  { slug: "crewai", name: "CrewAI", category: "agent-frameworks", subcategories: ["multi-agent-systems", "workflow-agents"], projectType: "framework", hostingType: "open-source", openSource: true, languages: ["python"], runtimes: ["python"], tags: ["tool-calling"], homepageUrl: "https://www.crewai.com", repositoryUrl: "https://github.com/crewAIInc/crewAI", documentationUrl: "https://docs.crewai.com", desc: "Framework for orchestrating role-based AI agent teams." },
  { slug: "pydantic-ai", name: "Pydantic AI", category: "agent-frameworks", subcategories: ["agent-orchestration", "tool-calling"], projectType: "framework", hostingType: "open-source", openSource: true, languages: ["python"], runtimes: ["python"], tags: ["structured-output", "tool-calling"], homepageUrl: "https://ai.pydantic.dev", repositoryUrl: "https://github.com/pydantic/pydantic-ai", documentationUrl: "https://ai.pydantic.dev", desc: "Agent framework built on Pydantic with structured output and tool calling." },
  { slug: "openai-agents-sdk", name: "OpenAI Agents SDK", category: "agent-frameworks", subcategories: ["agent-orchestration", "tool-calling"], projectType: "sdk", hostingType: "open-source", openSource: true, languages: ["python"], runtimes: ["python", "cloud"], tags: ["tool-calling", "streaming"], homepageUrl: "https://openai.github.io/openai-agents-python/", repositoryUrl: "https://github.com/openai/openai-agents-python", documentationUrl: "https://openai.github.io/openai-agents-python/", desc: "Official OpenAI SDK for building agents with tool use and handoffs." },
  { slug: "vercel-ai-sdk", name: "Vercel AI SDK", category: "agent-frameworks", subcategories: ["agent-orchestration"], projectType: "sdk", hostingType: "open-source", openSource: true, languages: ["typescript", "javascript"], runtimes: ["node", "edge", "browser"], packageName: "ai", typescriptSupport: "native", preactCompatible: true, tags: ["typescript-sdk", "streaming", "tool-calling", "structured-output"], homepageUrl: "https://sdk.vercel.ai", repositoryUrl: "https://github.com/vercel/ai", documentationUrl: "https://sdk.vercel.ai/docs", desc: "TypeScript toolkit for building AI-powered applications and agents.", categories: ["ai-developer-apis"] },

  // Browser Automation
  { slug: "playwright", name: "Playwright", category: "browser-automation", subcategories: ["browser-testing", "headless-browsers"], projectType: "framework", hostingType: "open-source", openSource: true, languages: ["typescript", "javascript", "python"], runtimes: ["node", "python", "browser"], packageName: "@playwright/test", typescriptSupport: "native", tags: ["typescript-sdk"], homepageUrl: "https://playwright.dev", repositoryUrl: "https://github.com/microsoft/playwright", documentationUrl: "https://playwright.dev/docs/intro", desc: "Cross-browser automation framework for end-to-end testing and scraping.", categories: ["testing"] },
  { slug: "puppeteer", name: "Puppeteer", category: "browser-automation", subcategories: ["headless-browsers", "web-scraping"], projectType: "library", hostingType: "open-source", openSource: true, languages: ["javascript", "typescript"], runtimes: ["node"], packageName: "puppeteer", typescriptSupport: "bundled-types", tags: ["typescript-sdk"], homepageUrl: "https://pptr.dev", repositoryUrl: "https://github.com/puppeteer/puppeteer", documentationUrl: "https://pptr.dev", desc: "Node.js library for controlling headless Chrome and Chromium." },
  { slug: "selenium", name: "Selenium", category: "browser-automation", subcategories: ["browser-testing"], projectType: "framework", hostingType: "open-source", openSource: true, languages: ["javascript", "python", "java"], runtimes: ["node", "python", "browser"], tags: ["rest-api"], homepageUrl: "https://www.selenium.dev", repositoryUrl: "https://github.com/SeleniumHQ/selenium", documentationUrl: "https://www.selenium.dev/documentation/", desc: "Widely used browser automation framework for cross-language testing." },
  { slug: "crawlee", name: "Crawlee", category: "browser-automation", subcategories: ["web-scraping", "headless-browsers"], projectType: "framework", hostingType: "open-source", openSource: true, languages: ["typescript", "javascript", "python"], runtimes: ["node", "python"], packageName: "crawlee", typescriptSupport: "native", tags: ["typescript-sdk"], homepageUrl: "https://crawlee.dev", repositoryUrl: "https://github.com/apify/crawlee", documentationUrl: "https://crawlee.dev/docs/introduction", desc: "Web scraping and browser automation library for Node.js and Python." },
  { slug: "stagehand", name: "Stagehand", category: "browser-automation", subcategories: ["ai-browser-agents"], projectType: "library", hostingType: "open-source", openSource: true, languages: ["typescript"], runtimes: ["node"], packageName: "@browserbasehq/stagehand", typescriptSupport: "native", tags: ["typescript-sdk", "tool-calling"], homepageUrl: "https://www.stagehand.dev", repositoryUrl: "https://github.com/browserbase/stagehand", documentationUrl: "https://docs.stagehand.dev", desc: "AI-powered browser automation framework for natural language control.", categories: ["agent-frameworks"] },
  { slug: "browser-use", name: "Browser Use", category: "browser-automation", subcategories: ["ai-browser-agents"], projectType: "library", hostingType: "open-source", openSource: true, languages: ["python"], runtimes: ["python"], tags: ["tool-calling", "local-models"], homepageUrl: "https://browser-use.com", repositoryUrl: "https://github.com/browser-use/browser-use", documentationUrl: "https://docs.browser-use.com", desc: "Make websites accessible to AI agents for autonomous browser tasks.", categories: ["agent-frameworks"] },
  { slug: "webdriverio", name: "WebdriverIO", category: "browser-automation", subcategories: ["browser-testing"], projectType: "framework", hostingType: "open-source", openSource: true, languages: ["typescript", "javascript"], runtimes: ["node", "browser"], packageName: "@wdio/cli", typescriptSupport: "native", tags: ["typescript-sdk"], homepageUrl: "https://webdriver.io", repositoryUrl: "https://github.com/webdriverio/webdriverio", documentationUrl: "https://webdriver.io/docs/gettingstarted", desc: "Next-gen browser and mobile automation test framework for Node.js." },

  // AI Developer APIs
  { slug: "openai-api", name: "OpenAI", category: "ai-developer-apis", subcategories: ["llm-apis"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["typescript", "python"], runtimes: ["cloud"], tags: ["rest-api", "streaming", "tool-calling", "structured-output", "multimodal"], homepageUrl: "https://openai.com", documentationUrl: "https://platform.openai.com/docs", desc: "API platform for GPT models, embeddings, speech, vision and tool use.", pricing: { model: "usage-based" } },
  { slug: "anthropic-api", name: "Anthropic", category: "ai-developer-apis", subcategories: ["llm-apis"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["typescript", "python"], runtimes: ["cloud"], tags: ["rest-api", "streaming", "tool-calling", "structured-output"], homepageUrl: "https://www.anthropic.com", documentationUrl: "https://docs.anthropic.com", desc: "Claude API for language models with tool use and structured outputs.", pricing: { model: "usage-based" } },
  { slug: "google-gemini", name: "Google Gemini", category: "ai-developer-apis", subcategories: ["llm-apis"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["typescript", "python"], runtimes: ["cloud", "edge"], tags: ["rest-api", "streaming", "multimodal"], homepageUrl: "https://ai.google.dev", documentationUrl: "https://ai.google.dev/docs", desc: "Google's multimodal AI API for text, image and code generation.", pricing: { model: "freemium" } },
  { slug: "mistral-api", name: "Mistral", category: "ai-developer-apis", subcategories: ["llm-apis"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["python", "typescript"], runtimes: ["cloud"], tags: ["rest-api", "streaming"], homepageUrl: "https://mistral.ai", documentationUrl: "https://docs.mistral.ai", desc: "API for Mistral open and commercial language models.", pricing: { model: "usage-based" } },
  { slug: "cohere-api", name: "Cohere", category: "ai-developer-apis", subcategories: ["llm-apis", "embeddings"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["python", "typescript"], runtimes: ["cloud"], tags: ["rest-api", "structured-output"], homepageUrl: "https://cohere.com", documentationUrl: "https://docs.cohere.com", desc: "Enterprise NLP API for generation, embeddings, reranking and classification.", pricing: { model: "usage-based" } },
  { slug: "groq-api", name: "Groq", category: "ai-developer-apis", subcategories: ["llm-apis", "inference"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["python", "typescript"], runtimes: ["cloud"], tags: ["rest-api", "streaming"], homepageUrl: "https://groq.com", documentationUrl: "https://console.groq.com/docs", desc: "Fast inference API for open-source and commercial language models.", pricing: { model: "freemium" } },
  { slug: "replicate-api", name: "Replicate", category: "ai-developer-apis", subcategories: ["llm-apis", "image-generation"], projectType: "platform", hostingType: "hosted", openSource: false, languages: ["python", "javascript"], runtimes: ["cloud"], tags: ["rest-api"], homepageUrl: "https://replicate.com", documentationUrl: "https://replicate.com/docs", desc: "Cloud platform for running open-source AI models via API.", pricing: { model: "usage-based" } },
  { slug: "elevenlabs-api", name: "ElevenLabs", category: "ai-developer-apis", subcategories: ["text-to-speech"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["python", "typescript"], runtimes: ["cloud"], tags: ["rest-api", "streaming"], homepageUrl: "https://elevenlabs.io", documentationUrl: "https://elevenlabs.io/docs", desc: "AI voice synthesis and text-to-speech API.", pricing: { model: "freemium" } },
  { slug: "deepgram-api", name: "Deepgram", category: "ai-developer-apis", subcategories: ["speech-to-text"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["python", "typescript"], runtimes: ["cloud"], tags: ["rest-api", "streaming"], homepageUrl: "https://deepgram.com", documentationUrl: "https://developers.deepgram.com", desc: "Speech-to-text and audio intelligence API.", pricing: { model: "usage-based" } },
  { slug: "tavily-api", name: "Tavily", category: "ai-developer-apis", subcategories: ["search-apis"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["python", "typescript"], runtimes: ["cloud"], tags: ["rest-api"], homepageUrl: "https://tavily.com", documentationUrl: "https://docs.tavily.com", desc: "Search API optimized for AI agents and RAG applications.", pricing: { model: "freemium" } },
  { slug: "firecrawl-api", name: "Firecrawl", category: "ai-developer-apis", subcategories: ["document-processing", "search-apis"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["typescript", "python"], runtimes: ["cloud"], tags: ["rest-api"], homepageUrl: "https://www.firecrawl.dev", documentationUrl: "https://docs.firecrawl.dev", desc: "Web scraping and crawling API that converts pages to LLM-ready markdown.", pricing: { model: "freemium" }, categories: ["browser-automation"] },
  { slug: "exa-api", name: "Exa", category: "ai-developer-apis", subcategories: ["search-apis"], projectType: "api", hostingType: "hosted", openSource: false, languages: ["python", "typescript"], runtimes: ["cloud"], tags: ["rest-api"], homepageUrl: "https://exa.ai", documentationUrl: "https://docs.exa.ai", desc: "Neural search API designed for AI applications and agents.", pricing: { model: "usage-based" } },
];

function yamlList(items) {
  if (!items?.length) return "";
  return items.map((i) => `  - ${i}`).join("\n");
}

function buildFrontmatter(t) {
  const lines = [
    "---",
    "entryType: library",
    `name: ${t.name}`,
    `slug: ${t.slug}`,
    `shortDescription: ${t.desc}`,
    `category: ${t.category}`,
  ];
  if (t.categories?.length) {
    lines.push("categories:");
    lines.push(yamlList(t.categories));
  }
  if (t.subcategories?.length) {
    lines.push("subcategories:");
    lines.push(yamlList(t.subcategories));
  }
  lines.push("catalogDomain: ai");
  lines.push(`projectType: ${t.projectType}`);
  lines.push(`hostingType: ${t.hostingType}`);
  lines.push(`maintenanceStatus: active`);
  if (t.typescriptSupport) lines.push(`typescriptSupport: ${t.typescriptSupport}`);
  if (t.openSource !== undefined) lines.push(`openSource: ${t.openSource}`);
  if (t.preactCompatible) lines.push(`preactCompatible: ${t.preactCompatible}`);
  if (t.languages?.length) {
    lines.push("languages:");
    lines.push(yamlList(t.languages));
  }
  if (t.runtimes?.length) {
    lines.push("runtimes:");
    lines.push(yamlList(t.runtimes));
  }
  if (t.packageName) lines.push(`packageName: ${t.packageName}`);
  if (t.homepageUrl) lines.push(`homepageUrl: ${t.homepageUrl}`);
  if (t.repositoryUrl) lines.push(`repositoryUrl: ${t.repositoryUrl}`);
  if (t.documentationUrl) lines.push(`documentationUrl: ${t.documentationUrl}`);
  if (t.pricing) lines.push(`pricing:\n  model: ${t.pricing.model}`);
  if (t.tags?.length) {
    lines.push("tags:");
    lines.push(yamlList(t.tags));
  }
  if (t.featured) lines.push("featured: true");
  lines.push("qualityBadges: []");
  lines.push("---");
  return lines.join("\n");
}

fs.mkdirSync(outDir, { recursive: true });

for (const tool of tools) {
  const file = path.join(outDir, `${tool.slug}.md`);
  if (fs.existsSync(file)) {
    console.log(`skip ${tool.slug} (exists)`);
    continue;
  }
  fs.writeFileSync(file, `${buildFrontmatter(tool)}\n\n${aiBody(tool.name)}\n`, "utf8");
  console.log(`wrote ${tool.slug}`);
}

console.log(`Done. ${tools.length} tools processed.`);
