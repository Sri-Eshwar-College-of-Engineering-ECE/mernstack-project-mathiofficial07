import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { monthlyTrend, revenueTrend, serviceBreakdown, technicians } from "@/lib/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — FieldForce Pro" }] }),
  component: Reports,
});

const tipStyle = {
  background: "hsl(230 15% 7%)",
  border: "1px solid hsl(230 10% 100% / 0.1)",
  borderRadius: 8,
  fontSize: 12,
};

function Reports() {
  return (
    <DashboardLayout title="Reports">
      <PageHeader
        title="Analytics & Reports"
        subtitle="Live business intelligence across revenue, workforce, and service mix"
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-white/5">
            <Download className="h-3.5 w-3.5" /> Export PDF
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Monthly Revenue" sub="Last 6 months">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyTrend}>
              <CartesianGrid stroke="hsl(230 10% 100% / 0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="hsl(230 10% 60%)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="hsl(230 10% 60%)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tipStyle} />
              <Bar dataKey="revenue" fill="hsl(190 90% 60%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Daily Jobs Completed" sub="This week">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueTrend}>
              <CartesianGrid stroke="hsl(230 10% 100% / 0.05)" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="hsl(230 10% 60%)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="hsl(230 10% 60%)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tipStyle} />
              <Line
                dataKey="jobs"
                stroke="hsl(150 80% 50%)"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(150 80% 50%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Service Mix" sub="By job category">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={serviceBreakdown}
                dataKey="value"
                outerRadius={90}
                stroke="none"
                label={{ fill: "hsl(230 10% 80%)", fontSize: 10 }}
              >
                {serviceBreakdown.map((e) => (
                  <Cell key={e.name} fill={e.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Technician Performance" sub="Jobs completed and rating">
          <div className="space-y-3">
            {technicians.slice(0, 6).map((t) => (
              <div key={t.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{t.name}</p>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${(t.jobs / 220) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{t.jobs} jobs</span>
                <span className="font-mono text-[10px] font-bold text-warning">{t.rating}★</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function Card({ title, sub, children }) {
  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="font-bold tracking-tight">{title}</h3>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      {children}
    </div>
  );
}
