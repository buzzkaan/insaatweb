const facts = [
  { value: "38 yıl", label: "Sahada kesintisiz deneyim" },
  { value: "Bursa", label: "Yenişehir merkezli hizmet" },
  { value: "Esnek", label: "Günlük ve dönemsel kiralama" },
  { value: "Destek", label: "Operatörlü çalışma seçeneği" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-bone/10 bg-ink text-bone" aria-label="Hizmet bilgileri">
      <div className="section-shell grid grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            className={`flex min-h-28 flex-col justify-center border-bone/10 py-5 sm:min-h-32 sm:px-6 sm:py-6 ${
              index % 2 === 0 ? "border-r pr-3" : "pl-4"
            } ${index < 2 ? "border-b lg:border-b-0" : ""} ${
              index < 3 ? "lg:border-r" : "lg:border-r-0"
            } ${index === 0 ? "sm:pl-0" : ""}`}
          >
            <strong className="font-mono text-xl font-medium tracking-[-0.035em] text-safety sm:text-2xl">
              {fact.value}
            </strong>
            <span className="mt-2 max-w-48 text-sm leading-5 text-bone/55">{fact.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
