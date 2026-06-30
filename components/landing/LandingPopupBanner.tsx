"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

const defaultBanner: LandingBanner = {
  id: 1,
  isActive: false,
  eyebrow: "",
  title: "",
  description: "",
  imageUrl: "",
  buttonText: "",
  buttonUrl: "",
};

export default function LandingPopupBanner() {
  const [banner, setBanner] = useState<LandingBanner>(defaultBanner);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadBanner = async () => {
      try {
        const response = await fetch("/api/admin/banner", {
          cache: "no-store",
        });

        const result: ApiResponse<LandingBanner> = await response.json();

        if (!isMounted) return;

        if (!response.ok || !result.success || !result.data) {
          return;
        }

        if (!result.data.isActive) {
          return;
        }

        setBanner(result.data);

        const hasClosedPopup = sessionStorage.getItem("rt02_popup_closed");

        if (!hasClosedPopup) {
          const timer = setTimeout(() => {
            if (isMounted) {
              setIsOpen(true);
            }
          }, 600);

          return () => clearTimeout(timer);
        }
      } catch {
        // Jika banner gagal dimuat, landing page tetap tampil normal.
      }
    };

    void loadBanner();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("rt02_popup_closed", "true");
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    handleClose();

    if (!banner.buttonUrl) return;

    if (banner.buttonUrl.startsWith("#")) {
      const target = document.querySelector(banner.buttonUrl);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    window.location.href = banner.buttonUrl;
  };

  if (!isOpen || !banner.isActive) return null;

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
          {banner.imageUrl ? (
            <Image
              src={banner.imageUrl}
              alt={banner.title || "Banner popup"}
              width={1280}
              height={720}
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-3xl shadow-lg">
                  🏘️
                </div>

                {banner.eyebrow ? (
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                    {banner.eyebrow}
                  </p>
                ) : null}

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {banner.title}
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                  {banner.description}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-7">
          {banner.eyebrow ? (
            <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {banner.eyebrow}
            </div>
          ) : null}

          <h3 className="mt-4 text-2xl font-bold text-slate-950">
            {banner.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {banner.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {banner.buttonText ? (
              <button
                onClick={handleButtonClick}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                {banner.buttonText}
              </button>
            ) : null}

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