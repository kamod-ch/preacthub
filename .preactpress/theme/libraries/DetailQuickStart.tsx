import { Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import { CodeBlock } from "./CodeBlock";

const VITE_COMPAT_SNIPPET = `resolve: {
  alias: {
    react: "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
    "react/jsx-runtime": "preact/jsx-runtime",
  },
}`;

export function DetailQuickStart({
  installCommand,
  showViteConfig,
  example,
}: {
  installCommand?: string;
  showViteConfig: boolean;
  example?: { code: string; language: string };
}) {
  const hasContent = installCommand || showViteConfig || example;
  if (!hasContent) {
    return (
      <p class="ph-muted">No setup instructions documented yet for this entry.</p>
    );
  }

  return (
    <div class="ph-quick-start">
      <Card class="ph-quick-start-card">
        <CardHeader>
          <CardTitle>Quick start</CardTitle>
        </CardHeader>
        <CardContent class="ph-quick-start-content">
          {installCommand ? <CodeBlock title="Installation" code={installCommand} /> : null}
          {showViteConfig ? (
            <CodeBlock title="Vite configuration" code={VITE_COMPAT_SNIPPET} language="ts" />
          ) : null}
          {example ? (
            <CodeBlock title="Preact example" code={example.code} language={example.language} />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

export { VITE_COMPAT_SNIPPET };
