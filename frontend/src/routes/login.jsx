import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — FieldForce Pro" }] }),
  component: Login,
});

function Login() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left: visual */}
      <div className="relative hidden overflow-hidden border-r border-border lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(190_90%_60%/0.25),transparent_60%),radial-gradient(circle_at_70%_80%,hsl(150_80%_50%/0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(230_10%_100%/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(230_10%_100%/0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded bg-primary shadow-[0_0_20px_hsl(190_90%_60%/0.5)]">
              <div className="size-3.5 rotate-45 border-2 border-background" />
            </div>
            <span className="text-xl font-bold">
              FieldForce <span className="text-primary">Pro</span>
            </span>
          </Link>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              v2.4 // Operations console
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Dispatch, track, invoice.
              <br />
              All from one console.
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              A field service platform built for AC, plumbing, electrical, cleaning, and maintenance
              teams who run on tight margins and tighter schedules.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
              <div>
                <p className="font-mono text-2xl font-bold text-primary">12k+</p>
                <p className="text-[10px] text-muted-foreground">Jobs dispatched</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-primary">98%</p>
                <p className="text-[10px] text-muted-foreground">Completion rate</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-primary">4.9★</p>
                <p className="text-[10px] text-muted-foreground">Avg rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Sign in</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Welcome back, dispatcher.</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use any credentials to enter the console — this is a demo.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                toast.success("Signed in");
                nav({ to: "/" });
              }, 700);
            }}
            className="mt-8 space-y-4"
          >
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                defaultValue="admin@fieldforce.pro"
                className="mt-1.5 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[10px] text-primary hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative mt-1.5">
                <input
                  type={show ? "text" : "password"}
                  required
                  defaultValue="demo1234"
                  className="w-full rounded-lg border border-border bg-input px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Enter console{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New to FieldForce?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
