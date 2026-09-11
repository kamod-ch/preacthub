---
entryType: library
name: 'QTI3 Player Preact'
slug: 'longsightgroup-qti3-player-preact'
shortDescription: 'Preact TSX adapter for the qti3 QTI 3 assessment item player web component.'
category: 'ui'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'limited'
packageName: '@longsightgroup/qti3-player-preact'
repositoryUrl: 'https://github.com/LongsightGroup/qti3/tree/main/packages/player-preact'
documentationUrl: 'https://github.com/LongsightGroup/qti3/tree/main/packages/player-preact'
homepageUrl: 'https://github.com/LongsightGroup/qti3/tree/main/packages/player-preact#readme'
npmUrl: 'https://www.npmjs.com/package/@longsightgroup/qti3-player-preact'
license: 'MIT'
installCommand: 'npm install @longsightgroup/qti3-player-preact @longsightgroup/qti3-player preact'
featured: false
islands: true
esm: true
tags:
  - education
  - assessment
  - qti
limitations:
  - 'The underlying qti3 player is not yet 1EdTech certified; treat browser scoring as preview-only for high-stakes delivery.'
  - 'High-stakes XML should be prepared with `buildQtiDeliverySafeXml()` from `@longsightgroup/qti3-core` before passing to the adapter.'
qualityBadges: []
alternatives:
  - lit
---

## Introduction

`@longsightgroup/qti3-player-preact` wraps the `<qti-assessment-item-player>` web component from `@longsightgroup/qti3-player` with Preact lifecycle wiring, typed callbacks, declarative XML loading, and an imperative ref handle.

## Installation

```bash
npm install @longsightgroup/qti3-player-preact @longsightgroup/qti3-player preact
```

## Preact configuration

Import `QtiAssessmentItemPlayer` and `QtiAssessmentItemPlayerHandle` from the package. Keep `messageCatalog`, `loadOptions`, and resolver callbacks stable across renders with `useMemo` to avoid unnecessary reloads.

## Example

```tsx
import { useRef } from "preact/hooks";
import type { PlayerMessageCatalog } from "@longsightgroup/qti3-player";
import {
  QtiAssessmentItemPlayer,
  type QtiAssessmentItemPlayerHandle,
} from "@longsightgroup/qti3-player-preact";

export function Preview({
  candidateSafeXml,
  messageCatalog,
}: {
  candidateSafeXml: string;
  messageCatalog?: PlayerMessageCatalog;
}) {
  const playerRef = useRef<QtiAssessmentItemPlayerHandle>(null);

  return (
    <QtiAssessmentItemPlayer
      ref={playerRef}
      xml={candidateSafeXml}
      languageOfInterface="sv-SE"
      messageCatalog={messageCatalog}
      loadOptions={{
        status: "interacting",
        sessionControl: { validateResponses: false, showFeedback: false },
      }}
      onStateChange={({ state }) => console.log(state)}
      onLoadError={(error) => console.error(error)}
    />
  );
}
```

## SSR notes

The player depends on a custom element and browser APIs. Server render can emit a placeholder, but assessment interaction requires client hydration of the web component.

## Islands notes

Assessment previews are typically mounted as self-contained islands because they load XML, assets, and localized message catalogs on demand.

## Known limitations

Not 1EdTech certified. Browser `scoreAttempt()` is convenience scoring only; authoritative scoring belongs on the server with `scoreQtiItemServerSide()`.

## Alternatives

If you only need generic web-component hosting, [Lit](/libraries/lit) components can wrap custom elements without the QTI-specific adapter.

