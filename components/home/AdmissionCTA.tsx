export default function AdmissionCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--gold)] py-16">
      {/* Decorative Shapes */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[30px] border-white/10" />
      <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full border-[25px] border-[var(--navy)]/10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

          {/* Content */}
          <div className="max-w-3xl text-center lg:text-left">
            <div className="mb-3 text-sm font-black uppercase tracking-wider text-[var(--maroon)]">
              प्रवेश के लिए संपर्क करें
            </div>

            <h2 className="text-3xl font-black leading-tight text-[var(--navy)] sm:text-4xl">
              अपने बच्चे के उज्ज्वल भविष्य की शुरुआत आज ही करें
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--navy)]/75 sm:text-base">
              श्री विक्रमादित्य इण्टर कॉलेज में गुणवत्तापूर्ण शिक्षा,
              अनुशासन एवं संस्कार के साथ अपने बच्चे के बेहतर भविष्य
              की दिशा में पहला कदम बढ़ाएँ।
            </p>
          </div>

          {/* Buttons */}
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href="/admission"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--navy)] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-[var(--blue)] hover:-translate-y-1"
            >
              प्रवेश जानकारी
              <span>→</span>
            </a>

            <a
              href="tel:9580548475"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--navy)] px-7 py-3 text-sm font-bold text-[var(--navy)] transition-all duration-300 hover:bg-[var(--navy)] hover:text-white"
            >
              📞 संपर्क करें
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}