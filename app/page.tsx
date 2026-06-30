import Link from "next/link";

const highlights = [
  {
    title: "Lingkungan Rukun",
    description:
      "Mendorong hubungan warga yang harmonis, saling peduli, dan aktif dalam kegiatan lingkungan.",
  },
  {
    title: "Keamanan Bersama",
    description:
      "Warga bersama pengurus menjaga ketertiban dan keamanan lingkungan secara gotong royong.",
  },
  {
    title: "Kegiatan Warga",
    description:
      "Berbagai kegiatan rutin dilakukan untuk mempererat silaturahmi dan menjaga kebersihan lingkungan.",
  },
];

const facilities = [
  "Pos ronda lingkungan",
  "Area kerja bakti warga",
  "Jalur akses lingkungan",
  "Informasi pengumuman warga",
  "Koordinasi pengurus RT",
  "Pendataan administrasi warga",
];

const schedules = [
  {
    day: "Minggu Pertama",
    title: "Kerja Bakti Lingkungan",
    description:
      "Kegiatan membersihkan area sekitar rumah, saluran air, dan fasilitas umum lingkungan.",
  },
  {
    day: "Minggu Kedua",
    title: "Rapat Pengurus RT",
    description:
      "Koordinasi pengurus untuk membahas kegiatan warga, keamanan, dan kebutuhan lingkungan.",
  },
  {
    day: "Minggu Ketiga",
    title: "Pendataan Warga",
    description:
      "Pembaruan informasi warga, keluarga baru, pindahan, dan data administrasi lainnya.",
  },
  {
    day: "Kondisional",
    title: "Kegiatan Sosial Warga",
    description:
      "Kegiatan sosial, bantuan warga, kunjungan, dan agenda bersama sesuai kebutuhan lingkungan.",
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
      "Kerja bakti lingkungan dilakukan secara berkala untuk menjaga kebersihan dan kenyamanan bersama.",
  },
  {
    category: "Keamanan",
    title: "Peningkatan Ketertiban Lingkungan",
    description:
      "Warga diharapkan aktif menjaga keamanan sekitar dan segera melapor jika ada hal mencurigakan.",
  },
];

const galleryItems = [
  {
    title: "Kegiatan Warga",
    description: "Dokumentasi kegiatan warga dan kebersamaan lingkungan.",
  },
  {
    title: "Lingkungan RT",
    description: "Suasana lingkungan tempat tinggal warga.",
  },
  {
    title: "Kerja Bakti",
    description: "Kegiatan kebersihan dan gotong royong warga.",
  },
  {
    title: "Rapat Warga",
    description: "Koordinasi dan musyawarah untuk kepentingan bersama.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
              RT
            </div>

            <div>
              <p className="text-sm font-bold leading-none text-slate-950">
                Informasi Warga RT
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Lingkungan, Kegiatan, dan Pengumuman
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#tentang" className="hover:text-emerald-600">
              Tentang
            </a>
            <a href="#lingkungan" className="hover:text-emerald-600">
              Lingkungan
            </a>
            <a href="#jadwal" className="hover:text-emerald-600">
              Jadwal
            </a>
            <a href="#berita" className="hover:text-emerald-600">
              Berita
            </a>
            <a href="#galeri" className="hover:text-emerald-600">
              Galeri
            </a>
          </nav>

          <Link
            href="/login"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Login Pengurus
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-100" />

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Selamat Datang di Lingkungan RT Kami
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Membangun lingkungan yang rukun, aman, bersih, dan saling peduli.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Website ini menjadi pusat informasi warga untuk mengenal lingkungan
              RT, melihat agenda kegiatan, mengikuti pengumuman terbaru, dan
              mempererat komunikasi antarwarga.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#tentang"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Lihat Profil RT
              </a>

              <a
                href="#berita"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Baca Pengumuman
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">Rukun</p>
                <p className="mt-1 text-xs text-slate-500">Antarwarga</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">Aman</p>
                <p className="mt-1 text-xs text-slate-500">Lingkungan</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">Bersih</p>
                <p className="mt-1 text-xs text-slate-500">Gotong royong</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl">
              <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-emerald-100 via-slate-100 to-blue-100">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-2xl shadow-sm">
                    🏘️
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    Space Foto Lingkungan RT
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Bisa diganti dengan foto gapura, jalan lingkungan, atau
                    kegiatan warga.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-slate-100">
                  <div className="text-center text-sm text-slate-500">
                    📷
                    <p className="mt-2 font-semibold">Foto Kegiatan</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-emerald-50">
                  <div className="text-center text-sm text-slate-500">
                    🌿
                    <p className="mt-2 font-semibold">Foto Lingkungan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Tentang RT
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Lingkungan tempat warga saling mengenal, membantu, dan menjaga.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              Rukun Tetangga menjadi ruang terdekat bagi warga untuk saling
              berkoordinasi, menyampaikan informasi, menjaga keamanan, serta
              membangun kebersamaan dalam kehidupan sehari-hari.
            </p>

            <p>
              Melalui semangat gotong royong, warga bersama pengurus RT
              berupaya menciptakan lingkungan yang nyaman, tertib, bersih, dan
              responsif terhadap kebutuhan warga.
            </p>
          </div>
        </div>
      </section>

      <section id="lingkungan" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Keunggulan Lingkungan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Nilai utama yang dijaga bersama warga.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Lingkungan yang baik terbentuk dari komunikasi warga, kepedulian,
              dan partisipasi aktif dalam setiap kegiatan.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex aspect-[16/10] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-emerald-100">
                <div className="text-center">
                  <div className="text-4xl">🛣️</div>
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    Space Foto Area Lingkungan
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-950">
                Fasilitas & Informasi Lingkungan
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Beberapa informasi umum yang dapat ditampilkan untuk warga agar
                lebih mudah mengenal lingkungan RT.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {facilities.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="jadwal" className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Jadwal Kegiatan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Agenda rutin untuk menjaga kebersamaan warga.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Jadwal dapat disesuaikan dengan kebutuhan lingkungan dan keputusan
              bersama warga.
            </p>
          </div>

          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-sm font-semibold text-emerald-600">
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
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                Berita & Pengumuman
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Informasi terbaru untuk warga.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-600">
              Bagian ini dapat digunakan untuk menampilkan pengumuman penting,
              agenda kegiatan, dan informasi lingkungan.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
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

      <section id="galeri" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Galeri Lingkungan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Dokumentasi kegiatan dan suasana warga.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Space ini bisa diisi dengan foto kegiatan RT, kerja bakti, rapat
              warga, fasilitas lingkungan, atau momen kebersamaan lainnya.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item, index) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-100 to-emerald-50">
                  <div className="text-center">
                    <div className="text-4xl">{index % 2 === 0 ? "📸" : "🌱"}</div>
                    <p className="mt-3 text-xs font-semibold text-slate-500">
                      Space Gambar
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-600 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Punya informasi atau perubahan data warga?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50">
              Silakan hubungi pengurus RT untuk menyampaikan informasi penting,
              perubahan data keluarga, atau agenda kegiatan warga.
            </p>
          </div>

          <Link
            href="/login"
            className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50"
          >
            Login Pengurus
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold">Informasi Warga RT</p>
            <p className="mt-1 text-sm text-slate-400">
              Media informasi lingkungan, kegiatan, dan pengumuman warga.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Informasi Warga RT. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}