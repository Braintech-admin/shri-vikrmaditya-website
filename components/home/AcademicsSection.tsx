const academicFeatures = [
  {
    icon: "📚",
    title: "गुणवत्तापूर्ण शिक्षा",
    text: "विद्यार्थियों को मजबूत शैक्षणिक आधार एवं विषयगत ज्ञान प्रदान करने पर विशेष ध्यान।",
  },
  {
    icon: "🧪",
    title: "व्यावहारिक शिक्षा",
    text: "पुस्तकीय ज्ञान के साथ विद्यार्थियों में व्यावहारिक एवं तार्किक समझ विकसित करना।",
  },
  {
    icon: "🏆",
    title: "परीक्षा एवं मूल्यांकन",
    text: "नियमित परीक्षाओं एवं मूल्यांकन के माध्यम से विद्यार्थियों की प्रगति पर ध्यान।",
  },
  {
    icon: "🎯",
    title: "सर्वांगीण विकास",
    text: "शिक्षा के साथ अनुशासन, संस्कार, आत्मविश्वास एवं व्यक्तित्व विकास को बढ़ावा देना।",
  },
];

export default function AcademicsSection() {
  return (
    <section className="bg-[var(--light)] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="section-heading mb-14">
          <div className="section-kicker justify-center">
            <span></span>
            शैक्षणिक गतिविधियाँ
            <span></span>
          </div>

          <h2>हमारी शैक्षणिक व्यवस्था</h2>

          <p>
            विद्यार्थियों के ज्ञान, कौशल एवं व्यक्तित्व के विकास के लिए
            हमारी शैक्षणिक व्यवस्था पर विशेष ध्यान दिया जाता है।
          </p>
        </div>

        {/* Academic Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {academicFeatures.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Top Accent */}
              <div className="absolute left-0 top-0 h-1 w-full bg-[var(--gold)]" />

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--navy)] text-3xl transition-all duration-300 group-hover:bg-[var(--gold)]">
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-black text-[var(--navy)]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {item.text}
              </p>

              {/* Bottom Arrow */}
              <div className="mt-6 text-lg font-bold text-[var(--maroon)] transition-transform duration-300 group-hover:translate-x-2">
                →
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/academics"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--blue)] hover:shadow-lg"
          >
            शैक्षणिक जानकारी देखें
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}