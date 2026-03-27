import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-6 lg:p-8">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h1 className="text-xl font-semibold">404 – Page Not Found</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-4 text-sm">
          <Link
            className="rounded-lg bg-[color-mix(in_oklab,var(--primary)_12%,white)] px-3 py-2 text-[color-mix(in_oklab,var(--primary)_85%,black)]"
            href="/dashboard"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
