---
entryType: library
name: 'ZikoJS Preact'
slug: 'zikojs-preact'
shortDescription: 'Interop adapter for rendering ZikoJS elements inside Preact and embedding Preact in ZikoJS.'
category: 'developer-tools'
compatibilityStatus: 'experimental'
maintenanceStatus: 'active'
typescriptSupport: unknown
ssrSupport: 'unsupported'
packageName: '@zikojs/preact'
repositoryUrl: 'https://github.com/zikojs/integrations/tree/main/packages/preact'
documentationUrl: 'https://github.com/zikojs/integrations/tree/main/packages/preact'
npmUrl: 'https://www.npmjs.com/package/@zikojs/preact'
license: 'MIT'
installCommand: 'npm install @zikojs/preact ziko preact'
featured: false
islands: true
esm: true
tags:
  - interop
  - zikojs
  - experimental
limitations:
  - 'Package is 0.2.x beta and lists `preact` as a direct dependency rather than a peer, which can duplicate Preact runtimes if your bundler does not dedupe.'
  - 'ZikoWrapper mounts Ziko elements with `useEffect`, so initial render is client-only.'
qualityBadges: []
alternatives:
  - preact-custom-element
---

## Introduction

`@zikojs/preact` bridges ZikoJS functional UI elements and Preact components. Export `ZikoWrapper` to host Ziko trees inside Preact, or use `zikofy` from `@zikojs/preact` to embed Preact components in ZikoJS apps.

## Installation

```bash
npm install @zikojs/preact ziko preact
```

## Preact configuration

Ensure only one Preact copy resolves at runtime because the package depends on `preact ^10.29.8` directly alongside your app. Alias or dedupe in Vite, Webpack, or pnpm overrides when bundle analysis shows duplicates.

## Example

```jsx
import { ZikoWrapper } from '@zikojs/preact';
import Comp from './Comp.js';

export default function App() {
  return (
    <div>
      <ZikoWrapper>
        <Comp color="darkblue" />
      </ZikoWrapper>
    </div>
  );
}
```

Embed Preact inside ZikoJS:

```js
import { Flex, h1 } from 'ziko';
import { zikofy } from '@zikojs/preact';
import MyPreactComp from './MyPreactComp.jsx';

const WrappedPreact = zikofy(MyPreactComp);

export const App = () => Flex(
  h1('ZikoJS App with Preact Component'),
  WrappedPreact({ msg: 'Hello from Preact!' }),
);
```

## SSR notes

ZikoWrapper clears and repopulates a container ref in `useEffect`, so Ziko subtrees are not available during server render.

## Islands notes

Each ZikoWrapper instance is a natural island boundary because Ziko elements mount after hydration.

## Known limitations

Beta status and bundled Preact dependency increase duplicate-runtime risk. Ziko itself is on `^2.0.0-beta.8`.

## Alternatives

For framework-agnostic embedding, consider [Preact Custom Element](/libraries/preact-custom-element).

