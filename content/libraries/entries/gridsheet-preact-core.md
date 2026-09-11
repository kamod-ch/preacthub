---
entryType: library
name: 'GridSheet Preact'
slug: 'gridsheet-preact-core'
shortDescription: 'Spreadsheet component with formulas and multi-sheet support for Preact.'
category: 'ui'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'unknown'
packageName: '@gridsheet/preact-core'
repositoryUrl: 'https://github.com/walkframe/gridsheet'
documentationUrl: 'https://gridsheet.walkframe.com/'
homepageUrl: 'https://gridsheet.walkframe.com/'
npmUrl: 'https://www.npmjs.com/package/@gridsheet/preact-core'
license: 'Apache-2.0'
installCommand: 'npm install @gridsheet/preact-core @gridsheet/functions'
featured: false
islands: false
esm: true
tags:
  - spreadsheet
  - data-grid
  - formulas
limitations:
  - 'Requires @gridsheet/functions when using the spellbook helpers.'
  - 'Lists dayjs as an additional runtime dependency in upstream docs.'
  - 'SSR behavior has not been independently verified for PreactHub.'
qualityBadges: []
alternatives:
  - tanstack-table
---

## Introduction

GridSheet provides an Excel-like spreadsheet UI for Preact through the dedicated `@gridsheet/preact-core` renderer. It ships a native Preact peer dependency and exposes `GridSheet`, spellbook helpers and formula-aware cell editing.

## Installation

```bash
npm install @gridsheet/preact-core @gridsheet/functions
```

## Preact configuration

Install `preact ^10.26.6` as a peer dependency. Import components from `@gridsheet/preact-core` and optional spellbook utilities from `@gridsheet/preact-core/spellbook` when formulas are required.

## Example

```tsx
import { GridSheet } from "@gridsheet/preact-core";
import { useSpellbook } from "@gridsheet/preact-core/spellbook";

export function SheetDemo() {
  const book = useSpellbook();
  return (
    <GridSheet
      book={book}
      sheetName="Sheet1"
      initialCells={{
        A1: { value: "Hello" },
        B2: { value: "=SUM(A2:B2)" },
      }}
    />
  );
}
```

## SSR notes

Upstream documentation focuses on client-side spreadsheet interaction. PreactHub has not verified a supported SSR path; treat server rendering as unknown until you validate DOM measurement and formula evaluation in your target environment.

## Islands notes

Spreadsheet widgets are usually mounted as self-contained interactive islands because they depend on pointer, keyboard and scroll interactions.

## Known limitations

Formula support depends on `@gridsheet/functions`. Large workbooks can be heavy for island hydration, and accessibility for grid navigation should be validated against your product requirements.

## Alternatives

For tabular data without spreadsheet semantics, see [TanStack Table](/libraries/tanstack-table).

