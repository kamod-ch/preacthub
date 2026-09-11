---
entryType: library
name: 'Deepgram Agents Widget'
slug: 'deepgram-agents-widget'
shortDescription: 'Self-contained Deepgram Voice Agent widget with bundled Preact runtime.'
category: 'developer-tools'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'unsupported'
packageName: '@deepgram/agents-widget'
repositoryUrl: 'https://github.com/deepgram/agent/tree/main/packages/widget'
documentationUrl: 'https://github.com/deepgram/agent/tree/main/packages/widget#readme'
homepageUrl: 'https://github.com/deepgram/agent/tree/main/packages/widget#readme'
npmUrl: 'https://www.npmjs.com/package/@deepgram/agents-widget'
license: 'MIT'
installCommand: 'npm install @deepgram/agents-widget'
featured: false
islands: true
esm: true
tags:
  - voice
  - ai
  - deepgram
limitations:
  - 'Never expose Deepgram API keys in browser code; use `tokenFactory` that fetches short-lived tokens from your server.'
  - 'Bundles Preact internally and aliases `@deepgram/ui` React components through `preact/compat`, so it is not a native Preact component library.'
  - 'Tightly coupled to the Deepgram Agent API and widget layouts.'
qualityBadges: []
alternatives:
  - deepgram-api
---

## Introduction

`@deepgram/agents-widget` drops a self-contained [Deepgram Voice Agent](https://developers.deepgram.com/docs/voice-agent) UI into any page via ESM import or self-hosted UMD bundle. It bundles Preact internally and does not require your app to ship Preact separately.

## Installation

```bash
npm install @deepgram/agents-widget
```

## Preact configuration

Import `init` and mount the widget from client code only. Prefer `tokenFactory` for browser-safe authentication rather than passing `apiKey` directly.

## Example

```ts
import { init } from "@deepgram/agents-widget";

const destroy = init({
  tokenFactory: () => fetch('/api/deepgram-token').then(r => r.text()),
  agent: { think: { provider: { type: 'open_ai', model: 'gpt-4o-mini' } } },
});

// Later: destroy() to unmount
```

Inline layout with a host container:

```js
init({
  agent,
  tokenFactory,
  layout: "inline",
  containerId: "my-container",
});
```

## SSR notes

Voice capture, WebSocket sessions, and widget mounting are browser-only. Server routes should issue tokens; the widget initializes client-side.

## Islands notes

Natural island widget—load on pages that need voice agent UX without adopting Deepgram UI components across your Preact tree.

## Known limitations

Do not embed API keys in client bundles. Widget ships its own Preact copy; avoid assuming shared context with your app's Preact tree.

## Alternatives

For custom integrations against the REST/WebSocket APIs, use [Deepgram API](/libraries/deepgram-api) directly.

