---
entryType: library
name: Lingui
slug: lingui
shortDescription: >-
  Message-based internationalization with extraction tooling and compile-time
  workflows.
category: i18n
compatibilityStatus: unverified
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - i18n
  - messages
  - extraction
packageName: '@lingui/core'
repositoryUrl: 'https://github.com/lingui/js-lingui'
npmUrl: 'https://www.npmjs.com/package/%40lingui%2Fcore'
documentationUrl: 'https://lingui.dev'
homepageUrl: 'https://lingui.dev'
license: MIT
installCommand: npm install @lingui/core
alternatives:
  - i18next
islands: true
esm: true
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
