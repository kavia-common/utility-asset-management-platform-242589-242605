"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { api, ApiError } from "@/lib/api/client";
import type { InspectionCreate } from "@/lib/api/types";

type InspectionRow = {
  id: string;
  assetId: string;
  inspector: string;
  type: string;
  date: string;
  notes: string;
};

const SAMPLE: InspectionRow[] = [
  { id: "INSP-1002", assetId: "A-001", inspector: "J. Lee", type: "Visual", date: "2026-03-20", notes: "No leaks, minor corrosion." },
  { id: "INSP-1001", assetId: "A-004", inspector: "R. Patel", type: "Thermal", date: "2026-03-18", notes: "Hot spot detected near joint 7." },
];

export default function InspectionsPage() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<InspectionCreate>({
    asset_id: "",
    inspected_at: new Date().toISOString().slice(0, 10),
    inspection_type: "Visual",
    inspector_name: "",
    notes: "",
    condition_rating: 3,
  });

  const rows = useMemo(() => SAMPLE, []);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      // This will call the backend directly (no Next.js route/proxy).
      // If the backend does not have the expected endpoint yet, the UI will show a friendly error.
      await api.inspections.create(form);
      setOpen(false);
      alert("Inspection submitted (if backend endpoint exists).");
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? `${e.message}${e.details ? `: ${e.details}` : ""}`
          : "Failed to submit inspection.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="p-6 lg:p-8">
      <PageHeader
        title="Inspections"
        subtitle="Log inspections and review inspection history."
        actions={
          <Button onClick={() => setOpen(true)} variant="primary">
            New inspection
          </Button>
        }
      />

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Asset</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Inspector</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[var(--border)]">
                  <td className="px-3 py-3 font-medium">{r.id}</td>
                  <td className="px-3 py-3">{r.assetId}</td>
                  <td className="px-3 py-3">{r.type}</td>
                  <td className="px-3 py-3">{r.inspector}</td>
                  <td className="px-3 py-3">{r.date}</td>
                  <td className="px-3 py-3 text-[var(--muted)]">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
        open={open}
        title="New inspection"
        description="Capture inspection details for an asset."
        onClose={() => (submitting ? null : setOpen(false))}
        footer={
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-[var(--danger)]">{error ?? ""}</div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button onClick={submit} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Asset ID"
            placeholder="e.g., A-001"
            value={form.asset_id}
            onChange={(e) => setForm((p) => ({ ...p, asset_id: e.target.value }))}
          />
          <Input
            label="Inspection date"
            type="date"
            value={form.inspected_at}
            onChange={(e) =>
              setForm((p) => ({ ...p, inspected_at: e.target.value }))
            }
          />
          <Select
            label="Inspection type"
            value={form.inspection_type}
            onChange={(e) =>
              setForm((p) => ({ ...p, inspection_type: e.target.value }))
            }
            options={[
              { value: "Visual", label: "Visual" },
              { value: "Thermal", label: "Thermal" },
              { value: "Electrical", label: "Electrical" },
              { value: "Vibration", label: "Vibration" },
            ]}
          />
          <Input
            label="Inspector name"
            placeholder="e.g., Jordan Lee"
            value={form.inspector_name}
            onChange={(e) =>
              setForm((p) => ({ ...p, inspector_name: e.target.value }))
            }
          />
          <Select
            label="Condition rating"
            value={String(form.condition_rating)}
            onChange={(e) =>
              setForm((p) => ({ ...p, condition_rating: Number(e.target.value) }))
            }
            options={[
              { value: "1", label: "1 (Poor)" },
              { value: "2", label: "2" },
              { value: "3", label: "3 (OK)" },
              { value: "4", label: "4" },
              { value: "5", label: "5 (Excellent)" },
            ]}
          />
          <div className="md:col-span-2">
            <Textarea
              label="Notes"
              placeholder="Findings, anomalies, recommendations…"
              value={form.notes ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            />
          </div>
        </div>
      </Modal>
    </main>
  );
}
