"use client";

import React from "react";

export default function Select({
  label,
  options,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block">
      {label ? (
        <div className="mb-1 text-xs font-medium text-[var(--muted)]">{label}</div>
      ) : null}
      <select
        className={`w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--text)] focus:border-[color-mix(in_oklab,var(--primary)_40%,var(--border))] focus:outline-none ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
