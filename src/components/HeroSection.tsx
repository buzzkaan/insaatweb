import Link from "next/link";

const serviceLines = [
  "İnşaat taahhüt",
  "Forklift kiralama",
  "Telehandler kiralama",
];

export default function HeroSection() {
  return (
    <section
      id="anasayfa"
      className="relative overflow-hidden bg-[#eeece5] pt-20 text-ink"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[12vw] bg-safety lg:block" />

      <div className="section-shell relative grid min-h-[calc(100dvh-5rem)] items-stretch lg:grid-cols-[1.18fr_0.82fr]">
        <div className="flex flex-col justify-center py-14 pr-0 sm:py-20 lg:pr-16 xl:pr-24">
          <p className="section-kicker">
            <span className="sm:hidden">Bursa / Yenişehir</span>
            <span className="hidden sm:inline">Yıkılmazlar İnşaat · Bursa / Yenişehir</span>
          </p>

          <h1 className="display-title mt-6 max-w-[12ch] sm:mt-8">
            Yapıyı kurar,
            <span className="block">yükü taşır,</span>
            <span className="block text-safety-dark">işi bitiririz.</span>
          </h1>

          <p className="mt-6 max-w-[58ch] text-base leading-7 text-ink/65 sm:mt-8 sm:text-lg sm:leading-8">
            İnşaat taahhüt ve iş makinesi hizmetlerini aynı saha planında
            buluşturuyoruz. Bakımlı ekipman, deneyimli ekip ve açık iş programıyla
            projenin başından teslimine kadar tek muhatap sunuyoruz.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <a
              href="tel:+905321576433"
              className="inline-flex min-h-13 items-center justify-center bg-ink px-6 text-sm font-bold text-bone hover:bg-safety hover:text-ink"
            >
              Projenizi konuşalım
            </a>
            <Link
              href="#hizmetler"
              className="inline-flex min-h-13 items-center justify-center border border-ink/25 px-6 text-sm font-semibold text-ink hover:border-ink hover:bg-ink/5"
            >
              Hizmet alanları
            </Link>
          </div>
        </div>

        <aside className="relative border-t border-ink/15 py-8 sm:py-10 lg:border-l lg:border-t-0 lg:py-16 lg:pl-12 xl:pl-16">
          <div className="flex h-full flex-col justify-between lg:max-w-md">
            <div>
              <div className="flex items-end justify-between border-b border-ink/20 pb-6">
                <div>
                  <p className="font-mono text-xs font-semibold tracking-[0.12em] text-ink/50">
                    SAHA DENEYİMİ
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink/60">1988&apos;den bugüne</p>
                </div>
                <strong className="font-mono text-6xl font-medium leading-none tracking-[-0.08em] sm:text-7xl">
                  38
                </strong>
              </div>

              <div className="mt-8 sm:mt-10">
                <p className="text-sm font-semibold text-ink/50">Çalışma alanlarımız</p>
                <ul className="mt-4">
                  {serviceLines.map((service) => (
                    <li
                      key={service}
                      className="flex items-center justify-between border-t border-ink/15 py-3.5 text-base font-semibold tracking-[-0.02em] sm:py-4 sm:text-lg"
                    >
                      {service}
                      <span className="size-2 bg-safety" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-l-2 border-safety pl-5 sm:mt-12">
              <p className="text-sm leading-6 text-ink/60">
                Operatörlü veya operatörsüz kiralama seçenekleri, günlük ve dönemsel
                çalışma planları.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
