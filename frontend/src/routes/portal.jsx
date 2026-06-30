import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { invoices, jobs, statusColors } from "@/lib/mock-data";
import { Pill } from "@/components/ui/Pill";
import { Plus, Star, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/portal")({
  head: () => ({ meta: [{ title: "Customer Portal — FieldForce Pro" }] }),
  component: Portal,
});

function Portal() {
  const [rating, setRating] = useState(5);
  return (
    <DashboardLayout title="Customer Portal">
      <PageHeader
        title="Welcome back, Sarah"
        subtitle="Manage your service requests, invoices, and feedback"
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> New service request
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <h3 className="mb-4 font-bold">Your service history</h3>
          <div className="space-y-2">
            {jobs
              .filter((j) => j.customer === "Sarah Jenkins")
              .map((j, i) => (
                <div
                  key={j.id}
                  className="flex items-center gap-4 rounded-lg border border-border bg-white/[0.02] p-3 animate-enter"
                  style={{ animationDelay: `₹{i * 60}ms` }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-primary">#{j.id}</span>
                      <Pill className={statusColors[j.status]}>{j.status}</Pill>
                    </div>
                    <p className="mt-1 text-sm font-semibold">{j.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {j.technician} • {j.scheduled}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold">₹{j.amount}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="mb-4 font-bold">Rate your last service</h3>
            <p className="text-xs text-muted-foreground">AC Compressor Replacement • Marcus Chen</p>
            <div className="mt-4 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 ${n <= rating ? "fill-warning text-warning" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
            <textarea
              rows={3}
              placeholder="Leave a comment for our team…"
              className="mt-4 w-full resize-none rounded-lg border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => toast.success("Thanks for your feedback!")}
              className="mt-2 w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              Submit review
            </button>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <h3 className="mb-4 font-bold">Recent invoices</h3>
            <div className="space-y-2">
              {invoices.slice(0, 3).map((i) => (
                <div
                  key={i.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-white/[0.02] p-3"
                >
                  <div>
                    <p className="font-mono text-xs font-semibold">{i.id}</p>
                    <p className="text-[10px] text-muted-foreground">{i.issued}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold">₹{i.total.toFixed(2)}</span>
                    <button className="grid size-7 place-items-center rounded-md hover:bg-white/5">
                      <Download className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
