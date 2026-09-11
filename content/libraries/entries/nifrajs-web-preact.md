---
entryType: library
name: 'Nifra Preact Renderer'
slug: 'nifrajs-web-preact'
shortDescription: 'Preact rendering adapter for Nifra with streaming SSR, hydration, and framework helpers.'
category: 'ssr'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'bundled-types'
ssrSupport: 'supported'
packageName: '@nifrajs/web-preact'
repositoryUrl: 'https://github.com/nifrajs/nifra/tree/main/packages/web-preact'
documentationUrl: 'https://nifra.dev/docs'
homepageUrl: 'https://nifra.dev/'
npmUrl: 'https://www.npmjs.com/package/@nifrajs/web-preact'
license: 'MIT'
installCommand: 'bun add @nifrajs/web-preact preact'
featured: false
islands: false
esm: true
tags:
  - nifra
  - streaming-ssr
  - hydration
limitations:
  - 'Adapter is tied to the Nifra full-stack framework and its matching @nifrajs packages rather than being a standalone Preact renderer.'
  - 'The ecosystem is small, and the documented scaffold and development workflow are Bun-first.'
qualityBadges: []
alternatives:
  - preact-render-to-string
  - neutron-build-core
  - fresh
---

## Introduction

`@nifrajs/web-preact` supplies the Preact `RenderAdapter` for `@nifrajs/web`. It is part of Nifra's multi-framework full-stack system and includes server rendering, streaming, hydration, routing, query, content, image, i18n, and deferred-data integration points.

## Installation

```bash
bun add @nifrajs/web-preact preact
```

For a complete project, the upstream recommendation is to scaffold with `bun create nifra`, which installs compatible core and web packages.

## Preact configuration

Pass the exported `preactAdapter` to Nifra's web rendering setup. Client helpers are exposed from `@nifrajs/web-preact/client`, while feature-specific helpers have subpath exports such as `/router`, `/query`, and `/await`.

```ts
import { preactAdapter } from '@nifrajs/web-preact';
import { renderPage } from '@nifrajs/web';

// Supply preactAdapter in the renderPage options configured by your Nifra app.
```

## Example

```tsx
import { preactAdapter } from '@nifrajs/web-preact';

export function Page() {
  return <main><h1>Nifra with Preact</h1></main>;
}

export const renderer = preactAdapter;
```

Use the Nifra scaffold for the actual route and `renderPage` wiring because those contracts span multiple packages.

## SSR notes

The adapter supports string and ReadableStream rendering through `preact-render-to-string`. Its Bun runtime path deliberately resolves the renderer from the consumer app to prevent hooks from binding to a second Preact copy.

## Islands notes

Nifra documents hydration for rendered pages rather than a Preact-specific island API in this adapter. Verify client boundaries and emitted JavaScript against the application template.

## Known limitations

All `@nifrajs/*` package versions should remain aligned. Custom dependency layouts need testing because duplicate Preact instances can break hooks during server rendering.

## Alternatives

Use [Preact Render to String](/libraries/preact-render-to-string) directly for minimal SSR, [Neutron](/libraries/neutron-build-core) for another full-stack layer, or [Fresh](/libraries/fresh) for explicit islands.

