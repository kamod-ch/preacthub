---
entryType: library
name: HTM
slug: htm
shortDescription: JSX-free tagged template syntax that pairs naturally with Preact.
category: developer-tools
compatibilityStatus: native
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - templates
  - jsx-alternative
  - developer-experience
packageName: htm
repositoryUrl: 'https://github.com/developit/htm'
npmUrl: 'https://www.npmjs.com/package/htm'
documentationUrl: 'https://github.com/developit/htm'
license: MIT
installCommand: npm install htm
alternatives:
  - preact-signals
islands: true
esm: true
---

## Introduction

HTM is useful when you want Preact without a JSX transform, especially in embedded or low-tooling environments.

## Installation

```bash
npm install htm
```

## Preact configuration

Bind HTM to Preact's `h` function once and reuse it.

## Example

```tsx
import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export const App = () => html`<h1>Hello from HTM</h1>`;
```

## SSR notes

Works in server-rendered environments because it ultimately produces standard Preact VNodes.

## Islands notes

Useful in very small islands where you want to avoid extra compile setup.
