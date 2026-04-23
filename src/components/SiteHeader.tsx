import { Link, useLocation } from "@tanstack/react-router";
import { Compass } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/journey-map", label: "Journey" },
  { to: "/heatmap", label: "Heatmap" },
  { to: "/trends", label: "Trends" },
  { to: "/career-gps", label: "Career GPS" },
  { to: "/mentors", label: "Mentors" },
  { to: "/referrals", label: "Referrals" },
  { to: "/office-hours", label: "Office Hours" },
  { to: "/challenges", label: "Challenges" },
  { to: "/community", label: "Community" },
  { to: "/stories", label: "Stories" },
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
            <div className="font-display text-lg font-semibold">CampusMate</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Alumni × Students</div>
          </div>
        </Link>
        <nav className="hidden max-w-[55%] items-center gap-0.5 overflow-x-auto md:flex">
          {NAV.map((item) => {
            const active = loc.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors ${
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
