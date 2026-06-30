import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { jobs, priorityColors } from "@/lib/mock-data";
import { Pill } from "@/components/ui/Pill";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar — FieldForce Pro" }] }),
  component: Cal,
});

function Cal() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // 35 day grid for October
  const dates = Array.from({ length: 35 }, (_, i) => i - 1); // -1..33, treat 1..31 as October
  const today = 24;
  return (
    <DashboardLayout title="Calendar">
      <PageHeader
        title="Schedule"
        subtitle="October 2024 — drag jobs to reschedule"
        actions={
          <>
            <div className="flex items-center gap-1 rounded-lg border border-border">
              <button className="grid size-8 place-items-center hover:bg-white/5">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="px-2 text-xs font-medium">October 2024</span>
              <button className="grid size-8 place-items-center hover:bg-white/5">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
              <Plus className="h-3.5 w-3.5" /> New event
            </button>
          </>
        }
      />

      <div className="glass-panel overflow-hidden rounded-2xl">
        <div className="grid grid-cols-7 border-b border-border bg-white/[0.02]">
          {daysOfWeek.map((d) => (
            <div
              key={d}
              className="p-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {dates.map((d, idx) => {
            const valid = d >= 1 && d <= 31;
            const isToday = d === today;
            const dayJobs = valid
              ? jobs.slice(d % jobs.length, (d % jobs.length) + (d % 3 === 0 ? 2 : 1))
              : [];
            return (
              <div
                key={idx}
                className={`min-h-[110px] border-b border-r border-border/50 p-2 transition hover:bg-white/[0.03] ${!valid ? "opacity-30" : ""} ${isToday ? "bg-primary/5 ring-1 ring-inset ring-primary/30" : ""}`}
              >
                <div
                  className={`mb-1 font-mono text-[10px] ${isToday ? "font-bold text-primary" : "text-muted-foreground"}`}
                >
                  {valid ? d : ""}
                </div>
                <div className="space-y-1">
                  {dayJobs.map((j) => (
                    <div
                      key={`${d}-${j.id}`}
                      className="cursor-pointer truncate rounded border border-border bg-white/[0.04] px-1.5 py-1 text-[10px] hover:border-primary/40"
                    >
                      <Pill className={`${priorityColors[j.priority]} !px-1 !text-[8px]`}>
                        {j.priority[0]}
                      </Pill>{" "}
                      <span className="ml-1 font-medium">{j.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
