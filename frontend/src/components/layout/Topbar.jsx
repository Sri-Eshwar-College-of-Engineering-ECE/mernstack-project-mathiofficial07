import { Bell, Search, Command } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Topbar({ title }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        {title && (
          <h1 className="truncate text-sm font-semibold tracking-tight md:text-base">{title}</h1>
        )}
      </div>

      <div className="hidden flex-1 max-w-xl items-center gap-3 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-white/10 sm:flex">
        <Search className="h-3.5 w-3.5" />
        <span>Search jobs, technicians, customers…</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded border border-white/10 bg-black/20 px-1.5 py-0.5 font-mono text-[10px]">
          <Command className="h-2.5 w-2.5" /> K
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden flex-col items-end lg:flex">
          <span className="font-mono text-[10px] uppercase text-accent">System Optimal</span>
          <span className="font-mono text-[10px] text-muted-foreground">Uptime 99.9%</span>
        </div>
        <Link
          to="/notifications"
          className="relative grid size-10 place-items-center rounded-full border border-border hover:bg-white/5"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(190_90%_60%)]" />
        </Link>
      </div>
    </header>
  );
}
