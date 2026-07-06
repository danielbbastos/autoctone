import { Suspense } from "react";
import { StatsCards, StatsCardsSkeleton } from "@/components/StatsCards";
import { ApplicationList, ApplicationListSkeleton } from "@/components/ApplicationList";
import { StatusFilter } from "@/components/StatusFilter";
import { SearchInput } from "@/components/SearchInput";
import { Status, STATUSES } from "@/lib/types";

// The dashboard: an async Server Component. It never ships to the browser —
// only its rendered output does. In Next 16, searchParams is a Promise.
//
// Each Suspense boundary streams independently: the page shell appears
// immediately, the list arrives after ~400ms, the stats after ~1.5s.
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  // Validate the URL param instead of trusting it blindly.
  const status = STATUSES.includes(params.status as Status)
    ? (params.status as Status)
    : undefined;
  const query = params.q;

  return (
    <div className="space-y-6">
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <StatusFilter active={status} />
        <SearchInput />
      </div>

      {/* key: changing the filter remounts the boundary so the fallback shows again */}
      <Suspense key={`${status}-${query}`} fallback={<ApplicationListSkeleton />}>
        <ApplicationList status={status} query={query} />
      </Suspense>
    </div>
  );
}
