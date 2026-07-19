---
entryType: library
name: ECharts
slug: echarts
shortDescription: Feature-rich charting toolkit for interactive visualizations.
category: charts
compatibilityStatus: unverified
typescriptSupport: native
ssrSupport: unsupported
maintenanceStatus: active
tags:
  - charts
  - visualization
  - dashboards
packageName: echarts
repositoryUrl: 'https://github.com/apache/echarts'
npmUrl: 'https://www.npmjs.com/package/echarts'
documentationUrl: 'https://echarts.apache.org/'
homepageUrl: 'https://echarts.apache.org/'
license: Apache-2.0
installCommand: npm install echarts
alternatives:
  - chart-js
islands: true
esm: true
---

## Introduction

ECharts is attractive when you need richer interaction, map support or more complex chart types.

## Installation

```bash
npm install echarts
```

## Preact configuration

Most integrations render into a managed DOM element after hydration.

## Example

```ts
import * as echarts from "echarts";

const chart = echarts.init(container);
chart.setOption({ xAxis: {}, yAxis: {}, series: [{ type: "bar", data: [3, 7, 5] }] });
```

## SSR notes

Treat the visualization itself as client-only unless your setup provides a dedicated server-rendering path.

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
