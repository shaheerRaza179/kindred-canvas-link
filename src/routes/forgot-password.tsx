import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MailCheck } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button, Input, Label } from "@/components/ui/primitives";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Orbit" },
      { name: "description", content: "Request a password reset link for your Orbit account." },
      { property: "og:title", content: "Reset your password — Orbit" },
      { property: "og:description", content: "Request a password reset link for Orbit." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="We'll send you a link to choose a new one."
      footer={
        <Link to="/signin" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="surface p-6 text-center">
          <MailCheck className="mx-auto size-8 text-primary" />
          <h2 className="mt-3 text-base font-semibold">Check your inbox</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If an account exists for {email || "that address"}, a reset link is on its way.
          </p>
          <Button variant="outline" className="mt-4 w-full" onClick={() => setSent(false)}>
            Use a different email
          </Button>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send reset link
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
