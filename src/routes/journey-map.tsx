import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorldMap } from "@/components/IndiaMap";
import { ALUMNI, CITIES, type Alumni } from "@/lib/mockData";

export const Route = createFileRoute("/journey-map")({
  head: () => ({
    meta: [
      { title: "Career Journey Map · CampusMate" },
      { name: "description", content: "Trace alumni journeys from first job to current city. Click any path to read the story behind each transition." },
      { property: "og:title", content: "Career Journey Map · CampusMate" },
      { property: "og:description", content: "Trace alumni journeys city by city, year by year." },
    ],
  }),
  component: JourneyMap,
});

function JourneyMap() {
  const [selectedId, setSelectedId] = useState<string>(ALUMNI[0].id);
  const selected: Alumni = ALUMNI.find((a) => a.id === selectedId) ?? ALUMNI[0];

  const paths = selected.journey.slice(1).map((stop, i) => ({
    from: selected.journey[i].city,
    to: stop.city,
    year: stop.year,
  }));

  const markers = selected.journey.map((stop, i) => ({
    cityKey: stop.city,
    color: i === selected.journey.length - 1 ? ("gold" as const) : ("emerald" as const),
    label: `${stop.year} · ${stop.company}`,
    size: i === selected.journey.length - 1 ? 14 : 10,
  }));

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Signature feature · 01</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Career Journey Map</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pick an alumnus and watch their path unfold city by city. Each marker is
            a chapter — click any year on the timeline for the story.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Alumni list */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Alumni</div>
            {ALUMNI.map((a) => {
              const active = a.id === selectedId;
              return (
                <button
                  key={a.id}
                  onClick={() => setSelectedId(a.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                    active
                      ? "border-primary/60 bg-primary/10 shadow-glow"
                      : "border-border bg-surface hover:border-border/80 hover:bg-surface-2"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold text-primary-foreground ${active ? "bg-gradient-gold" : "bg-gradient-emerald"}`}>
                    {a.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{a.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.branch} · {a.batch} · {a.currentCompany}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map + timeline */}
          <div className="space-y-6">
            <WorldMap markers={markers} paths={paths} activeCity={selected.city} />

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-accent">Career timeline</div>
                  <h2 className="mt-1 font-display text-2xl">{selected.name}</h2>
                  <div className="text-sm text-muted-foreground">
                    {selected.branch} · Batch of {selected.batch}
                  </div>
                </div>
                {selected.openForGuidance && (
                  <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
                    Open for Guidance
                  </span>
                )}
              </div>

              <div className="relative mt-8">
                <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />
                <AnimatePresence mode="wait">
                  <motion.ol
                    key={selected.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    {selected.journey.map((stop, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="relative pl-12"
                      >
                        <div
                          className={`absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full ring-4 ring-surface ${
                            i === selected.journey.length - 1
                              ? "bg-gradient-gold text-gold-foreground"
                              : "bg-gradient-emerald text-primary-foreground"
                          }`}
                        >
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="font-mono text-accent">{stop.year}</span>
                          <span className="font-semibold">{stop.role}</span>
                          <span className="text-muted-foreground">@ {stop.company}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {CITIES[stop.city].name}
                        </div>
                        {stop.note && (
                          <div className="mt-2 rounded-lg border border-border bg-surface-2/60 p-3 text-sm text-foreground/90">
                            <span className="mr-1 text-accent">“</span>
                            {stop.note}
                          </div>
                        )}
                      </motion.li>
                    ))}
                  </motion.ol>
                </AnimatePresence>
              </div>
            </div>

            {/* Migration trends mini insight */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <Calendar className="h-3 w-3" /> Branch-wise migration insight
              </div>
              <p className="mt-2 text-sm text-foreground/90">
                {selected.branch} alumni often follow:{" "}
                <span className="font-mono text-accent">
                  Tier-2 city → Bengaluru/Hyderabad → Onsite (Singapore / London / SF)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
