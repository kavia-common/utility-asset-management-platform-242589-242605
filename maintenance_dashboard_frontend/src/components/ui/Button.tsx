"use client";

import React from "react";

type Variant = "primary" | "secondary" | "ghost";

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
  const styles: Record<Variant, string> = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]",
    secondary:
      "border border-[var(--border)] bg-white text-[var(--text)] hover:bg-black/[0.03]",
    ghost: "bg-transparent text-[var(--text)] hover:bg-black/[0.03]",
  };

  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
