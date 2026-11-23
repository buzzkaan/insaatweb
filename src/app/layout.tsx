import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yıkılmazlar İnşaat | İnşaat Taahhüt ve İş Makineleri",
  description:
    "Bursa Yenişehir'de 38 yıllık saha deneyimiyle inşaat taahhüt, forklift ve telehandler kiralama hizmetleri.",
  keywords: [
    "yıkılmazlar inşaat",
    "bursa inşaat",
    "yenişehir inşaat",
    "inşaat taahhüt",
    "forklift kiralama",
    "telehandler kiralama",
    "manitou kiralama",
    "iş makinesi kiralama",
    "bursa yenişehir",
  ],
  openGraph: {
    title: "Yıkılmazlar İnşaat | Bursa Yenişehir",
    description:
      "İnşaat taahhüt ve iş makinesi kiralamada 38 yıllık saha deneyimi.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
