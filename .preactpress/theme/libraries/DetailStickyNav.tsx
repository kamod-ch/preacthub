import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { DetailTab, DetailTabId } from "../../../src/lib/detail-sections";

export function DetailStickyNav({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: DetailTab[];
  activeTab: DetailTabId;
  onTabChange: (tab: DetailTabId) => void;
}) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const nav = document.querySelector(".ph-detail-sticky-nav");
    if (!nav) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: "-1px 0px 0px 0px", threshold: [1] },
    );
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "") as DetailTabId;
    if (tabs.some((tab) => tab.id === hash)) {
      onTabChange(hash);
    }

    function onHashChange() {
      const next = window.location.hash.replace(/^#/, "") as DetailTabId;
      if (tabs.some((tab) => tab.id === next)) {
        onTabChange(next);
      }
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [tabs, onTabChange]);

  function selectTab(id: DetailTabId) {
    onTabChange(id);
    window.history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div class="ph-detail-sticky-nav-sentinel" aria-hidden="true" />
      <nav
        class={`ph-detail-sticky-nav${stuck ? " ph-detail-sticky-nav--stuck" : ""}`}
        aria-label="Page sections"
      >
        <div class="ph-detail-tab-list" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              class={`ph-detail-tab${activeTab === tab.id ? " ph-detail-tab--active" : ""}`}
              aria-selected={activeTab === tab.id}
              aria-controls={tab.id}
              onClick={() => selectTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

export function DetailTabPanel({
  id,
  activeTab,
  children,
  hidden,
}: {
  id: DetailTabId;
  activeTab: DetailTabId;
  children: ComponentChildren;
  hidden?: boolean;
}) {
  const isActive = activeTab === id;
  if (hidden) return null;

  return (
    <section
      id={id}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      class={`ph-detail-tab-panel${isActive ? " ph-detail-tab-panel--active" : ""}`}
      hidden={!isActive}
    >
      {children}
    </section>
  );
}
