---
entryType: library
name: 'Praxis Kit'
slug: 'praxis-kit'
shortDescription: 'Contract-driven component factory with a dedicated Preact adapter subpath.'
category: 'developer-tools'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: 'praxis-kit'
repositoryUrl: 'https://github.com/slowebworkz/praxis-kit'
documentationUrl: 'https://github.com/slowebworkz/praxis-kit/blob/develop/GETTING_STARTED.md'
npmUrl: 'https://www.npmjs.com/package/praxis-kit'
license: 'MIT'
installCommand: 'npm install praxis-kit'
featured: false
islands: true
esm: true
tags:
  - accessibility
  - components
  - contracts
limitations:
  - 'Project is young (0.1.x) and classified experimental until broader PreactHub verification.'
  - 'Structural ARIA and children contracts add runtime diagnostics that should be tuned per environment.'
qualityBadges: []
---

## Introduction

Praxis Kit provides `createContractComponent`, a factory for typed, accessibility-aware UI primitives. The Preact adapter lives at `praxis-kit/preact` and shares enforcement, styling and preset logic with the React, Vue, Solid and Svelte adapters.

## Installation

```bash
npm install praxis-kit
```

## Preact configuration

Import the Preact adapter subpath:

```ts
import { createContractComponent } from "praxis-kit/preact";
```

Factory options such as `tag`, `styling`, `enforcement` and `defaults` match the other framework adapters.

## Example

```tsx
import { createContractComponent } from "praxis-kit/preact";

const Button = createContractComponent({
  tag: "button",
  styling: {
    base: "rounded px-4 py-2",
    variants: { tone: { primary: "bg-blue-600 text-white" } },
    defaults: { tone: "primary" },
  },
  enforcement: { diagnostics: "warn" },
});

export function SaveAction() {
  return <Button tone="primary">Save</Button>;
}
```

## SSR notes

Upstream conformance tests include SSR and hydration parity across adapters. Start with `diagnostics: "warn"` during development and tighten enforcement once contracts are stable.

## Islands notes

Contract components work well inside islands when enforcement diagnostics are scoped to development builds.

## Known limitations

Praxis Kit is early-stage. Review API stability notes in upstream docs before adopting widely, and expect iteration on adapter subpaths.

## Alternatives

For hand-written accessible primitives, compare with [Kamod UI](/libraries/kamod-ui) or established design systems listed under UI Components.

