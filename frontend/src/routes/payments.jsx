import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { payments } from "@/lib/mock-data";
import { Pill } from "@/components/ui/Pill";
import { CreditCard, Banknote, Building2, Plus } from "lucide-react";

export const Route = createFileRoute("/payments")({
  head: () => ({ meta: [{ title: "Payments — FieldForce Pro" }] }),
  component: Pay,
});

const methodIcon = {
  "Bank Transfer": Building2,
  "Credit Card": CreditCard,
  ACH: Banknote,
};

function Pay() {
  const total = payments.reduce((s, p) => s + p.amount, 0);
  return (
    <DashboardLayout title="Payments">
      <PageHeader
        title="Payments"
        subtitle={`₹${total.toLocaleString(undefined, { maximumFractionDigits: 2 })} received across ${payments.length} transactions`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Record payment
          </button>
        }
      />

      <div className="glass-panel overflow-x-auto rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3 font-medium">Transaction</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Invoice</th>
              <th className="px-4 py-3 font-medium">Method</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => {
              const Icon = methodIcon[p.method] || CreditCard;
              return (
                <tr
                  key={p.id}
                  className="animate-enter border-b border-border/50 hover:bg-white/[0.02]"
                  style={{ animationDelay: `₹{i * 30}ms` }}
                >
                  <td className="px-4 py-3 font-mono text-xs font-semibold">{p.id}</td>
                  <td className="px-4 py-3 text-sm">{p.customer}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                    {p.invoice}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" /> {p.method}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{p.date}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-accent">
                    +₹{p.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <Pill
                      className={
                        p.status === "Completed"
                          ? "text-accent bg-accent/10 ring-accent/20"
                          : "text-warning bg-warning/10 ring-warning/20"
                      }
                    >
                      {p.status}
                    </Pill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
