---
entryType: library
name: 'Neutron'
slug: 'neutron-build-core'
shortDescription: 'Unified TypeScript framework with Preact SSR, static routes, and islands architecture.'
category: 'ssr'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@neutron-build/core'
repositoryUrl: 'https://github.com/neutron-build/neutron/tree/main/typescript/packages/neutron'
documentationUrl: 'https://neutron.build/docs'
homepageUrl: 'https://neutron.build'
npmUrl: 'https://www.npmjs.com/package/@neutron-build/core'
license: 'MIT'
installCommand: 'npm install @neutron-build/core'
featured: false
islands: true
esm: true
tags:
  - ssr
  - islands
  - full-stack
limitations:
  - 'Young framework (0.2.x) with evolving APIs; classify as experimental until your deployment target is validated.'
  - 'Full-stack features span routing, content collections, and adapters—expect framework lock-in compared with standalone Preact libraries.'
qualityBadges: []
alternatives:
  - preact-iso
  - fresh
---

## Introduction

`@neutron-build/core` is Neutron's TypeScript SDK: static sites with zero JS, app routes with Preact SSR, islands, content collections, and deploy-anywhere adapters. It combines a Hono-based server layer with Preact rendering.

## Installation

```bash
npm install @neutron-build/core
```

## Preact configuration

Use Neutron's project scaffolding and route conventions rather than wiring Preact manually. Client islands import from `@neutron-build/core/client`; server utilities and content APIs import from the core package.

## Example

```typescript
import { defineConfig } from "@neutron-build/core";
import { Island } from "@neutron-build/core/client";
import { getCollection } from "@neutron-build/core/content";
```

## SSR notes

Neutron targets Preact SSR for app routes while keeping static pages JS-free. Follow [neutron.build/docs](https://neutron.build/docs) for adapter-specific deployment and rendering entry points.

## Islands notes

Islands are first-class: interactive Preact components hydrate inside otherwise static Neutron pages. Scope client entry points per island to control bundle size.

## Known limitations

Early-stage framework with a broad surface area (routing, content, adapters). Benchmark against simpler Preact SSR stacks before committing.

## Alternatives

Lighter Preact-centric options include [Preact ISO](/libraries/preact-iso) or [Fresh](/libraries/fresh) for islands-oriented SSR.

