import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, GitBranch, Quote, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ALUMNI, CITIES } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Career Stories & Skill Trees — Campus Mitra" },
      { name: "description", content: "Internship-to-job conversion stories, full career timelines, and interactive skill trees you can compare with mentors." },
      { property: "og:title", content: "Career Stories & Skill Trees — Campus Mitra" },
      { property: "og:description", content: "Storytelling profiles with skill graphs and conversion playbooks." },
    ],
  }),
  component: StoriesPage,
});

const SKILL_TREES: Record<string, { node: string; level: number; year: number; branch: "core" | "depth" | "lateral" }[]> = {
  a1: [
    { node: "C++ / DSA", level: 4, year: 2018, branch: "core" },
    { node: "Backend systems", level: 5, year: 2020, branch: "core" },
    { node: "Distributed systems", level: 4, year: 2022, branch: "depth" },
    { node: "Payments domain", level: 3, year: 2023, branch: "lateral" },
    { node: "Tech leadership", level: 3, year: 2024, branch: "depth" },
  ],
  a2: [
    { node: "Embedded C", level: 4, year: 2018, branch: "core" },
    { node: "User research", level: 3, year: 2020, branch: "lateral" },
    { node: "SQL / metrics", level: 4, year: 2021, branch: "core" },
    { node: "Roadmapping", level: 4, year: 2023, branch: "depth" },
    { node: "Stakeholder mgmt", level: 4, year: 2024, branch: "depth" },
  ],
  a4: [
    { node: "Full-stack JS", level: 4, year: 2021, branch: "core" },
    { node: "ML basics", level: 3, year: 2022, branch: "lateral" },
    { node: "Tech leadership", level: 4, year: 2023, branch: "depth" },
    { node: "Founder ops", level: 4, year: 2024, branch: "depth" },
    { node: "Storytelling / fundraising", level: 3, year: 2024, branch: "lateral" },
  ],
};

const HELPED_MOST: Record<string, string[]> = {
  a1: ["Striver SDE Sheet", "DesignGurus System Design", "Daily 1-1 with manager"],
  a2: ["Lenny's Newsletter", "Reforge Programs", "Shadowing senior PMs"],
  a4: ["YC Startup School", "On Deck Founders", "Twitter build-in-public"],
};

const CONVERSIONS = [
  {
    id: "k1",
    alumni: "a1",
    intern: { company: "Flipkart", role: "SDE Intern", year: 2019 },
    ft: { company: "Flipkart", role: "SDE-1", year: 2020 },
    pq: "Won an internal hackathon week 6. Pitched solution to VP. PPO closed by week 10.",
    avoid: "Don't optimize for cool projects. Optimize for projects your skip-level cares about.",
  },
  {
    id: "k2",
    alumni: "a3",
    intern: { company: "Mu Sigma", role: "Data Analyst Intern", year: 2020 },
    ft: { company: "Adobe", role: "MLE", year: 2022 },
    pq: "Did not convert. Used the stipend to fund Coursera ML + Kaggle grind for 8 months.",
    avoid: "I waited for permission to specialize. Specialize on weekends from week 1.",
  },
  {
    id: "k3",
    alumni: "a6",
    intern: { company: "Microsoft", role: "SDE Intern", year: 2018 },
    ft: { company: "Microsoft", role: "SDE", year: 2019 },
    pq: "Treated final review like a postmortem of my own work. Surfaced 2 design improvements.",
    avoid: "Don't ghost your intern manager after PPO. They are your first reference for life.",
  },
];

function StoriesPage() {
  const [selected, setSelected] = useState<string>("a1");
  const al = ALUMNI.find((a) => a.id === selected)!;
  const tree = SKILL_TREES[selected] ?? [];
  const helped = HELPED_MOST[selected] ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Storytelling profiles</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Careers as stories — not bullet points</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Career story mode, interactive skill trees, “what helped me most”, and real internship-to-job conversion playbooks.
          </p>
        </motion.div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="border-border/60 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Pick a story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.keys(SKILL_TREES).map((id) => {
                const a = ALUMNI.find((x) => x.id === id)!;
                const active = selected === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelected(id)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors ${
                      active ? "border-primary/60 bg-primary/10" : "border-border/60 bg-surface-2/40 hover:bg-surface-2"
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-emerald text-xs font-semibold text-primary-foreground">
                      {a.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{a.name}</div>
                      <div className="text-xs text-muted-foreground">{a.currentRole} @ {a.currentCompany}</div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-2xl">
                  <Quote className="h-5 w-5 text-primary" /> {al.name}'s story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative ml-3 space-y-5 border-l border-border/60 pl-6">
                  {al.journey.map((j, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-emerald" />
                      <div className="flex flex-wrap items-baseline gap-2 text-sm">
                        <span className="font-display text-lg">{j.year}</span>
                        <span className="font-medium">{j.role}</span>
                        <span className="text-muted-foreground">@ {j.company} · {CITIES[j.city]?.name}</span>
                      </div>
                      {j.note && <p className="mt-1 text-sm text-muted-foreground">{j.note}</p>}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-xl">
                  <GitBranch className="h-5 w-5 text-gold" /> Skill tree
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tree.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Badge className={
                      s.branch === "core" ? "bg-primary/15 text-primary" :
                      s.branch === "depth" ? "bg-gold/15 text-gold" :
                      "bg-surface-2 text-muted-foreground"
                    }>
                      {s.branch}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{s.node}</span>
                        <span className="text-xs text-muted-foreground">{s.year}</span>
                      </div>
                      <div className="mt-1 flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            className={`h-1.5 flex-1 rounded-full ${n <= s.level ? "bg-gradient-emerald" : "bg-surface-2"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-xl">
                  <Sparkles className="h-5 w-5 text-primary" /> What helped me most
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {helped.map((h) => (
                  <div key={h} className="rounded-xl border border-border/60 bg-surface-2/40 p-4 text-sm">
                    {h}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Internship → Full-time conversion playbooks</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Real timelines, what worked, and the mistakes alumni would undo if they could.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {CONVERSIONS.map((c, i) => {
              const a = ALUMNI.find((x) => x.id === c.alumni);
              return (
                <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="h-full border-border/60">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-emerald text-xs font-semibold text-primary-foreground">
                          {a?.avatar}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div className="text-foreground">{a?.name}</div>
                          {a?.branch} · Batch {a?.batch}
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                        <Badge className="bg-surface-2 text-muted-foreground">{c.intern.year}</Badge>
                        <span>{c.intern.role} @ {c.intern.company}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-primary" />
                        <Badge className="bg-gradient-gold text-gold-foreground">{c.ft.year}</Badge>
                        <span>{c.ft.role} @ {c.ft.company}</span>
                      </div>
                      <p className="mt-3 text-sm">"{c.pq}"</p>
                      <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-xs text-muted-foreground">
                        <span className="font-medium text-destructive">Avoid: </span>{c.avoid}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
