import React from "react";

export default function RecentList({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: Array<{ title: string; meta: string }>;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-sm text-[var(--muted)]">{subtitle}</div>
          ) : null}
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {items.map((it, idx) => (
          <li key={`${it.title}-${idx}`} className="rounded-lg border border-[var(--border)] p-3">
            <div className="text-sm font-medium">{it.title}</div>
            <div className="mt-0.5 text-xs text-[var(--muted)]">{it.meta}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
