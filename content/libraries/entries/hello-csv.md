---
entryType: library
name: 'Hello CSV'
slug: 'hello-csv'
shortDescription: 'Drop-in CSV importer workflow with Preact adapter and framework-agnostic bundled API.'
category: 'forms'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'unsupported'
packageName: 'hello-csv'
repositoryUrl: 'https://github.com/HelloCSV/HelloCSV'
documentationUrl: 'https://hellocsv.mintlify.app/'
homepageUrl: 'https://hellocsv.github.io/HelloCSV/'
npmUrl: 'https://www.npmjs.com/package/hello-csv'
license: 'MIT'
installCommand: 'npm install hello-csv'
featured: false
islands: true
esm: true
tags:
  - csv
  - import
  - forms
  - data
limitations:
  - 'UI is built with Preact but lists React-origin dependencies such as `@headlessui/react`, `@heroicons/react`, and `@tanstack/react-table`—not a React-free dependency tree.'
  - 'Peer dependencies include both Preact and React; bundlers may need aliases when tree-shaking React out.'
qualityBadges: []
alternatives:
  - tanstack-form
---

## Introduction

[Hello CSV](https://hellocsv.mintlify.app/) is a frontend-only CSV importer with custom columns, validators, transformers, and a four-step upload workflow. The core UI is Preact-based with dedicated `hello-csv/preact` and `hello-csv/bundled` entry points.

## Installation

```bash
npm install hello-csv
```

## Preact configuration

Import the Preact adapter subpath and stylesheet:

```jsx
import Importer from 'hello-csv/preact';
import 'hello-csv/preact/index.css';
```

For no-build pages, use `renderImporter` from `hello-csv/bundled`.

## Example

```jsx
import Importer from 'hello-csv/preact';
import 'hello-csv/preact/index.css';

export function CsvUpload() {
  return (
    <Importer
      sheets={[
        {
          id: 'employees',
          label: 'Employees',
          columns: [
            {
              label: 'Name',
              id: 'name',
              type: 'string',
              validators: [{ validate: 'required' }],
            },
            {
              label: 'Email',
              id: 'email',
              type: 'string',
              validators: [{ validate: 'required' }],
            },
          ],
        },
      ]}
      onComplete={(data) => {
        console.log(data);
      }}
    />
  );
}
```

Bundled imperative API:

```jsx
import { renderImporter } from 'hello-csv/bundled';

renderImporter(document.querySelector('#app'), {
  sheets: [{ id: 'employees', label: 'Employees', columns: [{ label: 'Name', id: 'name', type: 'string', validators: [{ validate: 'required' }] }] }],
});
```

## SSR notes

File parsing, drag-and-drop, and preview grids require browser APIs. Mount the importer client-side only.

## Islands notes

Excellent island candidate: load the importer on admin pages without pulling CSV UI into your main bundle.

## Known limitations

React-origin table and headless UI dependencies mean the package is Preact-native at its core but not React-free. Community-tested with CI on GitHub Actions—validate peer resolution in your bundler.

## Alternatives

For hand-built form flows without a CSV wizard, see [TanStack Form](/libraries/tanstack-form).

