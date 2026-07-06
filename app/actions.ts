"use server";

// Server Actions: functions that run only on the server but can be called
// directly from client components (form actions, event handlers). Next.js
// turns each one into an RPC endpoint — no manual fetch/API route needed.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as db from "@/lib/db";
import { Status, STATUSES } from "@/lib/types";

// Return shape consumed by useActionState in the new-application form.
export interface FormState {
  errors: Record<string, string>;
  values: Record<string, string>;
}

export async function createApplicationAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const values = {
    company: (formData.get("company") as string)?.trim() ?? "",
    role: (formData.get("role") as string)?.trim() ?? "",
    location: (formData.get("location") as string)?.trim() ?? "",
    salary: (formData.get("salary") as string)?.trim() ?? "",
    status: (formData.get("status") as string) ?? "applied",
  };

  // Server-side validation — runs even if client JS is disabled.
  const errors: Record<string, string> = {};
  if (values.company.length < 2) errors.company = "Company name must be at least 2 characters.";
  if (values.role.length < 2) errors.role = "Role must be at least 2 characters.";
  if (!values.location) errors.location = "Location is required.";
  if (!STATUSES.includes(values.status as Status)) errors.status = "Invalid status.";

  if (Object.keys(errors).length > 0) {
    // Return errors + entered values so the form can re-render without losing input.
    return { errors, values };
  }

  await db.createApplication({
    company: values.company,
    role: values.role,
    location: values.location,
    salary: values.salary || undefined,
    status: values.status as Status,
  });

  revalidatePath("/"); // invalidate the cached dashboard so it refetches
  redirect("/"); // throws internally, so nothing after this runs
}

export async function updateStatusAction(id: string, status: Status): Promise<void> {
  await db.updateStatus(id, status);
  revalidatePath("/");
  revalidatePath(`/applications/${id}`);
}

export async function addNoteAction(applicationId: string, formData: FormData): Promise<void> {
  const text = (formData.get("text") as string)?.trim();
  if (!text) return;
  await db.addNote(applicationId, text);
  revalidatePath(`/applications/${applicationId}`);
}

export async function deleteApplicationAction(id: string): Promise<void> {
  await db.deleteApplication(id);
  revalidatePath("/");
  redirect("/");
}
