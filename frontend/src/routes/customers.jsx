import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashboardLayout, PageHeader } from "@/components/layout/DashboardLayout";
import { customers } from "@/lib/mock-data";
import { Search, Plus, Filter, MoreHorizontal, MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/customers")({
  head: () => ({ meta: [{ title: "Customers — FieldForce Pro" }] }),
  component: Customers,
});

function Customers() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const list = useMemo(
    () =>
      customers.filter(
        (c) =>
          (type === "All" || c.type === type) &&
          (c.name + c.email + c.address).toLowerCase().includes(q.toLowerCase()),
      ),
    [q, type],
  );
  return (
    <DashboardLayout title="Customers">
      <PageHeader
        title="Customers"
        subtitle={`${customers.length} accounts • ₹${customers.reduce((s, c) => s + c.spent, 0).toLocaleString()} lifetime revenue`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Add customer
          </button>
        }
      />

      <div className="glass-panel rounded-2xl">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-input px-3 py-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search customers, emails, addresses…"
              className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            {["All", "Residential", "Commercial", "Property Mgmt"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-lg px-3 py-2 text-[11px] font-medium transition ${type === t ? "bg-primary/10 text-primary ring-1 ring-primary/20" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
            <button className="grid size-9 place-items-center rounded-lg border border-border hover:bg-white/5">
              <Filter className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Address</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 text-right font-medium">Jobs</th>
                <th className="px-4 py-3 text-right font-medium">Spent</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {list.map((c, i) => (
                <tr
                  key={c.id}
                  className="animate-enter border-b border-border/50 transition hover:bg-white/[0.02]"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-lg bg-primary/15 font-mono text-[10px] font-bold text-primary">
                        {c.name
                          .split(" ")
                          .map((s) => s[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          {c.id} • since {c.since}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3" /> {c.email}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Phone className="h-3 w-3" /> {c.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 shrink-0" /> {c.address}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium ring-1 ring-border">
                      {c.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs">{c.jobs}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs font-semibold">
                    ₹{c.spent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-md p-1.5 hover:bg-white/5">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border p-4 text-xs text-muted-foreground">
          <span>
            Showing {list.length} of {customers.length}
          </span>
          <div className="flex gap-1">
            <button className="rounded border border-border px-2 py-1 hover:bg-white/5">
              Prev
            </button>
            <button className="rounded border border-border bg-white/5 px-2 py-1">1</button>
            <button className="rounded border border-border px-2 py-1 hover:bg-white/5">
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
