import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Compass,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  User as UserIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";
import { Avatar } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/create", label: "Create", icon: PlusSquare },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/messages", label: "Messages", icon: MessageCircle },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { currentUser, signOut } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const profilePath = `/u/${currentUser.username}`;

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed top-0 left-0 hidden h-screen w-[76px] flex-col border-r border-border bg-card/60 px-3 py-6 lg:flex xl:w-64 xl:px-4">
        <Link to="/" className="mb-8 flex items-center gap-2 px-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
            O
          </span>
          <span className="hidden font-display text-lg font-bold xl:block">Orbit</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.to)
                  ? "bg-elevated text-foreground"
                  : "text-muted-foreground hover:bg-elevated/60 hover:text-foreground",
              )}
            >
              <item.icon className="size-5 shrink-0" />
              <span className="hidden xl:block">{item.label}</span>
            </Link>
          ))}
          <Link
            to="/u/$username"
            params={{ username: currentUser.username }}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === profilePath
                ? "bg-elevated text-foreground"
                : "text-muted-foreground hover:bg-elevated/60 hover:text-foreground",
            )}
          >
            <UserIcon className="size-5 shrink-0" />
            <span className="hidden xl:block">Profile</span>
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
          <Link
            to="/u/$username"
            params={{ username: currentUser.username }}
            className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-elevated/60"
          >
            <Avatar src={currentUser.avatar} alt={currentUser.name} size={32} />
            <span className="hidden min-w-0 xl:block">
              <span className="block truncate text-sm font-semibold">{currentUser.name}</span>
              <span className="block truncate text-xs text-muted-foreground">
                @{currentUser.username}
              </span>
            </span>
          </Link>
          <Link
            to="/signin"
            onClick={signOut}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-elevated/60 hover:text-foreground"
          >
            <LogOut className="size-4" />
            <span className="hidden xl:block">Sign out</span>
          </Link>
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-primary font-display text-base font-bold text-primary-foreground">
            O
          </span>
          <span className="font-display text-base font-bold">Orbit</span>
        </Link>
        <Link
          to="/explore"
          className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground"
        >
          <Search className="size-4" /> Search people
        </Link>
      </header>

      <main className="pb-24 lg:pb-10 lg:pl-[76px] xl:pl-64">{children}</main>

      <nav className="fixed bottom-0 z-20 flex w-full items-center justify-around border-t border-border bg-card/95 px-2 py-2 backdrop-blur lg:hidden">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "grid place-items-center rounded-lg px-3 py-2",
              isActive(item.to) ? "text-primary" : "text-muted-foreground",
            )}
            aria-label={item.label}
          >
            <item.icon className="size-5" />
          </Link>
        ))}
        <Link
          to="/u/$username"
          params={{ username: currentUser.username }}
          aria-label="Profile"
          className="px-3 py-2"
        >
          <Avatar src={currentUser.avatar} alt={currentUser.name} size={22} />
        </Link>
      </nav>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
