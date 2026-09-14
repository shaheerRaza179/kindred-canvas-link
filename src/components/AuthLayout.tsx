import type { ReactNode } from "react";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border bg-card p-12 lg:flex">
        <div
          className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
        <span className="relative flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
            O
          </span>
          <span className="font-display text-lg font-bold">Orbit</span>
        </span>
        <div className="relative max-w-md">
          <h2 className="font-display text-4xl leading-tight font-bold">
            Where your people <span className="text-gradient">orbit</span>.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Share photos, follow creators you love, and keep the conversation going with direct
            messages — in a calm, focused interface.
          </p>
        </div>
        <p className="relative text-xs text-muted-foreground">© 2026 Orbit. All rights reserved.</p>
      </div>

      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
              O
            </span>
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
