export default function AcademicsPage() {
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
                शैक्षणिक व्यवस्था
              </p>
            </div>

            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
              शिक्षा एवं
              <span className="block text-[#F4C400]">
                शैक्षणिक गतिविधियाँ
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              विद्यार्थियों को मजबूत शैक्षणिक आधार, उचित मार्गदर्शन और
              सीखने का सकारात्मक वातावरण प्रदान करने की दिशा में
              विद्यालय निरंतर प्रयासरत है।
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          INTRODUCTION
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

            {/* Text */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-7 bg-[#F4C400]" />

                <p className="text-xs font-black text-[#F4C400]">
                  हमारी शैक्षणिक सोच
                </p>
              </div>

              <h2 className="text-3xl font-black leading-tight text-[#071D49] sm:text-4xl">
                सीखने की मजबूत नींव
              </h2>

              <div className="mt-5 space-y-4 text-justify text-[14px] leading-7 text-gray-600">

                <p>
                  श्री विक्रमादित्य इंटर कॉलेज में शिक्षा को विद्यार्थी के
                  सर्वांगीण विकास का महत्वपूर्ण आधार माना जाता है। हमारा
                  प्रयास है कि विद्यार्थियों को ऐसा शैक्षणिक वातावरण
                  उपलब्ध कराया जाए जिसमें वे विषयों को समझने के साथ-साथ
                  उनके व्यावहारिक महत्व को भी जान सकें।
                </p>

                <p>
                  विद्यालय में विद्यार्थियों की कक्षा स्तर के अनुसार
                  शैक्षणिक आवश्यकताओं को ध्यान में रखते हुए अध्ययन,
                  पुनरावृत्ति, अभ्यास और मार्गदर्शन पर विशेष ध्यान दिया
                  जाता है। विद्यार्थियों को नियमित अध्ययन के लिए प्रेरित
                  किया जाता है ताकि उनकी विषय संबंधी समझ मजबूत हो और वे
                  आत्मविश्वास के साथ अपनी परीक्षाओं की तैयारी कर सकें।
                </p>

                <p>
                  हमारा मानना है कि प्रत्येक विद्यार्थी की सीखने की क्षमता
                  और रुचि अलग होती है। इसलिए विद्यार्थियों को अपनी
                  क्षमताओं को पहचानने, प्रश्न पूछने और अपनी जिज्ञासा को
                  विकसित करने के लिए प्रोत्साहित किया जाता है। शिक्षक
                  विद्यार्थियों के मार्गदर्शक के रूप में उन्हें सही दिशा
                  देने का प्रयास करते हैं।
                </p>

              </div>
            </div>

            {/* Academic Highlight Card */}
            <div className="relative">
              <div className="rounded-2xl bg-[#F5F7FA] p-7 shadow-sm sm:p-9">

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#071D49] text-2xl">
                  🎓
                </div>

                <h3 className="text-2xl font-black text-[#071D49]">
                  गुणवत्तापूर्ण शिक्षा
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  विद्यार्थियों के ज्ञान, समझ, तर्क क्षमता और आत्मविश्वास
                  को विकसित करने के लिए शिक्षा के विभिन्न पहलुओं पर
                  निरंतर ध्यान दिया जाता है।
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xl font-black text-[#071D49]">
                      📖
                    </p>
                    <p className="mt-2 text-xs font-bold text-gray-600">
                      नियमित अध्ययन
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xl font-black text-[#071D49]">
                      🧠
                    </p>
                    <p className="mt-2 text-xs font-bold text-gray-600">
                      विषय की समझ
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xl font-black text-[#071D49]">
                      🎯
                    </p>
                    <p className="mt-2 text-xs font-bold text-gray-600">
                      परीक्षा तैयारी
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xl font-black text-[#071D49]">
                      🌱
                    </p>
                    <p className="mt-2 text-xs font-bold text-gray-600">
                      व्यक्तित्व विकास
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          ACADEMIC FOCUS
      ========================== */}
      <section className="bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">

          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-7 bg-[#F4C400]" />

              <span className="text-xs font-black text-[#F4C400]">
                हमारा शैक्षणिक फोकस
              </span>

              <span className="h-[2px] w-7 bg-[#F4C400]" />
            </div>

            <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
              विद्यार्थियों के विकास के प्रमुख क्षेत्र
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              शिक्षा के साथ विद्यार्थियों की सोच, व्यवहार और क्षमताओं
              को विकसित करने पर विशेष ध्यान दिया जाता है।
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {/* Card 1 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                📚
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071D49]">
                विषय ज्ञान
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                विद्यार्थियों को विषयों की मूल अवधारणाओं और आवश्यक
                ज्ञान को मजबूत करने के लिए प्रेरित किया जाता है।
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                💡
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071D49]">
                जिज्ञासा एवं सोच
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                विद्यार्थियों में प्रश्न पूछने, विचार करने और नई
                चीजें सीखने की जिज्ञासा को बढ़ावा दिया जाता है।
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                📝
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071D49]">
                परीक्षा तैयारी
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                नियमित अभ्यास और पुनरावृत्ति के माध्यम से विद्यार्थियों
                को परीक्षाओं के लिए बेहतर तरीके से तैयार करने का प्रयास।
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                🌟
              </div>

              <h3 className="mt-5 text-lg font-black text-[#071D49]">
                सर्वांगीण विकास
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                शिक्षा के साथ आत्मविश्वास, अनुशासन, नेतृत्व और सामाजिक
                जिम्मेदारी जैसे गुणों के विकास पर ध्यान।
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          LEARNING APPROACH
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Left */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-7 bg-[#F4C400]" />

                <p className="text-xs font-black text-[#F4C400]">
                  सीखने का दृष्टिकोण
                </p>
              </div>

              <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
                शिक्षा के साथ व्यक्तित्व निर्माण
              </h2>

              <p className="mt-4 text-justify text-sm leading-7 text-gray-600">
                हमारा प्रयास विद्यार्थियों को केवल पाठ्यक्रम पूरा करने
                तक सीमित न रखकर उन्हें सीखने की प्रक्रिया के प्रति
                जागरूक और जिम्मेदार बनाना है। शिक्षा के माध्यम से
                विद्यार्थियों में आत्मविश्वास, अनुशासन, सहयोग और
                सकारात्मक सोच विकसित करने पर विशेष ध्यान दिया जाता है।
              </p>
            </div>

            {/* Right */}
            <div className="space-y-4">

              <div className="flex gap-4 rounded-xl border border-gray-100 bg-[#F5F7FA] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4C400] text-lg">
                  01
                </div>

                <div>
                  <h3 className="font-black text-[#071D49]">
                    नियमित अध्ययन
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-gray-500">
                    नियमित अध्ययन और अभ्यास की आदत विकसित करना।
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-gray-100 bg-[#F5F7FA] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4C400] text-lg">
                  02
                </div>

                <div>
                  <h3 className="font-black text-[#071D49]">
                    शिक्षक मार्गदर्शन
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-gray-500">
                    विद्यार्थियों को उनकी आवश्यकताओं के अनुसार उचित
                    मार्गदर्शन प्रदान करना।
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-gray-100 bg-[#F5F7FA] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4C400] text-lg">
                  03
                </div>

                <div>
                  <h3 className="font-black text-[#071D49]">
                    आत्मविश्वास विकास
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-gray-500">
                    विद्यार्थियों को अपने विचार व्यक्त करने और
                    चुनौतियों का सामना करने के लिए प्रोत्साहित करना।
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================== */}
      <section className="bg-[#F4C400]">
        <div className="mx-auto max-w-[1000px] px-4 py-12 text-center sm:px-6 md:py-14">

          <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
            ज्ञान से आत्मविश्वास की ओर
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#071D49]/75">
            शिक्षा, संस्कार और अनुशासन के साथ विद्यार्थियों के
            उज्ज्वल भविष्य के निर्माण की दिशा में हमारा प्रयास जारी है।
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-[#071D49] px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#123B7A]"
          >
            हमसे संपर्क करें →
          </a>

        </div>
      </section>
    </main>
  );
}