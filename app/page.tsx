import Link from "next/link";
import LandingPopupBanner from "@/components/landing/LandingPopupBanner";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const rtProfile = {
  rt: "RT 02",
  kampung: "Kampung Pasawahan",
  kelurahan: "Kelurahan Sayati",
  kecamatan: "Kecamatan Margahayu",
  kabupaten: "Kabupaten Bandung",
};

const defaultLandingContent = {
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

async function getLandingContent() {
  try {
    const content = await prisma.landingContent.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        id: 1,
        ...defaultLandingContent,
      },
    });

    return content;
  } catch {
    return defaultLandingContent;
  }
}

const highlights = [
  {
    title: "Lingkungan Warga yang Rukun",
    description:
      "RT 02 Kampung Pasawahan menjadi ruang warga untuk saling mengenal, menjaga komunikasi, dan memperkuat rasa kebersamaan.",
  },
  {
    title: "Gotong Royong Lingkungan",
    description:
      "Kegiatan kebersihan dan kepedulian lingkungan dilakukan bersama untuk menjaga kenyamanan wilayah tempat tinggal.",
  },
  {
    title: "Informasi Warga Terpusat",
    description:
      "Pengumuman, kegiatan, dan informasi penting warga dapat disampaikan dengan lebih mudah melalui halaman informasi ini.",
  },
];

const facilities = [
  "Informasi kegiatan warga",
  "Pengumuman lingkungan RT",
  "Koordinasi pengurus RT",
  "Kegiatan kerja bakti",
  "Pendataan administrasi warga",
  "Komunikasi antarwarga",
];

const schedules = [
  {
    day: "Minggu Pertama",
    title: "Kerja Bakti Lingkungan",
    description:
      "Kegiatan membersihkan area sekitar lingkungan, saluran air, dan titik-titik yang menjadi fasilitas bersama warga.",
  },
  {
    day: "Minggu Kedua",
    title: "Koordinasi Pengurus RT",
    description:
      "Pengurus RT melakukan koordinasi terkait informasi warga, keamanan, kegiatan sosial, dan kebutuhan lingkungan.",
  },
  {
    day: "Minggu Ketiga",
    title: "Pembaruan Data Warga",
    description:
      "Warga dapat menyampaikan perubahan data keluarga, alamat, status domisili, atau informasi administrasi lainnya.",
  },
  {
    day: "Kondisional",
    title: "Kegiatan Sosial Warga",
    description:
      "Kegiatan sosial, bantuan warga, musyawarah, dan agenda bersama dilakukan sesuai kebutuhan lingkungan.",
  },
];

const news = [
  {
    category: "Pengumuman",
    title: "Pembaruan Informasi Warga",
    description:
      "Warga RT 02 Kampung Pasawahan diimbau untuk menyampaikan perubahan data keluarga atau alamat kepada pengurus RT.",
  },
  {
    category: "Kegiatan",
    title: "Kerja Bakti Lingkungan",
    description:
      "Kegiatan kerja bakti menjadi agenda bersama untuk menjaga kebersihan dan kenyamanan lingkungan sekitar.",
  },
  {
    category: "Keamanan",
    title: "Menjaga Ketertiban Lingkungan",
    description:
      "Warga diharapkan tetap menjaga ketertiban, keamanan, dan saling peduli terhadap kondisi lingkungan sekitar.",
  },
];

const galleryItems = [
  {
    title: "Suasana Lingkungan",
    description: "Space untuk foto area lingkungan RT 02 Kampung Pasawahan.",
  },
  {
    title: "Kegiatan Warga",
    description: "Space untuk dokumentasi kegiatan warga dan kebersamaan.",
  },
  {
    title: "Kerja Bakti",
    description: "Space untuk foto kegiatan gotong royong lingkungan.",
  },
  {
    title: "Koordinasi Warga",
    description: "Space untuk dokumentasi rapat atau musyawarah warga.",
  },
];

export default async function HomePage() {
  const landingContent = await getLandingContent();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <LandingPopupBanner />

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
              02
            </div>

            <div>
              <p className="text-sm font-bold leading-none text-slate-950">
                RT 02 Kampung Pasawahan
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Sayati, Margahayu, Kabupaten Bandung
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#tentang" className="hover:text-blue-600">
              Tentang
            </a>
            <a href="#lingkungan" className="hover:text-blue-600">
              Lingkungan
            </a>
            <a href="#jadwal" className="hover:text-blue-600">
              Jadwal
            </a>
            <a href="#berita" className="hover:text-blue-600">
              Berita
            </a>
            <a href="#galeri" className="hover:text-blue-600">
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100" />

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {landingContent.heroBadge}
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {landingContent.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {landingContent.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#tentang"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
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
              <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">Rukun</p>
                <p className="mt-1 text-xs text-slate-500">Antarwarga</p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">Tertib</p>
                <p className="mt-1 text-xs text-slate-500">Lingkungan</p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">Peduli</p>
                <p className="mt-1 text-xs text-slate-500">Sesama warga</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-2xl">
              <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-100 via-slate-50 to-sky-100">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-2xl shadow-sm">
                    🏘️
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    Space Foto Lingkungan RT 02
                  </p>
                  <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                    Bisa diganti dengan foto gapura, jalan lingkungan, pos
                    warga, atau suasana Kampung Pasawahan.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white p-3 shadow-sm">
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-blue-50">
                  <div className="text-center text-sm text-slate-500">
                    📷
                    <p className="mt-2 font-semibold">Foto Kegiatan</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white p-3 shadow-sm">
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-sky-50">
                  <div className="text-center text-sm text-slate-500">
                    🌤️
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
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              {landingContent.aboutLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {landingContent.aboutTitle}
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>{landingContent.aboutDescription1}</p>

            <p>{landingContent.aboutDescription2}</p>
          </div>
        </div>
      </section>

      <section id="lingkungan" className="bg-blue-50/40 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Lingkungan Warga
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Nilai yang dijaga bersama di RT 02 Kampung Pasawahan.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Kehidupan lingkungan yang baik dibangun melalui komunikasi,
              kepedulian, dan partisipasi warga dalam menjaga kenyamanan
              bersama.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-700">
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
            <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-sm">
              <div className="flex aspect-[16/10] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-blue-100">
                <div className="text-center">
                  <div className="text-4xl">🛣️</div>
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    Space Foto Area Kampung Pasawahan
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Tempat untuk foto jalan, gang, fasilitas, atau lingkungan RT.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-950">
                Informasi Lingkungan
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Beberapa informasi umum yang dapat ditampilkan sebagai pengenal
                lingkungan untuk warga RT 02 Kampung Pasawahan.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {facilities.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm font-semibold text-slate-700"
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
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Jadwal Kegiatan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Agenda warga RT 02 Kampung Pasawahan.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Jadwal kegiatan dapat menyesuaikan kebutuhan lingkungan dan hasil
              musyawarah warga bersama pengurus RT.
            </p>
          </div>

          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.title}
                className="rounded-3xl border border-blue-100 bg-blue-50/40 p-6"
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

      <section id="berita" className="bg-blue-50/40 px-6 py-20">
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
              Bagian ini dapat digunakan untuk menampilkan pengumuman penting,
              agenda kegiatan, dan informasi lingkungan RT 02 Kampung
              Pasawahan.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"
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

      <section id="galeri" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Galeri Lingkungan
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Dokumentasi kegiatan dan suasana lingkungan.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Space ini dapat diisi dengan foto kegiatan RT, kerja bakti,
              suasana Kampung Pasawahan, atau momen kebersamaan warga.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item, index) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100">
                  <div className="text-center">
                    <div className="text-4xl">
                      {index % 2 === 0 ? "📸" : "🏡"}
                    </div>
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

      <section className="bg-blue-600 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">{landingContent.ctaTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50">
              {landingContent.ctaDescription}
            </p>
          </div>

          <Link
            href="/login"
            className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50"
          >
            Login Pengurus
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold">RT 02 Kampung Pasawahan</p>
            <p className="mt-1 text-sm text-slate-400">
              {rtProfile.kelurahan}, {rtProfile.kecamatan},{" "}
              {rtProfile.kabupaten}
            </p>
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} RT 02 Kampung Pasawahan. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}