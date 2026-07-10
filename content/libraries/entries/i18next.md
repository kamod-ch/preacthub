---
entryType: library
name: i18next
slug: i18next
description: Mature internationalization ecosystem for translations, interpolation and formatting.
category: i18n
packageName: "i18next"
repository: "https://github.com/i18next/i18next"
documentation: "https://www.i18next.com/"
homepage: "https://www.i18next.com/"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - i18n
  - translations
  - localization
alternatives:
  - lingui
---

## Introduction

`i18next` is often selected for applications that need a mature translation ecosystem and plugin surface.

## Installation

```bash
npm install i18next
```

## Preact configuration

Core i18next is framework-agnostic, but adapter selection and hook usage should be reviewed for Preact compatibility.

## Example

```ts
import i18next from "i18next";

i18next.init({
  lng: "en",
  resources: { en: { translation: { hello: "Hello" } } },
});
```

## SSR notes

SSR usually works best when language state is created per request.

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
