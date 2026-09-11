const statistics = [
  {
    id: 1,
    value: "2018",
    label: "स्थापना वर्ष",
    icon: "🏫",
    description: "शिक्षा के क्षेत्र में निरंतर प्रयास",
  },
  {
    id: 2,
    value: "500+",
    label: "विद्यार्थी",
    icon: "👨‍🎓",
    description: "ज्ञान की ओर बढ़ते कदम",
  },
  {
    id: 3,
    value: "25+",
    label: "शिक्षक",
    icon: "👨‍🏫",
    description: "समर्पित शिक्षण मार्गदर्शन",
  },
  {
    id: 4,
    value: "10+",
    label: "कक्षाएँ",
    icon: "📚",
    description: "सुव्यवस्थित शैक्षणिक व्यवस्था",
  },
];

export default function Statistics() {
  return (
    <section className="relative overflow-hidden bg-[#071d49] py-14 sm:py-16">
      {/* Decorative Elements */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border-[35px] border-[#f4c400]/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-[3px] w-7 bg-[#f4c400]" />

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f4c400]">
              हमारी उपलब्धियाँ
            </p>

            <span className="h-[3px] w-7 bg-[#f4c400]" />
          </div>

          <h2 className="text-2xl font-black text-white sm:text-3xl">
            एक नजर में <span className="text-[#f4c400]">विद्यालय</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/65">
            विद्यालय की कुछ महत्वपूर्ण जानकारियाँ एवं उपलब्धियाँ।
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.1] hover:shadow-xl sm:p-6"
            >
              {/* Top Accent */}
              <div className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-b-full bg-[#f4c400] transition-all duration-300 group-hover:w-20" />

              {/* Icon */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4c400] text-xl shadow-lg transition duration-300 group-hover:scale-110">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="mt-5 text-3xl font-black text-white sm:text-4xl">
                {stat.value}
              </div>

              {/* Label */}
              <h3 className="mt-2 text-sm font-bold text-[#f4c400]">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="mt-2 text-[11px] leading-5 text-white/50">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}