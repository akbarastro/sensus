import { NextResponse } from "next/server";
import { COOKIE_NAME, createSessionToken } from "@/lib/auth";

type LoginPayload = {
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginPayload;

    const username = body.username?.trim() || "";
    const password = body.password || "";

    const adminUsername = process.env.ADMIN_USERNAME || "";
    const adminPassword = process.env.ADMIN_PASSWORD || "";

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin username/password belum diatur di .env",
        },
        { status: 500 },
      );
    }

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Username atau password salah",
        },
        { status: 401 },
      );
    }

    const token = await createSessionToken(username);
    const response = NextResponse.json({
      success: true,
      message: "Login berhasil",
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal login",
      },
      { status: 500 },
    );
  }
}