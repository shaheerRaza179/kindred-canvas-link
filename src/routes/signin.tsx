import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button, Input, Label } from "@/components/ui/primitives";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Orbit" },
      { name: "description", content: "Sign in to your Orbit account to see your feed and messages." },
      { property: "og:title", content: "Sign in — Orbit" },
      { property: "og:description", content: "Sign in to your Orbit account." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("ali@example.com");
  const [password, setPassword] = useState("password");

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to pick up where you left off."
      footer={
        <>
          New to Orbit?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
          navigate({ to: "/" });
        }}
      >
        <div>
          <Label htmlFor="email">Email or username</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="accent-primary" defaultChecked /> Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" size="lg" className="w-full">
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
}
