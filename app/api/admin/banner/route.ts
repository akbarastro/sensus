import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type BannerPayload = {
  isActive?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
};

function cleanText(value?: string) {
  return value?.trim() || "";
}

function cleanUrl(value?: string) {
  const url = value?.trim() || "";

  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  ) {
    return url;
  }

  return "";
}

export async function GET() {
  try {
    const banner = await prisma.landingBanner.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        id: 1,
        isActive: true,
        eyebrow: "Informasi Warga",
        title: "Selamat Datang di RT 02 Kampung Pasawahan",
        description:
          "Media informasi warga Kelurahan Sayati, Kecamatan Margahayu, Kabupaten Bandung.",
        imageUrl: "",
        buttonText: "Lihat Pengumuman",
        buttonUrl: "#berita",
      },
    });

    return NextResponse.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error("GET /api/admin/banner error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil banner popup",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as BannerPayload;

    const title = cleanText(body.title);
    const eyebrow = cleanText(body.eyebrow);
    const description = cleanText(body.description);
    const imageUrl = cleanUrl(body.imageUrl);
    const buttonText = cleanText(body.buttonText);
    const buttonUrl = cleanUrl(body.buttonUrl);

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul banner wajib diisi",
        },
        { status: 400 },
      );
    }

    if (!description) {
      return NextResponse.json(
        {
          success: false,
          message: "Deskripsi banner wajib diisi",
        },
        { status: 400 },
      );
    }

    const banner = await prisma.landingBanner.upsert({
      where: {
        id: 1,
      },
      update: {
        isActive: Boolean(body.isActive),
        eyebrow,
        title,
        description,
        imageUrl,
        buttonText,
        buttonUrl,
      },
      create: {
        id: 1,
        isActive: Boolean(body.isActive),
        eyebrow,
        title,
        description,
        imageUrl,
        buttonText,
        buttonUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Banner popup berhasil disimpan",
      data: banner,
    });
  } catch (error) {
    console.error("PUT /api/admin/banner error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan banner popup",
      },
      { status: 500 },
    );
  }
}