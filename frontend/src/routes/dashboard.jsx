import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Pill } from "@/components/ui/Pill";
import {
  jobs,
  revenueTrend,
  serviceBreakdown,
  statusColors,
  technicians,
  notifications,
} from "@/lib/mock-data";
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  Wrench,
  DollarSign,
  CheckCircle2,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — FieldForce Pro" }] }),
  component: Dashboard,
});

const kpis = [
  {
    label: "Total Revenue",
    value: "₹1.18 Cr",
    delta: "+12.4%",
    deltaPositive: true,
    icon: DollarSign,
    accent: "text-accent",
  },
  {
    label: "Monthly Target",
    value: "₹70.0 L",
    delta: "68% of ₹1.03 Cr",
    deltaPositive: true,
    icon: TrendingUp,
    accent: "text-primary",
    progress: 68,
  },
  {
    label: "Active Techs",
    value: "18",
    suffix: "/22",
    delta: "4 on break",
    icon: Users,
    accent: "text-muted-foreground",
  },
  {
    label: "Pending Invoices",
    value: "₹6.99 L",
    delta: "14 overdue",
    deltaPositive: false,
    icon: Activity,
    accent: "text-warning",
  },
  {
    label: "Completed Today",
    value: "42",
    delta: "98% completion",
    deltaPositive: true,
    icon: CheckCircle2,
    accent: "text-accent",
  },
];

function Dashboard() {
  const liveJobs = jobs
    .filter((j) => j.status === "In Progress" || j.status === "Assigned")
    .slice(0, 5);
  return (
    <DashboardLayout title="Operations Console">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k, idx) => (
          <div
            key={k.label}
            className="glass-panel animate-enter rounded-xl p-5"
            style={{ animationDelay: `${100 + idx * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-tight text-muted-foreground">
                {k.label}
              </p>
              <k.icon className={`h-3.5 w-3.5 ${k.accent}`} />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {k.value}
              {k.suffix && (
                <span className="text-sm font-normal text-muted-foreground">{k.suffix}</span>
              )}
            </p>
            {k.progress != null ? (
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full bg-primary shadow-[0_0_8px_hsl(190_90%_60%/0.6)]"
                  style={{ width: `${k.progress}%` }}
                />
              </div>
            ) : (
              <p
                className={`mt-2 text-[10px] ${k.deltaPositive === false ? "text-warning" : k.deltaPositive ? "text-accent" : "text-muted-foreground"}`}
              >
                {k.delta}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div
          className="glass-panel animate-enter relative overflow-hidden rounded-2xl p-6 lg:col-span-2"
          style={{ animationDelay: "400ms" }}
        >
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Service Revenue Trend</h2>
              <p className="text-xs text-muted-foreground">Aggregated across 14 regional zones</p>
            </div>
            <select className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(190 90% 60%)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(190 90% 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(230 10% 100% / 0.05)" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="hsl(230 10% 60%)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="hsl(230 10% 60%)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(230 15% 7%)",
                    border: "1px solid hsl(230 10% 100% / 0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(190 90% 60%)"
                  strokeWidth={2}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="glass-panel animate-enter flex flex-col rounded-2xl"
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex items-center justify-between border-b border-white/5 p-5">
            <h3 className="font-bold tracking-tight">Live Jobs</h3>
            <span className="size-2 rounded-full bg-accent shadow-[0_0_8px_hsl(150_80%_50%)] animate-[pulse-glow_2s_infinite]" />
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto p-3">
            {liveJobs.map((j) => (
              <div
                key={j.id}
                className="group cursor-pointer rounded-lg border border-transparent p-3 transition-colors hover:border-white/5 hover:bg-white/5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                    #{j.id}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{j.scheduled}</span>
                </div>
                <p className="mb-1 text-sm font-medium transition-colors group-hover:text-primary">
                  {j.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid size-5 place-items-center rounded-full bg-primary/20 font-mono text-[8px] font-bold text-primary">
                      {j.technician
                        .split(" ")
                        .map((s) => s[0])
                        .join("")}
                    </div>
                    <span className="text-xs text-muted-foreground">{j.technician}</span>
                  </div>
                  <Pill className={statusColors[j.status]}>{j.status}</Pill>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div
          className="glass-panel animate-enter rounded-2xl p-6"
          style={{ animationDelay: "600ms" }}
        >
          <h3 className="mb-4 font-bold tracking-tight">Service Mix</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  stroke="none"
                >
                  {serviceBreakdown.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(230 15% 7%)",
                    border: "1px solid hsl(230 10% 100% / 0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="glass-panel animate-enter rounded-2xl p-6"
          style={{ animationDelay: "650ms" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold tracking-tight">Top Technicians</h3>
            <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {technicians.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary">
                  {t.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{t.name}</p>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${t.load}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{t.load}%</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="glass-panel animate-enter rounded-2xl p-6"
          style={{ animationDelay: "700ms" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold tracking-tight">Activity Feed</h3>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-start gap-3 border-l-2 border-primary/40 pl-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">{n.title}</p>
                  <p className="line-clamp-1 text-[11px] text-muted-foreground">{n.body}</p>
                </div>
                <span className="shrink-0 font-mono text-[9px] text-muted-foreground">
                  {n.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
