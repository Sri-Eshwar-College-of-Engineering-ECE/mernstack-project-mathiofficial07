import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Briefcase,
  Calendar,
  ClipboardCheck,
  FileText,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  UserCircle,
  LogOut,
  Home,
} from "lucide-react";

const ops = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/jobs", label: "Active Jobs", icon: Briefcase },
  { to: "/technicians", label: "Technicians", icon: Wrench },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
];

const finance = [
  { to: "/invoices", label: "Invoices", icon: FileText },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

const system = [
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/technician", label: "Tech Workspace", icon: Wrench },
  { to: "/portal", label: "Customer Portal", icon: Home },
  { to: "/profile", label: "Profile", icon: UserCircle },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavItem({ to, label, icon: Icon, exact }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
  return (
    <Link
      to={to}
      className={`group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-white/5 text-primary ring-1 ring-white/10"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_2px_hsl(190_90%_60%/0.6)]" />
      )}
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-64 shrink-0 flex-col border-r border-border bg-background/60 backdrop-blur-xl">
      <Link to="/dashboard" className="flex items-center gap-3 p-6">
        <div className="grid size-8 place-items-center rounded bg-primary shadow-[0_0_20px_hsl(190_90%_60%/0.4)]">
          <div className="size-3 rotate-45 border-2 border-background" />
        </div>
        <span className="text-lg font-bold tracking-tight">
          FieldForce <span className="text-primary">Pro</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-4">
        <p className="mb-3 mt-2 px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Operations
        </p>
        {ops.map((i) => (
          <NavItem key={i.to} {...i} />
        ))}

        <p className="mb-3 mt-8 px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Finance
        </p>
        {finance.map((i) => (
          <NavItem key={i.to} {...i} />
        ))}

        <p className="mb-3 mt-8 px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          System
        </p>
        {system.map((i) => (
          <NavItem key={i.to} {...i} />
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2">
          <div className="grid size-8 shrink-0 place-items-center rounded bg-primary/20 font-mono text-xs font-bold text-primary">
            ET
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">Elias Thorne</p>
            <p className="truncate text-[10px] text-muted-foreground">Senior Dispatcher</p>
          </div>
          <Link
            to="/login"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
