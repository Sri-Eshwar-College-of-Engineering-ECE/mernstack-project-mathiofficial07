import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { notifications } from "@/lib/mock-data";
import {
  Briefcase,
  CreditCard,
  AlertTriangle,
  Star,
  Settings as SettingsIcon,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — FieldForce Pro" }] }),
  component: Notif,
});

const icons = {
  job: Briefcase,
  payment: CreditCard,
  alert: AlertTriangle,
  rating: Star,
  system: SettingsIcon,
};
const tones = {
  job: "text-primary bg-primary/10 ring-primary/20",
  payment: "text-accent bg-accent/10 ring-accent/20",
  alert: "text-destructive bg-destructive/10 ring-destructive/20",
  rating: "text-warning bg-warning/10 ring-warning/20",
  system: "text-muted-foreground bg-muted/40 ring-border",
};

function Notif() {
  const unread = notifications.filter((n) => n.unread).length;
  return (
    <DashboardLayout title="Notifications">
      <PageHeader
        title="Notifications"
        subtitle={`${unread} unread • all alerts from your operations console`}
        actions={
          <button
            onClick={() => toast.success("All marked as read")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-white/5"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        }
      />

      <div className="glass-panel divide-y divide-border rounded-2xl">
        {notifications.map((n, i) => {
          const Icon = icons[n.type];
          return (
            <div
              key={n.id}
              className={`group flex items-start gap-4 p-4 transition hover:bg-white/[0.02] animate-enter ${n.unread ? "bg-white/[0.015]" : ""}`}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div
                className={`grid size-10 shrink-0 place-items-center rounded-lg ring-1 ${tones[n.type]}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{n.title}</p>
                  {n.unread && (
                    <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(190_90%_60%)]" />
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{n.body}</p>
              </div>
              <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{n.time}</span>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
