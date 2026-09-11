---
entryType: library
name: 'SignalDB Preact'
slug: 'signaldb-preact'
shortDescription: 'Preact Signals reactivity adapter for the SignalDB local-first database.'
category: 'state-management'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'limited'
packageName: '@signaldb/preact'
repositoryUrl: 'https://github.com/maxnowack/signaldb'
documentationUrl: 'https://signaldb.js.org/reference/preact/'
homepageUrl: 'https://signaldb.js.org'
npmUrl: 'https://www.npmjs.com/package/@signaldb/preact'
license: 'MIT'
installCommand: 'npm install @signaldb/preact @signaldb/core @preact/signals-core'
featured: false
islands: false
esm: true
tags:
  - database
  - local-first
  - signals
limitations:
  - 'Preact Signals lacks automatic reactive scope cleanup; cursor cleanup must run in the effect teardown.'
  - 'Pass `{ reactive: false }` to queries outside reactive scopes to avoid memory leaks.'
qualityBadges: []
alternatives:
  - preact-signals
  - unistore
---

## Introduction

`@signaldb/preact` connects [SignalDB](https://signaldb.js.org)—a local-first JavaScript database with real-time sync—to Preact Signals via the default `preactReactivityAdapter` export.

## Installation

```bash
npm install @signaldb/preact @signaldb/core @preact/signals-core
```

## Preact configuration

Pass `preactReactivityAdapter` as the `reactivity` option when constructing SignalDB collections. Use `effect` from `@preact/signals-core` to subscribe to live query results.

## Example

```ts
import { Collection } from '@signaldb/core';
import preactReactivityAdapter from '@signaldb/preact';
import { effect } from '@preact/signals-core';

const posts = new Collection({
  reactivity: preactReactivityAdapter,
});

effect(() => {
  const cursor = posts.find({ author: 'John' });
  console.log(cursor.count());
  return () => {
    cursor.cleanup();
  };
});
```

## SSR notes

SignalDB targets client-side reactive data. Server render should avoid opening reactive cursors unless you explicitly disable reactivity with `{ reactive: false }`.

## Islands notes

Collections can back island state when the effect scope is tied to the island lifecycle—always cleanup cursors on unmount.

## Known limitations

Manual cursor cleanup is required because Preact Signals cannot auto-dispose database subscriptions. Confirm adapter version compatibility with your `@signaldb/core` release.

## Alternatives

For signal state without a database layer, use [Preact Signals](/libraries/preact-signals); for simpler stores see [Unistore](/libraries/unistore).

