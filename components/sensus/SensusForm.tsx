import { FormWarga } from "@/types/sensus";

type SensusFormProps = {
  form: FormWarga;
  editId: number | null;
  isOpen: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

export default function SensusForm({
  form,
  editId,
  isOpen,
  onChange,
  onSubmit,
  onClose,
}: SensusFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {editId ? "Edit Data Warga" : "Tambah Data Warga"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Isi data warga RT. Field bertanda * wajib diisi.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Tutup
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={onChange}
              placeholder="Masukkan nama lengkap"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggalLahir"
              value={form.tanggalLahir}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Jenis Kelamin{" "}
              <span className="text-xs font-normal text-slate-400">
                (opsional)
              </span>
            </label>
            <select
              name="jenisKelamin"
              value={form.jenisKelamin}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
            >
              <option value="">Belum diisi</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              NIK <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nik"
              value={form.nik}
              onChange={onChange}
              placeholder="Masukkan 16 digit NIK"
              maxLength={16}
              inputMode="numeric"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-slate-500">
              {form.nik.length}/16 digit
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Nomor KK <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="noKK"
              value={form.noKK}
              onChange={onChange}
              placeholder="Masukkan 16 digit nomor KK"
              maxLength={16}
              inputMode="numeric"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-slate-500">
              {form.noKK.length}/16 digit
            </p>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Alamat{" "}
              <span className="text-xs font-normal text-slate-400">
                (opsional)
              </span>
            </label>
            <input
              type="text"
              name="alamat"
              value={form.alamat}
              onChange={onChange}
              placeholder="Contoh: Blok A No. 12"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Status Keluarga <span className="text-red-500">*</span>
            </label>
            <select
              name="statusKeluarga"
              value={form.statusKeluarga}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
            >
              <option value="">Pilih status keluarga</option>
              <option value="Kepala Keluarga">Kepala Keluarga</option>
              <option value="Istri">Istri</option>
              <option value="Anak">Anak</option>
              <option value="Famili Lain">Famili Lain</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Status Warga <span className="text-red-500">*</span>
            </label>
            <select
              name="statusWarga"
              value={form.statusWarga}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
            >
              <option value="">Pilih status warga</option>
              <option value="Aktif">Aktif</option>
              <option value="Pindah">Pindah</option>
              <option value="Meninggal">Meninggal</option>
            </select>
          </div>

          <div className="flex gap-3 border-t border-slate-200 pt-4 sm:col-span-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {editId ? "Update Data" : "Simpan Data"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}