---
entryType: library
name: ECharts
slug: echarts
description: Feature-rich charting toolkit for interactive visualizations.
category: charts
packageName: "echarts"
repository: "https://github.com/apache/echarts"
documentation: "https://echarts.apache.org/"
homepage: "https://echarts.apache.org/"
compatibility: unknown
status: stable
typescript: true
ssr: false
islands: true
esm: true
license: Apache-2.0
tags:
  - charts
  - visualization
  - dashboards
alternatives:
  - chart-js
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
