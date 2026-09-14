import { Link } from "@tanstack/react-router";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { CURRENT_USER_ID, timeAgo, type Post } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Avatar, Button, Input } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export function PostCard({ post, showAllComments = false }: { post: Post; showAllComments?: boolean }) {
  const { userById, toggleLike, addComment } = useStore();
  const author = userById(post.userId)!;
  const liked = post.likedBy.includes(CURRENT_USER_ID);
  const [text, setText] = useState("");
  const [shared, setShared] = useState(false);
  const comments = showAllComments ? post.comments : post.comments.slice(-2);

  return (
    <article className="surface overflow-hidden">
      <header className="flex items-center gap-3 px-4 py-3">
        <Link to="/u/$username" params={{ username: author.username }}>
          <Avatar src={author.avatar} alt={author.name} size={40} />
        </Link>
        <div className="min-w-0">
          <Link
            to="/u/$username"
            params={{ username: author.username }}
            className="block truncate text-sm font-semibold hover:underline"
          >
            {author.name}
          </Link>
          <p className="truncate text-xs text-muted-foreground">
            @{author.username} · {timeAgo(post.createdAt)}
          </p>
        </div>
      </header>

      {post.caption && (
        <p className="px-4 pb-3 text-sm leading-relaxed text-foreground/90">{post.caption}</p>
      )}

      {post.image && (
        <Link to="/post/$postId" params={{ postId: post.id }} className="block">
          <img
            src={post.image}
            alt={post.caption || "Post image"}
            loading="lazy"
            className="aspect-square w-full border-y border-border object-cover"
          />
        </Link>
      )}

      <div className="flex items-center gap-1 px-3 py-2">
        <Button variant="ghost" size="sm" onClick={() => toggleLike(post.id)} aria-label="Like">
          <Heart className={cn("size-5", liked && "fill-primary text-primary")} />
          <span className="text-xs">{post.likedBy.length}</span>
        </Button>
        <Link to="/post/$postId" params={{ postId: post.id }}>
          <Button variant="ghost" size="sm" aria-label="Comments">
            <MessageCircle className="size-5" />
            <span className="text-xs">{post.comments.length}</span>
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={() => setShared(true)} aria-label="Share">
          <Send className="size-5" />
          <span className="text-xs">{shared ? "Link copied" : "Share"}</span>
        </Button>
      </div>

      {comments.length > 0 && (
        <ul className="space-y-2 border-t border-border px-4 py-3">
          {!showAllComments && post.comments.length > 2 && (
            <li>
              <Link
                to="/post/$postId"
                params={{ postId: post.id }}
                className="text-xs text-muted-foreground hover:underline"
              >
                View all {post.comments.length} comments
              </Link>
            </li>
          )}
          {comments.map((c) => {
            const cu = userById(c.userId)!;
            return (
              <li key={c.id} className="flex gap-2 text-sm">
                <Avatar src={cu.avatar} alt={cu.name} size={24} />
                <p className="min-w-0 flex-1 leading-snug">
                  <Link
                    to="/u/$username"
                    params={{ username: cu.username }}
                    className="font-semibold hover:underline"
                  >
                    {cu.username}
                  </Link>{" "}
                  <span className="text-foreground/85">{c.text}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{timeAgo(c.createdAt)}</span>
                </p>
              </li>
            );
          })}
        </ul>
      )}

      <form
        className="flex items-center gap-2 border-t border-border px-3 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          addComment(post.id, text.trim());
          setText("");
        }}
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment…"
          aria-label="Add a comment"
        />
        <Button type="submit" size="sm" disabled={!text.trim()}>
          Post
        </Button>
      </form>
    </article>
  );
}
