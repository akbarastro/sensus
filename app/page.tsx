import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10 text-slate-900">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
              Dashboard Sensus Warga RT
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Kelola data warga RT dengan lebih rapi, aman, dan mudah diakses.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Aplikasi ini membantu admin RT mencatat data warga, NIK, nomor KK,
              status keluarga, data belum lengkap, import CSV, backup, restore,
              dan cetak laporan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Login Admin
              </Link>

              <Link
                href="/sensus"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Buka Dashboard
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Dashboard hanya bisa diakses setelah login.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">Status Sistem</p>
                  <h2 className="mt-1 text-xl font-bold">Sensus RT</h2>
                </div>

                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Online
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Data Warga</p>
                  <h3 className="mt-2 text-3xl font-bold">Aman</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Database</p>
                  <h3 className="mt-2 text-3xl font-bold">Cloud</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Akses</p>
                  <h3 className="mt-2 text-3xl font-bold">Login</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Laporan</p>
                  <h3 className="mt-2 text-3xl font-bold">CSV</h3>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">Fitur utama</p>
                <p className="mt-1 text-sm text-slate-500">
                  Input data, edit data, filter, import CSV, export CSV,
                  backup, restore, dan print laporan.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">Keamanan</p>
                <p className="mt-1 text-sm text-slate-500">
                  Dashboard dan API data warga dilindungi login admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}