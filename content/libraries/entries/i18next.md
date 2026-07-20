---
entryType: library
name: i18next
slug: i18next
shortDescription: >-
  Mature internationalization ecosystem for translations, interpolation and
  formatting.
category: i18n
compatibilityStatus: unverified
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - i18n
  - translations
  - localization
packageName: i18next
repositoryUrl: 'https://github.com/i18next/i18next'
npmUrl: 'https://www.npmjs.com/package/i18next'
documentationUrl: 'https://www.i18next.com/'
homepageUrl: 'https://www.i18next.com/'
license: MIT
installCommand: npm install i18next
alternatives:
  - lingui
islands: true
esm: true
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
