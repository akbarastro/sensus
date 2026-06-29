import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
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

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const wargaId = Number(id);

    if (Number.isNaN(wargaId)) {
      return NextResponse.json(
        {
          success: false,
          message: "ID warga tidak valid",
        },
        { status: 400 },
      );
    }

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

    const currentWarga = await prisma.warga.findUnique({
      where: {
        id: wargaId,
      },
    });

    if (!currentWarga) {
      return NextResponse.json(
        {
          success: false,
          message: "Data warga tidak ditemukan",
        },
        { status: 404 },
      );
    }

    const nikOwner = await prisma.warga.findUnique({
      where: {
        nik: result.data.nik,
      },
    });

    if (nikOwner && nikOwner.id !== wargaId) {
      return NextResponse.json(
        {
          success: false,
          message: "NIK sudah digunakan oleh warga lain",
        },
        { status: 409 },
      );
    }

    const warga = await prisma.warga.update({
      where: {
        id: wargaId,
      },
      data: result.data,
    });

    return NextResponse.json({
      success: true,
      message: "Data warga berhasil diperbarui",
      data: warga,
    });
  } catch (error) {
    console.error("PUT /api/warga/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui data warga",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const wargaId = Number(id);

    if (Number.isNaN(wargaId)) {
      return NextResponse.json(
        {
          success: false,
          message: "ID warga tidak valid",
        },
        { status: 400 },
      );
    }

    const currentWarga = await prisma.warga.findUnique({
      where: {
        id: wargaId,
      },
    });

    if (!currentWarga) {
      return NextResponse.json(
        {
          success: false,
          message: "Data warga tidak ditemukan",
        },
        { status: 404 },
      );
    }

    await prisma.warga.delete({
      where: {
        id: wargaId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data warga berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE /api/warga/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data warga",
      },
      { status: 500 },
    );
  }
}