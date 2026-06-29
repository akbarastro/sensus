import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type PengaturanPayload = {
  namaRT?: string;
  namaRW?: string;
  kelurahan?: string;
  kecamatan?: string;
  kota?: string;
  provinsi?: string;
  namaKetuaRT?: string;
  noHpKetuaRT?: string;
};

function cleanText(value?: string) {
  return value?.trim() || "";
}

function cleanPhone(value?: string) {
  return value?.replace(/[^\d+]/g, "").trim() || "";
}

function validatePengaturan(data: PengaturanPayload) {
  const namaRT = cleanText(data.namaRT);
  const namaRW = cleanText(data.namaRW);
  const kelurahan = cleanText(data.kelurahan);
  const kecamatan = cleanText(data.kecamatan);
  const kota = cleanText(data.kota);
  const provinsi = cleanText(data.provinsi);
  const namaKetuaRT = cleanText(data.namaKetuaRT);
  const noHpKetuaRT = cleanPhone(data.noHpKetuaRT);

  if (!namaRT) {
    return {
      success: false as const,
      message: "Nama RT wajib diisi",
    };
  }

  if (!namaRW) {
    return {
      success: false as const,
      message: "Nama RW wajib diisi",
    };
  }

  if (!kelurahan) {
    return {
      success: false as const,
      message: "Kelurahan wajib diisi",
    };
  }

  if (!kecamatan) {
    return {
      success: false as const,
      message: "Kecamatan wajib diisi",
    };
  }

  if (!kota) {
    return {
      success: false as const,
      message: "Kota/Kabupaten wajib diisi",
    };
  }

  if (!provinsi) {
    return {
      success: false as const,
      message: "Provinsi wajib diisi",
    };
  }

  return {
    success: true as const,
    data: {
      namaRT,
      namaRW,
      kelurahan,
      kecamatan,
      kota,
      provinsi,
      namaKetuaRT,
      noHpKetuaRT,
    },
  };
}

export async function GET() {
  try {
    const pengaturan = await prisma.pengaturanRt.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        id: 1,
      },
    });

    return NextResponse.json({
      success: true,
      data: pengaturan,
    });
  } catch (error) {
    console.error("GET /api/pengaturan error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil pengaturan RT",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as PengaturanPayload;
    const result = validatePengaturan(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 },
      );
    }

    const pengaturan = await prisma.pengaturanRt.upsert({
      where: {
        id: 1,
      },
      update: result.data,
      create: {
        id: 1,
        ...result.data,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pengaturan RT berhasil disimpan",
      data: pengaturan,
    });
  } catch (error) {
    console.error("PUT /api/pengaturan error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan pengaturan RT",
      },
      { status: 500 },
    );
  }
}