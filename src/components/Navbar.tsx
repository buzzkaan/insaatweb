"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, Phone, X } from "@phosphor-icons/react";
import BrandMark from "./BrandMark";

const navLinks = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#makine", label: "Makine hareketi" },
  { href: "#hakkimizda", label: "Kurumsal" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 isolate border-b border-bone/10 bg-ink/90 backdrop-blur-xl">
      <nav
        className="section-shell relative z-10 flex h-20 items-center justify-between"
        aria-label="Ana navigasyon"
      >
        <Link
          href="#anasayfa"
          className="min-w-0 shrink-0"
          aria-label="Yıkılmazlar İnşaat ana sayfa"
        >
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-sm font-semibold text-bone/65 hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href="tel:+905321576433"
          className="hidden items-center gap-2 border border-safety bg-safety px-5 py-3 text-sm font-bold text-ink hover:bg-bone xl:inline-flex"
        >
          <Phone size={18} weight="bold" />
          0532 157 64 33
        </a>

        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center border border-bone/15 text-bone hover:border-safety hover:text-safety lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {isOpen ? <X size={23} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full h-[calc(100dvh-5rem)] overflow-y-auto border-b border-bone/10 bg-ink transition-[opacity,transform,visibility] duration-300 lg:hidden ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="section-shell flex min-h-full flex-col py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="border-b border-bone/10 py-4 text-lg font-semibold text-bone/80 hover:text-safety"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+905321576433"
            className="mt-5 inline-flex items-center justify-center gap-2 bg-safety px-5 py-4 font-bold text-ink"
          >
            <Phone size={20} weight="bold" />
            Hemen arayın
          </a>
        </div>
      </div>
    </header>
  );
}
