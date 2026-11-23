type BrandMarkProps = {
  compact?: boolean;
  inverted?: boolean;
};

export default function BrandMark({
  compact = false,
  inverted = false,
}: BrandMarkProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={`relative grid size-10 shrink-0 place-items-center overflow-hidden border ${
          inverted
            ? "border-ink/20 bg-ink text-safety"
            : "border-safety/50 bg-safety text-ink"
        }`}
        aria-hidden="true"
      >
        <span className="absolute -left-2 h-14 w-2 rotate-[24deg] bg-current opacity-25" />
        <svg viewBox="0 0 40 40" className="relative size-7" fill="none">
          <path
            d="M7 30V17L20 9l13 8v13M13 30V19h14v11M17 30v-7h6v7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span
            className={`block text-[1.04rem] font-black tracking-[-0.04em] ${
              inverted ? "text-ink" : "text-bone"
            }`}
          >
            YIKILMAZLAR
          </span>
          <span
            className={`mt-1 block font-mono text-[0.58rem] font-semibold tracking-[0.24em] ${
              inverted ? "text-ink/65" : "text-safety"
            }`}
          >
            İNŞAAT TAAHHÜT
          </span>
        </span>
      )}
    </span>
  );
}
