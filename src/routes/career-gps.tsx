import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Target, Users, BookOpen, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ALUMNI, SKILL_PATHS, type Opportunity } from "@/lib/mockData";

export const Route = createFileRoute("/career-gps")({
  head: () => ({
    meta: [
      { title: "Career GPS · CampusMate" },
      { name: "description", content: "Tell us your skills, year, and interests. We chart your next 3 career steps based on real alumni journeys." },
      { property: "og:title", content: "Career GPS · CampusMate" },
      { property: "og:description", content: "Personalised career path recommendations from real alumni data." },
    ],
  }),
  component: CareerGPS,
});

const YEARS = ["1st year", "2nd year", "3rd year", "Final year", "Recent grad"];
const INTERESTS: { key: keyof typeof SKILL_PATHS; label: string; tagline: string }[] = [
  { key: "SDE", label: "Software Engineering", tagline: "Build the systems millions use" },
  { key: "Data", label: "Data & ML", tagline: "Find signal in the noise" },
  { key: "Product", label: "Product", tagline: "Decide what gets built" },
  { key: "Core", label: "Core Engineering", tagline: "Hardware, mechanical, embedded" },
  { key: "Design", label: "Design", tagline: "Shape how it feels" },
];
const SKILL_OPTIONS = ["Python", "DSA", "SQL", "Figma", "C++", "ML", "React", "CAD", "Public Speaking", "Writing", "JavaScript", "Go"];

function CareerGPS() {
  const [year, setYear] = useState(YEARS[2]);
  const [interest, setInterest] = useState<keyof typeof SKILL_PATHS>("SDE");
  const [skills, setSkills] = useState<string[]>(["Python", "DSA"]);
  const [submitted, setSubmitted] = useState(false);

  const path = SKILL_PATHS[interest];
  const missingSkills = path.skills.filter((s) => !skills.some((u) => u.toLowerCase().includes(s.toLowerCase().split(" ")[0])));
  const matchPct = Math.min(100, Math.round(((path.skills.length - missingSkills.length) / path.skills.length) * 100) + 30);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Signature feature · 03</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Career GPS</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Your next 3 steps, charted from the paths real alumni walked.
            Not generic advice — patterns from your branch and interest.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <Section label="Where are you?">
              <div className="flex flex-wrap gap-1.5">
                {YEARS.map((y) => (
                  <Chip key={y} active={year === y} onClick={() => setYear(y)}>{y}</Chip>
                ))}
              </div>
            </Section>

            <Section label="What pulls you?">
              <div className="grid gap-2 sm:grid-cols-2">
                {INTERESTS.map((i) => (
                  <button
                    key={i.key}
                    onClick={() => setInterest(i.key)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      interest === i.key
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-border bg-surface-2/40 hover:border-border/80"
                    }`}
                  >
                    <div className="text-sm font-semibold">{i.label}</div>
                    <div className="text-xs text-muted-foreground">{i.tagline}</div>
                  </button>
                ))}
              </div>
            </Section>

            <Section label="Your current skills">
              <div className="flex flex-wrap gap-1.5">
                {SKILL_OPTIONS.map((s) => {
                  const on = skills.includes(s);
                  return (
                    <Chip
                      key={s}
                      active={on}
                      onClick={() => setSkills((prev) => (on ? prev.filter((x) => x !== s) : [...prev, s]))}
                    >
                      {s}
                    </Chip>
                  );
                })}
              </div>
            </Section>

            <button
              onClick={() => setSubmitted(true)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-emerald px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              <Compass className="h-4 w-4" /> Plot my path
            </button>
          </div>

          {/* Result */}
          <div className="space-y-4">
            {(submitted || skills.length > 0) ? (
              <>
                <motion.div
                  key={interest + skills.join("-")}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-primary/40 bg-gradient-hero p-6 shadow-glow"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                    <Sparkles className="h-3 w-3" /> Match for {interest}
                  </div>
                  <div className="mt-3 flex items-end gap-3">
                    <div className="font-display text-6xl text-gradient-gold">{matchPct}%</div>
                    <div className="pb-2 text-sm text-muted-foreground">
                      Based on alumni in your branch with similar starting skills.
                    </div>
                  </div>
                </motion.div>

                <ResultCard icon={Target} title="Your next 3 roles">
                  <ol className="space-y-3">
                    {path.nextRoles.map((r, i) => (
                      <li key={r} className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-mono text-xs text-gold-foreground">
                          {i + 1}
                        </span>
                        <div>
                          <div className="text-sm font-semibold">{r}</div>
                          <div className="text-xs text-muted-foreground">
                            Typical horizon: {i === 0 ? "0–6 months" : i === 1 ? "1–2 years" : "3–5 years"}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </ResultCard>

                <ResultCard icon={BookOpen} title="Skills to close the gap">
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((s) => {
                      const have = !missingSkills.includes(s);
                      return (
                        <span
                          key={s}
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            have
                              ? "bg-success/15 text-success"
                              : "bg-accent/15 text-accent"
                          }`}
                        >
                          {have ? "✓" : "+"} {s}
                        </span>
                      );
                    })}
                  </div>
                </ResultCard>

                <ResultCard icon={Users} title="Mentors who walked this path">
                  <div className="space-y-2">
                    {path.mentors.map((mid) => {
                      const m = ALUMNI.find((a) => a.id === mid);
                      if (!m) return null;
                      return (
                        <div key={mid} className="flex items-center gap-3 rounded-lg border border-border bg-surface-2/40 p-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-emerald text-sm font-semibold text-primary-foreground">
                            {m.avatar}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold">{m.name}</div>
                            <div className="truncate text-xs text-muted-foreground">{m.currentRole} @ {m.currentCompany}</div>
                          </div>
                          {m.openForGuidance && (
                            <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                              Available
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ResultCard>

                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  See similar alumni journeys <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-12 text-center text-muted-foreground">
                Pick a few skills to plot your path.
              </div>
            )}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-surface-2/40 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function ResultCard({ icon: Icon, title, children }: { icon: typeof Compass; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-surface p-6"
    >
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
        <Icon className="h-3 w-3" /> {title}
      </div>
      {children}
    </motion.div>
  );
}

// satisfy ts unused import warning when building
export type _Op = Opportunity;
