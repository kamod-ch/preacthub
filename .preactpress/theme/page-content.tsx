import type { LayoutProps } from "@kamod-ch/preactpress/client";
import { createMdxHeadingComponents } from "@kamod-ch/preactpress/client";

export function renderPageContent(page: LayoutProps["page"]) {
  if (!page) return null;
  const mdxComponents = createMdxHeadingComponents({
    headingClass: "ph-heading",
    anchorClass: "ph-heading-anchor",
    anchorLabel: "Link to section",
  });
  if (page.kind === "mdx") {
    const Mdx = page.Component;
    return (
      <div class="ph-prose">
        <Mdx components={mdxComponents} />
      </div>
    );
  }
  return <div class="ph-prose" dangerouslySetInnerHTML={{ __html: page.html }} />;
}
