---
entryType: library
name: 'Allure Report Web Components'
slug: 'allurereport-web-components'
shortDescription: 'Preact component and chart collection used to build Allure 3 test-report interfaces.'
category: 'testing'
compatibilityStatus: 'compat'
maintenanceStatus: 'active'
typescriptSupport: 'bundled-types'
ssrSupport: 'unknown'
packageName: '@allurereport/web-components'
repositoryUrl: 'https://github.com/allure-framework/allure3'
documentationUrl: 'https://allurereport.org/docs/'
homepageUrl: 'https://allurereport.org/'
npmUrl: 'https://www.npmjs.com/package/@allurereport/web-components'
license: 'Apache-2.0'
installCommand: 'npm install @allurereport/web-components'
featured: false
islands: false
esm: true
tags:
  - allure
  - test-reports
  - charts
limitations:
  - 'Designed for Allure report applications rather than as a general-purpose UI library; many components depend on Allure data contracts and sibling packages.'
  - 'Includes charting, D3, Markdown, syntax-highlighting, Preact, and compat-backed React dependencies, making it heavyweight for isolated controls.'
qualityBadges: []
alternatives:
  - vitest-browser-preact
  - chart-js
---

## Introduction

`@allurereport/web-components` is the shared Preact UI layer for Allure 3 web reports. It exports report-specific attachments, trees, charts, summaries, status labels, themes, and lower-level controls such as buttons, modals, menus, and tooltips.

## Installation

```bash
npm install @allurereport/web-components
```

Import the distributed stylesheet alongside any components:

```js
import '@allurereport/web-components/index.css';
```

## Preact configuration

The package ships Preact and Signals internally and aliases React dependencies to `@preact/compat`. Consumers should deduplicate Preact where possible and should not assume every transitive chart component is React-free.

## Example

```jsx
import { Button, StatusLabel } from '@allurereport/web-components';
import '@allurereport/web-components/index.css';

export function ReportAction() {
  return (
    <div>
      <StatusLabel status="passed" />
      <Button onClick={() => location.reload()}>Reload report</Button>
    </div>
  );
}
```

Check the exported TypeScript props for the exact Allure version before using report-specific widgets.

## SSR notes

Package metadata does not present a supported standalone SSR contract. Charts, previews, DOM measurement hooks, and report interactions may require a browser; test individual exports before server-rendering them.

## Islands notes

Large report widgets can be mounted client-side as isolated regions, but shared themes, CSS, data contracts, and bundled dependencies reduce the benefit for small islands.

## Known limitations

This package is coupled to matching versions of Allure core, charts, and web-common packages. Its broad dependency graph is usually excessive outside an Allure report frontend.

## Alternatives

Use [Vitest Browser Preact](/libraries/vitest-browser-preact) for testing Preact components, or [Chart.js](/libraries/chart-js) when only generic report visualizations are needed.

