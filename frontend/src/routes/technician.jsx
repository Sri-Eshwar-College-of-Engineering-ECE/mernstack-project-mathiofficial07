import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  CheckCircle2,
  Camera,
  FileSignature,
  Phone,
  ChevronRight,
  Navigation,
  Wrench,
  Calendar,
  Activity,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { jobs, statusColors, priorityColors } from "@/lib/mock-data";
import { Pill } from "@/components/ui/Pill";

export const Route = createFileRoute("/technician")({
  head: () => ({ meta: [{ title: "Technician Workspace — FieldForce Pro" }] }),
  component: TechnicianWorkspace,
});

const techJobs = jobs
  .filter((j) => j.technician === "Marcus Chen" || j.technician === "Sarah Miller")
  .slice(0, 6);

function TechnicianWorkspace() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [activeId, setActiveId] = useState(techJobs[0]?.id);
  const active = techJobs.find((j) => j.id === activeId);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="grid size-9 place-items-center rounded-full bg-primary/20 font-mono text-xs font-bold text-primary">
              MC
            </div>
            <div>
              <p className="text-sm font-semibold">Marcus Chen</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Senior HVAC Tech
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setCheckedIn((v) => !v);
              toast.success(
                checkedIn ? "Checked out · shift logged" : "Checked in · Mission District",
              );
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              checkedIn
                ? "bg-accent/20 text-accent ring-1 ring-accent/30"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${checkedIn ? "bg-accent shadow-[0_0_6px_hsl(150_80%_50%)] animate-[pulse-glow_2s_infinite]" : "bg-primary-foreground"}`}
            />
            {checkedIn ? "On Duty" : "Check In"}
          </button>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Today summary */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Today's Jobs", value: "6", icon: Calendar, accent: "text-primary" },
            { label: "Completed", value: "2", icon: CheckCircle2, accent: "text-accent" },
            { label: "Hours Logged", value: "5.4h", icon: Clock, accent: "text-chart-3" },
            { label: "Avg Rating", value: "4.9★", icon: TrendingUp, accent: "text-warning" },
          ].map((k, i) => (
            <div
              key={k.label}
              className="glass-panel animate-enter rounded-xl p-4"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase text-muted-foreground">{k.label}</p>
                <k.icon className={`h-3.5 w-3.5 ${k.accent}`} />
              </div>
              <p className="mt-2 text-2xl font-bold tracking-tight">{k.value}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Job list */}
          <section
            className="glass-panel animate-enter rounded-2xl p-2"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center justify-between p-4">
              <h2 className="text-sm font-bold tracking-tight">Today's Route</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                6 stops · 38mi
              </span>
            </div>
            <div className="space-y-1 p-2">
              {techJobs.map((j, idx) => {
                const isActive = j.id === activeId;
                return (
                  <button
                    key={j.id}
                    onClick={() => setActiveId(j.id)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      isActive
                        ? "border-primary/40 bg-primary/5"
                        : "border-transparent hover:border-white/5 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`grid size-8 shrink-0 place-items-center rounded-full font-mono text-[10px] font-bold ${isActive ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}
                      >
                        {idx + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold">{j.title}</p>
                          <Pill className={priorityColors[j.priority]}>{j.priority}</Pill>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{j.customer}</p>
                        <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {j.scheduled}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Wrench className="h-3 w-3" />
                            {j.duration}
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform ${isActive ? "translate-x-0.5 text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Active job panel */}
          <section
            className="glass-panel animate-enter rounded-2xl p-6"
            style={{ animationDelay: "400ms" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                #{active.id}
              </span>
              <Pill className={statusColors[active.status]}>{active.status}</Pill>
            </div>
            <h3 className="text-xl font-bold tracking-tight">{active.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{active.customer}</p>

            {/* Map placeholder */}
            <div className="relative mt-5 h-44 overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-primary/10 via-background to-accent/10">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, hsl(190 90% 60% / 0.3) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(190_90%_60%/0.6)]">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg bg-background/80 px-3 py-2 backdrop-blur">
                <div>
                  <p className="text-xs font-medium">1280 Mission St, SF</p>
                  <p className="font-mono text-[10px] text-muted-foreground">12 min · 4.2 mi</p>
                </div>
                <button className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
                  <Navigation className="h-3 w-3" /> Navigate
                </button>
              </div>
            </div>

            {/* Checklist */}
            <div className="mt-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Job Checklist
              </p>
              <div className="space-y-2">
                {[
                  "Verify customer & equipment",
                  "Diagnose compressor fault",
                  "Replace unit + test cycle",
                  "Capture before/after photos",
                  "Collect signature & payment",
                ].map((item, i) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-sm"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={i < 2}
                      className="size-4 accent-primary"
                    />
                    <span className={i < 2 ? "text-muted-foreground line-through" : ""}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <button
                onClick={() => toast("Camera opened")}
                className="flex flex-col items-center gap-1 rounded-lg border border-white/5 bg-white/5 p-3 text-xs transition hover:bg-white/10"
              >
                <Camera className="h-4 w-4 text-primary" /> Photo
              </button>
              <button
                onClick={() => toast("Signature pad")}
                className="flex flex-col items-center gap-1 rounded-lg border border-white/5 bg-white/5 p-3 text-xs transition hover:bg-white/10"
              >
                <FileSignature className="h-4 w-4 text-primary" /> Sign
              </button>
              <button
                onClick={() => toast("Calling customer")}
                className="flex flex-col items-center gap-1 rounded-lg border border-white/5 bg-white/5 p-3 text-xs transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-primary" /> Call
              </button>
            </div>

            <button
              onClick={() => toast.success(`${active.id} marked complete`)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              <CheckCircle2 className="h-4 w-4" /> Complete Job
            </button>
          </section>
        </div>

        {/* Activity log */}
        <section
          className="glass-panel animate-enter mt-6 rounded-2xl p-6"
          style={{ animationDelay: "500ms" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight">Activity Today</h2>
            <Activity className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {[
              { t: "09:15", body: "Started job JF-9918 · Bay Bridge Diner" },
              { t: "10:24", body: "Completed JF-9917 · Drain Cleaning" },
              { t: "11:02", body: "Checked in at Mission District" },
              { t: "07:42", body: "Started shift · vehicle #14" },
            ].map((l) => (
              <div
                key={l.t}
                className="flex items-center gap-4 border-l-2 border-primary/40 pl-3 text-xs"
              >
                <span className="font-mono text-[10px] text-muted-foreground">{l.t}</span>
                <span>{l.body}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
