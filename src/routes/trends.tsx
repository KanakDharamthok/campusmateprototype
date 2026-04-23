import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, TrendingUp, Target, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ALUMNI, CITIES, SKILL_PATHS } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Migration Trends & Skill Gap — Campus Mitra" },
      { name: "description", content: "Explore alumni migration corridors by branch and batch, and find your skill gap to a target role." },
      { property: "og:title", content: "Migration Trends & Skill Gap — Campus Mitra" },
      { property: "og:description", content: "City-to-city career corridors and skill gap analysis." },
    ],
  }),
  component: TrendsPage,
});

type Corridor = { from: string; to: string; count: number; sample: string[] };

function TrendsPage() {
  const [branch, setBranch] = useState<string>("All");
  const branches = ["All", ...Array.from(new Set(ALUMNI.map((a) => a.branch)))];

  const corridors = useMemo<Corridor[]>(() => {
    const map = new Map<string, Corridor>();
    ALUMNI.filter((a) => branch === "All" || a.branch === branch).forEach((a) => {
      const start = a.journey[0]?.city;
      const end = a.journey[a.journey.length - 1]?.city;
      if (!start || !end || start === end) return;
      const key = `${start}->${end}`;
      const cur = map.get(key);
      if (cur) {
        cur.count += 1;
        cur.sample.push(a.name);
      } else {
        map.set(key, { from: start as string, to: end as string, count: 1, sample: [a.name] });
      }
    });
    return Array.from(map.values()).sort((x, y) => y.count - x.count);
  }, [branch]);

  // skill gap
  const [target, setTarget] = useState<keyof typeof SKILL_PATHS>("SDE");
  const [have, setHave] = useState<Set<string>>(new Set());
  const path = SKILL_PATHS[target];
  const missing = path.skills.filter((s) => !have.has(s));
  const pct = Math.round(((path.skills.length - missing.length) / path.skills.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Trends</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Migration corridors & skill gaps</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            See how alumni move across cities by branch and batch — and chart the missing skills between you and your target role.
          </p>
        </motion.div>

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-display text-2xl">
                  <TrendingUp className="h-5 w-5 text-primary" /> Migration trends
                </CardTitle>
                <div className="flex flex-wrap gap-1">
                  {branches.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBranch(b)}
                      className={`rounded-full px-3 py-1 text-xs ${
                        branch === b ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {corridors.length === 0 && (
                <p className="text-sm text-muted-foreground">No migrations recorded for this branch.</p>
              )}
              {corridors.map((c, i) => (
                <motion.div
                  key={`${c.from}-${c.to}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-surface-2/40 p-4"
                >
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium">{CITIES[c.from as keyof typeof CITIES]?.name ?? c.from}</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="font-medium">{CITIES[c.to as keyof typeof CITIES]?.name ?? c.to}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{c.sample.slice(0, 2).join(", ")}{c.sample.length > 2 ? ` +${c.sample.length - 2}` : ""}</span>
                    <Badge className="bg-gradient-gold text-gold-foreground">{c.count}</Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-2xl">
                <Target className="h-5 w-5 text-gold" /> Skill gap → job match
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {Object.keys(SKILL_PATHS).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTarget(t as keyof typeof SKILL_PATHS); setHave(new Set()); }}
                    className={`rounded-full px-3 py-1.5 text-xs ${
                      target === t ? "bg-gradient-gold text-gold-foreground" : "bg-surface-2 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Skills you already have</span>
                  <span>{pct}% match</span>
                </div>
                <Progress value={pct} />
              </div>

              <div className="grid gap-2">
                {path.skills.map((s) => {
                  const owned = have.has(s);
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        const next = new Set(have);
                        if (owned) next.delete(s); else next.add(s);
                        setHave(next);
                      }}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                        owned ? "border-primary/60 bg-primary/10 text-foreground" : "border-border/60 bg-surface-2/40 text-muted-foreground"
                      }`}
                    >
                      <span>{s}</span>
                      <span className="text-xs">{owned ? "Have" : "Missing"}</span>
                    </button>
                  );
                })}
              </div>

              {missing.length > 0 && (
                <div className="rounded-xl border border-border/60 bg-surface-2/40 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <BookOpen className="h-4 w-4 text-primary" /> Close the gap
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Start with: <span className="text-foreground">{missing.slice(0, 2).join(", ")}</span>. Recommended communities: {path.communities.join(", ")}.
                  </p>
                  <Button asChild size="sm" className="mt-3 bg-gradient-emerald text-primary-foreground">
                    <a href="/career-gps">Open Career GPS</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
