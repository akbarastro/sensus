import { Warga } from "@/types/sensus";

type StatKey =
  | "all"
  | "kk"
  | "male"
  | "female"
  | "balita"
  | "lansia"
  | "incomplete";

type SensusStatsProps = {
  data: Warga[];
  activeStat: StatKey;
  onStatClick: (key: StatKey) => void;
};

function calculateAgeNumber(tanggalLahir: string) {
  if (!tanggalLahir) return null;

  const birthDate = new Date(tanggalLahir);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function isDataComplete(item: Warga) {
  return Boolean(
    item.nama &&
      item.tanggalLahir &&
      item.nik &&
      item.noKK &&
      item.statusKeluarga &&
      item.statusWarga,
  );
}

export default function SensusStats({
  data,
  activeStat,
  onStatClick,
}: SensusStatsProps) {
  const totalWarga = data.length;

  const totalKK = new Set(
    data.filter((item) => item.noKK).map((item) => item.noKK),
  ).size;

  const totalLakiLaki = data.filter(
    (item) => item.jenisKelamin === "Laki-laki",
  ).length;

  const totalPerempuan = data.filter(
    (item) => item.jenisKelamin === "Perempuan",
  ).length;

  const totalBalita = data.filter((item) => {
    const age = calculateAgeNumber(item.tanggalLahir);
    return age !== null && age <= 5;
  }).length;

  const totalLansia = data.filter((item) => {
    const age = calculateAgeNumber(item.tanggalLahir);
    return age !== null && age >= 60;
  }).length;

  const dataBelumLengkap = data.filter((item) => !isDataComplete(item)).length;

  const stats: {
    key: StatKey;
    title: string;
    value: number;
    clickable: boolean;
    cardClass: string;
    activeClass: string;
    labelClass: string;
  }[] = [
    {
      key: "all",
      title: "Total Warga",
      value: totalWarga,
      clickable: true,
      cardClass: "border-blue-100 bg-blue-50/70 hover:bg-blue-50",
      activeClass: "border-blue-500 ring-2 ring-blue-300",
      labelClass: "text-blue-700",
    },
    {
      key: "kk",
      title: "Total KK",
      value: totalKK,
      clickable: false,
      cardClass: "border-slate-100 bg-white",
      activeClass: "",
      labelClass: "text-slate-500",
    },
    {
      key: "male",
      title: "Laki-laki",
      value: totalLakiLaki,
      clickable: true,
      cardClass: "border-cyan-100 bg-cyan-50/70 hover:bg-cyan-50",
      activeClass: "border-cyan-500 ring-2 ring-cyan-300",
      labelClass: "text-cyan-700",
    },
    {
      key: "female",
      title: "Perempuan",
      value: totalPerempuan,
      clickable: true,
      cardClass: "border-pink-100 bg-pink-50/70 hover:bg-pink-50",
      activeClass: "border-pink-500 ring-2 ring-pink-300",
      labelClass: "text-pink-700",
    },
    {
      key: "balita",
      title: "Balita",
      value: totalBalita,
      clickable: true,
      cardClass: "border-emerald-100 bg-emerald-50/70 hover:bg-emerald-50",
      activeClass: "border-emerald-500 ring-2 ring-emerald-300",
      labelClass: "text-emerald-700",
    },
    {
      key: "lansia",
      title: "Lansia",
      value: totalLansia,
      clickable: true,
      cardClass: "border-violet-100 bg-violet-50/70 hover:bg-violet-50",
      activeClass: "border-violet-500 ring-2 ring-violet-300",
      labelClass: "text-violet-700",
    },
    {
      key: "incomplete",
      title: "Belum Lengkap",
      value: dataBelumLengkap,
      clickable: true,
      cardClass: "border-amber-100 bg-amber-50/70 hover:bg-amber-50",
      activeClass: "border-amber-500 ring-2 ring-amber-300",
      labelClass: "text-amber-700",
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {stats.map((item) => {
        const isActive = activeStat === item.key;

        return (
          <button
            key={item.title}
            type="button"
            onClick={() => item.clickable && onStatClick(item.key)}
            disabled={!item.clickable}
            className={`rounded-xl border p-5 text-left shadow-sm transition ${
              item.cardClass
            } ${
              item.clickable
                ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
                : "cursor-default"
            } ${isActive ? item.activeClass : ""}`}
          >
            <p className={`text-sm font-medium ${item.labelClass}`}>
              {item.title}
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {item.value}
            </h3>
          </button>
        );
      })}
    </div>
  );
}