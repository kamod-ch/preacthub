---
entryType: library
name: TanStack Preact Store
slug: tanstack-preact-store
shortDescription: 'Official Preact adapter for TanStack Store with typed stores, selectors, atoms and context helpers.'
category: state-management
packageName: '@tanstack/preact-store'
repositoryUrl: 'https://github.com/TanStack/store/tree/main/packages/preact-store'
npmUrl: 'https://www.npmjs.com/package/@tanstack/preact-store'
documentationUrl: 'https://tanstack.com/store/latest/docs/framework/preact/quick-start'
homepageUrl: 'https://tanstack.com/store'
license: MIT
compatibilityStatus: native
typescriptSupport: native
ssrSupport: limited
maintenanceStatus: active
installCommand: npm install @tanstack/preact-store
tags:
  - state
  - selectors
  - atoms
  - context
  - typescript
limitations:
  - The Preact documentation demonstrates client rendering but does not provide a dedicated SSR guide.
  - Store lifetime and request isolation must be designed explicitly for SSR.
  - Some APIs are still below version 1.0 and may evolve.
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://tanstack.com/store/latest/docs/framework/preact/quick-start'
lastReleaseAt: '2026-10-09'
lastCommitAt: '2026-11-03'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 0.13.5.'
  - The monorepo contains Preact documentation and multiple runnable Preact examples.
title: TanStack Preact Store
description: 'Official Preact adapter for TanStack Store with typed stores, selectors, atoms and context helpers.'
featured: false
islands: true
esm: true
qualityBadges: []
alternatives:
  - nanostores-preact
  - xstate-store-preact
  - preact-signals
---

## Introduction

`@tanstack/preact-store` is the official Preact adapter for TanStack Store. It combines framework-independent typed stores with Preact selectors, atoms, store creation hooks and context helpers.

## Installation

```bash
npm install @tanstack/preact-store
```

## Preact configuration

Create long-lived stores outside components, then subscribe with `useSelector`. Use `useCreateStore` or store contexts when each component tree needs an isolated instance.

## Example

```tsx
import { createStore, useSelector } from '@tanstack/preact-store';

const counter = createStore({ count: 0 });

export function Counter() {
  const count = useSelector(counter, state => state.count);
  return (
    <button
      onClick={() => counter.setState(state => ({ count: state.count + 1 }))}
    >
      Count: {count}
    </button>
  );
}
```

## SSR notes

Stores and selectors do not inherently require the DOM, but the official Preact quick start does not define a complete SSR hydration protocol. Create request-local stores for user-specific state and serialize initial values when hydration must preserve server updates.

## Islands notes

A shared store can synchronize multiple hydrated islands. For isolated widgets, create one store instance per island to avoid accidental cross-widget state.

## Known limitations

The adapter remains below version 1.0, so review changelogs during upgrades. SSR store lifetime and state transfer are application responsibilities.

## Alternatives

Compare [Nano Stores Preact](/libraries/nanostores-preact), [XState Store Preact](/libraries/xstate-store-preact) and [Preact Signals](/libraries/preact-signals).
