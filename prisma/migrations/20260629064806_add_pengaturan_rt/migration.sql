-- CreateTable
CREATE TABLE "PengaturanRT" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "namaRT" TEXT NOT NULL DEFAULT '',
    "namaRW" TEXT NOT NULL DEFAULT '',
    "kelurahan" TEXT NOT NULL DEFAULT '',
    "kecamatan" TEXT NOT NULL DEFAULT '',
    "kota" TEXT NOT NULL DEFAULT '',
    "provinsi" TEXT NOT NULL DEFAULT '',
    "namaKetuaRT" TEXT NOT NULL DEFAULT '',
    "noHpKetuaRT" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PengaturanRT_pkey" PRIMARY KEY ("id")
);
