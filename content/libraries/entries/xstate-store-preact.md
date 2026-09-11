---
entryType: library
name: 'XState Store Preact'
slug: 'xstate-store-preact'
shortDescription: 'Official Preact bindings for @xstate/store selectors and triggers.'
category: 'state-management'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@xstate/store-preact'
repositoryUrl: 'https://github.com/statelyai/xstate/tree/main/packages/xstate-store-preact'
documentationUrl: 'https://stately.ai/docs/xstate-store'
npmUrl: 'https://www.npmjs.com/package/@xstate/store-preact'
license: 'MIT'
installCommand: 'npm install @xstate/store-preact @xstate/store'
featured: false
islands: true
esm: true
tags:
  - xstate
  - store
  - state
qualityBadges: []
alternatives:
  - xstate
  - preact-signals
---

## Introduction

`@xstate/store-preact` provides Preact hooks such as `useSelector` for stores created with `@xstate/store`. It complements the core [XState](/libraries/xstate) entry by documenting the dedicated Preact adapter introduced in XState Store v4.

## Installation

```bash
npm install @xstate/store-preact @xstate/store
```

## Preact configuration

Import `createStore` from `@xstate/store` and Preact bindings from `@xstate/store-preact`. Framework bindings are no longer exported from `@xstate/store/preact` in v4.

## Example

```tsx
import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store-preact";

const store = createStore({
  context: { count: 0 },
  on: {
    inc: (context) => ({ count: context.count + 1 }),
  },
});

export function Counter() {
  const count = useSelector(store, (state) => state.context.count);
  return <button onClick={() => store.trigger.inc()}>Count: {count}</button>;
}
```

## SSR notes

Store reads during render should use snapshot APIs on the server and subscribe on the client. Verify hydration when preloading store state.

## Islands notes

Shared stores can back multiple islands if you expose selectors scoped to each widget's concerns.

## Known limitations

Requires TypeScript 5.4+ according to upstream XState Store docs. Use full XState when you need statecharts rather than lightweight stores.

## Alternatives

Compare with [Preact Signals](/libraries/preact-signals) for fine-grained reactivity or the core [XState](/libraries/xstate) package for state machines.

