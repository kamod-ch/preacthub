---
entryType: library
name: Lingui
slug: lingui
description: Message-based internationalization with extraction tooling and compile-time workflows.
category: i18n
packageName: "@lingui/core"
repository: "https://github.com/lingui/js-lingui"
documentation: "https://lingui.dev"
homepage: "https://lingui.dev"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - i18n
  - messages
  - extraction
alternatives:
  - i18next
---

## Introduction

Lingui is attractive when message extraction and compile-time catalogs matter more than runtime plugin breadth.

## Installation

```bash
npm install @lingui/core @lingui/react
```

## Preact configuration

If you use the React bindings, verify `preact/compat` behavior in your application.

## Example

```tsx
import { i18n } from "@lingui/core";

i18n.load("en", { hello: "Hello" });
i18n.activate("en");
```

## SSR notes

SSR can work well when catalogs are loaded before render.

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
