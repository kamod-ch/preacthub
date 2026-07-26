import { Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import type { CategorySummary } from "../../../src/lib/libraries";
import { categoryRoute } from "../../../src/lib/categories";
import { CategoryIcon } from "./CategoryIcon";

export function CategoryCard({ category }: { category: CategorySummary }) {
  const href = categoryRoute(category.slug);
  return (
    <a href={href} class="ph-category-card-link">
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
