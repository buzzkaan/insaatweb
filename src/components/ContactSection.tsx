"use client";

import { FormEvent, useState } from "react";
import {
  ClockCountdown,
  MapPin,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react";

type FormData = {
  name: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = { name: "", phone: "", message: "" };

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSent(false);
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (formData.name.trim().length < 2) nextErrors.name = "Lütfen adınızı yazın.";
    if (formData.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Geçerli bir telefon numarası yazın.";
    }
    if (formData.message.trim().length < 10) {
      nextErrors.message = "İşinizi en az 10 karakterle kısaca anlatın.";
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSent(false);
      return;
    }

    const text = [
      "Merhaba Yıkılmazlar İnşaat,",
      `Ben ${formData.name.trim()}.`,
      formData.message.trim(),
      `Telefon: ${formData.phone.trim()}`,
    ].join("\n");

    window.open(
      `https://wa.me/905321576433?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  return (
    <section id="iletisim" className="bg-safety py-20 text-ink sm:py-24 lg:py-32">
      <div className="section-shell">
        <div className="grid overflow-hidden border border-ink/20 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:min-h-[680px] lg:p-12">
            <div>
              <span className="section-kicker !text-ink/60">İletişim</span>
              <h2 className="section-title mt-6 max-w-[10ch]">Sahayı konuşalım.</h2>
              <p className="mt-7 max-w-md text-base leading-7 text-ink/65 md:text-lg">
                İhtiyacınızı anlatın; işinize uygun ekip ve makine planını birlikte
                netleştirelim.
              </p>
            </div>

            <div className="mt-14 space-y-3">
              <a
                href="tel:+905321576433"
                className="flex items-center justify-between border-t border-ink/25 py-4 font-mono text-base font-bold hover:bg-ink hover:px-4 hover:text-safety"
              >
                <span className="flex items-center gap-3">
                  <Phone size={22} weight="bold" />
                  0532 157 64 33
                </span>
                <span className="hidden text-xs uppercase tracking-[0.1em] sm:inline">Birinci hat</span>
              </a>
              <a
                href="tel:+905431580896"
                className="flex items-center justify-between border-t border-ink/25 py-4 font-mono text-base font-bold hover:bg-ink hover:px-4 hover:text-safety"
              >
                <span className="flex items-center gap-3">
                  <Phone size={22} weight="bold" />
                  0543 158 08 96
                </span>
                <span className="hidden text-xs uppercase tracking-[0.1em] sm:inline">İkinci hat</span>
              </a>
              <a
                href="https://maps.google.com/?q=40.264247,29.650844"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 border-y border-ink/25 py-4 font-semibold hover:bg-ink hover:px-4 hover:text-safety"
              >
                <MapPin size={22} weight="bold" />
                Bursa / Yenişehir
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm font-semibold text-ink/60">
              <ClockCountdown size={21} weight="bold" />
              Gelen taleplere en kısa sürede dönüş sağlanır.
            </div>
          </div>

          <div className="bg-ink p-6 text-bone sm:p-10 lg:p-14">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-safety">
              Hızlı teklif formu
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              İşinizi kısaca tarif edin.
            </h3>
            <p className="mt-3 max-w-lg leading-7 text-bone/55">
              Form, bilgilerinizi WhatsApp mesajı olarak hazırlar. Göndermeden önce
              mesajı kontrol edebilirsiniz.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-7" noValidate>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-bone">
                  Adınız soyadınız
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="min-h-14 w-full border border-bone/20 bg-bone/[0.04] px-4 text-base text-bone placeholder:text-bone/30 focus:border-safety focus:outline-none"
                  placeholder="Adınızı yazın"
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm font-medium text-safety">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-bone">
                  Telefon numaranız
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : "phone-help"}
                  className="min-h-14 w-full border border-bone/20 bg-bone/[0.04] px-4 text-base text-bone placeholder:text-bone/30 focus:border-safety focus:outline-none"
                  placeholder="05XX XXX XX XX"
                />
                {errors.phone ? (
                  <p id="phone-error" className="mt-2 text-sm font-medium text-safety">
                    {errors.phone}
                  </p>
                ) : (
                  <p id="phone-help" className="mt-2 text-xs text-bone/35">
                    Sadece sizinle iletişim kurmak için kullanılır.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-bone">
                  İhtiyacınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full resize-none border border-bone/20 bg-bone/[0.04] p-4 text-base leading-7 text-bone placeholder:text-bone/30 focus:border-safety focus:outline-none"
                  placeholder="İşin türü, konumu ve tercih ettiğiniz tarih..."
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm font-medium text-safety">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex min-h-15 w-full items-center justify-center gap-3 bg-safety px-6 text-sm font-black uppercase tracking-[0.08em] text-ink hover:bg-bone"
              >
                <WhatsappLogo size={23} weight="fill" />
                WhatsApp&apos;ta teklifi hazırlayın
              </button>

              {sent && (
                <p
                  role="status"
                  className="border border-safety/40 bg-safety/10 px-4 py-3 text-sm leading-6 text-safety"
                >
                  Mesajınız yeni sekmede hazırlandı. WhatsApp&apos;ta kontrol edip
                  gönderebilirsiniz.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
