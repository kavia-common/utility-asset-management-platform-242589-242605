"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = {
  href: string;
  label: string;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assets", label: "Assets" },
  { href: "/inspections", label: "Inspections" },
  { href: "/work-orders", label: "Work Orders" },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/" || pathname.startsWith("/dashboard");
  return pathname.startsWith(href);
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="hidden w-64 flex-shrink-0 border-r border-[var(--border)] bg-[var(--surface)] lg:block">
          <div className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-[color-mix(in_oklab,var(--primary)_18%,white)]" />
              <div>
                <div className="text-sm font-semibold">Utility Ops</div>
                <div className="text-xs text-[var(--muted)]">Asset Management</div>
              </div>
            </div>
          </div>

          <nav className="px-3 pb-5">
            <div className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Navigation
            </div>
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-2 text-sm transition ${
                        active
                          ? "bg-[color-mix(in_oklab,var(--primary)_12%,white)] text-[color-mix(in_oklab,var(--primary)_85%,black)]"
                          : "text-[var(--text)] hover:bg-black/[0.03]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto border-t border-[var(--border)] p-4 text-xs text-[var(--muted)]">
            Backend:{" "}
            <span className="font-medium text-[var(--text)]">
              {process.env.NEXT_PUBLIC_BACKEND_URL ?? "not configured"}
            </span>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur">
            <div className="flex items-center justify-between px-5 py-3 lg:px-8">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-[color-mix(in_oklab,var(--primary)_18%,white)] lg:hidden" />
                <div className="text-sm text-[var(--muted)]">
                  {NAV.find((n) => isActive(pathname, n.href))?.label ?? "Dashboard"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs text-[var(--muted)]">
                  Live updates: planned
                </span>
              </div>
            </div>
          </header>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
