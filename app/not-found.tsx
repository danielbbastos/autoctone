import Link from "next/link";

// Rendered by notFound() or any unmatched route.
export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">Not found</h1>
      <p className="mt-2 text-zinc-500">That application doesn&apos;t exist (anymore).</p>
      <Link href="/" className="mt-4 inline-block text-indigo-600 hover:underline">
        Back to dashboard
      </Link>
    </div>
  );
}
