import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "BLOB_READ_WRITE_TOKEN belum terbaca. Cek .env.local lalu restart npm run dev.",
        },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "File tidak ditemukan",
        },
        { status: 400 },
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format gambar harus JPG, PNG, atau WEBP",
        },
        { status: 400 },
      );
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Ukuran gambar maksimal 2MB",
        },
        { status: 400 },
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `banner/banner-${Date.now()}.${extension}`;

    const blob = await put(filename, file, {
      access: "public",
      token,
    });

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil diupload",
      url: blob.url,
    });
  } catch (error) {
    console.error("POST /api/admin/upload error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Gagal upload gambar";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 },
    );
  }
}