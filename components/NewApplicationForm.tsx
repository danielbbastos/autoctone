"use client";

// Form wired to a Server Action via useActionState (React 19).
// The action returns { errors, values }: on validation failure the form
// re-renders with error messages and keeps what the user typed; on success
// the action redirects to the dashboard instead of returning.

import { useActionState } from "react";
import { createApplicationAction, FormState } from "@/app/actions";
import { STATUS_LABELS, STATUSES } from "@/lib/types";

const initialState: FormState = { errors: {}, values: {} };

export function NewApplicationForm() {
  const [state, formAction, isPending] = useActionState(createApplicationAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Company" name="company" state={state} placeholder="Acme Inc." />
      <Field label="Role" name="role" state={state} placeholder="Frontend Engineer" />
      <Field label="Location" name="location" state={state} placeholder="Remote" />
      <Field label="Salary (optional)" name="salary" state={state} placeholder="$120k–$150k" />

      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={state.values.status ?? "applied"}
          className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <button
        disabled={isPending}
        className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save application"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  state,
  placeholder,
}: {
  label: string;
  name: string;
  state: FormState;
  placeholder: string;
}) {
  const error = state.errors[name];
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={state.values[name] ?? ""}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-indigo-400 ${
          error ? "border-red-400" : "border-zinc-200"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
