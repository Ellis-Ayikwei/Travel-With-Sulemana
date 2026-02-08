import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Get rides
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const riderId = searchParams.get("rider_id");
    const driverId = searchParams.get("driver_id");

    let rides;
    if (status === "available") {
      rides = await db.rides.findAvailable();
    } else if (riderId) {
      rides = await db.rides.findByRider(riderId);
      // Filter by status if provided
      if (status) {
        rides = rides.filter((r) => r.status === status);
      }
    } else if (driverId) {
      rides = await db.rides.findByDriver(driverId);
      // Filter by status if provided
      if (status) {
        rides = rides.filter((r) => r.status === status);
      }
    } else {
      rides = await db.rides.getAll();
      // Filter by status if provided
      if (status) {
        rides = rides.filter((r) => r.status === status);
      }
    }

    return NextResponse.json(rides);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to fetch rides" },
      { status: 500 }
    );
  }
}

// Create ride
export async function POST(request: NextRequest) {
  try {
    const { pickup_location, dropoff_location, rider_id, fare } = await request.json();

    if (!pickup_location || !dropoff_location || !rider_id) {
      return NextResponse.json(
        { detail: "Pickup location, dropoff location, and rider ID are required" },
        { status: 400 }
      );
    }

    const ride = await db.rides.create({
      rider_id,
      pickup_location,
      dropoff_location,
      status: "pending",
      fare,
    });

    return NextResponse.json(ride, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to create ride" },
      { status: 500 }
    );
  }
}

