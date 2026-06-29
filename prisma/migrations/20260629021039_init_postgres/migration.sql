-- CreateTable
CREATE TABLE "Warga" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tanggalLahir" TEXT NOT NULL,
    "jenisKelamin" TEXT,
    "nik" TEXT NOT NULL,
    "noKK" TEXT NOT NULL,
    "alamat" TEXT,
    "statusKeluarga" TEXT NOT NULL,
    "statusWarga" TEXT NOT NULL DEFAULT 'Aktif',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Warga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Warga_nik_key" ON "Warga"("nik");
