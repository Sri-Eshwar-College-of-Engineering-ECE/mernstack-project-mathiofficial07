import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { jobs, statusColors, priorityColors } from "@/lib/mock-data";
import { Pill } from "@/components/ui/Pill";
import { Search, Plus, LayoutGrid, List } from "lucide-react";

export const Route = createFileRoute("/jobs")({
  head: () => ({ meta: [{ title: "Jobs — FieldForce Pro" }] }),
  component: Jobs,
});

const statuses = ["Pending", "Assigned", "In Progress", "Completed", "Cancelled"];

function Jobs() {
  const [view, setView] = useState("board");
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      jobs.filter((j) =>
        (j.title + j.customer + j.technician + j.id).toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );
  const byStatus = useMemo(() => {
    const map = { Pending: [], Assigned: [], "In Progress": [], Completed: [], Cancelled: [] };
    filtered.forEach((j) => map[j.status].push(j));
    return map;
  }, [filtered]);

  return (
    <DashboardLayout title="Jobs">
      <PageHeader
        title="Service Jobs"
        subtitle={`${filtered.length} jobs • ${byStatus["In Progress"].length} live • ${byStatus.Pending.length} pending`}
        actions={
          <>
            <div className="flex rounded-lg border border-border p-0.5">
              <button
                onClick={() => setView("board")}
                className={`rounded-md px-2 py-1.5 ${view === "board" ? "bg-white/10 text-primary" : "text-muted-foreground"}`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`rounded-md px-2 py-1.5 ${view === "list" ? "bg-white/10 text-primary" : "text-muted-foreground"}`}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
              <Plus className="h-3.5 w-3.5" /> New job
            </button>
          </>
        }
      />

      <div className="mb-6 flex items-center gap-2 rounded-lg border border-border bg-input px-3 py-2">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search jobs by id, customer, technician…"
          className="w-full bg-transparent text-xs outline-none"
        />
      </div>

      {view === "board" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {statuses.map((s, idx) => (
            <div
              key={s}
              className="glass-panel animate-enter rounded-2xl p-4"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pill className={statusColors[s]}>{s}</Pill>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {byStatus[s].length}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {byStatus[s].map((j) => (
                  <div
                    key={j.id}
                    className="group cursor-pointer rounded-lg border border-border bg-white/[0.02] p-3 transition hover:border-primary/30 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-primary">#{j.id}</span>
                      <Pill className={priorityColors[j.priority]}>{j.priority}</Pill>
                    </div>
                    <p className="mt-2 text-xs font-semibold leading-tight group-hover:text-primary">
                      {j.title}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{j.customer}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[10px] text-muted-foreground">
                      <span>{j.technician}</span>
                      <span className="font-mono">₹{j.amount}</span>
                    </div>
                  </div>
                ))}
                {byStatus[s].length === 0 && (
                  <p className="py-6 text-center text-[10px] text-muted-foreground">No jobs</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel overflow-x-auto rounded-2xl">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Technician</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Scheduled</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((j, i) => (
                <tr
                  key={j.id}
                  className="animate-enter border-b border-border/50 hover:bg-white/[0.02]"
                  style={{ animationDelay: `${i * 20}ms` }}
                >
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">#{j.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{j.title}</td>
                  <td className="px-4 py-3 text-xs">{j.customer}</td>
                  <td className="px-4 py-3 text-xs">{j.technician}</td>
                  <td className="px-4 py-3">
                    <Pill className={priorityColors[j.priority]}>{j.priority}</Pill>
                  </td>
                  <td className="px-4 py-3">
                    <Pill className={statusColors[j.status]}>{j.status}</Pill>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{j.scheduled}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs font-semibold">
                    ₹{j.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
