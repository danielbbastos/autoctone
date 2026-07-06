import { Status, STATUS_LABELS } from "@/lib/types";

// A "shared" component: it has no hooks or event handlers, so it works in
// both Server and Client Components without a "use client" directive.
const styles: Record<Status, string> = {
  applied: "bg-blue-100 text-blue-700",
  screening: "bg-amber-100 text-amber-700",
  interview: "bg-purple-100 text-purple-700",
  offer: "bg-green-100 text-green-700",
  rejected: "bg-zinc-200 text-zinc-600",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
