---
entryType: library
name: 'VeloJS'
slug: 'mauroandre-velojs'
shortDescription: 'Experimental full-stack framework combining Hono, Preact SSR, hydration, and Vite transforms.'
category: 'ssr'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'bundled-types'
ssrSupport: 'supported'
packageName: '@mauroandre/velojs'
repositoryUrl: 'https://github.com/mauro-andre/velojs'
documentationUrl: 'https://github.com/mauro-andre/velojs#readme'
homepageUrl: 'https://github.com/mauro-andre/velojs'
npmUrl: 'https://www.npmjs.com/package/@mauroandre/velojs'
license: 'MIT'
installCommand: 'npm install @mauroandre/velojs'
featured: false
islands: false
esm: true
tags:
  - full-stack
  - hono
  - ssr
limitations:
  - 'Very early 0.0.x framework with a small ecosystem and APIs that can change rapidly.'
  - 'Uses Vite AST transforms, route-module naming conventions, Node AsyncLocalStorage, and a Hono server, creating more framework lock-in than standalone Preact SSR.'
qualityBadges: []
alternatives:
  - neutron-build-core
  - fresh
  - preact-iso
---

## Introduction

VeloJS is a full-stack TypeScript framework built from Hono, Preact, Vite, Signals, and wouter-preact. It provides nested routes, SSR and hydration, loaders, actions, endpoints, middleware, server-sent events, WebSockets, and static generation through route-module conventions.

## Installation

```bash
npm install @mauroandre/velojs
```

A VeloJS app also needs the package's Vite plugin and conventional `app/client.tsx`, `app/server.tsx`, and `app/routes.tsx` entry files; follow the repository's complete getting-started guide.

## Preact configuration

Add the VeloJS plugin to `vite.config.ts`. Route components are ordinary Preact components, while the plugin analyzes route modules and generates separate client and server entry points.

```ts
import { defineConfig } from 'vite';
import velo from '@mauroandre/velojs/vite';

export default defineConfig({ plugins: [velo()] });
```

## Example

```tsx
// app/routes.tsx
import Home from './pages/Home';

export default [{ path: '/', module: Home }];
```

```tsx
// app/pages/Home.tsx
export default function Home() {
  return <main><h1>VeloJS with Preact</h1></main>;
}
```

Use the current upstream route examples because route node and module contracts are still evolving.

## SSR notes

VeloJS renders Preact through `preact-render-to-string`, stores request data in AsyncLocalStorage, and hydrates loader data for client navigation. Production builds produce a client bundle plus a server entry.

## Islands notes

The documented architecture hydrates the routed application rather than exposing island-level partial hydration. Choose a framework with explicit islands if minimizing client JavaScript per component is the primary requirement.

## Known limitations

The broad feature surface and 0.0.x version make this a high-change dependency. Confirm deployment runtime, WebSocket support, generated routes, and concurrent-request isolation before production use.

## Alternatives

Compare [Neutron](/libraries/neutron-build-core) for another young full-stack Preact framework, [Fresh](/libraries/fresh) for islands, or [Preact ISO](/libraries/preact-iso) for a smaller routing and SSR layer.

