import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { MapPin, Coffee, BadgeCheck, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ALUMNI, CITIES } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/mentors")({
  head: () => ({
    meta: [
      { title: "Mentor Near Me — CampusMate" },
      { name: "description", content: "Find alumni mentors in your city or nearby — open for guidance, available for coffee chats and campus visits." },
      { property: "og:title", content: "Mentor Near Me — CampusMate" },
      { property: "og:description", content: "Local alumni mentors available for guidance and meetups." },
    ],
  }),
  component: MentorsPage,
});

const CITY_LIST = Object.keys(CITIES) as (keyof typeof CITIES)[];

// crude proximity by lat-style coords
function distance(a: keyof typeof CITIES, b: keyof typeof CITIES) {
  const A = CITIES[a], B = CITIES[b];
  return Math.hypot(A.x - B.x, A.y - B.y);
}

function MentorsPage() {
  const [myCity, setMyCity] = useState<keyof typeof CITIES>("Jaipur");

  const ranked = useMemo(() => {
    return ALUMNI
      .filter((a) => a.openForGuidance)
      .map((a) => ({ a, d: distance(a.city, myCity) }))
      .sort((x, y) => x.d - y.d);
  }, [myCity]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Mentor Near Me</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Local alumni, real coffee, faster help</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pick your city. We surface alumni who toggled the “Open for guidance” badge — sorted by proximity for in-person meetups.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Your city</span>
          <select
            value={myCity}
            onChange={(e) => setMyCity(e.target.value as keyof typeof CITIES)}
            className="rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-foreground"
          >
            {CITY_LIST.map((c) => (
              <option key={c} value={c}>{CITIES[c].name}</option>
            ))}
          </select>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ranked.map(({ a, d }, i) => {
            const sameCity = a.city === myCity;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="h-full border-border/60">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-emerald text-sm font-semibold text-primary-foreground">
                          {a.avatar}
                        </div>
                        <div>
                          <CardTitle className="text-base">{a.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{a.currentRole} · {a.currentCompany}</p>
                        </div>
                      </div>
                      <Badge className="bg-success/15 text-success">
                        <BadgeCheck className="mr-1 h-3 w-3" /> Open
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {CITIES[a.city].name}
                      {sameCity ? (
                        <Badge className="ml-1 bg-gradient-gold text-gold-foreground">Same city</Badge>
                      ) : (
                        <span className="ml-1 text-[10px] uppercase tracking-widest">~{Math.round(d)} away</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {a.branch} · Batch of {a.batch}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-gradient-emerald text-primary-foreground">
                        <Coffee className="h-4 w-4" /> Coffee chat
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="h-4 w-4" /> DM
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
