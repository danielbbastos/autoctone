// Route Handler: a classic REST endpoint (GET /api/applications?status=offer).
// The app itself doesn't use this — Server Components call lib/db directly —
// but this is how you'd expose the data to external consumers (mobile app,
// third parties, webhooks).

import { NextRequest, NextResponse } from "next/server";
import { getApplications } from "@/lib/db";
import { Status, STATUSES } from "@/lib/types";

export async function GET(request: NextRequest) {
  const statusParam = request.nextUrl.searchParams.get("status");
  const status = STATUSES.includes(statusParam as Status)
    ? (statusParam as Status)
    : undefined;

  const applications = await getApplications(status);
  return NextResponse.json(applications);
}
