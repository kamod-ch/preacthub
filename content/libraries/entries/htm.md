---
entryType: library
name: HTM
slug: htm
description: JSX-free tagged template syntax that pairs naturally with Preact.
category: developer-tools
packageName: "htm"
repository: "https://github.com/developit/htm"
documentation: "https://github.com/developit/htm"
compatibility: native
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - templates
  - jsx-alternative
  - developer-experience
alternatives:
  - preact-signals
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
