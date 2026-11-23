"use client";

import { useEffect, useRef, useState } from "react";
import Excavator3D from "./Excavator3D";

const stages = [
  {
    label: "Konumlanma",
    title: "Dar sahada kontrollü dönüş",
    description:
      "Paletli yürüyüş takımı ve döner üst gövde, çalışma alanına doğru açıyla yerleşir.",
  },
  {
    label: "Kazı",
    title: "Bom, arm ve kova birlikte çalışır",
    description:
      "Hidrolik hareket zinciri kazı derinliğini korurken operatörün hassas kontrolünü destekler.",
  },
  {
    label: "Yükleme",
    title: "Malzeme güvenli açıyla aktarılır",
    description:
      "Kova yükselir, üst gövde döner ve malzeme yükleme noktasına kontrollü biçimde taşınır.",
  },
];

export default function MachineStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frameId = 0;
    let previousStage = -1;

    const updateProgress = () => {
      frameId = 0;
      const rect = section.getBoundingClientRect();
      const available = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / available));
      const nextStage = Math.min(stages.length - 1, Math.floor(progress * stages.length));

      progressRef.current = progress;
      section.style.setProperty("--machine-progress", progress.toFixed(4));

      if (nextStage !== previousStage) {
        previousStage = nextStage;
        setActiveStage(nextStage);
      }
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const stage = stages[activeStage];

  return (
    <section
      ref={sectionRef}
      id="makine"
      className="relative h-[230svh] bg-[#191914] text-bone"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="machine-shell section-shell grid h-full grid-rows-[auto_1fr_auto] pb-4 pt-24 sm:pb-6 sm:pt-28 lg:grid-cols-[0.72fr_1.28fr] lg:grid-rows-1 lg:items-center lg:gap-12 lg:py-8 lg:pt-24">
          <div className="relative z-10 lg:pr-6">
            <p className="section-kicker !text-safety">Kaydırarak inceleyin</p>
            <h2 className="machine-heading mt-3 max-w-[14ch] text-[1.875rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:mt-5 sm:max-w-[11ch] sm:text-4xl lg:text-5xl">
              Makinenin hareketi sahadaki işe göre değişir.
            </h2>

            <div className="mt-7 hidden lg:block" aria-live="polite">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-safety">
                {stage.label.toUpperCase()}
              </p>
              <h3 className="mt-3 max-w-md text-2xl font-semibold tracking-[-0.03em]">
                {stage.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-7 text-bone/55">
                {stage.description}
              </p>
            </div>
          </div>

          <div className="machine-visual relative -mx-4 min-h-0 sm:mx-0 lg:h-[78svh]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_48%,rgba(219,167,12,0.12),transparent_47%)]" />
            <Excavator3D progressRef={progressRef} />

            <div className="pointer-events-none absolute inset-x-4 bottom-3 h-px bg-bone/15 sm:inset-x-8 lg:bottom-8">
              <div
                className="h-px origin-left bg-safety [transform:scaleX(var(--machine-progress))]"
              />
            </div>
          </div>

          <div
            className="machine-stage relative z-10 border-t border-bone/15 pb-2 pt-4 lg:hidden"
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs font-semibold tracking-[0.12em] text-safety">
                {stage.label.toUpperCase()}
              </p>
              <p className="font-mono text-xs text-bone/35">
                {String(activeStage + 1).padStart(2, "0")} / 03
              </p>
            </div>
            <h3 className="mt-2 text-lg font-semibold leading-tight tracking-[-0.025em] sm:text-xl">
              {stage.title}
            </h3>
            <p className="mt-1.5 text-[0.8125rem] leading-5 text-bone/50 sm:mt-2 sm:text-sm sm:leading-6">
              {stage.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
