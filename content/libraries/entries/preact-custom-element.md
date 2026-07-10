---
entryType: library
name: preact-custom-element
slug: preact-custom-element
description: Wrap Preact components as standards-based custom elements.
category: developer-tools
packageName: "preact-custom-element"
repository: "https://github.com/preactjs/preact-custom-element"
documentation: "https://github.com/preactjs/preact-custom-element"
compatibility: native
status: stable
typescript: true
ssr: false
islands: true
esm: true
license: MIT
tags:
  - custom-elements
  - web-components
  - integration
alternatives:
  - htm
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
