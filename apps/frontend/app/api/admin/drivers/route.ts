import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "campus-ride-secret-key-change-in-production";

// Middleware to check admin status
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await db.users.findById(decoded.id);
    
    if (!user || user.user_type !== "admin") {
      return { error: "Forbidden: Admin access required", status: 403 };
    }
    
    return { user };
  } catch (error) {
    return { error: "Invalid token", status: 401 };
  }
}

// Get all drivers with optional filters
export async function GET(request: NextRequest) {
  try {
    const authCheck = await verifyAdmin(request);
    if (authCheck.error) {
      return NextResponse.json(
        { detail: authCheck.error },
        { status: authCheck.status }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("verification_status");
    
    let drivers = await db.drivers.getAll();
    
    // Get user info for each driver
    const driversWithUserInfo = await Promise.all(
      drivers.map(async (driver) => {
        const user = await db.users.findById(driver.user_id);
        return {
          ...driver,
          user: user ? {
            id: user.id,
            email: user.email,
            phone: user.phone,
            first_name: user.first_name,
            last_name: user.last_name,
          } : null,
        };
      })
    );
    
    // Filter by verification status if provided
    if (status) {
      const filtered = driversWithUserInfo.filter((d) => d.verification_status === status);
      return NextResponse.json(filtered);
    }
    
    return NextResponse.json(driversWithUserInfo);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to fetch drivers" },
      { status: 500 }
    );
  }
}

// Update driver verification status
export async function PATCH(request: NextRequest) {
  try {
    const authCheck = await verifyAdmin(request);
    if (authCheck.error) {
      return NextResponse.json(
        { detail: authCheck.error },
        { status: authCheck.status }
      );
    }

    const { user_id, verification_status, ...otherUpdates } = await request.json();
    
    if (!user_id) {
      return NextResponse.json(
        { detail: "User ID is required" },
        { status: 400 }
      );
    }

    if (verification_status && !["pending", "verified", "rejected"].includes(verification_status)) {
      return NextResponse.json(
        { detail: "Invalid verification status" },
        { status: 400 }
      );
    }

    const updates: any = { ...otherUpdates };
    if (verification_status) {
      updates.verification_status = verification_status;
    }

    const driver = await db.drivers.update(user_id, updates);
    if (!driver) {
      return NextResponse.json(
        { detail: "Driver not found" },
        { status: 404 }
      );
    }

    // Get user info
    const user = await db.users.findById(user_id);
    
    return NextResponse.json({
      ...driver,
      user: user ? {
        id: user.id,
        email: user.email,
        phone: user.phone,
        first_name: user.first_name,
        last_name: user.last_name,
      } : null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to update driver" },
      { status: 500 }
    );
  }
}

