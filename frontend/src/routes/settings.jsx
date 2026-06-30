import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — FieldForce Pro" }] }),
  component: Set,
});

const sections = ["Workspace", "Notifications", "Billing", "Integrations", "Security", "API Keys"];

function Set() {
  const [active, setActive] = useState("Workspace");
  return (
    <DashboardLayout title="Settings">
      <PageHeader
        title="Settings"
        subtitle="Configure your workspace, integrations, and security policies"
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="glass-panel h-fit rounded-2xl p-2">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${active === s ? "bg-white/5 text-primary ring-1 ring-white/10" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
            >
              {s}
            </button>
          ))}
        </aside>
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="font-bold tracking-tight">{active}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage {active.toLowerCase()} preferences for your organization.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Settings saved");
            }}
            className="mt-6 space-y-5"
          >
            <Field label="Organization name" defaultValue="FieldForce Operations" />
            <Field label="Support email" type="email" defaultValue="ops@fieldforce.pro" />
            <Field label="Timezone" defaultValue="America/Los_Angeles" />

            <div className="space-y-3 border-t border-border pt-5">
              <Toggle
                label="Automatic technician assignment"
                sub="Use rule-based engine to assign the best technician on new requests"
                defaultChecked
              />
              <Toggle
                label="Send invoice email reminders"
                sub="Email customers 3 days before due date"
                defaultChecked
              />
              <Toggle
                label="Field photo verification"
                sub="Require before/after photos to mark job complete"
                defaultChecked
              />
              <Toggle
                label="Public customer portal"
                sub="Let customers self-book service requests"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-border pt-4">
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

function Toggle({ label, sub, defaultChecked }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className="flex w-full items-start justify-between gap-4 text-left"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
      <div
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${on ? "bg-primary" : "bg-white/10"}`}
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-background transition ${on ? "left-4" : "left-0.5"}`}
        />
      </div>
    </button>
  );
}
