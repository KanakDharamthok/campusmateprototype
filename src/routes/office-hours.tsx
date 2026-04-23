import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Video, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { OFFICE_HOURS, ALUMNI } from "@/lib/mockData";

export const Route = createFileRoute("/office-hours")({
  head: () => ({
    meta: [
      { title: "Alumni Office Hours · Campus Mitra" },
      { name: "description", content: "Weekly live slots where alumni take student questions. Career switches, higher studies, startups, interview prep." },
      { property: "og:title", content: "Alumni Office Hours · Campus Mitra" },
      { property: "og:description", content: "60 minutes with someone who walked the path before you." },
    ],
  }),
  component: OfficeHours,
});

function OfficeHours() {
  const [booked, setBooked] = useState<Set<string>>(new Set());

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Signature feature · 05</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Alumni Office Hours</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Weekly live slots with verified alumni. Topic-based, time-boxed, and
            booked in 2 clicks. No DMs into the void.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OFFICE_HOURS.map((oh, i) => {
            const a = ALUMNI.find((x) => x.id === oh.alumniId)!;
            const date = new Date(oh.date);
            const isBooked = booked.has(oh.id);
            const slots = isBooked ? oh.slotsLeft - 1 : oh.slotsLeft;
            const fillPct = ((oh.totalSlots - slots) / oh.totalSlots) * 100;
            return (
              <motion.div
                key={oh.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/40"
              >
                {/* host */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-emerald text-sm font-semibold text-primary-foreground">
                    {a.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{a.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.currentRole} @ {a.currentCompany}</div>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-xl leading-tight">{oh.topic}</h3>

                <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    {date.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    {date.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })} · {oh.durationMin} min
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-accent" />
                    {slots} of {oh.totalSlots} seats left
                  </div>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full bg-gradient-gold transition-all" style={{ width: `${fillPct}%` }} />
                </div>

                <div className="mt-5 flex-1" />

                {isBooked ? (
                  <div className="flex items-center justify-between rounded-xl border border-success/30 bg-success/10 p-3">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-success">
                      <CheckCircle2 className="h-4 w-4" /> Seat reserved
                    </span>
                    <a className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                      <Video className="h-3 w-3" /> Join link
                    </a>
                  </div>
                ) : (
                  <button
                    onClick={() => setBooked((prev) => new Set(prev).add(oh.id))}
                    disabled={slots <= 0}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-emerald px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-50"
                  >
                    Book seat
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-center">
          <div className="font-display text-2xl">Are you an alumnus?</div>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Open one 60-minute slot per month. Help 5 students avoid the
            mistakes you made.
          </p>
          <button className="mt-5 rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold">
            Host an office hour
          </button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
