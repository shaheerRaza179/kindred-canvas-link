import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { UserRow } from "@/components/UserRow";
import { CURRENT_USER_ID } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Card, Input } from "@/components/ui/primitives";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore people & posts — Orbit" },
      {
        name: "description",
        content: "Search for people on Orbit, discover suggested creators, and browse trending posts.",
      },
      { property: "og:title", content: "Explore people & posts — Orbit" },
      { property: "og:description", content: "Discover creators and trending posts on Orbit." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const { users, posts, following } = useStore();
  const [q, setQ] = useState("");

  const results = users.filter(
    (u) =>
      u.id !== CURRENT_USER_ID &&
      (u.name.toLowerCase().includes(q.toLowerCase()) ||
        u.username.toLowerCase().includes(q.toLowerCase())),
  );
  const suggested = results.filter((u) => !following.includes(u.id));
  const gallery = posts.filter((p) => p.image);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-6 lg:px-8">
        <PageHeader title="Explore" subtitle="Find people to follow and see what's trending." />

        <div className="relative mb-6">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search people by name or username"
            aria-label="Search users"
            className="pl-9"
          />
        </div>

        <Card className="mb-8 p-4">
          <h2 className="text-sm font-semibold">
            {q ? `Results for "${q}"` : "Suggested for you"}
          </h2>
          <ul className="divide-y divide-border">
            {(q ? results : suggested).map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </ul>
          {(q ? results : suggested).length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">No people found.</p>
          )}
        </Card>

        <h2 className="mb-3 text-sm font-semibold">Trending posts</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {gallery.map((p) => (
            <Link
              key={p.id}
              to="/post/$postId"
              params={{ postId: p.id }}
              className="group overflow-hidden rounded-lg border border-border"
            >
              <img
                src={p.image!}
                alt={p.caption}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
