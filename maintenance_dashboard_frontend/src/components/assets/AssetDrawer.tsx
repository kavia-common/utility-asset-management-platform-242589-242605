"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type AssetLike = {
  id: string;
  name: string;
  type: string;
  location: string;
  health: number;
} | null;

type Tab = "Overview" | "History" | "Maintenance";

export default function AssetDrawer({
  asset,
  onClose,
}: {
  asset: AssetLike;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("Overview");

  useEffect(() => {
    if (asset) setTab("Overview");
  }, [asset]);

  useEffect(() => {
    if (!asset) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [asset, onClose]);

  if (!asset) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/20"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
      aria-hidden="true"
    >
      <aside
        className="absolute right-0 top-0 h-full w-full max-w-xl border-l border-[var(--border)] bg-[var(--surface)] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Asset details for ${asset.name}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-5">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              {asset.id}
            </div>
            <div className="mt-1 text-xl font-semibold">{asset.name}</div>
            <div className="mt-1 text-sm text-[var(--muted)]">
              {asset.type} · {asset.location}
            </div>
          </div>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="border-b border-[var(--border)] px-5">
          <div className="flex gap-2 py-3">
            {(["Overview", "History", "Maintenance"] as const).map((t) => (
              <button
                key={t}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  tab === t
                    ? "bg-[color-mix(in_oklab,var(--primary)_12%,white)] text-[color-mix(in_oklab,var(--primary)_85%,black)]"
                    : "text-[var(--text)] hover:bg-black/[0.03]"
                }`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {tab === "Overview" ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--border)] p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                  Health score
                </div>
                <div className="mt-2 text-2xl font-semibold">{asset.health}%</div>
                <div className="mt-1 text-sm text-[var(--muted)]">
                  Calculations and risk factors will be pulled from backend once available.
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] p-4">
                <div className="text-sm font-semibold">Recommended next steps</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]">
                  <li>Schedule a follow-up inspection if health &lt; 65%.</li>
                  <li>Review recent work orders to identify recurring issues.</li>
                </ul>
              </div>
            </div>
          ) : tab === "History" ? (
            <div className="rounded-xl border border-[var(--border)] p-4 text-sm text-[var(--muted)]">
              Timeline/history view will connect to backend “history/timeline” endpoints.
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--border)] p-4 text-sm text-[var(--muted)]">
              Maintenance queue will connect to backend work orders + predictive maintenance endpoints.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
