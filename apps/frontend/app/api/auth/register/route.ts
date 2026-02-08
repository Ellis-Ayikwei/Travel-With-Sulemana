import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, phone, password, first_name, last_name, user_type = "customer" } = await request.json();

    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { detail: "Email, password, first name, and last name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { detail: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db.users.create({
      email,
      phone: phone || "",
      password: hashedPassword,
      first_name,
      last_name,
      user_type: user_type as "customer" | "driver" | "admin",
      is_verified: false,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Registration successful",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}

