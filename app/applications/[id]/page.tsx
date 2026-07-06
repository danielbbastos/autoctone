import Link from "next/link";
import { notFound } from "next/navigation";
import { getApplication } from "@/lib/db";
import { StatusSelect } from "@/components/StatusSelect";
import { Notes } from "@/components/Notes";
import { DeleteButton } from "@/components/DeleteButton";

// Dynamic route: the [id] folder makes the URL segment available as a param.
// In Next 16, params is a Promise. notFound() renders the nearest 404 page.
export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await getApplication(id);
  if (!application) notFound();

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900">
        ← Back to dashboard
      </Link>

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{application.role}</h1>
            <p className="text-zinc-500">
              {application.company} · {application.location}
            </p>
          </div>
          <DeleteButton id={application.id} />
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-zinc-400">Applied</dt>
            <dd className="font-medium">{application.appliedAt}</dd>
          </div>
          <div>
            <dt className="text-zinc-400">Salary</dt>
            <dd className="font-medium">{application.salary ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-400">Status</dt>
            <dd className="mt-0.5">
              {/* Client island: interactive select inside a server-rendered page */}
              <StatusSelect id={application.id} status={application.status} />
            </dd>
          </div>
        </dl>
      </div>

      <Notes applicationId={application.id} notes={application.notes} />
    </div>
  );
}
