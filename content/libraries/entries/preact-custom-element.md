---
entryType: library
name: preact-custom-element
slug: preact-custom-element
shortDescription: Wrap Preact components as standards-based custom elements.
category: developer-tools
compatibilityStatus: native
typescriptSupport: native
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - custom-elements
  - web-components
  - integration
packageName: preact-custom-element
repositoryUrl: 'https://github.com/preactjs/preact-custom-element'
npmUrl: 'https://www.npmjs.com/package/preact-custom-element'
documentationUrl: 'https://github.com/preactjs/preact-custom-element'
license: MIT
installCommand: npm install preact-custom-element
alternatives:
  - htm
islands: true
esm: true
---

## Introduction

This package is useful when Preact components need to be embedded into non-Preact pages or CMS fragments.

## Installation

```bash
npm install preact-custom-element
```

## Preact configuration

Register your component with a tag name and optional observed attributes.

## Example

```tsx
import register from "preact-custom-element";
import { Widget } from "./Widget";

register(Widget, "ph-widget", ["title"]);
```

## SSR notes

Custom elements are usually enhanced on the client.

## Islands notes

A good bridge when interactive islands need to be dropped into heterogeneous frontends.
