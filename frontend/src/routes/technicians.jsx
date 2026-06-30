import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { technicians } from "@/lib/mock-data";
import { Plus, Star, Briefcase } from "lucide-react";

export const Route = createFileRoute("/technicians")({
  head: () => ({ meta: [{ title: "Technicians — FieldForce Pro" }] }),
  component: Techs,
});

const statusDot = {
  "On Job": "bg-accent shadow-[0_0_8px_hsl(150_80%_50%)]",
  Available: "bg-primary shadow-[0_0_8px_hsl(190_90%_60%)]",
  Break: "bg-warning",
};

function Techs() {
  return (
    <DashboardLayout title="Technicians">
      <PageHeader
        title="Technicians"
        subtitle={`${technicians.length} technicians • avg ${(technicians.reduce((s, t) => s + t.rating, 0) / technicians.length).toFixed(2)}★ rating`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Add technician
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {technicians.map((t, i) => (
          <div
            key={t.id}
            className="glass-panel group animate-enter rounded-2xl p-5 transition hover:border-primary/30"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 font-mono text-sm font-bold text-primary">
                    {t.avatar}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-background ${statusDot[t.status]}`}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {t.id} • {t.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-warning/10 px-1.5 py-0.5 ring-1 ring-warning/20">
                <Star className="h-2.5 w-2.5 fill-warning text-warning" />
                <span className="font-mono text-[10px] font-bold text-warning">{t.rating}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1">
              {t.skills.map((s) => (
                <span
                  key={s}
                  className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground ring-1 ring-border"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Workload</span>
                <span className="font-mono">{t.load}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${t.load > 80 ? "bg-warning" : "bg-gradient-to-r from-primary to-accent"}`}
                  style={{ width: `${t.load}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Briefcase className="h-2.5 w-2.5" /> {t.jobs} jobs
              </span>
              <span
                className={`font-mono ${t.status === "On Job" ? "text-accent" : t.status === "Available" ? "text-primary" : "text-warning"}`}
              >
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
