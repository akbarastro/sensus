import Link from "next/link";

const features = [
  {
    title: "Data Warga Terpusat",
    description:
      "Seluruh data warga, NIK, nomor KK, alamat, dan status keluarga tersimpan dalam satu dashboard yang rapi.",
  },
  {
    title: "Akses Aman",
    description:
      "Dashboard hanya dapat diakses oleh admin yang memiliki username dan password khusus.",
  },
  {
    title: "Import & Export Data",
    description:
      "Admin dapat melakukan import CSV, export CSV, backup data, restore data, dan print laporan warga.",
  },
  {
    title: "Rekap Cepat",
    description:
      "Statistik warga seperti total warga, laki-laki, perempuan, balita, lansia, dan data belum lengkap dapat dilihat dengan cepat.",
  },
];

const schedules = [
  {
    day: "Minggu Pertama",
    title: "Kerja Bakti Lingkungan",
    description: "Kegiatan kebersihan lingkungan RT dan pengecekan fasilitas umum.",
  },
  {
    day: "Minggu Kedua",
    title: "Rapat Pengurus RT",
    description: "Koordinasi pengurus terkait administrasi, keamanan, dan kegiatan warga.",
  },
  {
    day: "Minggu Ketiga",
    title: "Pendataan Warga",
    description: "Pembaruan data warga, KK, status domisili, dan data administrasi lainnya.",
  },
];

const news = [
  {
    category: "Pengumuman",
    title: "Pembaruan Data Warga",
    description:
      "Warga diimbau untuk melaporkan perubahan data keluarga, alamat, atau status domisili kepada pengurus RT.",
  },
  {
    category: "Kegiatan",
    title: "Kerja Bakti Bulanan",
    description:
      "Kegiatan kerja bakti akan dilaksanakan secara berkala untuk menjaga kebersihan lingkungan.",
  },
  {
    category: "Keamanan",
    title: "Peningkatan Keamanan Lingkungan",
    description:
      "Pengurus RT mendorong warga untuk aktif menjaga keamanan dan melaporkan hal mencurigakan.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
              RT
            </div>

            <div>
              <p className="text-sm font-bold leading-none text-slate-950">
                Sensus Warga RT
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Sistem Administrasi Warga
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#tentang" className="hover:text-blue-600">
              Tentang
            </a>
            <a href="#keunggulan" className="hover:text-blue-600">
              Keunggulan
            </a>
            <a href="#jadwal" className="hover:text-blue-600">
              Jadwal
            </a>
            <a href="#berita" className="hover:text-blue-600">
              Berita
            </a>
          </nav>

          <Link
            href="/login"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Login Admin
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100" />

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Dashboard Digital untuk Administrasi Warga RT
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Kelola data warga RT dengan lebih rapi, aman, dan mudah dipantau.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Sistem Sensus Warga RT membantu pengurus dalam mengelola data
              warga, kartu keluarga, status domisili, laporan administrasi,
              serta rekap data lingkungan secara digital.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Masuk Dashboard
              </Link>

              <a
                href="#tentang"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Lihat Informasi RT
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">Aman</p>
                <p className="mt-1 text-xs text-slate-500">Akses admin</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">Rapi</p>
                <p className="mt-1 text-xs text-slate-500">Data terstruktur</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">Cepat</p>
                <p className="mt-1 text-xs text-slate-500">Rekap instan</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">Preview Dashboard</p>
                  <h2 className="mt-1 text-xl font-bold">Sensus Warga RT</h2>
                </div>

                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Online
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Total Warga</p>
                  <h3 className="mt-2 text-3xl font-bold">Data</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Kartu Keluarga</p>
                  <h3 className="mt-2 text-3xl font-bold">KK</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Laporan</p>
                  <h3 className="mt-2 text-3xl font-bold">Print</h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Backup</p>
                  <h3 className="mt-2 text-3xl font-bold">JSON</h3>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">
                  Administrasi lebih mudah
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Pengurus dapat mengelola data warga tanpa harus bergantung
                  pada catatan manual yang rawan tercecer.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">
                  Laporan siap dicetak
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Data warga dapat dicetak menjadi laporan administrasi RT yang
                  lebih formal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Tentang RT
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Lingkungan RT yang tertib dimulai dari data warga yang rapi.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              Rukun Tetangga memiliki peran penting dalam menjaga ketertiban,
              keamanan, dan administrasi warga. Data warga yang rapi membantu
              pengurus mengambil keputusan lebih cepat dan tepat.
            </p>

            <p>
              Melalui sistem ini, proses pendataan warga, pengecekan status
              keluarga, pencarian data, hingga penyusunan laporan dapat dilakukan
              dengan lebih mudah dan terpusat.
            </p>
          </div>
        </div>
      </section>

      <section id="keunggulan" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Keunggulan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Dibuat untuk membantu pekerjaan administrasi RT.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Sistem ini dirancang agar pengurus dapat mengelola data dengan
              lebih efisien, tanpa mengorbankan keamanan akses.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-blue-700">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jadwal" className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Jadwal RT
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Agenda kegiatan lingkungan.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Jadwal ini dapat digunakan sebagai informasi umum untuk warga dan
              pengurus RT.
            </p>
          </div>

          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-sm font-semibold text-blue-600">
                  {schedule.day}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">
                  {schedule.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {schedule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="berita" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Berita & Pengumuman
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Informasi terbaru untuk warga.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-600">
              Section ini dapat digunakan untuk menampilkan pengumuman penting,
              kegiatan warga, dan informasi lingkungan.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {item.category}
                </div>
                <h3 className="text-xl font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Siap mengelola data warga dengan lebih rapi?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50">
              Masuk ke dashboard admin untuk mengelola data sensus warga,
              mencetak laporan, dan memperbarui informasi RT.
            </p>
          </div>

          <Link
            href="/login"
            className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50"
          >
            Login Dashboard
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold">Sensus Warga RT</p>
            <p className="mt-1 text-sm text-slate-400">
              Sistem administrasi dan pendataan warga RT.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Sensus Warga RT. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}