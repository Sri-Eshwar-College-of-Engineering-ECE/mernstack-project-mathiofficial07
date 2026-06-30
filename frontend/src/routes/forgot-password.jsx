import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — FieldForce Pro" }] }),
  component: Forgot,
});

function Forgot() {
  const [sent, setSent] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="glass-panel w-full max-w-sm rounded-2xl p-8">
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Back to sign in
        </Link>
        {!sent ? (
          <>
            <div className="grid size-10 place-items-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">Reset your password</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the email tied to your account and we'll send you a recovery link.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Recovery email sent");
                setSent(true);
              }}
              className="mt-6 space-y-4"
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                defaultValue="admin@fieldforce.pro"
                className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring"
              />
              <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Send recovery link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto grid size-10 place-items-center rounded-lg bg-accent/10 ring-1 ring-accent/20">
              <CheckCircle2 className="h-4 w-4 text-accent" />
            </div>
            <h1 className="mt-4 text-xl font-bold tracking-tight">Check your inbox</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              If an account exists for that email, a reset link is on the way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
