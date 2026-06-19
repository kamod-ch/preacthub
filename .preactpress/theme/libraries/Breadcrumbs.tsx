import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@kamod-ch/ui";

export interface Crumb {
  label: string;
  href?: string;
}

export function SiteBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumb class="ph-breadcrumbs">
      <BreadcrumbList>
        {items.map((item, index) => (
          <>
            <BreadcrumbItem key={`${item.label}:${index}`}>
              {item.href ? <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink> : <BreadcrumbPage>{item.label}</BreadcrumbPage>}
            </BreadcrumbItem>
            {index < items.length - 1 ? <BreadcrumbSeparator key={`sep:${item.label}:${index}`}>/</BreadcrumbSeparator> : null}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
