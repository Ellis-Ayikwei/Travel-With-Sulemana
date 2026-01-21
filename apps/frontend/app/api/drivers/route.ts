import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "campus-ride-secret-key-change-in-production";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("user_id");

    if (userId) {
      const driver = await db.drivers.findByUserId(userId);
      if (!driver) {
        return NextResponse.json(
          { detail: "Driver not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(driver);
    }

    const drivers = await db.drivers.getAll();
    return NextResponse.json(drivers);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to fetch drivers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { user_id, ...driverData } = data;

    if (!user_id) {
      return NextResponse.json(
        { detail: "User ID is required" },
        { status: 400 }
      );
    }

    const driver = await db.drivers.create({
      user_id,
      status: "inactive",
      verification_status: "pending",
      total_rides: 0,
      completed_rides: 0,
      average_rating: 0,
      total_earnings: 0,
      ...driverData,
    });

    return NextResponse.json(driver, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to create driver" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const { user_id, ...updates } = data;

    if (!user_id) {
      return NextResponse.json(
        { detail: "User ID is required" },
        { status: 400 }
      );
    }

    const driver = await db.drivers.update(user_id, updates);
    if (!driver) {
      return NextResponse.json(
        { detail: "Driver not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(driver);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to update driver" },
      { status: 500 }
    );
  }
}
