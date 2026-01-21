import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { driver_id } = await request.json();

    if (!driver_id) {
      return NextResponse.json(
        { detail: "Driver ID is required" },
        { status: 400 }
      );
    }

    const ride = await db.rides.findById(id);
    if (!ride) {
      return NextResponse.json(
        { detail: "Ride not found" },
        { status: 404 }
      );
    }

    if (ride.status !== "pending") {
      return NextResponse.json(
        { detail: "Ride is not available for acceptance" },
        { status: 400 }
      );
    }

    const updatedRide = await db.rides.update(id, {
      driver_id,
      status: "accepted",
    });

    return NextResponse.json(updatedRide);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to accept ride" },
      { status: 500 }
    );
  }
}

