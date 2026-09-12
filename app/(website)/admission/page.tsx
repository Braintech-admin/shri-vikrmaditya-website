export default function AdmissionPage() {
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
                प्रवेश संबंधी जानकारी
              </p>
            </div>

            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
              विद्यालय में
              <span className="block text-[#F4C400]">
                प्रवेश
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              विद्यार्थियों के उज्ज्वल भविष्य की दिशा में एक मजबूत
              शैक्षणिक यात्रा की शुरुआत।
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
                🎓 शिक्षा • संस्कार • अनुशासन
              </span>

              <span className="rounded-full bg-[#F4C400] px-4 py-2 text-xs font-black text-[#071D49]">
                प्रवेश के लिए संपर्क करें
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          INTRODUCTION
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

            {/* Left Content */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-7 bg-[#F4C400]" />

                <p className="text-xs font-black text-[#F4C400]">
                  प्रवेश प्रारंभ
                </p>
              </div>

              <h2 className="text-3xl font-black leading-tight text-[#071D49] sm:text-4xl">
                अपने बच्चे के बेहतर भविष्य की शुरुआत करें
              </h2>

              <div className="mt-5 space-y-4 text-justify text-[14px] leading-7 text-gray-600">

                <p>
                  श्री विक्रमादित्य इंटर कॉलेज में विद्यार्थियों को
                  गुणवत्तापूर्ण शिक्षा, अनुशासन और सकारात्मक वातावरण
                  प्रदान करने के उद्देश्य से प्रवेश प्रक्रिया संचालित
                  की जाती है। हमारा प्रयास है कि प्रत्येक विद्यार्थी को
                  उसकी शैक्षणिक आवश्यकताओं के अनुरूप सीखने और आगे बढ़ने
                  का उचित अवसर प्राप्त हो।
                </p>

                <p>
                  विद्यालय में प्रवेश लेने वाले विद्यार्थियों और उनके
                  अभिभावकों को प्रवेश से संबंधित आवश्यक जानकारी उपलब्ध
                  कराई जाती है। कक्षा, उपलब्ध स्थान तथा विद्यालय के
                  निर्धारित नियमों के अनुसार प्रवेश प्रक्रिया पूरी की
                  जाती है।
                </p>

                <p>
                  अभिभावक अपने बच्चे के प्रवेश के संबंध में विद्यालय से
                  संपर्क कर आवश्यक जानकारी प्राप्त कर सकते हैं। प्रवेश
                  से पहले आवश्यक दस्तावेज, कक्षा एवं अन्य संबंधित
                  जानकारी विद्यालय कार्यालय से प्राप्त करना उचित रहेगा।
                </p>

              </div>
            </div>

            {/* Right Highlight */}
            <div>
              <div className="rounded-2xl bg-[#F5F7FA] p-7 shadow-sm sm:p-8">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#071D49] text-2xl">
                  🎓
                </div>

                <h3 className="mt-5 text-2xl font-black text-[#071D49]">
                  प्रवेश के लिए महत्वपूर्ण बातें
                </h3>

                <div className="mt-6 space-y-4">

                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4C400] text-sm font-black text-[#071D49]">
                      01
                    </span>

                    <div>
                      <p className="font-black text-[#071D49]">
                        सही जानकारी उपलब्ध कराएँ
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        प्रवेश के समय विद्यार्थी से संबंधित सही एवं
                        आवश्यक जानकारी उपलब्ध कराएँ।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4C400] text-sm font-black text-[#071D49]">
                      02
                    </span>

                    <div>
                      <p className="font-black text-[#071D49]">
                        आवश्यक दस्तावेज तैयार रखें
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        प्रवेश प्रक्रिया के लिए आवश्यक दस्तावेज पहले से
                        तैयार रखें।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4C400] text-sm font-black text-[#071D49]">
                      03
                    </span>

                    <div>
                      <p className="font-black text-[#071D49]">
                        विद्यालय से संपर्क करें
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        प्रवेश से संबंधित नवीनतम जानकारी के लिए
                        विद्यालय से संपर्क करें।
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          ADMISSION PROCESS
      ========================== */}
      <section className="bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">

          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-7 bg-[#F4C400]" />

              <span className="text-xs font-black text-[#F4C400]">
                प्रवेश प्रक्रिया
              </span>

              <span className="h-[2px] w-7 bg-[#F4C400]" />
            </div>

            <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
              प्रवेश की प्रक्रिया
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              प्रवेश से संबंधित सामान्य प्रक्रिया को सरल और व्यवस्थित
              तरीके से पूरा किया जाता है।
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {/* Step 1 */}
            <div className="relative rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-lg font-black text-white">
                01
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071D49]">
                जानकारी प्राप्त करें
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                विद्यालय में उपलब्ध कक्षा एवं प्रवेश संबंधी जानकारी
                प्राप्त करें।
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-lg font-black text-white">
                02
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071D49]">
                आवेदन करें
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                विद्यालय द्वारा निर्धारित प्रक्रिया के अनुसार प्रवेश
                के लिए आवेदन करें।
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-lg font-black text-white">
                03
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071D49]">
                दस्तावेज प्रस्तुत करें
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                प्रवेश के लिए आवश्यक दस्तावेज विद्यालय कार्यालय में
                प्रस्तुत करें।
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-lg font-black text-white">
                04
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071D49]">
                प्रवेश पूर्ण करें
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                आवश्यक प्रक्रिया पूरी होने के बाद विद्यार्थी का प्रवेश
                सुनिश्चित किया जाता है।
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          DOCUMENTS
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

            {/* Heading */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-7 bg-[#F4C400]" />

                <p className="text-xs font-black text-[#F4C400]">
                  आवश्यक दस्तावेज
                </p>
              </div>

              <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
                प्रवेश के समय
                <span className="block">
                  आवश्यक कागजात
                </span>
              </h2>

              <p className="mt-4 text-justify text-sm leading-7 text-gray-600">
                प्रवेश प्रक्रिया को सुचारु रूप से पूरा करने के लिए
                विद्यार्थी से संबंधित आवश्यक दस्तावेज उपलब्ध रखना
                आवश्यक हो सकता है। दस्तावेजों की अंतिम सूची एवं
                आवश्यकताओं की पुष्टि विद्यालय कार्यालय से करें।
              </p>
            </div>

            {/* Documents */}
            <div className="grid gap-3 sm:grid-cols-2">

              <div className="flex items-center gap-3 rounded-xl bg-[#F5F7FA] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071D49] text-lg">
                  📄
                </span>

                <span className="text-sm font-bold text-[#071D49]">
                  जन्म प्रमाण पत्र
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F5F7FA] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071D49] text-lg">
                  🪪
                </span>

                <span className="text-sm font-bold text-[#071D49]">
                  पहचान प्रमाण
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F5F7FA] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071D49] text-lg">
                  🏫
                </span>

                <span className="text-sm font-bold text-[#071D49]">
                  पूर्व विद्यालय प्रमाण
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F5F7FA] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071D49] text-lg">
                  📷
                </span>

                <span className="text-sm font-bold text-[#071D49]">
                  पासपोर्ट फोटो
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F5F7FA] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071D49] text-lg">
                  📑
                </span>

                <span className="text-sm font-bold text-[#071D49]">
                  स्थानांतरण प्रमाण पत्र
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F5F7FA] p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#071D49] text-lg">
                  📋
                </span>

                <span className="text-sm font-bold text-[#071D49]">
                  अन्य आवश्यक दस्तावेज
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================
          IMPORTANT INFORMATION
      ========================== */}
      <section className="bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1050px] px-4 py-12 sm:px-6 md:py-14 lg:px-8">

          <div className="rounded-2xl bg-[#071D49] p-7 text-white shadow-xl sm:p-9">

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4C400] text-xl">
                ℹ️
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  महत्वपूर्ण सूचना
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/70">
                  प्रवेश से संबंधित कक्षा, सीट उपलब्धता, आवश्यक दस्तावेज,
                  समय-सारणी एवं अन्य नियमों की जानकारी विद्यालय कार्यालय
                  से प्राप्त करें। प्रवेश संबंधी अंतिम निर्णय विद्यालय
                  के निर्धारित नियमों एवं उपलब्धता के अनुसार होगा।
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          CONTACT CTA
      ========================== */}
      <section className="bg-[#F4C400]">
        <div className="mx-auto max-w-[1000px] px-4 py-12 text-center sm:px-6 md:py-14">

          <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
            प्रवेश से संबंधित जानकारी चाहिए?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#071D49]/75">
            प्रवेश प्रक्रिया और आवश्यक दस्तावेजों से संबंधित नवीनतम
            जानकारी के लिए विद्यालय से संपर्क करें।
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <a
              href="tel:9580548475"
              className="inline-flex rounded-full bg-[#071D49] px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#123B7A]"
            >
              📞 संपर्क करें
            </a>

            <a
              href="mailto:vikramadityap20@gmail.com"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-[#071D49] shadow-lg transition hover:bg-gray-100"
            >
              ✉ ईमेल करें
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}