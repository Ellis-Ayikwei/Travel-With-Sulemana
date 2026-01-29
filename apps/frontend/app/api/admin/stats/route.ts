
import { NextRequest, NextResponse } from "next/server";

// Dummy static response for /api/admin/stats (no database)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    users: {
      total: 0,
      customers: 0,
      drivers: 0,
      admins: 0,
    },
    drivers: {
      total: 0,
      pending: 0,
      verified: 0,
      active: 0,
    },
    rides: {
      total: 0,
      completed: 0,
      pending: 0,
      in_progress: 0,
    },
    revenue: {
      total: 0,
      driver_earnings: 0,
      commission: 0,
    },
  });
}

