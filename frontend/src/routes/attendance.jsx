import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { attendance } from "@/lib/mock-data";
import { Pill } from "@/components/ui/Pill";
import { Clock, MapPin, Camera, CheckCircle2, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/attendance")({
  head: () => ({ meta: [{ title: "Attendance — FieldForce Pro" }] }),
  component: Att,
});

function Att() {
  const [checkedIn, setCheckedIn] = useState(false);
  return (
    <DashboardLayout title="Attendance">
      <PageHeader
        title="Field Tracking"
        subtitle="Real-time technician check-in / out and field updates"
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="glass-panel relative overflow-hidden rounded-2xl p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(190_90%_60%/0.15),transparent_60%)]" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              Your status
            </p>
            <h3 className="mt-1 text-xl font-bold">{checkedIn ? "On the clock" : "Off duty"}</h3>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              Mission District • 8h shift
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-mono text-4xl font-bold text-primary tabular-nums">
                {checkedIn ? "02:14" : "00:00"}
              </span>
              <span className="text-xs text-muted-foreground">elapsed</span>
            </div>

            <button
              onClick={() => {
                setCheckedIn((v) => !v);
                toast.success(checkedIn ? "Checked out" : "Checked in");
              }}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition ${checkedIn ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground shadow-[0_0_24px_hsl(190_90%_60%/0.4)]"} hover:opacity-90`}
            >
              {checkedIn ? (
                <>
                  <LogOut className="h-4 w-4" /> Check out
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> Check in
                </>
              )}
            </button>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-[11px] hover:bg-white/5">
                <Camera className="h-3 w-3" /> Before photo
              </button>
              <button className="flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-[11px] hover:bg-white/5">
                <CheckCircle2 className="h-3 w-3" /> After photo
              </button>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">Today's Field Activity</h3>
            <span className="font-mono text-[10px] text-muted-foreground">Oct 24, 2024</span>
          </div>
          <div className="space-y-2">
            {attendance.map((a, i) => (
              <div
                key={a.id}
                className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border border-border bg-white/[0.02] p-3 transition hover:border-primary/20 animate-enter"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary">
                    {a.tech
                      .split(" ")
                      .map((s) => s[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.tech}</p>
                    <div className="mt-0.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5" /> {a.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" /> in {a.checkIn} / out {a.checkOut}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs">{a.hours}</span>
                  <Pill
                    className={
                      a.status === "Active"
                        ? "text-accent bg-accent/10 ring-accent/20"
                        : a.status === "On Break"
                          ? "text-warning bg-warning/10 ring-warning/20"
                          : "text-muted-foreground bg-muted/40 ring-border"
                    }
                  >
                    {a.status}
                  </Pill>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
