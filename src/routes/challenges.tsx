import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Flame, Users, CheckCircle2, Lightbulb } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ALUMNI } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/challenges")({
  head: () => ({
    meta: [
      { title: "Micro-Mentorship Challenges & Hidden Alerts — CampusMate" },
      { name: "description", content: "7 and 14-day alumni-led cohorts: resume, DSA, interviews. Plus hidden opportunity alerts for verified members." },
      { property: "og:title", content: "Micro-Mentorship Challenges — CampusMate" },
      { property: "og:description", content: "Cohort-based challenges led by alumni." },
    ],
  }),
  component: ChallengesPage,
});

const CHALLENGES = [
  { id: "c1", title: "7-Day Resume Sprint", days: 7, mentor: "a2", cohort: 142, joined: 87, theme: "Career", progress: 0 },
  { id: "c2", title: "14-Day DSA Foundations", days: 14, mentor: "a1", cohort: 320, joined: 218, theme: "Engineering", progress: 0 },
  { id: "c3", title: "7-Day PM Case Study Bootcamp", days: 7, mentor: "a2", cohort: 88, joined: 54, theme: "Product", progress: 0 },
  { id: "c4", title: "14-Day System Design Crash", days: 14, mentor: "a6", cohort: 175, joined: 112, theme: "Engineering", progress: 0 },
  { id: "c5", title: "7-Day Founder Storytelling", days: 7, mentor: "a4", cohort: 64, joined: 41, theme: "Startups", progress: 0 },
  { id: "c6", title: "14-Day MLE Portfolio Push", days: 14, mentor: "a3", cohort: 92, joined: 60, theme: "Data", progress: 0 },
];

const HIDDEN_ALERTS = [
  { id: "h1", role: "Founding Engineer", company: "Stealth (ex-Razorpay)", whisper: "Shared in Bengaluru chapter only. 4 referral seats." },
  { id: "h2", role: "Research Intern", company: "AI4Bharat", whisper: "Posted by a3 to MLE cohort. Closes in 5 days." },
  { id: "h3", role: "Product Designer", company: "CRED Garage", whisper: "Internal alumni board. Apply via DM." },
];

function ChallengesPage() {
  const [joined, setJoined] = useState<Record<string, number>>({});

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Cohorts</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Show up for 7 days. Change the next 7 years.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Alumni-led micro-cohorts with daily prompts, group accountability, and a finish badge that actually means something.
          </p>
        </motion.div>

        <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((c, i) => {
            const mentor = ALUMNI.find((a) => a.id === c.mentor);
            const myProgress = joined[c.id] ?? 0;
            const isJoined = myProgress > 0;
            return (
              <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="h-full border-border/60">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="font-display text-lg leading-snug">{c.title}</CardTitle>
                      <Badge className="shrink-0 bg-gradient-gold text-gold-foreground">{c.days}d</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.theme} · led by {mentor?.name}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      {c.joined}/{c.cohort} students enrolled this cohort
                    </div>

                    {isJoined ? (
                      <>
                        <div>
                          <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                            <span>Day {myProgress} of {c.days}</span>
                            <span>{Math.round((myProgress / c.days) * 100)}%</span>
                          </div>
                          <Progress value={(myProgress / c.days) * 100} />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-emerald text-primary-foreground"
                            onClick={() => setJoined({ ...joined, [c.id]: Math.min(c.days, myProgress + 1) })}
                          >
                            <CheckCircle2 className="h-4 w-4" /> Mark today done
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full bg-gradient-emerald text-primary-foreground"
                        onClick={() => setJoined({ ...joined, [c.id]: 1 })}
                      >
                        <Flame className="h-4 w-4" /> Join cohort
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </section>

        <section className="mt-16">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-gold" />
            <h2 className="font-display text-2xl">Hidden opportunity alerts</h2>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">
            Niche roles shared only inside verified communities. Quiet listings, high signal.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {HIDDEN_ALERTS.map((h, i) => (
              <motion.div key={h.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-border/60 bg-surface/60">
                  <CardContent className="p-5">
                    <Badge className="bg-gold/15 text-gold">Whisper</Badge>
                    <h3 className="mt-3 font-display text-lg">{h.role}</h3>
                    <p className="text-xs text-muted-foreground">{h.company}</p>
                    <p className="mt-3 text-sm">{h.whisper}</p>
                    <Button size="sm" variant="outline" className="mt-4 w-full">Request access</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
