import { Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import type { CategorySummary } from "../../../src/lib/libraries";

function CategoryIcon({ slug }: { slug: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (slug) {
    case "ui":
      return <svg {...common}><rect x="4" y="5" width="7" height="7" rx="1.5" /><rect x="13" y="5" width="7" height="14" rx="1.5" /><rect x="4" y="14" width="7" height="5" rx="1.5" /></svg>;
    case "state-management":
      return <svg {...common}><circle cx="7" cy="12" r="2.5" /><circle cx="17" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /><path d="M9.5 11l5-2.5M9.5 13l5 2.5" /></svg>;
    case "data-fetching":
      return <svg {...common}><path d="M7 7h10" /><path d="M14 4l3 3-3 3" /><path d="M17 17H7" /><path d="M10 14l-3 3 3 3" /></svg>;
    case "routing":
      return <svg {...common}><path d="M5 19L19 5" /><path d="M9 5h10v10" /></svg>;
    case "forms":
      return <svg {...common}><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M8 9h8" /><path d="M8 13h4" /><path d="M8.5 17l1.5 1.5 3-3" /></svg>;
    case "testing":
      return <svg {...common}><path d="M9 4h6" /><path d="M10 4v5l-4.5 7.5A2 2 0 0 0 7.2 20h9.6a2 2 0 0 0 1.7-3.5L14 9V4" /><path d="M9 13h6" /></svg>;
    case "ssr":
      return <svg {...common}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>;
    case "animation":
      return <svg {...common}><path d="M12 3l2.4 5.2L20 10l-5.6 1.8L12 17l-2.4-5.2L4 10l5.6-1.8L12 3z" /></svg>;
    case "i18n":
      return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M4 12h16" /><path d="M12 4a12 12 0 0 1 0 16" /><path d="M12 4a12 12 0 0 0 0 16" /></svg>;
    case "charts":
      return <svg {...common}><path d="M5 19V9" /><path d="M12 19V5" /><path d="M19 19v-7" /></svg>;
    case "developer-tools":
      return <svg {...common}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-3.2-3.2z" /></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="7" /></svg>;
  }
}

export function CategoryCard({ category }: { category: CategorySummary }) {
  return (
    <a href={`/libraries/${category.slug}`} class="ph-category-card-link">
      <Card class="ph-category-card">
        <CardHeader>
          <div class="ph-category-card-top">
            <div class="ph-category-icon" aria-hidden="true"><CategoryIcon slug={category.slug} /></div>
            <span class="ph-category-badge">{category.count}</span>
          </div>
          <CardTitle>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="ph-category-description">{category.description}</p>
        </CardContent>
      </Card>
    </a>
  );
}
