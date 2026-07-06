// Simulated API / database layer.
//
// This module fakes a remote backend: an in-memory array plus an artificial
// network delay on every call. Because it's only imported from Server
// Components and Server Actions, none of this code ever ships to the browser.
//
// The store is attached to `globalThis` so it survives Next.js hot reloads in
// dev (each reload would otherwise re-run this module and wipe the data).

import { Application, Note, Status } from "./types";

const seed: Application[] = [
  {
    id: "1",
    company: "Vercel",
    role: "Frontend Engineer",
    status: "interview",
    salary: "$140k–$170k",
    location: "Remote",
    appliedAt: "2026-06-12",
    notes: [
      { id: "n1", text: "Recruiter call went well, technical screen next week.", createdAt: "2026-06-18" },
    ],
  },
  {
    id: "2",
    company: "Linear",
    role: "Product Engineer",
    status: "applied",
    location: "Remote (EU)",
    appliedAt: "2026-06-20",
    notes: [],
  },
  {
    id: "3",
    company: "Stripe",
    role: "Full Stack Engineer",
    status: "screening",
    salary: "$160k–$190k",
    location: "Dublin, IE",
    appliedAt: "2026-06-15",
    notes: [{ id: "n2", text: "Take-home assignment due Friday.", createdAt: "2026-06-22" }],
  },
  {
    id: "4",
    company: "Shopify",
    role: "Senior React Developer",
    status: "rejected",
    location: "Remote",
    appliedAt: "2026-05-30",
    notes: [{ id: "n3", text: "Position was filled internally.", createdAt: "2026-06-10" }],
  },
  {
    id: "5",
    company: "Supabase",
    role: "Frontend Engineer",
    status: "offer",
    salary: "$150k",
    location: "Remote",
    appliedAt: "2026-05-20",
    notes: [{ id: "n4", text: "Offer received! Deadline to respond: July 15.", createdAt: "2026-07-01" }],
  },
];

// Reuse the same array across hot reloads in dev.
const globalStore = globalThis as unknown as { __applications?: Application[] };
const applications: Application[] = (globalStore.__applications ??= structuredClone(seed));

// Fake network latency so Suspense fallbacks and streaming are visible.
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getApplications(status?: Status, query?: string): Promise<Application[]> {
  await delay(400);
  let result = applications;
  if (status) {
    result = result.filter((a) => a.status === status);
  }
  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (a) => a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
    );
  }
  // Newest first
  return [...result].sort((a, b) => b.appliedAt.localeCompare(a.appliedAt));
}

export async function getApplication(id: string): Promise<Application | undefined> {
  await delay(300);
  return applications.find((a) => a.id === id);
}

// Deliberately slow (1.5s) so the stats section streams in after the list.
export async function getStats(): Promise<{ total: number; byStatus: Record<Status, number> }> {
  await delay(1500);
  const byStatus = { applied: 0, screening: 0, interview: 0, offer: 0, rejected: 0 };
  for (const a of applications) byStatus[a.status]++;
  return { total: applications.length, byStatus };
}

export async function createApplication(
  data: Omit<Application, "id" | "notes" | "appliedAt">
): Promise<Application> {
  await delay(500);
  const app: Application = {
    ...data,
    id: crypto.randomUUID(),
    appliedAt: new Date().toISOString().slice(0, 10),
    notes: [],
  };
  applications.unshift(app);
  return app;
}

export async function updateStatus(id: string, status: Status): Promise<void> {
  await delay(600);
  const app = applications.find((a) => a.id === id);
  if (!app) throw new Error(`Application ${id} not found`);
  app.status = status;
}

export async function addNote(applicationId: string, text: string): Promise<Note> {
  await delay(600);
  const app = applications.find((a) => a.id === applicationId);
  if (!app) throw new Error(`Application ${applicationId} not found`);
  const note: Note = {
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  app.notes.push(note);
  return note;
}

export async function deleteApplication(id: string): Promise<void> {
  await delay(500);
  const index = applications.findIndex((a) => a.id === id);
  if (index !== -1) applications.splice(index, 1);
}
