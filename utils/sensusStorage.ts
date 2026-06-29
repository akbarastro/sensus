import { Warga } from "@/types/sensus";

export const STORAGE_KEY = "dataWarga";
export const STORAGE_EVENT = "dataWargaUpdated";

export const CSV_DELIMITER = ";";

export const CSV_HEADERS = [
  "Nama Lengkap",
  "Tanggal Lahir",
  "Jenis Kelamin",
  "NIK",
  "Nomor KK",
  "Alamat",
  "Status Keluarga",
  "Status Warga",
];

function excelTextNumber(value: string) {
  return `="${value}"`;
}

export const TEMPLATE_ROWS = [
  [
    "Budi Santoso",
    "1988-05-17",
    "Laki-laki",
    excelTextNumber("3201011705880001"),
    excelTextNumber("3201010101010001"),
    "Blok A No. 12",
    "Kepala Keluarga",
    "Aktif",
  ],
  [
    "Siti Aminah",
    "1990-08-21",
    "Perempuan",
    excelTextNumber("3201012108900002"),
    excelTextNumber("3201010101010001"),
    "Blok A No. 12",
    "Istri",
    "Aktif",
  ],
];

export function normalizeData(data: unknown): Warga[] {
  if (!Array.isArray(data)) return [];

  return data.map((item: Partial<Warga> & { ttl?: string }, index) => ({
    id: item.id ?? Date.now() + index,
    nama: item.nama ?? "",
    tanggalLahir: item.tanggalLahir ?? item.ttl ?? "",
    nik: item.nik ?? "",
    noKK: item.noKK ?? "",
    jenisKelamin: item.jenisKelamin ?? "",
    alamat: item.alamat ?? "",
    statusKeluarga: item.statusKeluarga ?? "",
    statusWarga: item.statusWarga ?? "Aktif",
  }));
}

export function getSnapshot() {
  if (typeof window === "undefined") return "[]";

  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

export function getServerSnapshot() {
  return "[]";
}

export function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

export function saveToLocalStorage(nextData: Warga[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function escapeCSVCell(value: string) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function buildCSV(rows: string[][], delimiter = CSV_DELIMITER) {
  return rows
    .map((row) => row.map(escapeCSVCell).join(delimiter))
    .join("\n");
}

export function downloadCSV(filename: string, rows: string[][]) {
  const csvContent = "\uFEFF" + buildCSV(rows, CSV_DELIMITER);

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export function downloadJSON(filename: string, data: Warga[]) {
  const backupData = {
    app: "sensus-rt",
    version: 1,
    exportedAt: new Date().toISOString(),
    totalData: data.length,
    data,
  };

  const blob = new Blob([JSON.stringify(backupData, null, 2)], {
    type: "application/json;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export function detectDelimiter(text: string) {
  const firstLine = text.split(/\r?\n/)[0] || "";

  const semicolonCount = (firstLine.match(/;/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  const tabCount = (firstLine.match(/\t/g) || []).length;

  if (semicolonCount >= commaCount && semicolonCount >= tabCount) {
    return ";";
  }

  if (tabCount >= commaCount && tabCount >= semicolonCount) {
    return "\t";
  }

  return ",";
}

export function parseCSV(text: string) {
  const delimiter = detectDelimiter(text);
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      currentCell += '"';
      i++;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === delimiter && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }

      currentRow.push(currentCell.trim());

      if (currentRow.some((cell) => cell !== "")) {
        rows.push(currentRow);
      }

      currentRow = [];
      currentCell = "";
      continue;
    }

    currentCell += char;
  }

  currentRow.push(currentCell.trim());

  if (currentRow.some((cell) => cell !== "")) {
    rows.push(currentRow);
  }

  return rows;
}

export function normalizeHeader(header: string) {
  return header
    .replace(/^\uFEFF/, "")
    .replaceAll('"', "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function getHeaderIndex(headers: string[], possibleNames: string[]) {
  const normalizedPossibleNames = possibleNames.map(normalizeHeader);

  return headers.findIndex((header) =>
    normalizedPossibleNames.includes(normalizeHeader(header)),
  );
}

export function normalizeDateInput(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const slashMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (slashMatch) {
    const day = slashMatch[1].padStart(2, "0");
    const month = slashMatch[2].padStart(2, "0");
    const year = slashMatch[3];

    return `${year}-${month}-${day}`;
  }

  const dashMatch = trimmed.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);

  if (dashMatch) {
    const day = dashMatch[1].padStart(2, "0");
    const month = dashMatch[2].padStart(2, "0");
    const year = dashMatch[3];

    return `${year}-${month}-${day}`;
  }

  return trimmed;
}

export function cleanIdentityNumber(value: string) {
  return value
    .replace(/^\uFEFF/, "")
    .replace(/^="/, "")
    .replace(/"$/, "")
    .replace(/^'/, "")
    .replace(/\t/g, "")
    .replace(/\s/g, "")
    .replace(/\D/g, "");
}

export function isScientificNotation(value: string) {
  return /e\+?/i.test(value);
}

export function toExcelTextNumber(value: string) {
  return excelTextNumber(value);
}