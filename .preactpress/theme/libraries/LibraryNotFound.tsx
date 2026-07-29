import { Button } from "@kamod-ch/ui";

export function LibraryNotFound({ slug }: { slug: string }) {
  return (
    <section class="ph-not-found" aria-labelledby="library-not-found-title">
      <div class="ph-section-eyebrow">404</div>
      <h1 id="library-not-found-title">Library not found</h1>
      <p class="ph-muted">
        There is no catalog entry for <code>{slug}</code>. It may have moved or has not been published yet.
      </p>
      <div class="ph-hero-actions">
        <Button href="/libraries" class="ph-button-primary">Browse libraries</Button>
        <Button href="/submit" variant="outline">Submit a library</Button>
      </div>
    </section>
  );
}
