"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminShellProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
};

const menuItems = [
  {
    label: "Data Warga",
    href: "/sensus",
    icon: "👥",
  },
  {
    label: "Pengaturan RT",
    href: "/pengaturan",
    icon: "⚙️",
  },
  {
    label: "Konten Landing Page",
    href: "/admin/landing",
    icon: "📝",
  },
  {
    label: "Banner Popup",
    href: "/admin/banner",
    icon: "🖼️",
  },
];

export default function AdminShell({
  title,
  description,
  children,
  rightContent,
}: AdminShellProps) {
  const pathname = usePathname();

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

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-200 p-6">
            <Link href="/sensus" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
                RT
              </div>

              <div>
                <p className="font-bold leading-tight text-slate-950">
                  Admin RT 02
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Kampung Pasawahan
                </p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <Link
              href="/"
              className="mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              <span>🏠</span>
              <span>Lihat Landing Page</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
                {title}
              </h1>

              {description ? (
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {rightContent}

              <div className="flex gap-2 lg:hidden">
                <Link
                  href="/sensus"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  Warga
                </Link>

                <Link
                  href="/pengaturan"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  Setting
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}