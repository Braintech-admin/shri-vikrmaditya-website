const statistics = [
  {
    value: "2018",
    label: "स्थापना वर्ष",
    icon: "🏫",
  },
  {
    value: "500+",
    label: "विद्यार्थी",
    icon: "🎓",
  },
  {
    value: "25+",
    label: "शिक्षक एवं स्टाफ",
    icon: "👨‍🏫",
  },
  {
    value: "10+",
    label: "कक्षाएँ",
    icon: "📚",
  },
];

export default function Statistics() {
  return (
    <section className="bg-[var(--navy)] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="section-heading dark mb-12">
          <div className="section-kicker justify-center">
            <span></span>
            हमारे विद्यालय की झलक
            <span></span>
          </div>

          <h2>कुछ महत्वपूर्ण आँकड़े</h2>

          <p>
            श्री विक्रमादित्य इंटर कॉलेज की शैक्षणिक यात्रा और
            उपलब्धियों की एक संक्षिप्त झलक।
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {statistics.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold)] text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <div className="text-4xl font-black text-white">
                {item.value}
              </div>

              <div className="mt-2 text-sm font-semibold text-white/70">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}