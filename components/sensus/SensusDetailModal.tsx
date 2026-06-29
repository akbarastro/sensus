import { Warga } from "@/types/sensus";

type SensusDetailModalProps = {
  data: Warga | null;
  allData: Warga[];
  onClose: () => void;
};

function calculateAge(tanggalLahir: string) {
  if (!tanggalLahir) return "-";

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

  return `${age} tahun`;
}

function isDataComplete(data: Warga) {
  return Boolean(
    data.nama &&
      data.tanggalLahir &&
      data.nik &&
      data.noKK &&
      data.statusKeluarga &&
      data.statusWarga,
  );
}

export default function SensusDetailModal({
  data,
  allData,
  onClose,
}: SensusDetailModalProps) {
  if (!data) return null;

  const familyMembers = allData.filter((item) => item.noKK === data.noKK);
  const dataComplete = isDataComplete(data);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900">
                Detail Warga
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  dataComplete
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {dataComplete ? "Data Lengkap" : "Perlu Dilengkapi"}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Informasi lengkap warga dan anggota keluarga dalam satu KK
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Tutup
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Nama Lengkap</p>
            <p className="mt-1 font-semibold text-slate-900">{data.nama}</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Tanggal Lahir</p>
            <p className="mt-1 font-semibold text-slate-900">
              {data.tanggalLahir || "-"}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Umur</p>
            <p className="mt-1 font-semibold text-slate-900">
              {calculateAge(data.tanggalLahir)}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Jenis Kelamin</p>
            <p className="mt-1 font-semibold text-slate-900">
              {data.jenisKelamin || "-"}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">NIK</p>
            <p className="mt-1 font-semibold text-slate-900">{data.nik}</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Nomor KK</p>
            <p className="mt-1 font-semibold text-slate-900">{data.noKK}</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Status Keluarga</p>
            <p className="mt-1 font-semibold text-slate-900">
              {data.statusKeluarga || "-"}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Status Warga</p>
            <p className="mt-1 font-semibold text-slate-900">
              {data.statusWarga || "-"}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">
            <p className="text-xs text-slate-500">Alamat</p>
            <p className="mt-1 font-semibold text-slate-900">
              {data.alamat || "-"}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200">
          <div className="border-b border-slate-200 p-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Anggota Keluarga
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Total{" "}
              <span className="font-semibold text-slate-800">
                {familyMembers.length}
              </span>{" "}
              anggota dalam Nomor KK ini
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border-b border-slate-200 px-4 py-3">No</th>
                  <th className="border-b border-slate-200 px-4 py-3">
                    Nama
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3">
                    Status Keluarga
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3">
                    Umur
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3">
                    Status Warga
                  </th>
                </tr>
              </thead>

              <tbody>
                {familyMembers.map((member, index) => (
                  <tr
                    key={member.id}
                    className={`text-slate-800 hover:bg-slate-50 ${
                      member.id === data.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="border-b border-slate-100 px-4 py-3">
                      {index + 1}
                    </td>

                    <td className="border-b border-slate-100 px-4 py-3 font-medium">
                      {member.nama}
                      {member.id === data.id && (
                        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          Dipilih
                        </span>
                      )}
                    </td>

                    <td className="border-b border-slate-100 px-4 py-3">
                      {member.statusKeluarga || "-"}
                    </td>

                    <td className="border-b border-slate-100 px-4 py-3">
                      {calculateAge(member.tanggalLahir)}
                    </td>

                    <td className="border-b border-slate-100 px-4 py-3">
                      {member.statusWarga || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}