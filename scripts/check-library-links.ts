import { loadLibraryDirectory } from "../src/lib/library-node.js";

const TIMEOUT_MS = Number(process.env.LINK_CHECK_TIMEOUT_MS ?? 8000);
const CONCURRENCY = Number(process.env.LINK_CHECK_CONCURRENCY ?? 6);

interface LinkTarget {
  slug: string;
  file: string;
  field: string;
  url: string;
}

function collectLinks(root: string): LinkTarget[] {
  const directory = loadLibraryDirectory(root);
  const links: LinkTarget[] = [];

  for (const library of directory.libraries) {
    const candidates: Array<[string, string | undefined]> = [
      ["repositoryUrl", library.repositoryUrl],
      ["npmUrl", library.npmUrl],
      ["documentationUrl", library.documentationUrl],
      ["homepageUrl", library.homepageUrl],
      ["auditUrl", library.auditUrl],
    ];
    for (const [field, url] of candidates) {
      if (url) links.push({ slug: library.slug, file: library.file, field, url });
    }
  }

  return links;
}

async function checkUrl(url: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "PreactHub-LinkChecker/0.1" },
    });
    if (response.status === 405 || response.status === 501) {
      const getResponse = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "PreactHub-LinkChecker/0.1" },
      });
      return { ok: getResponse.ok, status: getResponse.status };
    }
    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

async function mapConcurrent<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      out[current] = await fn(items[current]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

async function main() {
  const root = process.cwd();
  const links = collectLinks(root);
  console.log(`Checking ${links.length} external URLs...`);

  const results = await mapConcurrent(links, CONCURRENCY, async (link) => {
    const result = await checkUrl(link.url);
    return { link, result };
  });

  const failures = results.filter(({ result }) => !result.ok);
  for (const { link, result } of failures) {
    const detail = result.status ? `HTTP ${result.status}` : result.error ?? "failed";
    console.error(`${link.file} (slug: ${link.slug}) ${link.field}: ${link.url} — ${detail}`);
  }

  if (failures.length) {
    console.error(`Link check failed: ${failures.length}/${links.length} URLs unreachable.`);
    process.exit(1);
  }

  console.log(`Link check passed (${links.length} URLs).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
