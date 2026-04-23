import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Clock, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ALUMNI, OPPORTUNITIES, CITIES } from "@/lib/mockData";

export const Route = createFileRoute("/referrals")({
  head: () => ({
    meta: [
      { title: "Referral Marketplace · Campus Mitra" },
      { name: "description", content: "Alumni post referral-ready opportunities. Apply with a short intent note. Track every referral transparently." },
      { property: "og:title", content: "Referral Marketplace · Campus Mitra" },
      { property: "og:description", content: "Real referrals from real alumni — transparent and trackable." },
    ],
  }),
  component: Referrals,
});

type Status = "open" | "applied" | "shortlisted";

function Referrals() {
  const referralRoles = useMemo(() => OPPORTUNITIES.filter((o) => o.referrer), []);
  const [statuses, setStatuses] = useState<Record<string, Status>>(() =>
    Object.fromEntries(referralRoles.map((o) => [o.id, "open" as Status]))
  );
  const [openId, setOpenId] = useState<string | null>(null);
  const [intent, setIntent] = useState("");

  function apply(id: string) {
    setStatuses((prev) => ({ ...prev, [id]: "applied" }));
    setTimeout(() => {
      setStatuses((prev) => (prev[id] === "applied" ? { ...prev, [id]: "shortlisted" } : prev));
    }, 2400);
    setOpenId(null);
    setIntent("");
  }

  const stats = {
    total: referralRoles.length,
    applied: Object.values(statuses).filter((s) => s !== "open").length,
    shortlisted: Object.values(statuses).filter((s) => s === "shortlisted").length,
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Signature feature · 04</div>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">Referral Marketplace</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Every role here has a verified alumni willing to refer. Send a short
              intent note. Track every step — no black box.
            </p>
          </div>
          <div className="flex gap-3">
            <Stat label="Open referrals" value={stats.total} />
            <Stat label="Applied" value={stats.applied} accent />
            <Stat label="Shortlisted" value={stats.shortlisted} gold />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {referralRoles.map((o, i) => {
            const referrer = ALUMNI.find((a) => a.id === o.referrer)!;
            const status = statuses[o.id];
            return (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{o.company} · {CITIES[o.city].name}</div>
                    <h3 className="mt-1 font-display text-2xl">{o.role}</h3>
                  </div>
                  <span className="rounded-full bg-gradient-gold px-3 py-1 text-xs font-semibold text-gold-foreground">
                    {o.level}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-surface-2/40 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-emerald text-sm font-semibold text-primary-foreground">
                    {referrer.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Referred by</div>
                    <div className="truncate text-sm font-semibold">{referrer.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{referrer.currentRole} @ {referrer.currentCompany}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> Posted {o.postedDays}d ago
                    <span className="mx-2">·</span>
                    <MapPin className="h-3 w-3" /> {CITIES[o.city].name}
                  </div>

                  {status === "open" && (
                    <button
                      onClick={() => setOpenId(o.id)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-emerald px-4 py-1.5 text-xs font-semibold text-primary-foreground"
                    >
                      Apply <Send className="h-3 w-3" />
                    </button>
                  )}
                  {status === "applied" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-semibold text-accent">
                      <Clock className="h-3 w-3 animate-pulse" /> Sent · awaiting review
                    </span>
                  )}
                  {status === "shortlisted" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-xs font-semibold text-success">
                      <CheckCircle2 className="h-3 w-3" /> Shortlisted
                    </span>
                  )}
                </div>

                {/* Intent note dialog */}
                {openId === o.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 overflow-hidden rounded-xl border border-primary/40 bg-surface-2 p-4"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                      Short intent note (≤ 280 chars)
                    </div>
                    <textarea
                      value={intent}
                      onChange={(e) => setIntent(e.target.value.slice(0, 280))}
                      rows={3}
                      placeholder={`Hi ${referrer.name.split(" ")[0]}, I'm a ${referrer.branch} student passionate about ${o.category}…`}
                      className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{intent.length}/280</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setOpenId(null); setIntent(""); }}
                          className="rounded-full border border-border px-3 py-1.5 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => apply(o.id)}
                          disabled={intent.length < 20}
                          className="rounded-full bg-gradient-gold px-4 py-1.5 text-xs font-semibold text-gold-foreground disabled:opacity-50"
                        >
                          Send referral request
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value, accent, gold }: { label: string; value: number; accent?: boolean; gold?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-2.5">
      <div className={`font-display text-2xl ${gold ? "text-gradient-gold" : accent ? "text-accent" : "text-foreground"}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
