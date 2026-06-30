import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type LandingContentPayload = {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroImageUrl?: string;
  activityImageUrl?: string;
  environmentImageUrl?: string;
  aboutLabel?: string;
  aboutTitle?: string;
  aboutDescription1?: string;
  aboutDescription2?: string;
  areaImageUrl?: string;
  galleryImage1Url?: string;
  galleryImage2Url?: string;
  galleryImage3Url?: string;
  galleryImage4Url?: string;
  ctaTitle?: string;
  ctaDescription?: string;
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

const defaultLandingContent = {
  id: 1,
  heroBadge: "Selamat Datang di RT 02 Kampung Pasawahan",
  heroTitle: "Lingkungan warga yang rukun, tertib, dan saling peduli.",
  heroDescription:
    "Halaman informasi warga RT 02 Kampung Pasawahan, Kelurahan Sayati, Kecamatan Margahayu, Kabupaten Bandung. Website ini menjadi media informasi lingkungan, kegiatan warga, pengumuman, dan dokumentasi kebersamaan warga.",
  heroImageUrl: "",
  activityImageUrl: "",
  environmentImageUrl: "",
  aboutLabel: "Tentang Wilayah",
  aboutTitle: "RT 02 Kampung Pasawahan, wilayah warga di Kelurahan Sayati.",
  aboutDescription1:
    "RT 02 Kampung Pasawahan berada di wilayah Kelurahan Sayati, Kecamatan Margahayu, Kabupaten Bandung. Lingkungan ini menjadi tempat warga beraktivitas, berkomunikasi, dan membangun kehidupan sosial yang saling mendukung.",
  aboutDescription2:
    "Dengan semangat kebersamaan, warga dan pengurus RT berupaya menjaga lingkungan tetap nyaman, aman, bersih, serta tertib dalam kegiatan sosial dan administrasi warga.",
  areaImageUrl: "",
  galleryImage1Url: "",
  galleryImage2Url: "",
  galleryImage3Url: "",
  galleryImage4Url: "",
  ctaTitle: "Punya informasi atau perubahan data warga?",
  ctaDescription:
    "Silakan hubungi pengurus RT 02 Kampung Pasawahan untuk menyampaikan informasi penting, perubahan data keluarga, atau agenda kegiatan warga.",
};

export async function GET() {
  try {
    const content = await prisma.landingContent.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: defaultLandingContent,
    });

    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("GET /api/admin/landing error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil konten landing page",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as LandingContentPayload;

    const heroBadge = cleanText(body.heroBadge);
    const heroTitle = cleanText(body.heroTitle);
    const heroDescription = cleanText(body.heroDescription);
    const heroImageUrl = cleanUrl(body.heroImageUrl);
    const activityImageUrl = cleanUrl(body.activityImageUrl);
    const environmentImageUrl = cleanUrl(body.environmentImageUrl);
    const aboutLabel = cleanText(body.aboutLabel);
    const aboutTitle = cleanText(body.aboutTitle);
    const aboutDescription1 = cleanText(body.aboutDescription1);
    const aboutDescription2 = cleanText(body.aboutDescription2);
    const areaImageUrl = cleanUrl(body.areaImageUrl);
    const galleryImage1Url = cleanUrl(body.galleryImage1Url);
    const galleryImage2Url = cleanUrl(body.galleryImage2Url);
    const galleryImage3Url = cleanUrl(body.galleryImage3Url);
    const galleryImage4Url = cleanUrl(body.galleryImage4Url);
    const ctaTitle = cleanText(body.ctaTitle);
    const ctaDescription = cleanText(body.ctaDescription);

    if (!heroTitle) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul hero wajib diisi",
        },
        { status: 400 },
      );
    }

    if (!heroDescription) {
      return NextResponse.json(
        {
          success: false,
          message: "Deskripsi hero wajib diisi",
        },
        { status: 400 },
      );
    }

    if (!aboutTitle) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul tentang wajib diisi",
        },
        { status: 400 },
      );
    }

    const content = await prisma.landingContent.upsert({
      where: {
        id: 1,
      },
      update: {
        heroBadge,
        heroTitle,
        heroDescription,
        heroImageUrl,
        activityImageUrl,
        environmentImageUrl,
        aboutLabel,
        aboutTitle,
        aboutDescription1,
        aboutDescription2,
        areaImageUrl,
        galleryImage1Url,
        galleryImage2Url,
        galleryImage3Url,
        galleryImage4Url,
        ctaTitle,
        ctaDescription,
      },
      create: {
        id: 1,
        heroBadge,
        heroTitle,
        heroDescription,
        heroImageUrl,
        activityImageUrl,
        environmentImageUrl,
        aboutLabel,
        aboutTitle,
        aboutDescription1,
        aboutDescription2,
        areaImageUrl,
        galleryImage1Url,
        galleryImage2Url,
        galleryImage3Url,
        galleryImage4Url,
        ctaTitle,
        ctaDescription,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Konten landing page berhasil disimpan",
      data: content,
    });
  } catch (error) {
    console.error("PUT /api/admin/landing error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan konten landing page",
      },
      { status: 500 },
    );
  }
}