import { SortKey, Warga } from "@/types/sensus";

type SensusTableProps = {
  data: Warga[];
  totalData: number;
  filteredDataCount: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  sortKey: SortKey;
  sortOrder: "asc" | "desc";
  searchKeyword: string;
  filterJenisKelamin: string;
  filterStatusWarga: string;
  filterKelengkapan: string;
  onSearchChange: (value: string) => void;
  onFilterJenisKelaminChange: (value: string) => void;
  onFilterStatusWargaChange: (value: string) => void;
  onFilterKelengkapanChange: (value: string) => void;
  onAddData: () => void;
  onResetFilter: () => void;
  onDownloadTemplateCSV: () => void;
  onExportCSV: () => void;
  onImportCSV: (file: File) => void;
  onBackupJSON: () => void;
  onRestoreJSON: (file: File) => void;
  onPrintData: () => void;
  onSort: (key: SortKey) => void;
  onEdit: (item: Warga) => void;
  onDetail: (item: Warga) => void;
  onDelete: (id: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

function isDataComplete(item: Warga) {
  return Boolean(
    item.nama &&
      item.tanggalLahir &&
      item.nik &&
      item.noKK &&
      item.statusKeluarga &&
      item.statusWarga,
  );
}

export default function SensusTable({
  data,
  totalData,
  filteredDataCount,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  sortKey,
  sortOrder,
  searchKeyword,
  filterJenisKelamin,
  filterStatusWarga,
  filterKelengkapan,
  onSearchChange,
  onFilterJenisKelaminChange,
  onFilterStatusWargaChange,
  onFilterKelengkapanChange,
  onAddData,
  onResetFilter,
  onDownloadTemplateCSV,
  onExportCSV,
  onImportCSV,
  onBackupJSON,
  onRestoreJSON,
  onPrintData,
  onSort,
  onEdit,
  onDetail,
  onDelete,
  onPreviousPage,
  onNextPage,
}: SensusTableProps) {
  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  const hasActiveFilter =
    searchKeyword ||
    filterJenisKelamin ||
    filterStatusWarga ||
    filterKelengkapan;

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Tabel Data Warga</h2>
          <p className="mt-1 text-sm text-slate-500">
            Total data:{" "}
            <span className="font-semibold text-slate-800">{totalData}</span>{" "}
            warga
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onAddData}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Tambah Data
          </button>

          <button
            onClick={onDownloadTemplateCSV}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Template CSV
          </button>

          <label className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
            Import CSV
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  onImportCSV(file);
                }

                e.target.value = "";
              }}
            />
          </label>

          <button
            onClick={onExportCSV}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Export CSV
          </button>

          <button
            onClick={onBackupJSON}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
          >
            Backup
          </button>

          <label className="cursor-pointer rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
            Restore
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  onRestoreJSON(file);
                }

                e.target.value = "";
              }}
            />
          </label>

          <button
            onClick={onPrintData}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Print Data
          </button>
        </div>
      </div>

      <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_180px_180px_200px_auto]">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama, NIK, KK, atau alamat..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
        />

        <select
          value={filterJenisKelamin}
          onChange={(e) => onFilterJenisKelaminChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
        >
          <option value="">Semua Gender</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>

        <select
          value={filterStatusWarga}
          onChange={(e) => onFilterStatusWargaChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
        >
          <option value="">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Pindah">Pindah</option>
          <option value="Meninggal">Meninggal</option>
        </select>

        <select
          value={filterKelengkapan}
          onChange={(e) => onFilterKelengkapanChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
        >
          <option value="">Semua Data</option>
          <option value="lengkap">Data Lengkap</option>
          <option value="belum-lengkap">Belum Lengkap</option>
        </select>

        <button
          onClick={onResetFilter}
          disabled={!hasActiveFilter}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset
        </button>
      </div>

      <p className="mb-3 text-sm text-slate-500">
        Hasil ditampilkan:{" "}
        <span className="font-semibold text-slate-800">
          {filteredDataCount}
        </span>{" "}
        data
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-800">
              <th className="border border-slate-300 px-4 py-3">No</th>

              <th
                onClick={() => onSort("nama")}
                className="cursor-pointer border border-slate-300 px-4 py-3"
              >
                Nama {sortIcon("nama")}
              </th>

              <th className="border border-slate-300 px-4 py-3">
                Tgl Lahir
              </th>

              <th className="border border-slate-300 px-4 py-3">Gender</th>

              <th
                onClick={() => onSort("nik")}
                className="cursor-pointer border border-slate-300 px-4 py-3"
              >
                NIK {sortIcon("nik")}
              </th>

              <th
                onClick={() => onSort("noKK")}
                className="cursor-pointer border border-slate-300 px-4 py-3"
              >
                No KK {sortIcon("noKK")}
              </th>

              <th className="border border-slate-300 px-4 py-3">Alamat</th>

              <th className="border border-slate-300 px-4 py-3">
                Status Keluarga
              </th>

              <th className="border border-slate-300 px-4 py-3">
                Status Warga
              </th>

              <th className="border border-slate-300 px-4 py-3">
                Kelengkapan
              </th>

              <th className="border border-slate-300 px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="border border-slate-300 px-4 py-8 text-center text-slate-500"
                >
                  Belum ada data warga
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const complete = isDataComplete(item);

                return (
                  <tr
                    key={item.id}
                    className="text-slate-800 hover:bg-slate-50"
                  >
                    <td className="border border-slate-200 px-4 py-3">
                      {startIndex + index + 1}
                    </td>

                    <td className="border border-slate-200 px-4 py-3 font-medium">
                      {item.nama}
                    </td>

                    <td className="border border-slate-200 px-4 py-3">
                      {item.tanggalLahir || "-"}
                    </td>

                    <td className="border border-slate-200 px-4 py-3">
                      {item.jenisKelamin || "-"}
                    </td>

                    <td className="border border-slate-200 px-4 py-3">
                      {item.nik}
                    </td>

                    <td className="border border-slate-200 px-4 py-3">
                      {item.noKK}
                    </td>

                    <td className="border border-slate-200 px-4 py-3">
                      {item.alamat || "-"}
                    </td>

                    <td className="border border-slate-200 px-4 py-3">
                      {item.statusKeluarga || "-"}
                    </td>

                    <td className="border border-slate-200 px-4 py-3">
                      {item.statusWarga || "-"}
                    </td>

                    <td className="border border-slate-200 px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          complete
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {complete ? "Lengkap" : "Belum Lengkap"}
                      </span>
                    </td>

                    <td className="border border-slate-200 px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onDetail(item)}
                          className="rounded bg-slate-600 px-3 py-1 text-sm font-medium text-white hover:bg-slate-700"
                        >
                          Detail
                        </button>

                        <button
                          onClick={() => onEdit(item)}
                          className="rounded bg-amber-500 px-3 py-1 text-sm font-medium text-white hover:bg-amber-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(item.id)}
                          className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Menampilkan{" "}
          <span className="font-semibold text-slate-800">
            {filteredDataCount === 0 ? 0 : startIndex + 1}
          </span>{" "}
          -{" "}
          <span className="font-semibold text-slate-800">{endIndex}</span> dari{" "}
          <span className="font-semibold text-slate-800">
            {filteredDataCount}
          </span>{" "}
          data
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page{" "}
            <span className="font-semibold text-slate-900">{currentPage}</span>{" "}
            / {totalPages}
          </span>

          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}