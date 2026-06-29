"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SensusForm from "@/components/sensus/SensusForm";
import SensusStats from "@/components/sensus/SensusStats";
import SensusTable from "@/components/sensus/SensusTable";
import SensusDetailModal from "@/components/sensus/SensusDetailModal";
import { FormWarga, SortKey, SortOrder, Warga } from "@/types/sensus";
import {
  CSV_HEADERS,
  TEMPLATE_ROWS,
  cleanIdentityNumber,
  downloadCSV,
  downloadJSON,
  escapeHtml,
  getHeaderIndex,
  isScientificNotation,
  normalizeData,
  normalizeDateInput,
  normalizeHeader,
  parseCSV,
  toExcelTextNumber,
} from "@/utils/sensusStorage";

type StatKey =
  | "all"
  | "kk"
  | "male"
  | "female"
  | "balita"
  | "lansia"
  | "incomplete";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
};

const ITEMS_PER_PAGE = 20;

const initialForm: FormWarga = {
  nama: "",
  tanggalLahir: "",
  nik: "",
  noKK: "",
  jenisKelamin: "",
  alamat: "",
  statusKeluarga: "",
  statusWarga: "Aktif",
};

function calculateAgeNumber(tanggalLahir: string) {
  if (!tanggalLahir) return null;

  const birthDate = new Date(tanggalLahir);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

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

function isBalita(item: Warga) {
  const age = calculateAgeNumber(item.tanggalLahir);
  return age !== null && age <= 5;
}

function isLansia(item: Warga) {
  const age = calculateAgeNumber(item.tanggalLahir);
  return age !== null && age >= 60;
}

function showApiError(message: string, errors?: string[]) {
  if (errors && errors.length > 0) {
    alert(`${message}\n\n${errors.slice(0, 15).join("\n")}`);
    return;
  }

  alert(message);
}

export default function SensusPage() {
  const [dataWarga, setDataWarga] = useState<Warga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState<FormWarga>(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("nama");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterJenisKelamin, setFilterJenisKelamin] = useState("");
  const [filterStatusWarga, setFilterStatusWarga] = useState("");
  const [filterKelengkapan, setFilterKelengkapan] = useState("");

  const [selectedWarga, setSelectedWarga] = useState<Warga | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeStat, setActiveStat] = useState<StatKey>("all");

  const fetchWarga = useCallback(async () => {
    try {
      const response = await fetch("/api/warga", {
        cache: "no-store",
      });

      const result: ApiResponse<Warga[]> = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Gagal mengambil data warga");
        return;
      }

      setDataWarga(normalizeData(result.data || []));
    } catch {
      alert("Gagal terhubung ke server");
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadInitialData() {
      try {
        const response = await fetch("/api/warga", {
          cache: "no-store",
        });

        const result: ApiResponse<Warga[]> = await response.json();

        if (!isActive) return;

        if (!response.ok || !result.success) {
          alert(result.message || "Gagal mengambil data warga");
          return;
        }

        setDataWarga(normalizeData(result.data || []));
      } catch {
        if (isActive) {
          alert("Gagal terhubung ke server");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialData();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredData = useMemo(() => {
    const keyword = searchKeyword.toLowerCase();

    return dataWarga.filter((item) => {
      const matchKeyword =
        item.nama.toLowerCase().includes(keyword) ||
        item.nik.toLowerCase().includes(keyword) ||
        item.noKK.toLowerCase().includes(keyword) ||
        item.alamat.toLowerCase().includes(keyword);

      const matchJenisKelamin =
        !filterJenisKelamin || item.jenisKelamin === filterJenisKelamin;

      const matchStatusWarga =
        !filterStatusWarga || item.statusWarga === filterStatusWarga;

      const matchKelengkapan =
        !filterKelengkapan ||
        (filterKelengkapan === "lengkap" && isDataComplete(item)) ||
        (filterKelengkapan === "belum-lengkap" && !isDataComplete(item));

      const matchActiveStat =
        activeStat === "all" ||
        activeStat === "kk" ||
        (activeStat === "male" && item.jenisKelamin === "Laki-laki") ||
        (activeStat === "female" && item.jenisKelamin === "Perempuan") ||
        (activeStat === "balita" && isBalita(item)) ||
        (activeStat === "lansia" && isLansia(item)) ||
        (activeStat === "incomplete" && !isDataComplete(item));

      return (
        matchKeyword &&
        matchJenisKelamin &&
        matchStatusWarga &&
        matchKelengkapan &&
        matchActiveStat
      );
    });
  }, [
    dataWarga,
    searchKeyword,
    filterJenisKelamin,
    filterStatusWarga,
    filterKelengkapan,
    activeStat,
  ]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const valueA = a[sortKey].toLowerCase();
      const valueB = b[sortKey].toLowerCase();

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;

      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  const totalData = dataWarga.length;
  const filteredDataCount = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(filteredDataCount / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredDataCount);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "nik" || name === "noKK") {
      const onlyNumber = value.replace(/\D/g, "").slice(0, 16);

      setForm((prevForm) => ({
        ...prevForm,
        [name]: onlyNumber,
      }));

      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
    setIsFormOpen(false);
  };

  const handleAddData = () => {
    setForm(initialForm);
    setEditId(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setForm(initialForm);
    setEditId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.nama ||
      !form.tanggalLahir ||
      !form.nik ||
      !form.noKK ||
      !form.statusKeluarga ||
      !form.statusWarga
    ) {
      alert(
        "Nama, tanggal lahir, NIK, Nomor KK, status keluarga, dan status warga wajib diisi",
      );
      return;
    }

    if (form.nik.length !== 16) {
      alert("NIK harus tepat 16 digit");
      return;
    }

    if (form.noKK.length !== 16) {
      alert("Nomor KK harus tepat 16 digit");
      return;
    }

    try {
      const url = editId ? `/api/warga/${editId}` : "/api/warga";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result: ApiResponse<Warga> = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Gagal menyimpan data warga");
        return;
      }

      await fetchWarga();
      resetForm();
    } catch {
      alert("Gagal terhubung ke server");
    }
  };

  const handleEdit = (item: Warga) => {
    setEditId(item.id);

    setForm({
      nama: item.nama,
      tanggalLahir: item.tanggalLahir,
      nik: item.nik,
      noKK: item.noKK,
      jenisKelamin: item.jenisKelamin || "",
      alamat: item.alamat || "",
      statusKeluarga: item.statusKeluarga,
      statusWarga: item.statusWarga,
    });

    setIsFormOpen(true);
  };

  const handleDetail = (item: Warga) => {
    setSelectedWarga(item);
  };

  const handleCloseDetail = () => {
    setSelectedWarga(null);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus data ini?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/warga/${id}`, {
        method: "DELETE",
      });

      const result: ApiResponse<null> = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Gagal menghapus data warga");
        return;
      }

      if (selectedWarga?.id === id) {
        setSelectedWarga(null);
      }

      if (editId === id) {
        resetForm();
      }

      await fetchWarga();
    } catch {
      alert("Gagal terhubung ke server");
    }
  };

  const handleSort = (key: SortKey) => {
    setCurrentPage(1);

    if (sortKey === key) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortOrder("asc");
  };

  const handleSearchChange = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
    setActiveStat("all");
  };

  const handleFilterJenisKelaminChange = (value: string) => {
    setFilterJenisKelamin(value);
    setCurrentPage(1);
    setActiveStat("all");
  };

  const handleFilterStatusWargaChange = (value: string) => {
    setFilterStatusWarga(value);
    setCurrentPage(1);
    setActiveStat("all");
  };

  const handleFilterKelengkapanChange = (value: string) => {
    setFilterKelengkapan(value);
    setCurrentPage(1);
    setActiveStat("all");
  };

  const handleResetFilter = () => {
    setSearchKeyword("");
    setFilterJenisKelamin("");
    setFilterStatusWarga("");
    setFilterKelengkapan("");
    setCurrentPage(1);
    setActiveStat("all");
  };

  const handleStatClick = (key: StatKey) => {
    setSearchKeyword("");
    setFilterJenisKelamin("");
    setFilterStatusWarga("");
    setFilterKelengkapan("");
    setCurrentPage(1);

    if (key === "all" || activeStat === key) {
      setActiveStat("all");
      return;
    }

    setActiveStat(key);
  };

  const handleDownloadTemplateCSV = () => {
    downloadCSV("template-data-sensus-rt.csv", [CSV_HEADERS, ...TEMPLATE_ROWS]);
  };

  const handleExportCSV = () => {
    if (sortedData.length === 0) {
      alert("Tidak ada data untuk diexport");
      return;
    }

    const rows = sortedData.map((item) => [
      item.nama,
      item.tanggalLahir,
      item.jenisKelamin || "",
      toExcelTextNumber(item.nik),
      toExcelTextNumber(item.noKK),
      item.alamat || "",
      item.statusKeluarga,
      item.statusWarga,
    ]);

    downloadCSV("data-sensus-rt.csv", [CSV_HEADERS, ...rows]);
  };

  const handleImportCSV = (file: File) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const text = String(reader.result || "");
      const rows = parseCSV(text);

      if (rows.length < 2) {
        alert("CSV kosong atau belum ada data. Gunakan Template CSV dulu.");
        return;
      }

      const headers = rows[0].map(normalizeHeader);

      const namaIndex = getHeaderIndex(headers, [
        "Nama Lengkap",
        "Nama",
        "Full Name",
      ]);

      const tanggalLahirIndex = getHeaderIndex(headers, [
        "Tanggal Lahir",
        "Tgl Lahir",
        "TTL",
        "Date of Birth",
      ]);

      const jenisKelaminIndex = getHeaderIndex(headers, [
        "Jenis Kelamin",
        "Gender",
        "Kelamin",
      ]);

      const nikIndex = getHeaderIndex(headers, ["NIK"]);

      const noKKIndex = getHeaderIndex(headers, [
        "Nomor KK",
        "No KK",
        "No. KK",
        "KK",
      ]);

      const alamatIndex = getHeaderIndex(headers, ["Alamat", "Address"]);

      const statusKeluargaIndex = getHeaderIndex(headers, [
        "Status Keluarga",
        "Hubungan Keluarga",
      ]);

      const statusWargaIndex = getHeaderIndex(headers, [
        "Status Warga",
        "Status",
      ]);

      const missingHeaders: string[] = [];

      if (namaIndex === -1) missingHeaders.push("Nama Lengkap");
      if (tanggalLahirIndex === -1) missingHeaders.push("Tanggal Lahir");
      if (jenisKelaminIndex === -1) missingHeaders.push("Jenis Kelamin");
      if (nikIndex === -1) missingHeaders.push("NIK");
      if (noKKIndex === -1) missingHeaders.push("Nomor KK");
      if (alamatIndex === -1) missingHeaders.push("Alamat");
      if (statusKeluargaIndex === -1) missingHeaders.push("Status Keluarga");
      if (statusWargaIndex === -1) missingHeaders.push("Status Warga");

      if (missingHeaders.length > 0) {
        alert(
          `Format header CSV belum sesuai.\n\nKolom yang tidak ditemukan:\n${missingHeaders.join(
            "\n",
          )}\n\nSilakan download ulang Template CSV, lalu isi data tanpa mengubah nama kolom.`,
        );
        return;
      }

      const importedData: Warga[] = [];
      const errors: string[] = [];
      const importedNik = new Set<string>();

      rows.slice(1).forEach((row, index) => {
        const rowNumber = index + 2;

        const nama = row[namaIndex]?.trim() || "";
        const tanggalLahir = normalizeDateInput(
          row[tanggalLahirIndex]?.trim() || "",
        );
        const jenisKelamin = row[jenisKelaminIndex]?.trim() || "";

        const rawNik = row[nikIndex]?.trim() || "";
        const rawNoKK = row[noKKIndex]?.trim() || "";

        const nik = cleanIdentityNumber(rawNik);
        const noKK = cleanIdentityNumber(rawNoKK);

        const alamat = row[alamatIndex]?.trim() || "";
        const statusKeluarga = row[statusKeluargaIndex]?.trim() || "";
        const statusWarga = row[statusWargaIndex]?.trim() || "Aktif";

        if (isScientificNotation(rawNik)) {
          errors.push(
            `Baris ${rowNumber}: NIK terbaca scientific notation (${rawNik}). Isi NIK sebagai text.`,
          );
        }

        if (isScientificNotation(rawNoKK)) {
          errors.push(
            `Baris ${rowNumber}: Nomor KK terbaca scientific notation (${rawNoKK}). Isi Nomor KK sebagai text.`,
          );
        }

        if (importedNik.has(nik)) {
          errors.push(`Baris ${rowNumber}: NIK duplikat di file CSV`);
        }

        importedNik.add(nik);

        importedData.push({
          id: Date.now() + index,
          nama,
          tanggalLahir,
          jenisKelamin:
            jenisKelamin === "Laki-laki" || jenisKelamin === "Perempuan"
              ? jenisKelamin
              : "",
          nik,
          noKK,
          alamat,
          statusKeluarga:
            statusKeluarga === "Kepala Keluarga" ||
            statusKeluarga === "Istri" ||
            statusKeluarga === "Anak" ||
            statusKeluarga === "Famili Lain"
              ? statusKeluarga
              : "",
          statusWarga:
            statusWarga === "Aktif" ||
            statusWarga === "Pindah" ||
            statusWarga === "Meninggal"
              ? statusWarga
              : "Aktif",
        });
      });

      if (errors.length > 0) {
        alert(
          `Import gagal. Perbaiki data berikut:\n\n${errors
            .slice(0, 15)
            .join("\n")}${errors.length > 15 ? "\n..." : ""}`,
        );
        return;
      }

      try {
        const response = await fetch("/api/warga/bulk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: importedData,
          }),
        });

        const result: ApiResponse<null> = await response.json();

        if (!response.ok || !result.success) {
          showApiError(result.message || "Import gagal", result.errors);
          return;
        }

        alert(result.message || "Import berhasil");
        await fetchWarga();
      } catch {
        alert("Gagal terhubung ke server");
      }
    };

    reader.readAsText(file);
  };

  const handleBackupJSON = () => {
    if (dataWarga.length === 0) {
      alert("Belum ada data untuk dibackup");
      return;
    }

    downloadJSON("backup-data-sensus-rt.json", dataWarga);
  };

  const handleRestoreJSON = (file: File) => {
    const confirmRestore = confirm(
      "Restore akan mengganti semua data saat ini dengan data dari file backup. Lanjutkan?",
    );

    if (!confirmRestore) return;

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const text = String(reader.result || "");
        const parsed = JSON.parse(text);

        const rawData = Array.isArray(parsed) ? parsed : parsed.data;
        const restoredData = normalizeData(rawData);

        if (restoredData.length === 0) {
          alert("File backup tidak berisi data warga yang valid");
          return;
        }

        const response = await fetch("/api/warga/bulk", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: restoredData,
          }),
        });

        const result: ApiResponse<null> = await response.json();

        if (!response.ok || !result.success) {
          showApiError(result.message || "Restore gagal", result.errors);
          return;
        }

        alert(result.message || "Restore berhasil");
        setSelectedWarga(null);
        resetForm();
        handleResetFilter();
        await fetchWarga();
      } catch {
        alert("File backup tidak valid atau gagal terhubung ke server");
      }
    };

    reader.readAsText(file);
  };

  const handlePrintData = () => {
    if (sortedData.length === 0) {
      alert("Tidak ada data untuk dicetak");
      return;
    }

    const printRows = sortedData
      .map((item, index) => {
        const complete = isDataComplete(item) ? "Lengkap" : "Belum Lengkap";

        return `
          <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(item.nama)}</td>
            <td>${escapeHtml(item.tanggalLahir || "-")}</td>
            <td>${escapeHtml(item.jenisKelamin || "-")}</td>
            <td>${escapeHtml(item.nik)}</td>
            <td>${escapeHtml(item.noKK)}</td>
            <td>${escapeHtml(item.alamat || "-")}</td>
            <td>${escapeHtml(item.statusKeluarga || "-")}</td>
            <td>${escapeHtml(item.statusWarga || "-")}</td>
            <td>${complete}</td>
          </tr>
        `;
      })
      .join("");

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Popup print diblokir browser. Izinkan popup untuk mencetak data.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Data Sensus Warga RT</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 24px;
              color: #111827;
            }

            h1 {
              margin: 0;
              font-size: 22px;
            }

            p {
              margin: 6px 0 18px;
              color: #4b5563;
              font-size: 13px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 11px;
            }

            th, td {
              border: 1px solid #d1d5db;
              padding: 8px;
              text-align: left;
              vertical-align: top;
            }

            th {
              background: #f3f4f6;
              font-weight: 700;
            }

            .summary {
              margin-bottom: 16px;
              display: flex;
              gap: 16px;
              font-size: 13px;
            }

            .summary div {
              border: 1px solid #d1d5db;
              padding: 8px 12px;
              border-radius: 8px;
            }

            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>

        <body>
          <h1>Data Sensus Warga RT</h1>
          <p>Dicetak pada ${new Date().toLocaleDateString("id-ID")}</p>

          <div class="summary">
            <div>Total Data: <strong>${sortedData.length}</strong></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Lengkap</th>
                <th>Tgl Lahir</th>
                <th>Gender</th>
                <th>NIK</th>
                <th>No KK</th>
                <th>Alamat</th>
                <th>Status Keluarga</th>
                <th>Status Warga</th>
                <th>Kelengkapan</th>
              </tr>
            </thead>

            <tbody>
              ${printRows}
            </tbody>
          </table>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const handleLogout = async () => {
    const confirmLogout = confirm("Yakin ingin logout?");

    if (!confirmLogout) return;

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      window.location.href = "/login";
    } catch {
      alert("Gagal logout");
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-slate-900">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Sensus Warga RT</h1>
          <p className="mt-1 text-sm text-slate-500">
            Dashboard sensus warga berbasis database
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow">
          Memuat data warga...
        </div>
      ) : (
        <>
          <SensusStats
            data={dataWarga}
            activeStat={activeStat}
            onStatClick={handleStatClick}
          />

          <SensusTable
            data={paginatedData}
            totalData={totalData}
            filteredDataCount={filteredDataCount}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            sortKey={sortKey}
            sortOrder={sortOrder}
            searchKeyword={searchKeyword}
            filterJenisKelamin={filterJenisKelamin}
            filterStatusWarga={filterStatusWarga}
            filterKelengkapan={filterKelengkapan}
            onSearchChange={handleSearchChange}
            onFilterJenisKelaminChange={handleFilterJenisKelaminChange}
            onFilterStatusWargaChange={handleFilterStatusWargaChange}
            onFilterKelengkapanChange={handleFilterKelengkapanChange}
            onAddData={handleAddData}
            onResetFilter={handleResetFilter}
            onDownloadTemplateCSV={handleDownloadTemplateCSV}
            onExportCSV={handleExportCSV}
            onImportCSV={handleImportCSV}
            onBackupJSON={handleBackupJSON}
            onRestoreJSON={handleRestoreJSON}
            onPrintData={handlePrintData}
            onSort={handleSort}
            onEdit={handleEdit}
            onDetail={handleDetail}
            onDelete={handleDelete}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </>
      )}

      <SensusForm
        form={form}
        editId={editId}
        isOpen={isFormOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={handleCloseForm}
      />

      <SensusDetailModal
        data={selectedWarga}
        allData={dataWarga}
        onClose={handleCloseDetail}
      />
    </div>
  );
}