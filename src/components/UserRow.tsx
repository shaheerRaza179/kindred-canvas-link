import { Link } from "@tanstack/react-router";
import { CURRENT_USER_ID, type User } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Avatar, Button } from "@/components/ui/primitives";

export function UserRow({ user }: { user: User }) {
  const { following, toggleFollow } = useStore();
  const isSelf = user.id === CURRENT_USER_ID;
  const isFollowing = following.includes(user.id);

  return (
    <li className="flex items-center gap-3 py-3">
      <Link to="/u/$username" params={{ username: user.username }}>
        <Avatar src={user.avatar} alt={user.name} size={44} />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          to="/u/$username"
          params={{ username: user.username }}
          className="block truncate text-sm font-semibold hover:underline"
        >
          {user.name}
        </Link>
        <p className="truncate text-xs text-muted-foreground">@{user.username}</p>
      </div>
      {!isSelf && (
        <Button
          size="sm"
          variant={isFollowing ? "outline" : "primary"}
          onClick={() => toggleFollow(user.id)}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
    </li>
  );
}
