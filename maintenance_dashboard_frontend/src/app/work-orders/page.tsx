"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { api, ApiError } from "@/lib/api/client";
import type { WorkOrderCreate } from "@/lib/api/types";

type WorkOrderRow = {
  id: string;
  assetId: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Done";
};

const SAMPLE: WorkOrderRow[] = [
  { id: "WO-00023", assetId: "A-002", title: "Inspect relay cabinet + clean contacts", priority: "High", status: "Open" },
  { id: "WO-00022", assetId: "A-004", title: "Investigate thermal hot spot near joint 7", priority: "Medium", status: "In Progress" },
];

export default function WorkOrdersPage() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<WorkOrderCreate>({
    asset_id: "",
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
  });

  const rows = useMemo(() => SAMPLE, []);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      await api.workOrders.create(form);
      setOpen(false);
      alert("Work order created (if backend endpoint exists).");
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? `${e.message}${e.details ? `: ${e.details}` : ""}`
          : "Failed to create work order.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="p-6 lg:p-8">
      <PageHeader
        title="Work Orders"
        subtitle="Prioritize and track maintenance tasks."
        actions={
          <Button onClick={() => setOpen(true)} variant="primary">
            New work order
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
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Priority</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[var(--border)]">
                  <td className="px-3 py-3 font-medium">{r.id}</td>
                  <td className="px-3 py-3">{r.assetId}</td>
                  <td className="px-3 py-3">{r.title}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        r.priority === "High"
                          ? "bg-[color-mix(in_oklab,var(--danger)_14%,white)] text-[color-mix(in_oklab,var(--danger)_80%,black)]"
                          : r.priority === "Medium"
                            ? "bg-[color-mix(in_oklab,var(--primary)_14%,white)] text-[color-mix(in_oklab,var(--primary)_80%,black)]"
                            : "bg-black/[0.05] text-[var(--text)]"
                      }`}
                    >
                      {r.priority}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[var(--muted)]">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
        open={open}
        title="New work order"
        description="Create a maintenance task for an asset."
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
                {submitting ? "Creating…" : "Create"}
              </Button>
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Asset ID"
            placeholder="e.g., A-002"
            value={form.asset_id}
            onChange={(e) => setForm((p) => ({ ...p, asset_id: e.target.value }))}
          />
          <Select
            label="Priority"
            value={form.priority}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                priority: e.target.value as WorkOrderCreate["priority"],
              }))
            }
            options={[
              { value: "Low", label: "Low" },
              { value: "Medium", label: "Medium" },
              { value: "High", label: "High" },
            ]}
          />
          <div className="md:col-span-2">
            <Input
              label="Title"
              placeholder="Short description of the work"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
          </div>
          <div className="md:col-span-2">
            <Textarea
              label="Details"
              placeholder="Steps, hazards, parts needed, etc."
              value={form.description ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
            />
          </div>
          <Input
            label="Due date"
            type="date"
            value={form.due_date ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, due_date: e.target.value }))}
          />
        </div>
      </Modal>
    </main>
  );
}
