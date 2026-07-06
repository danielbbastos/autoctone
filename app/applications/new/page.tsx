import { NewApplicationForm } from "@/components/NewApplicationForm";

// A mostly-static Server Component page; the interactive form is a client island.
export default function NewApplicationPage() {
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold">New application</h1>
      <p className="mt-1 text-sm text-zinc-500">Track a job you just applied to.</p>
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6">
        <NewApplicationForm />
      </div>
    </div>
  );
}
