"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

type LandingBanner = {
  id: number;
  isActive: boolean;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

const initialForm = {
  isActive: true,
  eyebrow: "Informasi Warga",
  title: "Selamat Datang di RT 02 Kampung Pasawahan",
  description:
    "Media informasi warga Kelurahan Sayati, Kecamatan Margahayu, Kabupaten Bandung.",
  imageUrl: "",
  buttonText: "Lihat Pengumuman",
  buttonUrl: "#berita",
};

export default function AdminBannerPage() {
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadBanner = async () => {
      try {
        const response = await fetch("/api/admin/banner", {
          cache: "no-store",
        });

        const result: ApiResponse<LandingBanner> = await response.json();

        if (!isMounted) return;

        if (!response.ok || !result.success) {
          alert(result.message || "Gagal mengambil banner popup");
          return;
        }

        if (result.data) {
          setForm({
            isActive: result.data.isActive,
            eyebrow: result.data.eyebrow || "",
            title: result.data.title || "",
            description: result.data.description || "",
            imageUrl: result.data.imageUrl || "",
            buttonText: result.data.buttonText || "",
            buttonUrl: result.data.buttonUrl || "",
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

    void loadBanner();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleToggle = (value: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      isActive: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Judul dan deskripsi banner wajib diisi");
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch("/api/admin/banner", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result: ApiResponse<LandingBanner> = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Gagal menyimpan banner popup");
        return;
      }

      alert(result.message || "Banner popup berhasil disimpan");
    } catch {
      alert("Gagal terhubung ke server");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminShell
      title="Banner Popup"
      description="Atur banner popup 16:9 yang muncul saat landing page dibuka."
    >
      {isLoading ? (
        <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow">
          Memuat banner popup...
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_460px]">
          <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Konten Banner</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Isi banner ini akan ditampilkan pada popup landing page.
                </p>
              </div>

              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => handleToggle(true)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    form.isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  Aktif
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle(false)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    !form.isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  Nonaktif
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Label Kecil
                </label>
                <input
                  name="eyebrow"
                  value={form.eyebrow}
                  onChange={handleChange}
                  placeholder="Contoh: Informasi Warga"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Judul Banner <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul banner"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi banner"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  URL Gambar Banner
                </label>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://... atau /nama-file.jpg"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Boleh dikosongkan. Kalau diisi, gunakan gambar rasio 16:9.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Teks Tombol
                  </label>
                  <input
                    name="buttonText"
                    value={form.buttonText}
                    onChange={handleChange}
                    placeholder="Contoh: Lihat Pengumuman"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Link Tombol
                  </label>
                  <input
                    name="buttonUrl"
                    value={form.buttonUrl}
                    onChange={handleChange}
                    placeholder="#berita atau https://..."
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Menyimpan..." : "Simpan Banner"}
              </button>
            </div>
          </form>

          <aside className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">Preview Popup</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tampilan kasar banner yang akan muncul di landing page.
            </p>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <div className="aspect-video bg-gradient-to-br from-blue-100 via-white to-sky-100">
                {form.imageUrl ? (
                  <img
                    src={form.imageUrl}
                    alt={form.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6">
                    <div className="text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg">
                        🏘️
                      </div>
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                        {form.eyebrow || "Informasi"}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-slate-950">
                        {form.title || "Judul Banner"}
                      </h3>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {form.eyebrow || "Informasi"}
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  {form.title || "Judul Banner"}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {form.description || "Deskripsi banner akan muncul di sini."}
                </p>

                <div className="mt-5">
                  <span className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                    {form.buttonText || "Tombol"}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${
                form.isActive
                  ? "bg-blue-50 text-blue-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Status: {form.isActive ? "Aktif" : "Nonaktif"}
            </div>
          </aside>
        </div>
      )}
    </AdminShell>
  );
}