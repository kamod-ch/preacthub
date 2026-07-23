export type TrustMarkerKind = "recommended" | "native" | "verified";

const trustConfig: Record<
  TrustMarkerKind,
  { label: string; glyph: string; className: string }
> = {
  recommended: {
    label: "Recommended",
    glyph: "✦",
    className: "ph-trust-recommended",
  },
  native: {
    label: "Native Preact",
    glyph: "◆",
    className: "ph-trust-native",
  },
  verified: {
    label: "Verified",
    glyph: "✓",
    className: "ph-trust-verified",
  },
};

export function TrustMarker({
  kind,
  size = "sm",
}: {
  kind: TrustMarkerKind;
  size?: "sm" | "lg";
}) {
  const config = trustConfig[kind];
  return (
    <span
      class={`ph-trust-marker ${config.className}${size === "lg" ? " ph-trust-marker-lg" : ""}`}
    >
      <span class="ph-trust-glyph" aria-hidden="true">{config.glyph}</span>
      <span>{config.label}</span>
    </span>
  );
}
