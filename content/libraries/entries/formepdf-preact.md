---
entryType: library
name: 'Forme PDF Preact'
slug: 'formepdf-preact'
shortDescription: 'Native Preact adapter for the Forme declarative PDF component model.'
category: 'developer-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@formepdf/preact'
repositoryUrl: 'https://github.com/formepdf/forme'
documentationUrl: 'https://docs.formepdf.com/components'
homepageUrl: 'https://formepdf.com/'
npmUrl: 'https://www.npmjs.com/package/@formepdf/preact'
license: 'MIT'
installCommand: 'npm install @formepdf/preact @formepdf/core'
featured: false
islands: false
esm: true
tags:
  - pdf
  - documents
  - rendering
limitations:
  - 'Advanced PDF features should be checked against Forme component docs before production use.'
  - '@formepdf/core is optional when serializing to JSON for the hosted API instead of local rendering.'
qualityBadges: []
---

## Introduction

`@formepdf/preact` mirrors the Forme React component set with a Preact-native JSX runtime. It avoids pulling React or `preact/compat` into PDF generation pipelines while keeping the same document serialization API as `@formepdf/react`.

## Installation

```bash
npm install @formepdf/preact @formepdf/core
```

## Preact configuration

Set `jsxImportSource` to `preact` in TypeScript or add `/** @jsxImportSource preact */` at the top of files that render PDF trees. Requires `preact ^10.19.0` as a peer dependency.

## Example

```tsx
import { Document, Page, Text, View, renderDocument } from "@formepdf/preact";

const pdf = await renderDocument(
  <Document>
    <Page size="Letter" margin={36}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Invoice #001</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Widget Pro</Text>
        <Text>$49.00</Text>
      </View>
    </Page>
  </Document>,
);
```

## SSR notes

PDF trees are rendered programmatically through `renderDocument` and do not require a browser DOM, making the adapter suitable for server-side generation when `@formepdf/core` is installed.

## Islands notes

Typical usage is server-side or worker-side document generation rather than client islands. Client previews should treat PDF bytes as output artifacts.

## Known limitations

Confirm which chart, form-field and layout primitives you need against the Forme docs. Hosted-API workflows can omit `@formepdf/core` but lose local rendering.

## Alternatives

If you already standardize on React compatibility shims, `@formepdf/react` with `preact/compat` remains possible but adds runtime overhead.

