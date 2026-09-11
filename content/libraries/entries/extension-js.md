---
entryType: library
name: 'Extension.js'
slug: 'extension-js'
shortDescription: 'Cross-browser extension framework with first-class Preact support and HMR.'
category: 'developer-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'unsupported'
packageName: 'extension'
repositoryUrl: 'https://github.com/extension-js/extension.js'
documentationUrl: 'https://extension.js.org/'
homepageUrl: 'https://extension.js.org/'
npmUrl: 'https://www.npmjs.com/package/extension'
license: 'MIT'
installCommand: 'npm install -D extension'
featured: false
islands: false
esm: true
tags:
  - browser-extension
  - manifest-v3
  - hmr
limitations:
  - 'Targets browser extension runtimes rather than conventional web applications.'
  - 'Preact is one supported frontend option alongside React, Vue and Svelte templates.'
qualityBadges: []
---

## Introduction

Extension.js is a cross-browser extension toolchain with Manifest V3 defaults, store-ready zip builds and hot module replacement for background, content, popup and options scripts. Preact is supported through dedicated templates and refresh shims.

## Installation

```bash
npm install -D extension
```

## Preact configuration

Scaffold with the Preact template (`npx extension@latest create my-extension`) or add Extension.js to an existing extension repository. The CLI detects Preact and wires refresh support for extension entry points.

## Example

```bash
npx extension@latest create my-preact-extension --template preact
cd my-preact-extension
npm run dev
```

## SSR notes

Not applicable. Extension pages run inside browser extension contexts rather than on a hosted SSR server.

## Islands notes

Popup and options pages behave like small isolated Preact apps; content scripts should minimize shared state with page DOM.

## Known limitations

Validate target browsers (Chrome, Edge, Firefox, Safari) for your manifest features. Extension.js focuses on developer experience rather than acting as a general web app framework.

## Alternatives

Also evaluate WXT, Plasmo or CRXJS if you need different extension toolchain trade-offs.

