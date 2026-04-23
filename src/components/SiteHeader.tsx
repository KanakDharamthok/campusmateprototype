import { Link, useLocation } from "@tanstack/react-router";
import { Compass } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/journey-map", label: "Journey Map" },
  { to: "/heatmap", label: "Opportunity Heatmap" },
  { to: "/career-gps", label: "Career GPS" },
  { to: "/referrals", label: "Referrals" },
  { to: "/office-hours", label: "Office Hours" },
] as const;

export function SiteHeader() {
  const loc = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-emerald shadow-glow">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold">Campus Mitra</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Alumni × Students</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = loc.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          to="/career-gps"
          className="rounded-full bg-gradient-gold px-4 py-2 text-sm font-medium text-gold-foreground shadow-gold transition-transform hover:scale-105"
        >
          Get Your GPS
        </Link>
      </div>
    </header>
  );
}
