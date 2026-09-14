import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { timeAgo } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Avatar, Button, Card } from "@/components/ui/primitives";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Orbit" },
      { name: "description", content: "See new likes, comments, and followers on your Orbit account." },
      { property: "og:title", content: "Notifications — Orbit" },
      { property: "og:description", content: "New likes, comments, and followers on Orbit." },
    ],
  }),
  component: Notifications,
});

const meta = {
  like: { icon: Heart, text: "liked your post" },
  comment: { icon: MessageCircle, text: "commented on your post" },
  follow: { icon: UserPlus, text: "started following you" },
} as const;

function Notifications() {
  const { notifications, userById, following, toggleFollow } = useStore();

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl px-4 py-6 lg:px-8">
        <PageHeader title="Notifications" subtitle="Recent activity on your account." />
        <Card className="divide-y divide-border">
          {notifications.map((n) => {
            const u = userById(n.userId)!;
            const m = meta[n.type];
            return (
              <div key={n.id} className="flex items-center gap-3 p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-elevated">
                  <m.icon className="size-4 text-primary" />
                </span>
                <Avatar src={u.avatar} alt={u.name} size={36} />
                <p className="min-w-0 flex-1 text-sm">
                  <Link
                    to="/u/$username"
                    params={{ username: u.username }}
                    className="font-semibold hover:underline"
                  >
                    {u.name}
                  </Link>{" "}
                  <span className="text-muted-foreground">{m.text}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{timeAgo(n.createdAt)}</span>
                </p>
                {n.type === "follow" ? (
                  <Button
                    size="sm"
                    variant={following.includes(u.id) ? "outline" : "primary"}
                    onClick={() => toggleFollow(u.id)}
                  >
                    {following.includes(u.id) ? "Following" : "Follow back"}
                  </Button>
                ) : (
                  n.postId && (
                    <Link to="/post/$postId" params={{ postId: n.postId }}>
                      <Button size="sm" variant="subtle">
                        View
                      </Button>
                    </Link>
                  )
                )}
              </div>
            );
          })}
        </Card>
      </div>
    </AppShell>
  );
}
