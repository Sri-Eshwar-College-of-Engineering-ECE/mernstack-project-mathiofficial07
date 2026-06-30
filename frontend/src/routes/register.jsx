import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — FieldForce Pro" }] }),
  component: Register,
});

function Register() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md glass-panel rounded-2xl p-8">
        <Link to="/" className="mb-8 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded bg-primary shadow-[0_0_20px_hsl(190_90%_60%/0.5)]">
            <div className="size-3.5 rotate-45 border-2 border-background" />
          </div>
          <span className="text-lg font-bold">
            FieldForce <span className="text-primary">Pro</span>
          </span>
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
          Start your trial
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Create your console</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Set up your team's command center in under a minute.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              toast.success("Account created");
              nav({ to: "/" });
            }, 700);
          }}
          className="mt-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <Input label="First name" defaultValue="Elias" />
            <Input label="Last name" defaultValue="Thorne" />
          </div>
          <Input label="Work email" type="email" defaultValue="elias@fieldforce.pro" />
          <Input label="Company" defaultValue="FieldForce Operations" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Password" type="password" defaultValue="demo12345" />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Role
              </label>
              <select className="mt-1.5 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring">
                <option>Admin</option>
                <option>Manager</option>
                <option>Technician</option>
                <option>Customer</option>
              </select>
            </div>
          </div>

          <label className="flex items-start gap-2 pt-2">
            <input type="checkbox" defaultChecked className="mt-0.5 accent-primary" />
            <span className="text-xs text-muted-foreground">
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </label>

          <button
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Create account{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        {...rest}
        className="mt-1.5 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
