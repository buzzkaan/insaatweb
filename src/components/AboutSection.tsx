const processSteps = [
  {
    title: "Keşif",
    description: "Erişim, zemin, yük ve çalışma alanını yerinde değerlendiririz.",
  },
  {
    title: "İş planı",
    description: "Makine, ekip, süre ve uygulama sırasını işe başlamadan netleştiririz.",
  },
  {
    title: "Saha uygulaması",
    description: "İşi güvenlik, koordinasyon ve günlük saha takibiyle yürütürüz.",
  },
  {
    title: "Kontrollü teslim",
    description: "Son kontrolleri tamamlar, çalışma alanını düzenli biçimde teslim ederiz.",
  },
];

export default function AboutSection() {
  return (
    <section id="hakkimizda" className="bg-[#eeece5] py-20 text-ink sm:py-28 lg:py-36">
      <div className="section-shell grid gap-12 sm:gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
        <div>
          <p className="section-kicker !text-ink/55">Çalışma biçimimiz</p>
          <h2 className="section-title mt-6 max-w-[12ch]">
            Söz verdiğimiz işi sahada karşılığıyla teslim ederiz.
          </h2>
          <p className="mt-7 max-w-[54ch] text-base leading-8 text-ink/60">
            Yıkılmazlar İnşaat, yapı ve makine işlerini ayrı parçalar olarak değil,
            aynı saha programının bileşenleri olarak ele alır. Bu yaklaşım zamanlama
            kaybını azaltır, sorumluluğu netleştirir.
          </p>
        </div>

        <div className="border-t border-ink/25">
          {processSteps.map((step) => (
            <article
              key={step.title}
              className="grid gap-3 border-b border-ink/20 py-7 sm:grid-cols-[0.42fr_0.58fr] sm:gap-8 sm:py-8"
            >
              <h3 className="text-lg font-semibold tracking-[-0.025em] sm:text-xl">{step.title}</h3>
              <p className="max-w-[50ch] text-base leading-7 text-ink/58">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
