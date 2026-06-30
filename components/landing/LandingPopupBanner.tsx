"use client";

import { useEffect, useState } from "react";

export default function LandingPopupBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasClosedPopup = sessionStorage.getItem("rt02_popup_closed");

    if (!hasClosedPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("rt02_popup_closed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-slate-700 shadow hover:bg-white"
          aria-label="Tutup popup"
        >
          ×
        </button>

        <div className="aspect-video bg-gradient-to-br from-blue-100 via-white to-sky-100">
          <div className="flex h-full items-center justify-center p-8">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-3xl shadow-lg">
                🏘️
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                Informasi Warga
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Selamat Datang di RT 02 Kampung Pasawahan
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Media informasi warga Kelurahan Sayati, Kecamatan Margahayu,
                Kabupaten Bandung.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Pengumuman
          </div>

          <h3 className="mt-4 text-2xl font-bold text-slate-950">
            Update Informasi dan Kegiatan Warga
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Warga RT 02 Kampung Pasawahan dapat mengikuti informasi terbaru
            terkait kegiatan lingkungan, kerja bakti, pengumuman warga, dan
            pembaruan data administrasi melalui halaman ini.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#berita"
              onClick={handleClose}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Lihat Pengumuman
            </a>

            <button
              onClick={handleClose}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}