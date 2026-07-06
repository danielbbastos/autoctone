import { getStats } from "@/lib/db";
import { STATUS_LABELS, STATUSES } from "@/lib/types";

// Async Server Component. Its data fetch is deliberately slow (1.5s), so the
// Suspense boundary around it in page.tsx shows the skeleton first and the
// real cards stream in when ready — the rest of the page doesn't wait.
export async function StatsCards() {
  const stats = await getStats();

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      <StatCard label="Total" value={stats.total} highlight />
      {STATUSES.map((status) => (
        <StatCard key={status} label={STATUS_LABELS[status]} value={stats.byStatus[status]} />
      ))}
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3 text-center ${
        highlight ? "border-indigo-200 bg-indigo-50" : "border-zinc-200 bg-white"
      }`}
    >
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-zinc-500">{label}</div>
    </div>
  );
}

// Skeleton shown while StatsCards is still fetching.
export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[74px] animate-pulse rounded-xl bg-zinc-200" />
      ))}
    </div>
  );
}
