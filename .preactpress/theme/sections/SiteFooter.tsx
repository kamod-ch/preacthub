import type { FunctionalComponent } from "preact";
import { CodeBlock } from "../libraries/CodeBlock";
import { CompatibilityBadge } from "../libraries/LibraryBadge";
import type { LibraryDirectoryMeta } from "../types";
import { BrandLogo } from "../BrandLogo";

export const SiteFooter: FunctionalComponent<{ directory?: LibraryDirectoryMeta }> = ({ directory }) => (
  <footer class="ph-footer">
    <div class="ph-shell ph-footer-inner">
      <div class="ph-footer-grid">
        <div>
          <a class="ph-footer-brand ph-brand" href="/" aria-label="PreactHub home">
            <BrandLogo />
          </a>
          <p class="ph-footer-copy">
            The curated directory for the Preact ecosystem. Community-maintained, compatibility-aware and focused on practical implementation guidance.
          </p>
          <div class="ph-footer-code-wrap">
            <CodeBlock title="Install Preact" code="npm install preact" />
          </div>
        </div>
        <div>
          <h2>Directory</h2>
          <ul>
            <li><a href="/libraries">Browse all libraries</a></li>
            <li><a href="/libraries#categories">Categories</a></li>
            <li><a href="/libraries/submit">Submit library</a></li>
          </ul>
        </div>
        <div>
          <h2>Resources</h2>
          <ul>
            <li><a href="https://preactjs.com/guide/v10/getting-started/" target="_blank" rel="noopener noreferrer">Preact docs</a></li>
            <li><a href="https://preactjs.com/guide/v10/switching-to-preact/" target="_blank" rel="noopener noreferrer">Switching to Preact</a></li>
            <li><a href="https://github.com/kamod-ch/preacthub" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
            <li><a href="/libraries/kamod-ai-audit">Kamod AI Audit</a></li>
            <li><a href="https://github.com/kamod-ch/kamod-ai-audit" target="_blank" rel="noopener noreferrer">Audit your site</a></li>
          </ul>
        </div>
        <div>
          <h2>Status</h2>
          <p>
            {directory
              ? `${directory.stats.total} curated entries across ${directory.stats.categories} categories.`
              : "Curated for real Preact projects."}
          </p>
          <div class="ph-footer-badges">
            <CompatibilityBadge value="native" />
            <CompatibilityBadge value="compat" />
            <CompatibilityBadge value="unverified" />
          </div>
        </div>
      </div>
      <p class="ph-footer-powered">
        Made with{" "}
        <a href="https://kamod-ch.github.io/preactpress/" target="_blank" rel="noopener noreferrer">
          Preactpress
        </a>{" "}
        and powered by{" "}
        <a href="https://www.kamod.ch" target="_blank" rel="noopener noreferrer">
          kamod.ch
        </a>
      </p>
    </div>
  </footer>
);
