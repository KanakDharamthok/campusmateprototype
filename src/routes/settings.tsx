import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — CampusMate" }] }),
  component: () => (
    <RequireAuth feature="Settings">
      <SettingsPage />
    </RequireAuth>
  ),
});

function SettingsPage() {
  const { user, profile, signOut } = useAuth();
  const [name, setName] = useState(profile?.full_name ?? "");
  const [role, setRole] = useState<"student" | "alumni">(profile?.role ?? "student");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: name, role, updated_at: new Date().toISOString() })
      .eq("id", user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile updated");
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-12 md:px-8">
        <h1 className="font-display text-3xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your CampusMate profile.
        </p>

        <div className="mt-8 space-y-6 rounded-2xl border border-border/60 bg-card p-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email ?? ""} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fn">Full name</Label>
            <Input id="fn" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="r">Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as "student" | "alumni")}>
              <SelectTrigger id="r">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
