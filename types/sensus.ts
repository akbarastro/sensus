export type JenisKelamin = "Laki-laki" | "Perempuan" | "";

export type StatusKeluarga =
  | "Kepala Keluarga"
  | "Istri"
  | "Anak"
  | "Famili Lain"
  | "";

export type StatusWarga = "Aktif" | "Pindah" | "Meninggal" | "";

export type Warga = {
  id: number;
  nama: string;
  tanggalLahir: string;
  nik: string;
  noKK: string;
  jenisKelamin: JenisKelamin;
  alamat: string;
  statusKeluarga: StatusKeluarga;
  statusWarga: StatusWarga;
};

export type FormWarga = {
  nama: string;
  tanggalLahir: string;
  nik: string;
  noKK: string;
  jenisKelamin: JenisKelamin;
  alamat: string;
  statusKeluarga: StatusKeluarga;
  statusWarga: StatusWarga;
};

export type SortKey = "nama" | "nik" | "noKK";

export type SortOrder = "asc" | "desc";