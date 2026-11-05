---
entryType: library
name: Nano Stores Preact
slug: nanostores-preact
shortDescription: Official Preact binding for Nano Stores with selective subscriptions to atomic and derived stores.
category: state-management
packageName: '@nanostores/preact'
repositoryUrl: 'https://github.com/nanostores/preact'
npmUrl: 'https://www.npmjs.com/package/@nanostores/preact'
documentationUrl: 'https://github.com/nanostores/preact#readme'
homepageUrl: 'https://github.com/nanostores/preact'
license: MIT
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
installCommand: npm install nanostores @nanostores/preact
tags:
  - state
  - atomic-stores
  - subscriptions
  - ssr
limitations:
  - Requires the separate nanostores core package.
  - Server and initial client store values must match to avoid hydration errors.
  - Global stores need request isolation when server rendering user-specific state.
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://github.com/nanostores/preact#readme'
lastReleaseAt: '2026-10-05'
lastCommitAt: '2026-10-15'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 1.1.1.'
  - The official README documents useStore and explicit SSR hydration strategies.
title: Nano Stores Preact
description: Official Preact binding for Nano Stores with selective subscriptions to atomic and derived stores.
featured: false
islands: true
esm: true
qualityBadges: []
alternatives:
  - nanostores
  - preact-signals
  - tanstack-preact-store
---

## Introduction

`@nanostores/preact` is the official Preact binding for Nano Stores. Its `useStore` hook subscribes components to atomic, computed or map stores and rerenders only when the selected store changes.

## Installation

```bash
npm install nanostores @nanostores/preact
```

## Preact configuration

Create stores outside components and consume them with `useStore`. For SSR, ensure the store value used for server output matches the first client render.

## Example

```tsx
import { atom } from 'nanostores';
import { useStore } from '@nanostores/preact';

const $count = atom(0);

export function Counter() {
  const count = useStore($count);
  return (
    <button onClick={() => $count.set(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## SSR notes

The official adapter documents SSR support and hydration strategies. Keep the server value stable through the first client render, and avoid process-global user state across concurrent requests.

## Islands notes

Nano Stores can coordinate multiple islands without a shared component root. Load only the stores used by each island and decide explicitly whether state should be shared across island boundaries.

## Known limitations

The adapter requires the separate `nanostores` package. Server-updated stores need serialized state or the documented `ssr` option to prevent hydration mismatches.

## Alternatives

Use [Nano Stores](/libraries/nanostores) for the framework-independent core, [Preact Signals](/libraries/preact-signals) for Preact-native reactive values or [TanStack Preact Store](/libraries/tanstack-preact-store) for selector-oriented stores.
