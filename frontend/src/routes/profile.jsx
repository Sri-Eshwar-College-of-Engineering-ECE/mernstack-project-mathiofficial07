import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Shield, Award, Briefcase } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — FieldForce Pro" }] }),
  component: Prof,
});

function Prof() {
  return (
    <DashboardLayout title="Profile">
      <PageHeader
        title="Your profile"
        subtitle="Personal information, role, and account preferences"
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="glass-panel relative overflow-hidden rounded-2xl p-6">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-primary/30 via-accent/15 to-transparent" />
          <div className="relative">
            <div className="grid size-20 place-items-center rounded-2xl bg-background ring-4 ring-background">
              <div className="grid size-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent font-mono text-2xl font-bold text-background">
                ET
              </div>
            </div>
            <h2 className="mt-4 text-xl font-bold">Elias Thorne</h2>
            <p className="text-xs text-muted-foreground">
              Senior Dispatcher • FieldForce Operations
            </p>
            <div className="mt-4 inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary ring-1 ring-primary/20">
              <Shield className="h-2.5 w-2.5" /> Admin
            </div>

            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-3 w-3" /> elias@fieldforce.pro
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3 w-3" /> +1 (415) 555-0190
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3 w-3" /> San Francisco, CA
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
              <Stat icon={Briefcase} label="Jobs" value="1,284" />
              <Stat icon={Award} label="Rating" value="4.9" />
              <Stat icon={Shield} label="Tenure" value="3y" />
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-bold tracking-tight">Personal information</h3>
          <p className="mt-1 text-xs text-muted-foreground">Update your name and contact details</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Profile updated");
            }}
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Field label="First name" defaultValue="Elias" />
            <Field label="Last name" defaultValue="Thorne" />
            <Field label="Email" type="email" defaultValue="elias@fieldforce.pro" />
            <Field label="Phone" defaultValue="+1 (415) 555-0190" />
            <Field label="Role" defaultValue="Senior Dispatcher" />
            <Field label="Location" defaultValue="San Francisco, CA" />
            <div className="sm:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Bio
              </label>
              <textarea
                rows={3}
                defaultValue="Senior dispatch coordinator with 12 years scheduling field service teams across the Bay Area."
                className="mt-1.5 w-full resize-none rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex justify-end gap-2 sm:col-span-2">
              <button
                type="button"
                className="rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-white/5"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-border bg-white/[0.02] p-2">
      <Icon className="mx-auto h-3 w-3 text-muted-foreground" />
      <p className="mt-1 font-mono text-sm font-bold">{value}</p>
      <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        {...rest}
        className="mt-1.5 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
