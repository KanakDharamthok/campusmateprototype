import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Flame, Compass, Users, Calendar, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorldMap } from "@/components/IndiaMap";
import { ALUMNI, OPPORTUNITIES, STATS } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campus Mitra — Where alumni journeys become student opportunities" },
      { name: "description", content: "Career Journey Map, Opportunity Heatmap, Career GPS, Referral Marketplace, Alumni Office Hours — five signature features built for the next generation." },
      { property: "og:title", content: "Campus Mitra — Where alumni journeys become student opportunities" },
      { property: "og:description", content: "A signature alumni-student platform with five flagship features." },
    ],
  }),
  component: Home,
});

const FEATURES = [
  {
    to: "/journey-map" as const,
    icon: MapPin,
    title: "Career Journey Map",
    desc: "Trace alumni from first job to current city. Click any route, hear the story.",
    accent: "emerald" as const,
  },
  {
    to: "/heatmap" as const,
    icon: Flame,
    title: "Opportunity Heatmap",
    desc: "See where the jobs are. Filter by role and level. Decide where to apply.",
    accent: "gold" as const,
  },
  {
    to: "/career-gps" as const,
    icon: Compass,
    title: "Career GPS",
    desc: "Tell us your skills. We chart the next 3 steps based on real alumni paths.",
    accent: "emerald" as const,
  },
  {
    to: "/referrals" as const,
    icon: Users,
    title: "Referral Marketplace",
    desc: "Alumni post referral-ready roles. Apply with one note. Track status.",
    accent: "gold" as const,
  },
  {
    to: "/office-hours" as const,
    icon: Calendar,
    title: "Alumni Office Hours",
    desc: "Live weekly slots with alumni. Book a seat, ask anything, walk away wiser.",
    accent: "emerald" as const,
  },
];

function Home() {
  // build a few hero map markers from alumni current cities
  const markers = ALUMNI.map((a) => ({
    cityKey: a.city,
    color: a.openForGuidance ? ("emerald" as const) : ("gold" as const),
    label: `${a.name} · ${a.currentCompany}`,
  }));

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="h-3 w-3 text-accent" />
                Built for the next generation of campuses
              </div>
              <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-7xl">
                Alumni journeys, <br />
                <span className="text-gradient-gold">turned into student maps.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Campus Mitra turns scattered alumni stories into living, navigable
                maps — so every student knows where they could go, and how others
                got there.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/career-gps"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-emerald px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                >
                  Plot my career <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/journey-map"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur hover:bg-surface-2"
                >
                  Explore alumni map
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  ["Alumni", STATS.alumni.toLocaleString()],
                  ["Students", STATS.students.toLocaleString()],
                  ["Opportunities", STATS.opportunities.toString()],
                  ["Cities", STATS.cities.toString()],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="font-display text-3xl text-foreground">{value}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <WorldMap
                markers={markers}
                paths={[
                  { from: "Jaipur", to: "Bengaluru", year: 2020 },
                  { from: "Bengaluru", to: "Singapore", year: 2024 },
                  { from: "Bengaluru", to: "London", year: 2024 },
                  { from: "Pune", to: "Berlin", year: 2022 },
                ]}
              />
              <div className="absolute -bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border bg-surface-2/80 px-4 py-3 text-xs text-muted-foreground backdrop-blur">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Open for Guidance
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" /> Senior Alumni
                </span>
                <span className="hidden font-mono sm:inline">+ {OPPORTUNITIES.length} live opportunities</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Five signature features</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Not another LinkedIn. <br />
            <span className="text-muted-foreground">A campus-native compass.</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.to}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={f.to}
                className="group block h-full rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              >
                <div
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    f.accent === "gold" ? "bg-gradient-gold shadow-gold" : "bg-gradient-emerald shadow-glow"
                  }`}
                >
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open feature <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-hero p-10 md:p-14">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="font-display text-3xl md:text-4xl">
                Built so the next batch <br />
                doesn't start from zero.
              </h3>
              <p className="mt-3 max-w-lg text-muted-foreground">
                Every alumni path you publish saves a student a year of guesswork.
                Every office hour is a 60-minute compounding investment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/referrals" className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold">
                Browse referrals
              </Link>
              <Link to="/office-hours" className="rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium backdrop-blur">
                Book office hours
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
