import InquiryForm from "@/components/InquiryForm";

export default function ContactPage() {
  return (
    <main>
      {/* =========================
          PAGE HERO
      ========================== */}
      <section className="relative overflow-hidden bg-[#071D49]">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[20px] border-white/5" />
        <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full border-[20px] border-white/5" />

        <div className="relative mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[3px] w-7 bg-[#F4C400]" />

              <p className="text-xs font-black text-[#F4C400]">
                हमसे संपर्क करें
              </p>
            </div>

            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
              विद्यालय से
              <span className="block text-[#F4C400]">
                संपर्क करें
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              प्रवेश, शैक्षणिक गतिविधियों एवं विद्यालय से संबंधित
              अन्य जानकारी के लिए हमसे संपर्क करें।
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
                📍 बरौली कर्मा, कौंधियरा, प्रयागराज
              </span>

              <span className="rounded-full bg-[#F4C400] px-4 py-2 text-xs font-black text-[#071D49]">
                📞 हम आपकी सहायता के लिए उपलब्ध हैं
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          LOCATION + INQUIRY
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">

            {/* =====================
                SCHOOL LOCATION
            ====================== */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-7 bg-[#F4C400]" />

                <p className="text-xs font-black text-[#F4C400]">
                  हमारा स्थान
                </p>
              </div>

              <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
                विद्यालय का स्थान
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                हमसे मिलने के लिए नीचे दिए गए स्थान का उपयोग करें।
              </p>

              {/* Google Map Structure */}
              <div className="relative mt-6 h-[360px] overflow-hidden rounded-2xl border border-gray-200 bg-[#E8F0E8] shadow-sm">

                {/* Map Background */}
                <div className="absolute inset-0 bg-[linear-gradient(25deg,transparent_48%,rgba(255,255,255,0.9)_49%,rgba(255,255,255,0.9)_51%,transparent_52%),linear-gradient(110deg,transparent_48%,rgba(255,255,255,0.8)_49%,rgba(255,255,255,0.8)_51%,transparent_52%)] bg-[length:120px_120px,160px_160px]" />

                {/* Roads */}
                <div className="absolute left-[-5%] top-[45%] h-5 w-[110%] rotate-[-8deg] bg-white/80 shadow-sm" />
                <div className="absolute left-[40%] top-[-10%] h-[120%] w-5 rotate-[18deg] bg-white/80 shadow-sm" />
                <div className="absolute left-[10%] top-[65%] h-3 w-[90%] rotate-[18deg] bg-white/70" />

                {/* Green Areas */}
                <div className="absolute left-8 top-8 h-24 w-32 rounded-full bg-[#CBE6C7]/70" />
                <div className="absolute bottom-8 right-10 h-28 w-36 rounded-full bg-[#CBE6C7]/70" />

                {/* Map Labels */}
                <div className="absolute left-8 top-20 text-xs font-bold text-gray-500">
                  कौंधियरा
                </div>

                <div className="absolute bottom-20 left-24 text-xs font-bold text-gray-500">
                  बरौली कर्मा
                </div>

                <div className="absolute right-16 top-28 text-xs font-bold text-gray-500">
                  प्रयागराज
                </div>

                {/* Location Card */}
                <div className="absolute left-4 top-4 max-w-[270px] rounded-lg bg-white p-4 shadow-lg">
                  <p className="text-sm font-black text-[#071D49]">
                    Shri Vikramaditya Inter College
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    बरौली कर्मा, कौंधियरा,
                    <br />
                    प्रयागराज, उत्तर प्रदेश
                  </p>

                  <div className="mt-3 inline-flex rounded-full bg-[#071D49] px-3 py-1.5 text-[10px] font-bold text-white">
                    📍 विद्यालय का स्थान
                  </div>
                </div>

                {/* Map Pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D92323] text-2xl text-white shadow-xl ring-4 ring-white/70">
                    📍
                  </div>

                  <div className="mt-2 rounded-md bg-white px-3 py-1 text-center text-[10px] font-black text-[#071D49] shadow-md">
                    श्री विक्रमादित्य
                    <br />
                    इंटर कॉलेज
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-lg bg-white shadow-lg">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center border-b border-gray-200 text-lg font-bold text-gray-600"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center text-lg font-bold text-gray-600"
                  >
                    −
                  </button>
                </div>

                {/* Google Maps Placeholder */}
                <div className="relative h-[360px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14428.882685176506!2d81.84197028895451!3d25.29678899251603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3985363321a595b9%3A0x6be13f1021704066!2sKarma%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1789156175059!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 100 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
    title="श्री विक्रमादित्य इंटर कॉलेज का Google Map"
  />
</div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
  <div>
    <p className="text-sm font-semibold text-[#071d49]">
      श्री विक्रमादित्य इंटर कॉलेज
    </p>
    <p className="text-xs text-gray-500">
      बरौली कर्मा, कौंधियरा, प्रयागराज
    </p>
  </div>

  <a
    href="https://maps.app.goo.gl/9rDDuoxVcnMnAmrC7"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg bg-[#071d49] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123b7a]"
  >
    📍 Google Maps में दिशा देखें
  </a>
</div>
            </div>

            {/* =====================
                INQUIRY FORM
            ====================== */}
            <div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

                <div className="mb-3 flex items-center gap-3">
                  <span className="h-[3px] w-7 bg-[#F4C400]" />

                  <p className="text-xs font-black text-[#F4C400]">
                    हमसे संपर्क करें
                  </p>
                </div>

                <h2 className="text-3xl font-black text-[#071D49]">
                  अपनी पूछताछ भेजें
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  हम आपकी सहायता के लिए सदैव तैयार हैं। कृपया नीचे दिया
                  गया फॉर्म भरें।
                </p>

                {/* Form */}
                
                <InquiryForm />

                <p className="mt-4 text-center text-[10px] leading-5 text-gray-400">
                  🔒 आपकी जानकारी सुरक्षित रखी जाएगी और केवल विद्यालय
                  से संबंधित सहायता के लिए उपयोग की जाएगी।
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          OTHER CONTACT DETAILS
      ========================== */}
      <section className="bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">

          <div className="mx-auto mb-9 max-w-2xl text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-7 bg-[#F4C400]" />

              <span className="text-xs font-black text-[#F4C400]">
                अन्य संपर्क माध्यम
              </span>

              <span className="h-[2px] w-7 bg-[#F4C400]" />
            </div>

            <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
              अन्य संपर्क विवरण
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              आवश्यकता के अनुसार संबंधित व्यक्ति से संपर्क करें।
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {/* Manager */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                👤
              </div>

              <p className="mt-5 text-xs font-bold text-[#F4C400]">
                प्रबंधक
              </p>

              <h3 className="mt-1 text-xl font-black text-[#071D49]">
                प्रबंधक कार्यालय
              </h3>

              <a
                href="tel:8009707183"
                className="mt-3 block text-base font-black text-[#7B1720] transition hover:text-[#071D49]"
              >
                +91-8009707183
              </a>
            </div>

            {/* Principal */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                👨‍🏫
              </div>

              <p className="mt-5 text-xs font-bold text-[#F4C400]">
                प्रधानाचार्य
              </p>

              <h3 className="mt-1 text-xl font-black text-[#071D49]">
                प्रधानाचार्य कार्यालय
              </h3>

              <a
                href="tel:8795690972"
                className="mt-3 block text-base font-black text-[#7B1720] transition hover:text-[#071D49]"
              >
                +91-8795690972
              </a>
            </div>

            {/* General Inquiry */}
            <div className="rounded-2xl bg-[#071D49] p-6 text-white shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4C400] text-xl">
                📞
              </div>

              <p className="mt-5 text-xs font-bold text-[#F4C400]">
                सामान्य पूछताछ
              </p>

              <h3 className="mt-1 text-xl font-black">
                सामान्य जानकारी
              </h3>

              <a
                href="tel:9580548475"
                className="mt-3 block text-base font-black text-[#F4C400] transition hover:text-white"
              >
                +91-9580548475
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          WELCOME SECTION
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">

          <div className="overflow-hidden rounded-2xl bg-[#071D49] shadow-xl">
            <div className="grid items-center lg:grid-cols-[1.2fr_0.8fr]">

              {/* Content */}
              <div className="p-7 sm:p-9 lg:p-12">

                <div className="mb-3 flex items-center gap-3">
                  <span className="h-[3px] w-7 bg-[#F4C400]" />

                  <p className="text-xs font-black text-[#F4C400]">
                    विद्यालय परिसर
                  </p>
                </div>

                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  विद्यालय में
                  <span className="text-[#F4C400]">
                    {" "}आपका स्वागत है
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                  विद्यालय से संबंधित जानकारी प्राप्त करने के लिए
                  आप दिए गए संपर्क माध्यमों का उपयोग कर सकते हैं।
                  हमारा प्रयास है कि विद्यार्थियों और अभिभावकों को
                  आवश्यक जानकारी समय पर उपलब्ध हो।
                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  <a
                    href="tel:9580548475"
                    className="rounded-full bg-[#F4C400] px-6 py-3 text-sm font-black text-[#071D49] shadow-lg transition hover:bg-white"
                  >
                    📞 अभी संपर्क करें
                  </a>

                  <a
                    href="mailto:vikramadityap20@gmail.com"
                    className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#071D49]"
                  >
                    ✉ ईमेल करें
                  </a>

                </div>
              </div>

              {/* Motto */}
              <div className="border-t border-white/10 p-7 text-center lg:border-l lg:border-t-0 sm:p-9 lg:p-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F4C400] text-2xl">
                  📖
                </div>

                <p className="mt-5 font-serif text-2xl font-black text-[#F4C400]">
                  “विद्या विनयेन शोभते”
                </p>

                <p className="mt-2 text-xs text-white/50">
                  विद्या विनय से शोभित होती है
                </p>

                <p className="mt-4 text-xs text-white/50">
                  शिक्षा • संस्कार • अनुशासन
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================== */}
      <section className="bg-[#F4C400]">
        <div className="mx-auto max-w-[1000px] px-4 py-12 text-center sm:px-6 md:py-14">

          <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
            हमसे जुड़ें, बेहतर भविष्य की ओर बढ़ें
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#071D49]/75">
            श्री विक्रमादित्य इंटर कॉलेज विद्यार्थियों के ज्ञान,
            संस्कार और उज्ज्वल भविष्य के निर्माण के लिए प्रतिबद्ध है।
          </p>

          <a
            href="tel:9580548475"
            className="mt-6 inline-flex rounded-full bg-[#071D49] px-7 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#123B7A]"
          >
            📞 सामान्य पूछताछ : +91-9580548475
          </a>

        </div>
      </section>
    </main>
  );
}