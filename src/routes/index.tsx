import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PostCard } from "@/components/PostCard";
import { UserRow } from "@/components/UserRow";
import { CURRENT_USER_ID } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Avatar, Button, Card } from "@/components/ui/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home feed — Orbit" },
      {
        name: "description",
        content: "Your Orbit feed: the latest photos and posts from the creators you follow.",
      },
      { property: "og:title", content: "Home feed — Orbit" },
      {
        property: "og:description",
        content: "Your Orbit feed: the latest photos and posts from the creators you follow.",
      },
    ],
  }),
  component: Feed,
});

function Feed() {
  const { posts, following, users, currentUser } = useStore();
  const feed = posts
    .filter((p) => following.includes(p.userId) || p.userId === CURRENT_USER_ID)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const suggestions = users
    .filter((u) => u.id !== CURRENT_USER_ID && !following.includes(u.id))
    .slice(0, 4);

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-5xl gap-8 px-4 py-6 lg:px-8">
        <div className="min-w-0 flex-1 space-y-5">
          <Card className="flex items-center gap-3 p-4">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size={40} />
            <Link to="/create" className="flex-1">
              <div className="rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-muted-foreground">
                Share something with your followers…
              </div>
            </Link>
            <Link to="/create" className="hidden sm:block">
              <Button>Create</Button>
            </Link>
          </Card>

          <h1 className="sr-only">Home feed</h1>
          {feed.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
          {feed.length === 0 && (
            <Card className="p-10 text-center text-sm text-muted-foreground">
              Your feed is empty. Follow a few people on Explore.
            </Card>
          )}
        </div>

        <aside className="hidden w-72 shrink-0 lg:block">
          <Card className="p-4">
            <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-primary" /> Suggested for you
            </h2>
            <ul className="divide-y divide-border">
              {suggestions.map((u) => (
                <UserRow key={u.id} user={u} />
              ))}
            </ul>
            <Link to="/explore" className="mt-2 block text-xs text-primary hover:underline">
              See all suggestions
            </Link>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
