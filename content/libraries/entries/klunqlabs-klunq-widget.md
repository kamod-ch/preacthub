---
entryType: library
name: 'Klunq Widget'
slug: 'klunqlabs-klunq-widget'
shortDescription: 'Embeddable Preact AI chat widget with Shadow DOM styling and browser automation tools.'
category: 'developer-tools'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'unsupported'
packageName: '@klunqlabs/klunq-widget'
repositoryUrl: 'https://github.com/klunqlabs/klunq-widget'
documentationUrl: 'https://github.com/klunqlabs/klunq-widget#readme'
homepageUrl: 'https://github.com/klunqlabs/klunq-widget'
npmUrl: 'https://www.npmjs.com/package/@klunqlabs/klunq-widget'
license: 'MIT'
installCommand: 'npm install @klunqlabs/klunq-widget'
featured: false
islands: true
esm: true
tags:
  - ai
  - chat-widget
  - browser-automation
limitations:
  - 'The documented embed attributes expose the model API key to every visitor; production deployments need a restricted disposable key or a controlled server proxy.'
  - 'The agent can read page markup, click controls, fill fields, and navigate links, so it must not be embedded on sensitive pages without a threat model and strict provider controls.'
  - 'Ships as a roughly 250 KB gzipped standalone bundle with its own Preact and LangChain runtime rather than integrating into the host Preact tree.'
qualityBadges: []
alternatives:
  - vercel-ai-sdk
  - deepgram-agents-widget
---

## Introduction

`@klunqlabs/klunq-widget` is a self-contained AI chat and browser-agent widget built with Preact, LangChain, and Tailwind CSS. Its IIFE bundle creates a floating interface in a closed Shadow DOM and talks to OpenAI-compatible endpoints such as OpenAI, Ollama, or a proxy.

## Installation

```bash
npm install @klunqlabs/klunq-widget
```

The intended deployment is the package's prebuilt `dist/klunq-widget.js`, often pinned through jsDelivr rather than imported as reusable Preact components.

## Preact configuration

No host Preact setup is required because the widget bundles and mounts its own Preact application. Configure it with `data-model`, `data-api-key`, and `data-base-url` attributes on the script tag. Do not place a long-lived production secret in those attributes.

## Example

```html
<script
  src="https://cdn.jsdelivr.net/npm/@klunqlabs/klunq-widget@1.0.3/dist/klunq-widget.js"
  data-model="local-model"
  data-api-key="ollama"
  data-base-url="http://localhost:11434/v1"
  data-scope="page"
></script>
```

For public deployments, route requests through a server-side proxy with narrowly scoped credentials instead.

## SSR notes

The entry reads its script attributes, creates a Shadow DOM, monitors the API, and mounts into `document.body`; it is browser-only and should be loaded after server rendering.

## Islands notes

The entire widget behaves as an independent island with isolated styles and its own Preact runtime. It does not share context, Signals, or component state with the host application.

## Known limitations

Client-visible credentials are the primary security risk. Browser tools can operate on the host document, while the closed Shadow DOM and bundled runtime make customization and host-level integration limited.

## Alternatives

Build a controlled custom chat UI with [Vercel AI SDK](/libraries/vercel-ai-sdk), or use [Deepgram Agents Widget](/libraries/deepgram-agents-widget) for voice-agent interfaces with server-issued tokens.

