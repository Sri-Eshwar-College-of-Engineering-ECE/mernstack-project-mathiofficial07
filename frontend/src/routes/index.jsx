import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Activity,
  Shield,
  Zap,
  MapPin,
  Cpu,
  Workflow,
  CheckCircle2,
  Users,
  Wrench,
  Building2,
  Star,
  Sparkles,
  Radio,
  Command,
  Navigation,
  Clock,
  IndianRupee,
  CircleDot,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { revenueTrend } from "@/lib/mock-data";
import heroConsole from "@/assets/hero-console.jpg";
import sceneAc from "@/assets/scene-ac.jpg";
import scenePlumb from "@/assets/scene-plumb.jpg";
import sceneElec from "@/assets/scene-elec.jpg";
import sceneDispatch from "@/assets/scene-dispatch.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FieldForce Pro — Field Service Management Platform" },
      {
        name: "description",
        content:
          "The futuristic operations console for AC, plumbing, electrical, cleaning and maintenance teams. Dispatch, track, invoice — all in one place.",
      },
      { property: "og:title", content: "FieldForce Pro" },
      {
        property: "og:description",
        content:
          "Dispatch, track, invoice. A complete operations console for field service businesses.",
      },
      { property: "og:url", content: "/" },
    ],

    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

const features = [
  {
    icon: Workflow,
    title: "Smart Dispatch",
    body: "AI-prioritized job routing assigns the closest qualified technician in seconds.",
  },
  {
    icon: MapPin,
    title: "Live GPS Tracking",
    body: "Real-time technician location with ETA broadcasts to your customers.",
  },
  {
    icon: Cpu,
    title: "Automated Invoicing",
    body: "Auto-generate, send, and reconcile invoices the moment a job closes.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    body: "Granular permissions for admins, managers, technicians, and customers.",
  },
  {
    icon: Activity,
    title: "Operations Console",
    body: "Live KPIs, service mix, revenue trends — your business at a glance.",
  },
  {
    icon: Zap,
    title: "Mobile-First Tech App",
    body: "Field technicians get checklists, photos, signatures, and payments on-site.",
  },
];

const roles = [
  {
    name: "Admin",
    icon: Building2,
    desc: "Full control over operations, finance, and analytics.",
    to: "/dashboard",
    cta: "Open Admin Console",
    accent: "from-primary/30 to-primary/0",
  },
  {
    name: "Technician",
    icon: Wrench,
    desc: "Today's jobs, route, check-in, photos, and completion forms.",
    to: "/technician",
    cta: "Open Tech Workspace",
    accent: "from-accent/30 to-accent/0",
  },
  {
    name: "Customer",
    icon: Users,
    desc: "Book services, track your technician, view invoices.",
    to: "/portal",
    cta: "Open Customer Portal",
    accent: "from-chart-3/30 to-chart-3/0",
  },
];

const plans = [
  {
    name: "Starter",
    price: "₹3,999",
    users: "Up to 5 techs",
    features: ["Job dispatch", "Mobile app", "Basic reports", "Email support"],
    featured: false,
  },
  {
    name: "Growth",
    price: "₹10,999",
    users: "Up to 25 techs",
    features: [
      "Everything in Starter",
      "Live GPS tracking",
      "Automated invoicing",
      "Customer portal",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    users: "Unlimited",
    features: [
      "Everything in Growth",
      "SSO + audit log",
      "Custom integrations",
      "Dedicated CSM",
      "99.99% SLA",
    ],
    featured: false,
  },
];

const testimonials = [
  {
    quote:
      "We cut dispatch time by 62% in the first month. The console feels like mission control.",
    name: "Carla Vasquez",
    role: "Ops Director, Apex HVAC",
    stars: 5,
  },
  {
    quote: "Our technicians actually use the app. That alone paid for it.",
    name: "Devon Brooks",
    role: "Owner, Brooks Plumbing",
    stars: 5,
  },
  {
    quote: "Invoicing went from days to minutes. Cash flow has never been smoother.",
    name: "Mei Tanaka",
    role: "CFO, Northline Services",
    stars: 5,
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid size-8 place-items-center rounded bg-primary shadow-[0_0_20px_hsl(190_90%_60%/0.4)]">
              <div className="size-3 rotate-45 border-2 border-background" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              FieldForce <span className="text-primary">Pro</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#roles" className="transition-colors hover:text-foreground">
              Roles
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#testimonials" className="transition-colors hover:text-foreground">
              Customers
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Start free <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO — asymmetric live ops command surface */}
      <section className="relative overflow-hidden border-b border-border">
        {/* animated grid + ambient blobs */}
        <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-60" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 size-[520px] rounded-full bg-primary/20 blur-[140px]" />
          <div className="absolute -right-20 bottom-0 size-[440px] rounded-full bg-accent/15 blur-[140px]" />
          <div className="absolute right-1/3 top-1/3 size-[260px] rounded-full bg-chart-3/15 blur-[120px]" />
        </div>
        {/* top status rail */}
        <div className="relative border-b border-white/5 bg-background/40 backdrop-blur-md">
          <div className="flex items-center justify-between gap-6 overflow-hidden px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:px-8">
            <div className="flex items-center gap-2">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute inset-0 rounded-full bg-accent blink-anim" />
              </span>
              <span className="text-accent">SYSTEM ONLINE</span>
              <span className="hidden md:inline">
                · Bengaluru ops cluster · 22 techs synced · v4.2.1
              </span>
            </div>
            <div className="hidden items-center gap-5 md:flex">
              <span>
                API <span className="text-foreground">42ms</span>
              </span>
              <span>
                Queue <span className="text-foreground">0</span>
              </span>
              <span>
                Uptime <span className="text-accent">99.99%</span>
              </span>
              <span className="text-primary">⌘K to command</span>
            </div>
          </div>
        </div>

        <div className="relative grid gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — copy + command palette + ticker */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="animate-enter inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Field service, re-engineered</span>
              <span className="mx-1 h-3 w-px bg-white/10" />
              <span className="text-accent">India · Live ops</span>
            </div>

            <h1
              className="animate-enter mt-6 text-[2.5rem] font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              Dispatch in seconds.
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-accent to-chart-3 bg-clip-text text-transparent">
                  Get paid by sundown.
                </span>
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 80 2, 150 7 T 298 6"
                    stroke="url(#hg)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="hg" x1="0" x2="1">
                      <stop offset="0%" stopColor="hsl(190 90% 60%)" />
                      <stop offset="100%" stopColor="hsl(150 80% 50%)" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p
              className="animate-enter mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
              style={{ animationDelay: "220ms" }}
            >
              FieldForce Pro is the mission-control console for AC, plumbing, electrical and
              maintenance crews — AI dispatch, live GPS, instant UPI invoicing, all in one place.
            </p>

            {/* fake command palette */}
            <div
              className="animate-enter glass-panel mt-8 max-w-xl overflow-hidden rounded-xl p-1"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-card/60 px-3 py-2.5">
                <Command className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">›</span>
                <div className="relative h-5 flex-1 overflow-hidden">
                  <div className="ticker-up absolute inset-x-0 top-0 flex flex-col gap-0">
                    {[
                      'dispatch nearest tech to "Indiranagar AC repair"',
                      "send invoice INV-9921 via UPI · ₹4,499",
                      "reschedule JF-7782 — Whitefield · 4:30 PM",
                      "find techs idle > 20m near Koramangala",
                      'dispatch nearest tech to "Indiranagar AC repair"',
                    ].map((t, i) => (
                      <span key={i} className="block h-5 truncate text-sm text-foreground/90">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  ⌘K
                </kbd>
              </div>
              <div className="flex flex-wrap items-center gap-1 px-2 py-2">
                {["Dispatch", "Invoice", "Track GPS", "Reports", "Customers"].map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="animate-enter mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "380ms" }}
            >
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_hsl(190_90%_60%/0.4)] transition hover:opacity-90"
              >
                Launch live demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Create account
              </Link>
              <div className="flex items-center gap-2 pl-2">
                <div className="flex -space-x-2">
                  {["bg-primary", "bg-accent", "bg-chart-3", "bg-chart-4"].map((c) => (
                    <span
                      key={c}
                      className={`size-7 rounded-full border-2 border-background ${c}`}
                    />
                  ))}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  1,240+ teams
                  <br />
                  onboarded this quarter
                </p>
              </div>
            </div>

            {/* trust micro-stats */}
            <div
              className="animate-enter mt-10 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5"
              style={{ animationDelay: "460ms" }}
            >
              {[
                { k: "Dispatch time", v: "↓ 62%", sub: "vs manual" },
                { k: "Tech utilization", v: "↑ 38%", sub: "in 30 days" },
                { k: "Avg payout", v: "< 24h", sub: "UPI settled" },
              ].map((s) => (
                <div key={s.k} className="bg-card/60 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.k}
                  </p>
                  <p className="mt-1 text-xl font-bold tracking-tight text-foreground">{s.v}</p>
                  <p className="font-mono text-[10px] text-accent">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — live dispatch radar + cards */}
          <div className="relative lg:col-span-5 xl:col-span-5">
            <div
              className="animate-enter glass-panel relative overflow-hidden rounded-2xl p-4"
              style={{ animationDelay: "240ms" }}
            >
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              {/* header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-primary" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Live dispatch · Bengaluru
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                  <span className="size-1.5 rounded-full bg-accent blink-anim" /> Live
                </span>
              </div>

              {/* radar */}
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-[360px]">
                {/* rings */}
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border border-primary/15"
                    style={{ inset: `${i * 12}%` }}
                  />
                ))}
                {/* sweep */}
                <div
                  className="sweep-anim absolute inset-0 origin-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, hsl(190 90% 60% / 0.35) 30deg, transparent 60deg)",
                  }}
                />
                {/* crosshair */}
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/5" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/5" />
                {/* center hub */}
                <div className="pulse-ring absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                {/* orbiting techs */}
                {[
                  { r: 70, d: 0, c: "bg-accent", label: "T-04" },
                  { r: 110, d: -6, c: "bg-primary", label: "T-11" },
                  { r: 140, d: -12, c: "bg-chart-3", label: "T-07" },
                ].map((o, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    style={{ ["--r"]: `${o.r}px`, animationDelay: `${o.d}s` }}
                  >
                    <div className="orbit-anim">
                      <div
                        className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full ${o.c} p-1 shadow-lg`}
                      >
                        <Wrench className="h-3 w-3 text-background" />
                        <span className="absolute left-full top-1/2 ml-1 -translate-y-1/2 whitespace-nowrap rounded border border-white/10 bg-card/80 px-1.5 py-0.5 font-mono text-[9px] text-foreground">
                          {o.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* job cards stack */}
              <div className="mt-2 space-y-2">
                {[
                  {
                    id: "JF-9921",
                    t: "AC not cooling",
                    a: "Indiranagar",
                    eta: "12m",
                    tech: "Ravi K.",
                    icon: Navigation,
                    accent: "text-primary",
                  },
                  {
                    id: "JF-9914",
                    t: "Geyser leak",
                    a: "Whitefield",
                    eta: "28m",
                    tech: "Asha M.",
                    icon: Clock,
                    accent: "text-accent",
                  },
                ].map((j) => (
                  <div
                    key={j.id}
                    className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 transition hover:border-primary/30 hover:bg-white/[0.04]"
                  >
                    <div
                      className={`grid size-8 place-items-center rounded-md bg-white/5 ${j.accent}`}
                    >
                      <j.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground">{j.id}</span>
                        <span className="truncate text-sm font-semibold">{j.t}</span>
                      </div>
                      <p className="truncate font-mono text-[10px] text-muted-foreground">
                        {j.a} · {j.tech}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-mono text-xs font-bold ${j.accent}`}>{j.eta}</p>
                      <p className="font-mono text-[9px] uppercase text-muted-foreground">ETA</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* floating revenue chip */}
            <div className="float-slow glass-panel absolute -bottom-6 -left-4 hidden w-56 rounded-xl p-3 md:block">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Today
                </p>
                <span className="font-mono text-[10px] text-accent">+18.4%</span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-2xl font-bold tracking-tight">
                <IndianRupee className="h-5 w-5 text-accent" />
                4,82,310
              </p>
              <div className="mt-1 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrend}>
                    <defs>
                      <linearGradient id="heroRevMini" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(150 80% 50%)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="hsl(150 80% 50%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(150 80% 50%)"
                      strokeWidth={1.5}
                      fill="url(#heroRevMini)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* floating sla chip */}
            <div
              className="float-slow glass-panel absolute -right-2 -top-4 hidden rounded-xl p-3 md:block"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-2">
                <div className="relative grid size-9 place-items-center rounded-full bg-primary/15">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="absolute inset-0 rounded-full ring-1 ring-primary/40 pulse-ring" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">98.4% SLA</p>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground">
                    Last 7 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom live event ticker */}
        <div className="relative border-t border-white/5 bg-background/40 backdrop-blur-md">
          <div className="flex items-center gap-4 overflow-hidden px-4 py-2.5 md:px-8">
            <span className="shrink-0 rounded-md bg-accent/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
              Live feed
            </span>
            <div className="relative flex-1 overflow-hidden">
              <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                {[
                  ["JF-9921 dispatched · Indiranagar", "text-primary"],
                  ["INV-7741 paid · ₹4,499 · UPI", "text-accent"],
                  ["T-04 arrived on-site · 11:42 AM", "text-foreground"],
                  ["New booking · Geyser repair · Whitefield", "text-primary"],
                  ["JF-9914 completed · 4.9★", "text-accent"],
                  ["Auto-invoice sent · INV-7745", "text-foreground"],
                  ["JF-9921 dispatched · Indiranagar", "text-primary"],
                  ["INV-7741 paid · ₹4,499 · UPI", "text-accent"],
                  ["T-04 arrived on-site · 11:42 AM", "text-foreground"],
                  ["New booking · Geyser repair · Whitefield", "text-primary"],
                  ["JF-9914 completed · 4.9★", "text-accent"],
                  ["Auto-invoice sent · INV-7745", "text-foreground"],
                ].map(([t, c], i) => (
                  <span key={i} className="flex items-center gap-2">
                    <CircleDot className={`h-3 w-3 ${c}`} />
                    <span>{t}</span>
                    <span className="text-white/10">/</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE — image transition gallery */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-card/40 py-24">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-32 top-20 size-[420px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -right-32 bottom-0 size-[420px] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="relative px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              // Live in the field
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              From dispatch desk to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                doorstep.
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every job, every technician, every customer — captured in one seamless flow.
            </p>
          </div>

          {/* Featured console with floating overlay cards */}
          <div className="relative mx-auto max-w-6xl">
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_120px_-20px_hsl(190_90%_60%/0.35)]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <img
                src={heroConsole}
                alt="FieldForce Pro live operations command console with India service map"
                width={1536}
                height={1024}
                loading="lazy"
                className="ken-burns h-auto w-full"
              />

              {/* Floating stat chips */}
              <div className="absolute left-6 top-6 z-20 hidden md:block">
                <div
                  className="glass-panel float-slow rounded-xl px-4 py-3"
                  style={{ animationDelay: "0.2s" }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Live techs
                  </p>
                  <p className="mt-0.5 text-lg font-bold text-primary">
                    42 <span className="text-xs text-muted-foreground">/ 56</span>
                  </p>
                </div>
              </div>
              <div className="absolute right-6 top-6 z-20 hidden md:block">
                <div
                  className="glass-panel float-slow rounded-xl px-4 py-3"
                  style={{ animationDelay: "1.1s" }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Today
                  </p>
                  <p className="mt-0.5 text-lg font-bold text-accent">₹4.81 L</p>
                </div>
              </div>
              <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 md:block">
                <div className="glass-panel flex items-center gap-2 rounded-full px-4 py-2">
                  <span className="pulse-ring inline-block size-2 rounded-full bg-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Real-time GPS sync · Bengaluru
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee row — service scenes */}
          <div className="relative mt-16">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
            <div className="flex w-max marquee-track gap-5">
              {[...Array(2)].flatMap((_, dup) =>
                [
                  { src: sceneAc, label: "HVAC · AC repair", tag: "JF-9921 · ₹1,02,920" },
                  { src: scenePlumb, label: "Plumbing · Leak fix", tag: "JF-9910 · ₹57,270" },
                  { src: sceneElec, label: "Electrical · Panel", tag: "JF-9919 · ₹39,840" },
                  { src: sceneDispatch, label: "Dispatch · Ops", tag: "Bengaluru hub" },
                ].map((s, i) => (
                  <figure
                    key={`${dup}-${i}`}
                    className="group relative h-64 w-[360px] shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-80 md:w-[480px]"
                  >
                    <img
                      src={s.src}
                      alt={s.label}
                      width={1280}
                      height={896}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {s.tag}
                      </p>
                      <p className="mt-1 text-lg font-bold tracking-tight">{s.label}</p>
                    </figcaption>
                    <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-background/60 px-2 py-1 backdrop-blur">
                      <span className="pulse-ring size-1.5 rounded-full bg-accent" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        Live
                      </span>
                    </div>
                  </figure>
                )),
              )}
            </div>
          </div>

          {/* Reverse marquee — mini badges */}
          <div className="relative mt-6 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
            <div className="flex w-max marquee-track-slow gap-3">
              {[...Array(2)].flatMap((_, dup) =>
                [
                  "✓ Job JF-9921 dispatched · Arjun Mehta · ETA 14 min",
                  "₹70,185 received from Apex Dynamics · UPI",
                  "★ 5-star rating · Vikram Singh · Indiranagar",
                  "↻ Route optimised · 8 jobs · 42 km saved",
                  "✓ Invoice INV-2024-0419 paid in full",
                  "● Sneha Iyer checked in · Koramangala · 08:01 AM",
                ].map((t, i) => (
                  <div
                    key={`b-${dup}-${i}`}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </div>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS strip */}
      <section className="border-b border-border py-10">
        <div className="px-4 md:px-8">
          <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Trusted by 2,400+ service businesses across 14 countries
          </p>
          <div className="mt-6 grid grid-cols-2 items-center gap-8 opacity-60 sm:grid-cols-3 md:grid-cols-6">
            {[
              "APEX HVAC",
              "BROOKS PLUMB.",
              "NORTHLINE",
              "URBAN LOFT",
              "GREENPATH",
              "BAYBRIDGE",
            ].map((b) => (
              <div
                key={b}
                className="text-center font-mono text-xs tracking-widest text-muted-foreground"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-b border-border py-24">
        <div className="px-4 md:px-8">
          <div className="mb-16 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              // Platform
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Every workflow, one console.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Replace seven different tools with a single platform built for the way field service
              actually runs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-panel group animate-enter rounded-2xl p-6 transition hover:border-primary/30"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20 transition group-hover:bg-primary/20">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="border-b border-border py-24">
        <div className="px-4 md:px-8">
          <div className="mb-16 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">// Roles</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Built for every seat in the field.
            </h2>
            <p className="mt-4 text-muted-foreground">
              A tailored experience for admins, technicians, and customers — all on the same
              platform.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {roles.map((r) => (
              <Link
                key={r.name}
                to={r.to}
                className="group glass-panel relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/40"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${r.accent}`}
                />
                <div className="relative">
                  <div className="inline-flex size-12 items-center justify-center rounded-lg bg-background/60 ring-1 ring-white/10">
                    <r.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight">{r.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                    {r.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="border-b border-border py-24">
        <div className="px-4 md:px-8">
          <div className="mb-16 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              // Customers
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Operators are shipping faster.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-panel rounded-2xl p-6">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
                <div className="mt-6 border-t border-white/5 pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-b border-border py-24">
        <div className="px-4 md:px-8">
          <div className="mb-16 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              // Pricing
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Simple, scalable pricing.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Start free, upgrade as your team grows. No per-job fees, ever.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`glass-panel relative rounded-2xl p-8 ${p.featured ? "ring-2 ring-primary/40 shadow-[0_0_40px_hsl(190_90%_60%/0.15)]" : ""}`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
                <p className="mt-4 text-4xl font-bold tracking-tight">
                  {p.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    {p.price === "Custom" ? "" : " / mo"}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{p.users}</p>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`mt-8 flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition ${p.featured ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-white/10 bg-white/5 hover:bg-white/10"}`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border py-24">
        <div className="px-4 text-center md:px-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Run your field service like <span className="text-primary">mission control.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of operators dispatching, tracking, and invoicing on FieldForce Pro.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_hsl(190_90%_60%/0.4)] transition hover:opacity-90"
            >
              Start 14-day free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              See it live
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10">
        <div className="flex flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-7 place-items-center rounded bg-primary">
              <div className="size-2.5 rotate-45 border-2 border-background" />
            </div>
            <span className="text-sm font-bold tracking-tight">FieldForce Pro</span>
            <span className="text-xs text-muted-foreground">© 2026</span>
          </div>
          <nav className="flex flex-wrap gap-6 text-xs text-muted-foreground">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <Link to="/login" className="hover:text-foreground">
              Sign in
            </Link>
            <Link to="/portal" className="hover:text-foreground">
              Customer portal
            </Link>
            <Link to="/technician" className="hover:text-foreground">
              Technician app
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
