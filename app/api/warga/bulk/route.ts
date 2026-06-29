import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type WargaInput = {
  nama?: string;
  tanggalLahir?: string;
  jenisKelamin?: string;
  nik?: string;
  noKK?: string;
  alamat?: string;
  statusKeluarga?: string;
  statusWarga?: string;
};

type ValidatedWarga = {
  nama: string;
  tanggalLahir: string;
  jenisKelamin: string | null;
  nik: string;
  noKK: string;
  alamat: string | null;
  statusKeluarga: string;
  statusWarga: string;
};

type ValidationResult =
  | {
      success: true;
      data: ValidatedWarga;
    }
  | {
      success: false;
      error: string;
    };

function cleanNumber(value: string) {
  return value.replace(/\D/g, "");
}

function validateWarga(data: WargaInput, index: number): ValidationResult {
  const rowNumber = index + 1;

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
    return {
      success: false,
      error: `Data ${rowNumber}: Nama lengkap wajib diisi`,
    };
  }

  if (!tanggalLahir) {
    return {
      success: false,
      error: `Data ${rowNumber}: Tanggal lahir wajib diisi`,
    };
  }

  if (!nik || nik.length !== 16) {
    return {
      success: false,
      error: `Data ${rowNumber}: NIK harus tepat 16 digit`,
    };
  }

  if (!noKK || noKK.length !== 16) {
    return {
      success: false,
      error: `Data ${rowNumber}: Nomor KK harus tepat 16 digit`,
    };
  }

  if (!statusKeluarga) {
    return {
      success: false,
      error: `Data ${rowNumber}: Status keluarga wajib diisi`,
    };
  }

  if (!statusWarga) {
    return {
      success: false,
      error: `Data ${rowNumber}: Status warga wajib diisi`,
    };
  }

  if (!allowedJenisKelamin.includes(jenisKelamin)) {
    return {
      success: false,
      error: `Data ${rowNumber}: Jenis kelamin tidak valid`,
    };
  }

  if (!allowedStatusKeluarga.includes(statusKeluarga)) {
    return {
      success: false,
      error: `Data ${rowNumber}: Status keluarga tidak valid`,
    };
  }

  if (!allowedStatusWarga.includes(statusWarga)) {
    return {
      success: false,
      error: `Data ${rowNumber}: Status warga tidak valid`,
    };
  }

  return {
    success: true,
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

function validateDuplicateNik(data: ValidatedWarga[]) {
  const nikSet = new Set<string>();
  const duplicateNik: string[] = [];

  data.forEach((item) => {
    if (nikSet.has(item.nik)) {
      duplicateNik.push(item.nik);
    }

    nikSet.add(item.nik);
  });

  return duplicateNik;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const wargaInput: WargaInput[] = Array.isArray(body.data) ? body.data : [];

    if (wargaInput.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Tidak ada data untuk diimport",
        },
        { status: 400 },
      );
    }

    const validatedData: ValidatedWarga[] = [];
    const errors: string[] = [];

    for (let i = 0; i < wargaInput.length; i++) {
      const result = validateWarga(wargaInput[i], i);

      if (!result.success) {
        errors.push(result.error);
      } else {
        validatedData.push(result.data);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validasi data gagal",
          errors,
        },
        { status: 400 },
      );
    }

    const duplicateNik = validateDuplicateNik(validatedData);

    if (duplicateNik.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Ada NIK duplikat di data import",
          errors: duplicateNik.map((nik) => `NIK ${nik} duplikat di file`),
        },
        { status: 400 },
      );
    }

    const existingData = await prisma.warga.findMany({
      where: {
        nik: {
          in: validatedData.map((item) => item.nik),
        },
      },
      select: {
        nik: true,
      },
    });

    if (existingData.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Ada NIK yang sudah terdaftar",
          errors: existingData.map(
            (item: { nik: string }) => `NIK ${item.nik} sudah ada di database`,
          ),
        },
        { status: 409 },
      );
    }

    await prisma.warga.createMany({
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      message: `${validatedData.length} data berhasil diimport`,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal import data warga",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const wargaInput: WargaInput[] = Array.isArray(body.data) ? body.data : [];

    if (wargaInput.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "File backup tidak berisi data warga",
        },
        { status: 400 },
      );
    }

    const validatedData: ValidatedWarga[] = [];
    const errors: string[] = [];

    for (let i = 0; i < wargaInput.length; i++) {
      const result = validateWarga(wargaInput[i], i);

      if (!result.success) {
        errors.push(result.error);
      } else {
        validatedData.push(result.data);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validasi backup gagal",
          errors,
        },
        { status: 400 },
      );
    }

    const duplicateNik = validateDuplicateNik(validatedData);

    if (duplicateNik.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Ada NIK duplikat di file backup",
          errors: duplicateNik.map((nik) => `NIK ${nik} duplikat di backup`),
        },
        { status: 400 },
      );
    }

    await prisma.$transaction([
      prisma.warga.deleteMany(),
      prisma.warga.createMany({
        data: validatedData,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `${validatedData.length} data berhasil direstore`,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal restore data warga",
      },
      { status: 500 },
    );
  }
}