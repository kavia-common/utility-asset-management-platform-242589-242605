"use client";

import React, { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Modal({
  open,
  title,
  description,
  children,
  footer,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-5">
          <div>
            <div className="text-base font-semibold">{title}</div>
            {description ? (
              <div className="mt-1 text-sm text-[var(--muted)]">{description}</div>
            ) : null}
          </div>
          <Button variant="ghost" aria-label="Close" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="p-5">{children}</div>

        <div className="border-t border-[var(--border)] p-4">
          {footer ?? (
            <div className="flex justify-end">
              <Button variant="secondary" onClick={onClose}>
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
