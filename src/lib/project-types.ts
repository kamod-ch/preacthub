export const projectTypeValues = [
  "library",
  "framework",
  "api",
  "platform",
  "service",
  "database",
  "sdk",
  "mcp-server",
  "mcp-client",
] as const;
export type ProjectType = (typeof projectTypeValues)[number];

export const hostingTypeValues = [
  "open-source",
  "self-hosted",
  "hosted",
  "hybrid",
] as const;
export type HostingType = (typeof hostingTypeValues)[number];

export const runtimeValues = [
  "browser",
  "node",
  "bun",
  "deno",
  "python",
  "cloud",
  "edge",
] as const;
export type Runtime = (typeof runtimeValues)[number];

export const pricingModelValues = [
  "free",
  "freemium",
  "paid",
  "usage-based",
] as const;
export type PricingModel = (typeof pricingModelValues)[number];

export const packageManagerValues = ["npm", "pip", "cargo", "other"] as const;
export type PackageManager = (typeof packageManagerValues)[number];

export const aiCapabilityTagValues = [
  "tool-calling",
  "structured-output",
  "streaming",
  "multimodal",
  "local-models",
  "rest-api",
  "typescript-sdk",
  "mcp-integration",
] as const;
export type AiCapabilityTag = (typeof aiCapabilityTagValues)[number];

export function projectTypeLabel(value: ProjectType): string {
  switch (value) {
    case "library":
      return "Library";
    case "framework":
      return "Framework";
    case "api":
      return "API";
    case "platform":
      return "Platform";
    case "service":
      return "Service";
    case "database":
      return "Database";
    case "sdk":
      return "SDK";
    case "mcp-server":
      return "MCP Server";
    case "mcp-client":
      return "MCP Client";
  }
}

export function hostingTypeLabel(value: HostingType): string {
  switch (value) {
    case "open-source":
      return "Open Source";
    case "self-hosted":
      return "Self-hosted";
    case "hosted":
      return "Hosted";
    case "hybrid":
      return "Hybrid";
  }
}

export function runtimeLabel(value: Runtime): string {
  switch (value) {
    case "browser":
      return "Browser";
    case "node":
      return "Node.js";
    case "bun":
      return "Bun";
    case "deno":
      return "Deno";
    case "python":
      return "Python";
    case "cloud":
      return "Cloud";
    case "edge":
      return "Edge";
  }
}

export function pricingModelLabel(value: PricingModel): string {
  switch (value) {
    case "free":
      return "Free";
    case "freemium":
      return "Freemium";
    case "paid":
      return "Paid";
    case "usage-based":
      return "Usage-based";
  }
}
