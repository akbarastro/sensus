import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

type WargaPayload = {
  nama?: string;
  tanggalLahir?: string;
  jenisKelamin?: string;
  nik?: string;
  noKK?: string;
  alamat?: string;
  statusKeluarga?: string;
  statusWarga?: string;
};

function cleanNumber(value: string) {
  return value.replace(/\D/g, "");
}

function validateWarga(data: WargaPayload) {
  const nama = data.nama?.trim() || "";
  const tanggalLahir = data.tanggalLahir?.trim() || "";
  const jenisKelamin = data.jenisKelamin?.trim() || "";
  const nik = cleanNumber(data.nik || "");
  const noKK = cleanNumber(data.noKK || "");
  const alamat = data.alamat?.trim() || "";
  const statusKeluarga = data.statusKeluarga?.trim() || "";
  const statusWarga = data.statusWarga?.trim() || "Aktif";

  const allowedJenisKelamin = ["", "Laki-laki", "Perempuan"];
  const allowedStatusKeluarga = [
    "Kepala Keluarga",
    "Istri",
    "Anak",
    "Famili Lain",
  ];
  const allowedStatusWarga = ["Aktif", "Pindah", "Meninggal"];

  if (!nama) {
    return { success: false as const, error: "Nama lengkap wajib diisi" };
  }

  if (!tanggalLahir) {
    return { success: false as const, error: "Tanggal lahir wajib diisi" };
  }

  if (!nik || nik.length !== 16) {
    return { success: false as const, error: "NIK harus tepat 16 digit" };
  }

  if (!noKK || noKK.length !== 16) {
    return { success: false as const, error: "Nomor KK harus tepat 16 digit" };
  }

  if (!statusKeluarga) {
    return { success: false as const, error: "Status keluarga wajib diisi" };
  }

  if (!statusWarga) {
    return { success: false as const, error: "Status warga wajib diisi" };
  }

  if (!allowedJenisKelamin.includes(jenisKelamin)) {
    return { success: false as const, error: "Jenis kelamin tidak valid" };
  }

  if (!allowedStatusKeluarga.includes(statusKeluarga)) {
    return { success: false as const, error: "Status keluarga tidak valid" };
  }

  if (!allowedStatusWarga.includes(statusWarga)) {
    return { success: false as const, error: "Status warga tidak valid" };
  }

  return {
    success: true as const,
    data: {
      nama,
      tanggalLahir,
      jenisKelamin: jenisKelamin || null,
      nik,
      noKK,
      alamat: alamat || null,
      statusKeluarga,
      statusWarga,
    },
  };
}

export async function GET() {
  try {
    const warga = await prisma.warga.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: warga,
    });
  } catch (error) {
    console.error("GET /api/warga error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data warga",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WargaPayload;
    const result = validateWarga(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error,
        },
        { status: 400 },
      );
    }

    const existingWarga = await prisma.warga.findUnique({
      where: {
        nik: result.data.nik,
      },
    });

    if (existingWarga) {
      return NextResponse.json(
        {
          success: false,
          message:
            "NIK sudah terdaftar. Satu warga hanya boleh memiliki satu NIK.",
        },
        { status: 409 },
      );
    }

    const warga = await prisma.warga.create({
      data: result.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data warga berhasil ditambahkan",
        data: warga,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/warga error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambahkan data warga",
      },
      { status: 500 },
    );
  }
}