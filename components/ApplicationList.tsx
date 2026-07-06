import Link from "next/link";
import { getApplications } from "@/lib/db";
import { Status } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

// Server Component: fetches on the server, renders plain HTML. Each card is a
// link to the detail page — no client-side JS needed for any of this.
export async function ApplicationList({ status, query }: { status?: Status; query?: string }) {
  const applications = await getApplications(status, query);

  if (applications.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 py-12 text-center text-zinc-500">
        No applications found.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {applications.map((app) => (
        <li key={app.id}>
          <Link
            href={`/applications/${app.id}`}
            className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm"
          >
            <div>
              <div className="font-semibold">{app.role}</div>
              <div className="text-sm text-zinc-500">
                {app.company} · {app.location}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden text-xs text-zinc-400 sm:block">{app.appliedAt}</span>
              <StatusBadge status={app.status} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ApplicationListSkeleton() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="h-[74px] animate-pulse rounded-xl bg-zinc-200" />
      ))}
    </ul>
  );
}
