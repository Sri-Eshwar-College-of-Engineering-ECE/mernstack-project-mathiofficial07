import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { invoices } from "@/lib/mock-data";
import { Pill } from "@/components/ui/Pill";
import { Download, Plus, FileText } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/invoices")({
  head: () => ({ meta: [{ title: "Invoices — FieldForce Pro" }] }),
  component: Inv,
});

const statusStyle = {
  Paid: "text-accent bg-accent/10 ring-accent/20",
  Pending: "text-primary bg-primary/10 ring-primary/20",
  Overdue: "text-destructive bg-destructive/10 ring-destructive/20",
  Partial: "text-warning bg-warning/10 ring-warning/20",
};

function Inv() {
  const totals = invoices.reduce(
    (a, i) => {
      a.total += i.total;
      if (i.status === "Paid") a.paid += i.total;
      else if (i.status === "Overdue") a.overdue += i.total;
      else a.pending += i.total;
      return a;
    },
    { total: 0, paid: 0, pending: 0, overdue: 0 },
  );

  return (
    <DashboardLayout title="Invoices">
      <PageHeader
        title="Invoices"
        subtitle={`${invoices.length} invoices • ₹${totals.total.toLocaleString(undefined, { maximumFractionDigits: 0 })} billed`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> New invoice
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { l: "Total Billed", v: totals.total, c: "text-foreground" },
          { l: "Collected", v: totals.paid, c: "text-accent" },
          { l: "Pending", v: totals.pending, c: "text-primary" },
          { l: "Overdue", v: totals.overdue, c: "text-destructive" },
        ].map((k) => (
          <div key={k.l} className="glass-panel rounded-xl p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {k.l}
            </p>
            <p className={`mt-1 text-xl font-bold ${k.c}`}>
              ₹{k.v.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-panel overflow-x-auto rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3 font-medium">Invoice</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Job</th>
              <th className="px-4 py-3 font-medium">Issued</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((i, idx) => (
              <tr
                key={i.id}
                className="animate-enter border-b border-border/50 hover:bg-white/[0.02]"
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-mono text-xs font-semibold">{i.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{i.customer}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">#{i.job}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{i.issued}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{i.due}</td>
                <td className="px-4 py-3 text-right font-mono text-xs font-semibold">
                  ₹{i.total.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <Pill className={statusStyle[i.status]}>{i.status}</Pill>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => toast.success(`Downloading ${i.id}.pdf`)}
                    className="grid size-7 place-items-center rounded-md hover:bg-white/5"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
