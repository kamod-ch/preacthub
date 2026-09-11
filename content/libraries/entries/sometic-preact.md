---
entryType: library
name: 'Sometic Preact'
slug: 'sometic-preact'
shortDescription: 'Thin Preact external-store adapter for Sometic state with snapshot and subscription APIs.'
category: 'state-management'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'bundled-types'
ssrSupport: 'supported'
packageName: '@sometic/preact'
repositoryUrl: 'https://github.com/aitistack/sometic/tree/main/packages/preact'
documentationUrl: 'https://sometic.dev/frameworks/preact'
homepageUrl: 'https://sometic.dev/'
npmUrl: 'https://www.npmjs.com/package/@sometic/preact'
license: 'MIT'
installCommand: 'npm install @sometic/preact preact'
featured: false
islands: false
esm: true
tags:
  - store
  - external-store
  - adapter
limitations:
  - 'Provides only a store binding; it does not include the Sometic component kit available for some other frameworks.'
  - 'The adapter is an early 0.1.x package and requires Node.js 20.18 or newer for supported development workflows.'
qualityBadges: []
alternatives:
  - preact-signals
  - nanostores
  - unistore
---

## Introduction

`@sometic/preact` adapts `@sometic/store` to Preact's external-store shape. Its main export, `createPreactStoreBind`, exposes `getSnapshot`, `subscribe`, `set`, the underlying store, and explicit disposal without maintaining a separate Preact-specific state engine.

## Installation

```bash
npm install @sometic/preact preact
```

## Preact configuration

Create a binding outside the component tree, then connect `getSnapshot` and `subscribe` to Preact's external-store hook or your own small hook. The optional Preact peer should resolve to the same Preact 10 runtime used by the application.

## Example

```ts
import { createPreactStoreBind } from '@sometic/preact';

const counter = createPreactStoreBind({ count: 0 });
const unsubscribe = counter.subscribe(() => {
  console.log(counter.getSnapshot().count);
});

counter.set({ count: 1 });
unsubscribe();
counter.dispose();
```

## SSR notes

The adapter contract avoids import-time `window` access and exposes synchronous snapshots, making it usable in server code. Application code remains responsible for providing identical initial state during hydration and disposing request-scoped stores.

## Islands notes

A binding can be scoped to an island, but the package does not implement hydration or cross-island transport. Avoid a process-global mutable store during SSR unless state is intentionally shared.

## Known limitations

The current capability list contains only `storeBind`; there are no Preact Button, Form, Dialog, or structure exports. Use `@sometic/store` directly when the wrapper adds no value.

## Alternatives

For Preact-native reactive state, compare [Preact Signals](/libraries/preact-signals), [Nano Stores](/libraries/nanostores), or [Unistore](/libraries/unistore).

