import { cn } from "@/lib/utils";

export function Pill({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1",
        className,
      )}
    >
      {children}
    </span>
  );
}
