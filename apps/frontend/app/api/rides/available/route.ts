import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const rides = await db.rides.findAvailable();
    return NextResponse.json(rides);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to fetch available rides" },
      { status: 500 }
    );
  }
}

