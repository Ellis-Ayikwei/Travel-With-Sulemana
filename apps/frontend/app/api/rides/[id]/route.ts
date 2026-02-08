import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ride = await db.rides.findById(id);
    if (!ride) {
      return NextResponse.json(
        { detail: "Ride not found" },
        { status: 404 }
      );
    }

    // If ride has a driver, try to get driver user info
    let driverInfo = null;
    if (ride.driver_id) {
      try {
        const driverProfile = await db.drivers.findByUserId(ride.driver_id);
        if (driverProfile) {
          const driverUser = await db.users.findById(ride.driver_id);
          if (driverUser) {
            driverInfo = {
              id: driverUser.id,
              first_name: driverUser.first_name,
              last_name: driverUser.last_name,
              email: driverUser.email,
              phone: driverUser.phone,
              vehicle_model: driverProfile.vehicle_model,
              vehicle_plate: driverProfile.vehicle_plate,
            };
          }
        }
      } catch (e) {
        // Driver info not available, continue without it
      }
    }

    return NextResponse.json({
      ...ride,
      driver_info: driverInfo,
    });
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to fetch ride" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();
    const ride = await db.rides.update(id, updates);
    if (!ride) {
      return NextResponse.json(
        { detail: "Ride not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(ride);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to update ride" },
      { status: 500 }
    );
  }
}

