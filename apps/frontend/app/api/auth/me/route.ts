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
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    const user = await db.users.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { detail: "User not found" },
        { status: 404 }
      );
    }

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to fetch user" },
      { status: 500 }
    );
  }
}

