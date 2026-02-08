import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "campus-ride-secret-key-change-in-production";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { detail: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; user_type?: string };
    
    // Check if user exists and is a driver/admin
    const user = await db.users.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { detail: "User not found" },
        { status: 404 }
      );
    }

    // If user is not a driver/admin, return 403
    if (user.user_type !== "driver" && user.user_type !== "admin") {
      return NextResponse.json(
        { detail: "User is not registered as a driver" },
        { status: 403 }
      );
    }
    
    let driver = await db.drivers.findByUserId(decoded.id);
    
    // If no driver profile exists but user is a driver, create a minimal one
    if (!driver && (user.user_type === "driver" || user.user_type === "admin")) {
      driver = await db.drivers.create({
        user_id: decoded.id,
        status: "inactive",
        verification_status: "pending",
        total_rides: 0,
        completed_rides: 0,
        average_rating: 0,
        total_earnings: 0,
      });
    }
    
    if (!driver) {
      return NextResponse.json(
        { detail: "Driver profile not found. Please complete driver registration." },
        { status: 404 }
      );
    }

    return NextResponse.json(driver);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to fetch driver profile" },
      { status: 500 }
    );
  }
}

