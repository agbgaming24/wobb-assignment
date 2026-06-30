import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  description?: string;
}

export function Layout({ children, title, eyebrow, description }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.22),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.22),_transparent_30%),linear-gradient(180deg,_#0b1020_0%,_#11162a_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-r from-violet-500/15 via-transparent to-blue-500/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="rounded-2xl border border-white/10 bg-slate-950/50 px-5 py-4 shadow-[0_16px_40px_rgba(8,15,40,0.18)] backdrop-blur-md sm:px-6">
          <div className="flex flex-col gap-4">
            <div className="mx-auto max-w-3xl text-center">
              {eyebrow && <p className="text-xs uppercase tracking-[0.28em] text-violet-200/70">{eyebrow}</p>}
              {title && <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>}
              {description && <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">{description}</p>}
            </div>
          </div>
        </header>

        <main className="relative flex-1 py-5">{children}</main>
      </div>
    </div>
  );
}
