import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { MessageSquare, ThumbsUp, Trophy, MapPin, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ALUMNI, CITIES } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Ask Alumni, City Chapters, Reputation — Campus Mitra" },
      { name: "description", content: "Ask verified alumni real questions, join your city chapter, and climb a reputation board built on outcomes — not likes." },
      { property: "og:title", content: "Community — Campus Mitra" },
      { property: "og:description", content: "Ask Alumni, City Chapters, Reputation by Impact." },
    ],
  }),
  component: CommunityPage,
});

type Q = { id: string; q: string; alumniId: string; answer: string; worked: number; tag: string };

const SEED_QS: Q[] = [
  { id: "q1", q: "How do I switch from service-based to product-based in 1 year?", alumniId: "a1", answer: "Build 2 portfolio projects, target referrals on LinkedIn, grind DSA for 3 months consistently.", worked: 42, tag: "Career switch" },
  { id: "q2", q: "Is an MBA worth it after 3 years in tech?", alumniId: "a2", answer: "Only if you want to switch domains. PM transitions don't need an MBA — internal moves work.", worked: 31, tag: "Higher studies" },
  { id: "q3", q: "How do I land an MLE role without an MS?", alumniId: "a3", answer: "Ship a deployed model end-to-end, write about it, contribute to one OSS ML repo.", worked: 27, tag: "ML" },
  { id: "q4", q: "Bootstrapping vs raising for a tier-2 founder?", alumniId: "a4", answer: "Bootstrap until you have a paying design partner. Then raise on traction, not deck.", worked: 19, tag: "Startups" },
];

function CommunityPage() {
  const [tab, setTab] = useState<"ask" | "chapters" | "rep">("ask");
  const [qs, setQs] = useState(SEED_QS);
  const [draft, setDraft] = useState("");

  // city chapters
  const chapters = useMemo(() => {
    const map = new Map<string, { city: string; members: typeof ALUMNI }>();
    ALUMNI.forEach((a) => {
      const key = a.city as string;
      const cur = map.get(key);
      if (cur) cur.members.push(a);
      else map.set(key, { city: key, members: [a] });
    });
    return Array.from(map.values()).sort((a, b) => b.members.length - a.members.length);
  }, []);

  // reputation by impact
  const rep = useMemo(() => {
    return ALUMNI.map((a) => {
      const referrals = a.id === "a2" ? 18 : a.id === "a1" ? 14 : a.id === "a4" ? 9 : 5;
      const answers = a.id === "a1" ? 22 : a.id === "a3" ? 17 : 8;
      const guided = a.id === "a6" ? 12 : a.id === "a5" ? 7 : 4;
      const score = referrals * 5 + answers * 2 + guided * 4;
      return { a, referrals, answers, guided, score };
    }).sort((x, y) => y.score - x.score);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Community</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Real people. Real outcomes.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Ask verified alumni, organize by city, and rank by impact — referrals, accepted answers, successful guidance.
          </p>
        </motion.div>

        <div className="mt-8 inline-flex rounded-full border border-border bg-surface-2 p-1">
          {[
            { k: "ask", label: "Ask Alumni" },
            { k: "chapters", label: "City Chapters" },
            { k: "rep", label: "Reputation" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as typeof tab)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                tab === t.k ? "bg-gradient-emerald text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "ask" && (
          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className="border-border/60 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-xl">
                  <MessageSquare className="h-5 w-5 text-primary" /> Ask a question
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Be specific. e.g. 'How do I prep for a Stripe backend interview in 8 weeks as a 3rd-year ECE student?'"
                  rows={5}
                />
                <Button
                  className="w-full bg-gradient-emerald text-primary-foreground"
                  onClick={() => {
                    if (!draft.trim()) return;
                    setQs([{ id: `q${Date.now()}`, q: draft.trim(), alumniId: ALUMNI[0].id, answer: "Pending alumni response — typically answered within 36 hours.", worked: 0, tag: "Just posted" }, ...qs]);
                    setDraft("");
                  }}
                >
                  Post to alumni
                </Button>
                <p className="text-xs text-muted-foreground">Posts go to verified alumni from your branch first.</p>
              </CardContent>
            </Card>

            <div className="space-y-4 lg:col-span-2">
              {qs.map((q, i) => {
                const al = ALUMNI.find((a) => a.id === q.alumniId);
                return (
                  <motion.div key={q.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <Card className="border-border/60">
                      <CardContent className="space-y-3 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-lg leading-snug">{q.q}</h3>
                          <Badge className="shrink-0 bg-surface-2 text-muted-foreground">{q.tag}</Badge>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-surface-2/40 p-4">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-emerald text-[10px] font-semibold text-primary-foreground">
                              {al?.avatar}
                            </div>
                            <span className="text-foreground">{al?.name}</span>
                            <span>· {al?.currentRole} @ {al?.currentCompany}</span>
                          </div>
                          <p className="mt-2 text-sm">{q.answer}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setQs(qs.map((x) => x.id === q.id ? { ...x, worked: x.worked + 1 } : x))}
                            className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs text-success hover:bg-success/25"
                          >
                            <ThumbsUp className="h-3.5 w-3.5" /> Worked for me · {q.worked}
                          </button>
                          <span className="text-xs text-muted-foreground">Verified alumni answer</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {tab === "chapters" && (
          <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch, i) => (
              <motion.div key={ch.city} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="h-full border-border/60">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {CITIES[ch.city as keyof typeof CITIES]?.name ?? ch.city} Chapter
                      </span>
                      <Badge className="bg-gradient-gold text-gold-foreground">{ch.members.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {ch.members.slice(0, 5).map((m) => (
                        <span key={m.id} className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-[10px] font-semibold">
                          {m.avatar}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Local meetups, hyper-local job leads, and weekend mentor walks.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Join chapter</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </section>
        )}

        {tab === "rep" && (
          <section className="mt-10">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-xl">
                  <Trophy className="h-5 w-5 text-gold" /> Reputation by impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 border-b border-border/60 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Member</div>
                  <div className="col-span-2 text-right">Referrals</div>
                  <div className="col-span-2 text-right">Answers</div>
                  <div className="col-span-2 text-right">Score</div>
                </div>
                {rep.map((r, i) => (
                  <div key={r.a.id} className="grid grid-cols-12 items-center border-b border-border/40 py-3 text-sm">
                    <div className="col-span-1 font-display text-lg text-muted-foreground">{i + 1}</div>
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-emerald text-xs font-semibold text-primary-foreground">{r.a.avatar}</div>
                      <div>
                        <div className="font-medium">{r.a.name}</div>
                        <div className="text-xs text-muted-foreground">{r.a.currentRole} @ {r.a.currentCompany}</div>
                      </div>
                    </div>
                    <div className="col-span-2 text-right">{r.referrals}</div>
                    <div className="col-span-2 text-right">{r.answers}</div>
                    <div className="col-span-2 text-right font-display text-lg text-gold">{r.score}</div>
                  </div>
                ))}
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  Score = referrals × 5 + accepted answers × 2 + guided students × 4. Likes do not count.
                </p>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
