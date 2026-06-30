"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

type LandingContent = {
  id: number;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutDescription1: string;
  aboutDescription2: string;
  ctaTitle: string;
  ctaDescription: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

const initialForm = {
  heroBadge: "Selamat Datang di RT 02 Kampung Pasawahan",
  heroTitle: "Lingkungan warga yang rukun, tertib, dan saling peduli.",
  heroDescription:
    "Halaman informasi warga RT 02 Kampung Pasawahan, Kelurahan Sayati, Kecamatan Margahayu, Kabupaten Bandung. Website ini menjadi media informasi lingkungan, kegiatan warga, pengumuman, dan dokumentasi kebersamaan warga.",
  aboutLabel: "Tentang Wilayah",
  aboutTitle: "RT 02 Kampung Pasawahan, wilayah warga di Kelurahan Sayati.",
  aboutDescription1:
    "RT 02 Kampung Pasawahan berada di wilayah Kelurahan Sayati, Kecamatan Margahayu, Kabupaten Bandung. Lingkungan ini menjadi tempat warga beraktivitas, berkomunikasi, dan membangun kehidupan sosial yang saling mendukung.",
  aboutDescription2:
    "Dengan semangat kebersamaan, warga dan pengurus RT berupaya menjaga lingkungan tetap nyaman, aman, bersih, serta tertib dalam kegiatan sosial dan administrasi warga.",
  ctaTitle: "Punya informasi atau perubahan data warga?",
  ctaDescription:
    "Silakan hubungi pengurus RT 02 Kampung Pasawahan untuk menyampaikan informasi penting, perubahan data keluarga, atau agenda kegiatan warga.",
};

export default function AdminLandingPage() {
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      try {
        const response = await fetch("/api/admin/landing", {
          cache: "no-store",
        });

        const result: ApiResponse<LandingContent> = await response.json();

        if (!isMounted) return;

        if (!response.ok || !result.success) {
          alert(result.message || "Gagal mengambil konten landing page");
          return;
        }

        if (result.data) {
          setForm({
            heroBadge: result.data.heroBadge || "",
            heroTitle: result.data.heroTitle || "",
            heroDescription: result.data.heroDescription || "",
            aboutLabel: result.data.aboutLabel || "",
            aboutTitle: result.data.aboutTitle || "",
            aboutDescription1: result.data.aboutDescription1 || "",
            aboutDescription2: result.data.aboutDescription2 || "",
            ctaTitle: result.data.ctaTitle || "",
            ctaDescription: result.data.ctaDescription || "",
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

    void loadContent();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.heroTitle || !form.heroDescription || !form.aboutTitle) {
      alert("Judul hero, deskripsi hero, dan judul tentang wajib diisi");
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch("/api/admin/landing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result: ApiResponse<LandingContent> = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Gagal menyimpan konten landing page");
        return;
      }

      alert(result.message || "Konten landing page berhasil disimpan");
    } catch {
      alert("Gagal terhubung ke server");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminShell
      title="Konten Landing Page"
      description="Atur teks utama landing page publik RT 02 Kampung Pasawahan."
    >
      {isLoading ? (
        <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow">
          Memuat konten landing page...
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow">
            <div className="border-b border-slate-200 pb-5">
              <h2 className="text-xl font-semibold">Konten Utama</h2>
              <p className="mt-1 text-sm text-slate-500">
                Konten ini akan digunakan untuk section utama landing page.
              </p>
            </div>

            <div className="mt-6 grid gap-6">
              <section className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-bold text-slate-950">
                  Section Hero
                </h3>

                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Label Hero
                    </label>
                    <input
                      name="heroBadge"
                      value={form.heroBadge}
                      onChange={handleChange}
                      placeholder="Contoh: Selamat Datang di RT 02 Kampung Pasawahan"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Judul Hero <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="heroTitle"
                      value={form.heroTitle}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Masukkan judul hero"
                      className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Deskripsi Hero <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="heroDescription"
                      value={form.heroDescription}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Masukkan deskripsi hero"
                      className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-bold text-slate-950">
                  Section Tentang
                </h3>

                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Label Tentang
                    </label>
                    <input
                      name="aboutLabel"
                      value={form.aboutLabel}
                      onChange={handleChange}
                      placeholder="Contoh: Tentang Wilayah"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Judul Tentang <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="aboutTitle"
                      value={form.aboutTitle}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Masukkan judul tentang"
                      className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Deskripsi Tentang 1
                    </label>
                    <textarea
                      name="aboutDescription1"
                      value={form.aboutDescription1}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Masukkan deskripsi tentang pertama"
                      className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Deskripsi Tentang 2
                    </label>
                    <textarea
                      name="aboutDescription2"
                      value={form.aboutDescription2}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Masukkan deskripsi tentang kedua"
                      className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-bold text-slate-950">
                  Section CTA Bawah
                </h3>

                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Judul CTA
                    </label>
                    <textarea
                      name="ctaTitle"
                      value={form.ctaTitle}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Masukkan judul CTA"
                      className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Deskripsi CTA
                    </label>
                    <textarea
                      name="ctaDescription"
                      value={form.ctaDescription}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Masukkan deskripsi CTA"
                      className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Menyimpan..." : "Simpan Konten"}
              </button>
            </div>
          </form>

          <aside className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">Preview Singkat</h2>
            <p className="mt-1 text-sm text-slate-500">
              Ringkasan konten yang akan tampil di landing page.
            </p>

            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {form.heroBadge || "Label Hero"}
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-slate-950">
                  {form.heroTitle || "Judul hero akan muncul di sini"}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {form.heroDescription ||
                    "Deskripsi hero akan muncul di sini."}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {form.aboutLabel || "Label Tentang"}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-tight text-slate-950">
                  {form.aboutTitle || "Judul tentang akan muncul di sini"}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {form.aboutDescription1 ||
                    "Deskripsi tentang akan muncul di sini."}
                </p>
              </div>

              <div className="rounded-2xl bg-blue-600 p-5 text-white">
                <h3 className="text-xl font-bold">
                  {form.ctaTitle || "Judul CTA"}
                </h3>
                <p className="mt-3 text-sm leading-7 text-blue-50">
                  {form.ctaDescription || "Deskripsi CTA akan muncul di sini."}
                </p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </AdminShell>
  );
}