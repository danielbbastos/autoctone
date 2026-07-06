// loading.tsx: Next.js automatically wraps the page in a Suspense boundary
// with this as the fallback — shown while the detail page fetches its data.
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-5 w-32 animate-pulse rounded bg-zinc-200" />
      <div className="h-48 animate-pulse rounded-xl bg-zinc-200" />
      <div className="h-40 animate-pulse rounded-xl bg-zinc-200" />
    </div>
  );
}
