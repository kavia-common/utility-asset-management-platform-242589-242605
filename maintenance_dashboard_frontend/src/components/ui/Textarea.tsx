"use client";

import React from "react";

export default function Textarea({
  label,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block">
      {label ? (
        <div className="mb-1 text-xs font-medium text-[var(--muted)]">{label}</div>
      ) : null}
      <textarea
        className={`w-full resize-none rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[color-mix(in_oklab,var(--primary)_40%,var(--border))] focus:outline-none ${className}`}
        rows={4}
        {...props}
      />
    </label>
  );
}
