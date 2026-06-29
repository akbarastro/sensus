"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type PengaturanRt = {
  id: number;
  namaRT: string;
  namaRW: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  namaKetuaRT: string;
  noHpKetuaRT: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

const initialForm = {
  namaRT: "",
  namaRW: "",
  kelurahan: "",
  kecamatan: "",
  kota: "",
  provinsi: "",
  namaKetuaRT: "",
  noHpKetuaRT: "",
};

export default function PengaturanPage() {
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPengaturan = async () => {
      try {
        const response = await fetch("/api/pengaturan", {
          cache: "no-store",
        });

        const result: ApiResponse<PengaturanRt> = await response.json();

        if (!isMounted) return;

        if (!response.ok || !result.success) {
          alert(result.message || "Gagal mengambil pengaturan RT");
          return;
        }

        if (result.data) {
          setForm({
            namaRT: result.data.namaRT || "",
            namaRW: result.data.namaRW || "",
            kelurahan: result.data.kelurahan || "",
            kecamatan: result.data.kecamatan || "",
            kota: result.data.kota || "",
            provinsi: result.data.provinsi || "",
            namaKetuaRT: result.data.namaKetuaRT || "",
            noHpKetuaRT: result.data.noHpKetuaRT || "",
          });
        }
      } catch {
        if (isMounted) {
          alert("Gagal terhubung ke server");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadPengaturan();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.namaRT ||
      !form.namaRW ||
      !form.kelurahan ||
      !form.kecamatan ||
      !form.kota ||
      !form.provinsi
    ) {
      alert(
        "RT, RW, kelurahan, kecamatan, kota/kabupaten, dan provinsi wajib diisi",
      );
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch("/api/pengaturan", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result: ApiResponse<PengaturanRt> = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Gagal menyimpan pengaturan RT");
        return;
      }

      alert(result.message || "Pengaturan RT berhasil disimpan");
    } catch {
      alert("Gagal terhubung ke server");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pengaturan RT</h1>
            <p className="mt-1 text-sm text-slate-500">
              Atur identitas wilayah untuk laporan dan data sensus warga.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/sensus"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Kembali ke Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow">
            Memuat pengaturan RT...
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl bg-white p-6 shadow"
            >
              <h2 className="text-xl font-semibold">Identitas Wilayah</h2>
              <p className="mt-1 text-sm text-slate-500">
                Data ini akan digunakan untuk header laporan, print, dan
                identitas dashboard.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Nama RT <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="namaRT"
                    value={form.namaRT}
                    onChange={handleChange}
                    placeholder="Contoh: RT 001"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Nama RW <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="namaRW"
                    value={form.namaRW}
                    onChange={handleChange}
                    placeholder="Contoh: RW 005"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Kelurahan <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="kelurahan"
                    value={form.kelurahan}
                    onChange={handleChange}
                    placeholder="Masukkan kelurahan"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Kecamatan <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="kecamatan"
                    value={form.kecamatan}
                    onChange={handleChange}
                    placeholder="Masukkan kecamatan"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Kota/Kabupaten <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="kota"
                    value={form.kota}
                    onChange={handleChange}
                    placeholder="Contoh: Kota Bandung"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="provinsi"
                    value={form.provinsi}
                    onChange={handleChange}
                    placeholder="Contoh: Jawa Barat"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Nama Ketua RT
                  </label>
                  <input
                    name="namaKetuaRT"
                    value={form.namaKetuaRT}
                    onChange={handleChange}
                    placeholder="Masukkan nama ketua RT"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Nomor HP Ketua RT
                  </label>
                  <input
                    name="noHpKetuaRT"
                    value={form.noHpKetuaRT}
                    onChange={handleChange}
                    placeholder="Contoh: 081234567890"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Pengaturan"}
                </button>
              </div>
            </form>

            <aside className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-xl font-semibold">Preview Identitas</h2>
              <p className="mt-1 text-sm text-slate-500">
                Preview data wilayah yang akan muncul di laporan.
              </p>

              <div className="mt-6 rounded-xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">Wilayah</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {form.namaRT || "RT -"} / {form.namaRW || "RW -"}
                </h3>

                <div className="mt-5 space-y-3 text-sm">
                  <div>
                    <p className="text-slate-500">Kelurahan</p>
                    <p className="font-semibold text-slate-900">
                      {form.kelurahan || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Kecamatan</p>
                    <p className="font-semibold text-slate-900">
                      {form.kecamatan || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Kota/Kabupaten</p>
                    <p className="font-semibold text-slate-900">
                      {form.kota || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Provinsi</p>
                    <p className="font-semibold text-slate-900">
                      {form.provinsi || "-"}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <p className="text-slate-500">Ketua RT</p>
                    <p className="font-semibold text-slate-900">
                      {form.namaKetuaRT || "-"}
                    </p>
                    <p className="mt-1 text-slate-500">
                      {form.noHpKetuaRT || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}