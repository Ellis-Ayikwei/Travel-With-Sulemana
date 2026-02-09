import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "campus-ride-secret-key-change-in-production";

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

export async function GET(request: NextRequest) {
  try {
    const authCheck = await verifyAdmin(request);
    if (authCheck.error) {
      return NextResponse.json(
        { detail: authCheck.error },
        { status: authCheck.status }
      );
    }

    const [allUsers, drivers, rides] = await Promise.all([
      db.users.getAll(),
      db.drivers.getAll(),
      db.rides.getAll(),
    ]);

    // Calculate user stats
    const users = {
      total: allUsers.length,
      customers: allUsers.filter((u) => u.user_type === "customer").length,
      drivers: allUsers.filter((u) => u.user_type === "driver").length,
      admins: allUsers.filter((u) => u.user_type === "admin").length,
    };
    
    const pendingDrivers = drivers.filter((d) => d.verification_status === "pending").length;
    const verifiedDrivers = drivers.filter((d) => d.verification_status === "verified").length;
    const activeDrivers = drivers.filter((d) => d.status === "active").length;
    
    const completedRides = rides.filter((r) => r.status === "completed").length;
    const pendingRides = rides.filter((r) => r.status === "pending").length;
    const inProgressRides = rides.filter((r) => r.status === "in_progress").length;
    
    const totalRevenue = rides
      .filter((r) => r.status === "completed")
      .reduce((sum, r) => sum + (r.fare || 0), 0);
    
    const totalEarnings = drivers.reduce((sum, d) => sum + d.total_earnings, 0);

    return NextResponse.json({
      users: {
        total: users.total || 0,
        customers: users.customers || 0,
        drivers: users.drivers || 0,
        admins: users.admins || 0,
      },
      drivers: {
        total: drivers.length,
        pending: pendingDrivers,
        verified: verifiedDrivers,
        active: activeDrivers,
      },
      rides: {
        total: rides.length,
        completed: completedRides,
        pending: pendingRides,
        in_progress: inProgressRides,
      },
      revenue: {
        total: totalRevenue,
        driver_earnings: totalEarnings,
        commission: totalRevenue - totalEarnings,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

