"use client";

import SpotlightCard from "./SpotlightCard";

const features = [
  {
    title: "Segmented context",
    description:
      "Self-updating, scoped knowledge so your agents and team always pull the right slice — nothing more, nothing less.",
    icon: <GridIcon />,
  },
  {
    title: "Encrypted by default",
    description:
      "Permission layers and user-owned data baked in from the first commit, not bolted on at the end.",
    icon: <LockIcon />,
  },
  {
    title: "Ready via MCP",
    description:
      "Expose your systems to LLMs and tools through clean, optimized interfaces that just work.",
    icon: <PlugIcon />,
  },
  {
    title: "Data, visualized",
    description:
      "Real-time dashboards and analysis pipelines that turn raw signal into decisions you can act on.",
    icon: <ChartIcon />,
  },
];

export default function FeatureCardsSection() {
  return (
    <section className="features" id="features">
      <div className="features__head">
        <p className="features__eyebrow">Engine</p>
        <h2 className="features__title">State-of-the-art context technology</h2>
        <p className="features__lead">
          Raw signal in at the top. Layers of engineering segment, compress, and
          gate it on the way down. Clean, scoped systems out at the bottom.
        </p>
      </div>

      <div className="features__grid">
        {features.map((f, i) => (
          <SpotlightCard
            key={f.title}
            title={f.title}
            description={f.description}
            icon={f.icon}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

/* --- inline icons (no extra deps) --- */
function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function PlugIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M9 2v6M15 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0V8Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 17v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 20V4M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 16v-4M12 16V8M16 16v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
