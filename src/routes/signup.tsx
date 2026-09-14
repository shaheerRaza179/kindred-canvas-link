import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Camera } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { Avatar, Button, Input, Label } from "@/components/ui/primitives";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Orbit" },
      {
        name: "description",
        content: "Join Orbit: share photos, follow creators, and chat with friends.",
      },
      { property: "og:title", content: "Create your account — Orbit" },
      { property: "og:description", content: "Join Orbit and start sharing today." },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const { signIn, updateProfile } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile({
            ...(name ? { name } : {}),
            ...(username ? { username } : {}),
            ...(email ? { email } : {}),
            ...(avatar ? { avatar } : {}),
          });
          signIn();
          navigate({ to: "/" });
        }}
      >
        <div className="flex items-center gap-4">
          <Avatar
            src={avatar ?? "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=new"}
            alt="Profile preview"
            size={64}
          />
          <label className="cursor-pointer">
            <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-elevated">
              <Camera className="size-4" /> Upload photo
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAvatar(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/\s/g, "").toLowerCase())}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
        <Button type="submit" size="lg" className="w-full">
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
