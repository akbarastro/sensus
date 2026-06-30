"use client";

import { useEffect, useRef, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

type ImageFieldName =
  | "heroImageUrl"
  | "activityImageUrl"
  | "environmentImageUrl"
  | "areaImageUrl"
  | "galleryImage1Url"
  | "galleryImage2Url"
  | "galleryImage3Url"
  | "galleryImage4Url";

type LandingContent = {
  id: number;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  activityImageUrl: string;
  environmentImageUrl: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutDescription1: string;
  aboutDescription2: string;
  areaImageUrl: string;
  galleryImage1Url: string;
  galleryImage2Url: string;
  galleryImage3Url: string;
  galleryImage4Url: string;
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
  heroImageUrl: "",
  activityImageUrl: "",
  environmentImageUrl: "",
  aboutLabel: "Tentang Wilayah",
  aboutTitle: "RT 02 Kampung Pasawahan, wilayah warga di Kelurahan Sayati.",
  aboutDescription1:
    "RT 02 Kampung Pasawahan berada di wilayah Kelurahan Sayati, Kecamatan Margahayu, Kabupaten Bandung. Lingkungan ini menjadi tempat warga beraktivitas, berkomunikasi, dan membangun kehidupan sosial yang saling mendukung.",
  aboutDescription2:
    "Dengan semangat kebersamaan, warga dan pengurus RT berupaya menjaga lingkungan tetap nyaman, aman, bersih, serta tertib dalam kegiatan sosial dan administrasi warga.",
  areaImageUrl: "",
  galleryImage1Url: "",
  galleryImage2Url: "",
  galleryImage3Url: "",
  galleryImage4Url: "",
  ctaTitle: "Punya informasi atau perubahan data warga?",
  ctaDescription:
    "Silakan hubungi pengurus RT 02 Kampung Pasawahan untuk menyampaikan informasi penting, perubahan data keluarga, atau agenda kegiatan warga.",
};

type ImageUploadCardProps = {
  title: string;
  description: string;
  value: string;
  fieldName: ImageFieldName;
  isUploading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onUpload: (file: File, fieldName: ImageFieldName) => void;
  onRemove: (fieldName: ImageFieldName) => void;
};

function ImageUploadCard({
  title,
  description,
  value,
  fieldName,
  isUploading,
  inputRef,
  onUpload,
  onRemove,
}: ImageUploadCardProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        disabled={isUploading}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onUpload(file, fieldName);
          }
        }}
        className="hidden"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>

          {value ? (
            <p className="mt-2 text-xs font-semibold text-blue-600">
              Gambar sudah terupload. Jangan lupa klik Simpan Konten.
            </p>
          ) : (
            <p className="mt-2 text-xs text-slate-500">Belum ada gambar.</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? "Mengupload..." : "Upload Gambar"}
          </button>

          {value ? (
            <button
              type="button"
              onClick={() => onRemove(fieldName)}
              className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Hapus Gambar
            </button>
          ) : null}
        </div>
      </div>

      {value ? (
        <div className="mt-4 overflow-hidden rounded-2xl bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={title}
            className="h-44 w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}

export default function AdminLandingPage() {
  const heroImageInputRef = useRef<HTMLInputElement | null>(null);
  const activityImageInputRef = useRef<HTMLInputElement | null>(null);
  const environmentImageInputRef = useRef<HTMLInputElement | null>(null);
  const areaImageInputRef = useRef<HTMLInputElement | null>(null);
  const galleryImage1InputRef = useRef<HTMLInputElement | null>(null);
  const galleryImage2InputRef = useRef<HTMLInputElement | null>(null);
  const galleryImage3InputRef = useRef<HTMLInputElement | null>(null);
  const galleryImage4InputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<ImageFieldName | null>(
    null,
  );

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
            heroImageUrl: result.data.heroImageUrl || "",
            activityImageUrl: result.data.activityImageUrl || "",
            environmentImageUrl: result.data.environmentImageUrl || "",
            aboutLabel: result.data.aboutLabel || "",
            aboutTitle: result.data.aboutTitle || "",
            aboutDescription1: result.data.aboutDescription1 || "",
            aboutDescription2: result.data.aboutDescription2 || "",
            areaImageUrl: result.data.areaImageUrl || "",
            galleryImage1Url: result.data.galleryImage1Url || "",
            galleryImage2Url: result.data.galleryImage2Url || "",
            galleryImage3Url: result.data.galleryImage3Url || "",
            galleryImage4Url: result.data.galleryImage4Url || "",
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

  const getInputRef = (fieldName: ImageFieldName) => {
    const refs = {
      heroImageUrl: heroImageInputRef,
      activityImageUrl: activityImageInputRef,
      environmentImageUrl: environmentImageInputRef,
      areaImageUrl: areaImageInputRef,
      galleryImage1Url: galleryImage1InputRef,
      galleryImage2Url: galleryImage2InputRef,
      galleryImage3Url: galleryImage3InputRef,
      galleryImage4Url: galleryImage4InputRef,
    };

    return refs[fieldName];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleUploadImage = async (file: File, fieldName: ImageFieldName) => {
    try {
      setUploadingField(fieldName);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result: {
        success: boolean;
        message?: string;
        url?: string;
      } = await response.json();

      if (!response.ok || !result.success || !result.url) {
        alert(result.message || "Gagal upload gambar");
        return;
      }

      setForm((prevForm) => ({
        ...prevForm,
        [fieldName]: result.url || "",
      }));

      alert("Gambar berhasil diupload. Jangan lupa klik Simpan Konten.");
    } catch {
      alert("Gagal upload gambar");
    } finally {
      setUploadingField(null);

      const inputRef = getInputRef(fieldName);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (fieldName: ImageFieldName) => {
    const confirmRemove = confirm("Yakin ingin menghapus gambar ini?");

    if (!confirmRemove) return;

    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: "",
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
      description="Atur teks dan semua gambar landing page publik RT 02 Kampung Pasawahan."
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
                Konten ini akan digunakan untuk landing page publik.
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

                  <ImageUploadCard
                    title="Gambar Hero Utama"
                    description="Gambar besar di sisi kanan hero. Rekomendasi rasio 4:3. Maksimal 2MB."
                    value={form.heroImageUrl}
                    fieldName="heroImageUrl"
                    inputRef={heroImageInputRef}
                    isUploading={uploadingField === "heroImageUrl"}
                    onUpload={handleUploadImage}
                    onRemove={handleRemoveImage}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <ImageUploadCard
                      title="Gambar Kegiatan Kecil"
                      description="Gambar kecil di bawah hero. Rasio 4:3. Maksimal 2MB."
                      value={form.activityImageUrl}
                      fieldName="activityImageUrl"
                      inputRef={activityImageInputRef}
                      isUploading={uploadingField === "activityImageUrl"}
                      onUpload={handleUploadImage}
                      onRemove={handleRemoveImage}
                    />

                    <ImageUploadCard
                      title="Gambar Lingkungan Kecil"
                      description="Gambar kecil kedua di bawah hero. Rasio 4:3. Maksimal 2MB."
                      value={form.environmentImageUrl}
                      fieldName="environmentImageUrl"
                      inputRef={environmentImageInputRef}
                      isUploading={uploadingField === "environmentImageUrl"}
                      onUpload={handleUploadImage}
                      onRemove={handleRemoveImage}
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

                  <ImageUploadCard
                    title="Gambar Area Lingkungan"
                    description="Gambar di section Lingkungan Warga. Rekomendasi rasio 16:10 atau 16:9. Maksimal 2MB."
                    value={form.areaImageUrl}
                    fieldName="areaImageUrl"
                    inputRef={areaImageInputRef}
                    isUploading={uploadingField === "areaImageUrl"}
                    onUpload={handleUploadImage}
                    onRemove={handleRemoveImage}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-bold text-slate-950">
                  Galeri Landing Page
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Upload 4 gambar untuk section galeri di bagian bawah landing page.
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <ImageUploadCard
                    title="Galeri 1"
                    description="Gambar galeri pertama. Rasio 4:3. Maksimal 2MB."
                    value={form.galleryImage1Url}
                    fieldName="galleryImage1Url"
                    inputRef={galleryImage1InputRef}
                    isUploading={uploadingField === "galleryImage1Url"}
                    onUpload={handleUploadImage}
                    onRemove={handleRemoveImage}
                  />

                  <ImageUploadCard
                    title="Galeri 2"
                    description="Gambar galeri kedua. Rasio 4:3. Maksimal 2MB."
                    value={form.galleryImage2Url}
                    fieldName="galleryImage2Url"
                    inputRef={galleryImage2InputRef}
                    isUploading={uploadingField === "galleryImage2Url"}
                    onUpload={handleUploadImage}
                    onRemove={handleRemoveImage}
                  />

                  <ImageUploadCard
                    title="Galeri 3"
                    description="Gambar galeri ketiga. Rasio 4:3. Maksimal 2MB."
                    value={form.galleryImage3Url}
                    fieldName="galleryImage3Url"
                    inputRef={galleryImage3InputRef}
                    isUploading={uploadingField === "galleryImage3Url"}
                    onUpload={handleUploadImage}
                    onRemove={handleRemoveImage}
                  />

                  <ImageUploadCard
                    title="Galeri 4"
                    description="Gambar galeri keempat. Rasio 4:3. Maksimal 2MB."
                    value={form.galleryImage4Url}
                    fieldName="galleryImage4Url"
                    inputRef={galleryImage4InputRef}
                    isUploading={uploadingField === "galleryImage4Url"}
                    onUpload={handleUploadImage}
                    onRemove={handleRemoveImage}
                  />
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
                disabled={isSaving || Boolean(uploadingField)}
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

                {form.heroImageUrl ? (
                  <div className="mt-4 overflow-hidden rounded-2xl bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.heroImageUrl}
                      alt="Preview hero"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                ) : null}
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

                {form.areaImageUrl ? (
                  <div className="mt-4 overflow-hidden rounded-2xl bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.areaImageUrl}
                      alt="Preview area"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-950">
                  Preview Galeri
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    form.galleryImage1Url,
                    form.galleryImage2Url,
                    form.galleryImage3Url,
                    form.galleryImage4Url,
                  ].map((imageUrl, index) => (
                    <div
                      key={`preview-gallery-${index}`}
                      className="overflow-hidden rounded-xl bg-slate-100"
                    >
                      {imageUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imageUrl}
                            alt={`Preview galeri ${index + 1}`}
                            className="h-24 w-full object-cover"
                          />
                        </>
                      ) : (
                        <div className="flex h-24 items-center justify-center text-xs text-slate-400">
                          Galeri {index + 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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