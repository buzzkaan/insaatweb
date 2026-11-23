import Link from "next/link";
import BrandMark from "./BrandMark";

const serviceLinks = [
  "İnşaat taahhüt",
  "Forklift kiralama",
  "Telehandler kiralama",
];

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink text-bone">
      <div className="section-shell grid gap-12 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:py-20">
        <div>
          <BrandMark />
          <p className="mt-6 max-w-sm text-sm leading-7 text-bone/50">
            İnşaat taahhüt ve iş makinesi hizmetlerinde 38 yıllık saha deneyimi.
            Bursa Yenişehir&apos;den güçlü, planlı ve güvenilir çözümler.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-safety">
            Hizmetler
          </p>
          <ul className="mt-5 space-y-3">
            {serviceLinks.map((item) => (
              <li key={item}>
                <Link href="#hizmetler" className="text-sm text-bone/55 hover:text-bone">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-safety">
            İletişim
          </p>
          <div className="mt-5 space-y-3 text-sm">
            <a href="tel:+905321576433" className="block text-bone/55 hover:text-bone">
              0532 157 64 33
            </a>
            <a href="tel:+905431580896" className="block text-bone/55 hover:text-bone">
              0543 158 08 96
            </a>
            <p className="text-bone/55">Bursa / Yenişehir</p>
          </div>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="section-shell flex flex-col gap-3 py-6 text-xs text-bone/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Yıkılmazlar İnşaat Taahhüt. Tüm hakları saklıdır.</p>
          <p className="font-mono uppercase tracking-[0.12em]">Bursa · Yenişehir</p>
        </div>
      </div>
    </footer>
  );
}
