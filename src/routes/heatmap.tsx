import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Flame, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorldMap } from "@/components/IndiaMap";
import { OPPORTUNITIES, CITIES, type Opportunity } from "@/lib/mockData";

export const Route = createFileRoute("/heatmap")({
  head: () => ({
    meta: [
      { title: "Opportunity Heatmap · CampusMate" },
      { name: "description", content: "See internship and job density across Indian cities. Filter by role and experience level to decide where to apply." },
      { property: "og:title", content: "Opportunity Heatmap · CampusMate" },
      { property: "og:description", content: "Where the jobs are — visualised by city, role and level." },
    ],
  }),
  component: Heatmap,
});

const CATEGORIES: Opportunity["category"][] = ["SDE", "Data", "Product", "Core", "Design"];
const LEVELS: Opportunity["level"][] = ["Intern", "Entry", "Mid", "Senior"];

function Heatmap() {
  const [cat, setCat] = useState<Opportunity["category"] | "All">("All");
  const [lvl, setLvl] = useState<Opportunity["level"] | "All">("All");
  const [activeCity, setActiveCity] = useState<keyof typeof CITIES | undefined>();

  const filtered = useMemo(
    () =>
      OPPORTUNITIES.filter(
        (o) => (cat === "All" || o.category === cat) && (lvl === "All" || o.level === lvl)
      ),
    [cat, lvl]
  );

  const cityCounts = useMemo(() => {
    const m = new Map<keyof typeof CITIES, number>();
    filtered.forEach((o) => m.set(o.city, (m.get(o.city) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  const max = cityCounts[0]?.[1] ?? 1;

  const markers = cityCounts.map(([city, count]) => ({
    cityKey: city,
    color: "gold" as const,
    intensity: count / max,
    size: 8 + (count / max) * 14,
    label: `${CITIES[city].name} · ${count} roles`,
  }));

  const cityList = activeCity ? filtered.filter((o) => o.city === activeCity) : filtered;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Signature feature · 02</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Opportunity Heatmap</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Where are the roles concentrating right now? Filter by category and level
            to find your target city.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <FilterGroup label="Category" options={["All", ...CATEGORIES]} value={cat} onChange={(v) => setCat(v as typeof cat)} />
          <FilterGroup label="Level" options={["All", ...LEVELS]} value={lvl} onChange={(v) => setLvl(v as typeof lvl)} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <WorldMap
            markers={markers}
            activeCity={activeCity}
            onMarkerClick={(m) => setActiveCity((prev) => (prev === m.cityKey ? undefined : m.cityKey))}
          />

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <Flame className="h-3 w-3" /> Top cities · {filtered.length} matching roles
              </div>
              <div className="mt-4 space-y-3">
                {cityCounts.slice(0, 8).map(([city, count]) => {
                  const pct = (count / max) * 100;
                  const active = activeCity === city;
                  return (
                    <button
                      key={city}
                      onClick={() => setActiveCity((prev) => (prev === city ? undefined : city))}
                      className="block w-full text-left"
                    >
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className={active ? "font-semibold text-accent" : ""}>{CITIES[city].name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{count}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <div className="h-full bg-gradient-gold transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <TrendingUp className="h-3 w-3" /> {activeCity ? `Roles in ${CITIES[activeCity].name}` : "Latest matching roles"}
              </div>
              <div className="mt-3 max-h-[420px] space-y-2 overflow-auto pr-1">
                {cityList.slice(0, 12).map((o) => (
                  <div key={o.id} className="rounded-lg border border-border bg-surface-2/60 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{o.role}</div>
                        <div className="truncate text-xs text-muted-foreground">{o.company} · {CITIES[o.city].name}</div>
                      </div>
                      <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">{o.level}</span>
                    </div>
                  </div>
                ))}
                {cityList.length === 0 && (
                  <div className="py-8 text-center text-sm text-muted-foreground">No roles match these filters.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              value === o
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
