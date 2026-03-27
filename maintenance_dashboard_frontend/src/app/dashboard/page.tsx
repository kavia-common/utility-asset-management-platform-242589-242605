import PageHeader from "@/components/layout/PageHeader";
import StatCard from "@/components/ui/StatCard";
import RecentList from "@/components/ui/RecentList";

export default function DashboardPage() {
  return (
    <main className="p-6 lg:p-8">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of assets, inspections, and work orders."
      />

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Assets" value="—" hint="Registered in the system" />
        <StatCard title="Inspections" value="—" hint="Logged (recent)" />
        <StatCard title="Open Work Orders" value="—" hint="In progress / queued" />
        <StatCard title="At-Risk Assets" value="—" hint="Needs attention" />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RecentList
          title="Recent inspections"
          subtitle="Latest inspection logs (placeholder until backend endpoints are available)."
          items={[
            { title: "Transformer T-102", meta: "Visual inspection · 2 days ago" },
            { title: "Pump Station P-07", meta: "Thermal check · 5 days ago" },
          ]}
        />
        <RecentList
          title="Recent work orders"
          subtitle="Recently created work orders (placeholder until backend endpoints are available)."
          items={[
            { title: "WO-00023", meta: "Substation SS-3 · High priority" },
            { title: "WO-00022", meta: "Pipeline PL-9 · Medium priority" },
          ]}
        />
      </section>
    </main>
  );
}
