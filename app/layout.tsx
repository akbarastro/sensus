import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sensus Warga RT",
    template: "%s | Sensus Warga RT",
  },
  description:
    "Aplikasi dashboard sensus warga RT untuk mengelola data warga, KK, NIK, dan laporan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}