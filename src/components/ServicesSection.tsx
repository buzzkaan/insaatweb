"use client";

import type { ReactNode } from "react";
import { Buildings, PhoneCall, Tractor, Warehouse } from "@phosphor-icons/react";

type ServiceRowProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

function ServiceRow({ icon, eyebrow, title, description, items }: ServiceRowProps) {
  return (
    <article className="grid gap-5 border-t border-ink/20 py-8 sm:gap-6 sm:py-11 lg:grid-cols-[0.28fr_0.72fr_1fr] lg:gap-10 lg:py-14">
      <div className="flex items-start justify-between lg:block">
        <span className="text-safety-dark">{icon}</span>
        <p className="font-mono text-xs font-semibold tracking-[0.1em] text-ink/45 lg:mt-7">
          {eyebrow}
        </p>
      </div>

      <div>
        <h3 className="max-w-[13ch] text-3xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-4xl">
          {title}
        </h3>
        <a
          href="tel:+905321576433"
          className="mt-7 inline-flex items-center gap-2 border-b border-ink/35 pb-1 text-sm font-semibold text-ink hover:border-safety-dark hover:text-safety-dark"
        >
          <PhoneCall size={18} weight="bold" />
          Hizmet için görüşün
        </a>
      </div>

      <div>
        <p className="max-w-[58ch] text-base leading-7 text-ink/62">{description}</p>
        <ul className="mt-7 grid gap-x-7 gap-y-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink/70">
              <span className="h-px w-5 shrink-0 bg-safety-dark" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  return (
    <section id="hizmetler" className="bg-[#f5f3ed] py-20 text-ink sm:py-28 lg:py-36">
      <div className="section-shell">
        <div className="grid gap-6 pb-10 sm:gap-7 sm:pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:pb-16">
          <div>
            <p className="section-kicker !text-ink/55">Hizmet alanları</p>
            <h2 className="section-title mt-6 max-w-[12ch]">Yapı ve makine tek saha planında.</h2>
          </div>
          <p className="max-w-[58ch] text-base leading-8 text-ink/60 lg:justify-self-end">
            Projenin ihtiyacına göre taahhüt, makine kiralama ve operatör desteğini
            birlikte veya ayrı ayrı planlarız.
          </p>
        </div>

        <ServiceRow
          icon={<Buildings size={44} weight="thin" />}
          eyebrow="YAPI"
          title="İnşaat taahhüt"
          description="Konut, ticari ve endüstriyel yapılarda keşiften uygulamaya kadar işi tek elden yönetiriz. Saha koordinasyonu, işçilik takibi ve teslim kontrolleri aynı plan üzerinden ilerler."
          items={["Konut ve ticari yapılar", "Anahtar teslim uygulama", "Tadilat ve güçlendirme", "Saha yönetimi"]}
        />
        <ServiceRow
          icon={<Warehouse size={44} weight="thin" />}
          eyebrow="YÜK TAŞIMA"
          title="Forklift kiralama"
          description="Depo, fabrika ve şantiye sahalarında yük taşıma ve istifleme işleri için çalışma alanına uygun forklift seçenekleri sunarız."
          items={["Günlük ve aylık kiralama", "Operatörlü seçenek", "Sahaya teslim", "Teknik destek"]}
        />
        <ServiceRow
          icon={<Tractor size={44} weight="thin" />}
          eyebrow="YÜKSEK ERİŞİM"
          title="Telehandler kiralama"
          description="Manitou teleskopik yükleyicilerle yüksek erişim ve ağır yük gerektiren işlerde kontrollü, sahaya uygun çalışma sağlarız."
          items={["Manitou seçenekleri", "Teleskopik erişim", "Ağır yük kapasitesi", "Operatör desteği"]}
        />
      </div>
    </section>
  );
}
