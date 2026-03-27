"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AssetDrawer from "@/components/assets/AssetDrawer";

type AssetRow = {
  id: string;
  name: string;
  type: string;
  location: string;
  health: number;
};

const SAMPLE: AssetRow[] = [
  { id: "A-001", name: "Transformer T-102", type: "Transformer", location: "Yard 2", health: 78 },
  { id: "A-002", name: "Substation SS-3", type: "Substation", location: "District West", health: 64 },
  { id: "A-003", name: "Pump Station P-07", type: "Pump", location: "Reservoir North", health: 82 },
  { id: "A-004", name: "Pipeline PL-9", type: "Pipeline", location: "Sector 9", health: 59 },
];

export default function AssetsPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AssetRow | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SAMPLE;
    return SAMPLE.filter(
      (a) =>
        a.id.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <main className="p-6 lg:p-8">
      <PageHeader
        title="Assets"
        subtitle="Browse infrastructure assets and view details."
        actions={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                // Future: open “New Asset” form once backend supports asset CRUD endpoints.
                alert("Asset creation UI is not wired yet (backend endpoints not present).");
              }}
            >
              New asset
            </Button>
          </div>
        }
      />

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-md">
            <Input
              label="Search"
              placeholder="Search by id, name, type, location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="text-sm text-[var(--muted)]">
            Showing <span className="font-medium text-[var(--text)]">{filtered.length}</span> assets
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Location</th>
                <th className="px-3 py-2">Health</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-[var(--border)] hover:bg-black/[0.02]"
                >
                  <td className="px-3 py-3 font-medium">{a.id}</td>
                  <td className="px-3 py-3">{a.name}</td>
                  <td className="px-3 py-3">{a.type}</td>
                  <td className="px-3 py-3">{a.location}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        a.health >= 75
                          ? "bg-[color-mix(in_oklab,var(--success)_18%,white)] text-[color-mix(in_oklab,var(--success)_80%,black)]"
                          : a.health >= 60
                            ? "bg-[color-mix(in_oklab,var(--primary)_14%,white)] text-[color-mix(in_oklab,var(--primary)_80%,black)]"
                            : "bg-[color-mix(in_oklab,var(--danger)_14%,white)] text-[color-mix(in_oklab,var(--danger)_80%,black)]"
                      }`}
                    >
                      {a.health}%
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <Button variant="ghost" onClick={() => setSelected(a)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-3 py-8 text-center text-[var(--muted)]" colSpan={6}>
                    No assets match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <AssetDrawer asset={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
