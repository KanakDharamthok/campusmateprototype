import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function RequireAuth({
  feature,
  children,
}: {
  feature: string;
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    const redirect =
      typeof window !== "undefined" ? window.location.pathname : "/";
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold">
            Sign in to access {feature}
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            This is a member-only feature. Create a free CampusMate account to
            unlock alumni journeys, referrals, and more.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/auth"
              search={{ mode: "signin", redirect }}
              className="rounded-full border border-border bg-surface-2 px-5 py-2.5 text-sm font-medium hover:bg-surface-3"
            >
              Login
            </Link>
            <Link
              to="/auth"
              search={{ mode: "signup", redirect }}
              className="rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-gold"
            >
              Get Started
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return <>{children}</>;
}
