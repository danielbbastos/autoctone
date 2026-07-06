// Domain types shared by both server and client code.

export type Status = "applied" | "screening" | "interview" | "offer" | "rejected";

export const STATUSES: Status[] = ["applied", "screening", "interview", "offer", "rejected"];

export const STATUS_LABELS: Record<Status, string> = {
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export interface Note {
  id: string;
  text: string;
  createdAt: string; // ISO date — strings serialize cleanly across the server/client boundary
}

export interface Application {
  id: string;
  company: string;
  role: string;
  status: Status;
  salary?: string;
  location: string;
  appliedAt: string;
  notes: Note[];
}
