import { Link, useLocation } from "@tanstack/react-router";
import { Compass, LogOut, Settings as SettingsIcon, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PUBLIC_NAV = [
  { to: "/", label: "Home" },
  { to: "/heatmap", label: "Heatmap" },
  { to: "/trends", label: "Trends" },
  { to: "/career-gps", label: "Career GPS" },
  { to: "/mentors", label: "Mentors" },
  { to: "/office-hours", label: "Office Hours" },
  { to: "/challenges", label: "Challenges" },
  { to: "/community", label: "Community" },
  { to: "/stories", label: "Stories" },
] as const;

const PRIVATE_NAV = [
  { to: "/journey-map", label: "Journey" },
  { to: "/referrals", label: "Referrals" },
] as const;

export function SiteHeader() {
  const loc = useLocation();
  const { user, profile, signOut, loading } = useAuth();

  const nav = user ? [...PUBLIC_NAV, ...PRIVATE_NAV] : PUBLIC_NAV;
  const initials = (profile?.full_name || user?.email || "?")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-emerald shadow-glow">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold">CampusMate</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Alumni × Students
            </div>
          </div>
        </Link>
        <nav className="hidden max-w-[50%] items-center gap-0.5 overflow-x-auto md:flex">
          {nav.map((item) => {
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

        <div className="flex items-center gap-2">
          {loading ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-9 items-center gap-2 rounded-full border border-border/60 bg-surface-2 pl-1 pr-3 text-sm transition-colors hover:bg-surface-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-emerald text-xs font-semibold text-primary-foreground">
                    {initials}
                  </span>
                  <span className="hidden max-w-[120px] truncate sm:inline">
                    {profile?.full_name || user.email}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="text-sm font-medium">{profile?.full_name || "Member"}</div>
                  <div className="text-xs font-normal capitalize text-muted-foreground">
                    {profile?.role ?? "student"} · {user.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/career-gps">
                    <UserIcon className="mr-2 h-4 w-4" /> My GPS
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <SettingsIcon className="mr-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth" search={{ mode: "signin", redirect: loc.pathname }}>
                  Login
                </Link>
              </Button>
              <Link
                to="/auth"
                search={{ mode: "signup", redirect: loc.pathname }}
                className="rounded-full bg-gradient-gold px-4 py-2 text-sm font-medium text-gold-foreground shadow-gold transition-transform hover:scale-105"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
