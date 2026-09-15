export default function AboutPage() {
  return (
    <main>
      {/* =========================
          PAGE HERO
      ========================== */}
      <section className="relative overflow-hidden bg-[#071D49]">
        {/* Decorative Circles */}
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[20px] border-white/5" />
        <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full border-[20px] border-white/5" />

        <div className="relative mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[3px] w-7 bg-[#F4C400]" />

              <p className="text-xs font-black uppercase tracking-wider text-[#F4C400]">
                हमारे बारे में
              </p>
            </div>

            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
              श्री विक्रमादित्य
              <span className="block text-[#F4C400]">
                इण्टर कॉलेज
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              शिक्षा, संस्कार और अनुशासन के माध्यम से विद्यार्थियों के
              उज्ज्वल भविष्य के निर्माण की दिशा में निरंतर प्रयासरत।
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
                स्थापना — 2018
              </span>

              <span className="rounded-full bg-[#F4C400] px-4 py-2 text-xs font-black text-[#071D49]">
                बरौली करमा, प्रयागराज
              </span>
            </div>
          </div>
        </div>
      </section>

{/* =========================
    ABOUT INTRODUCTION
========================== */}
<section className="bg-white">
  <div className="mx-auto max-w-[1250px] px-4 py-12 sm:px-6 md:py-14 lg:px-8">
    <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">

      {/* Image */}
      <div className="relative pt-2 lg:pt-4">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <img 
            src="/school-building.png"
            alt="विद्यालय भवन"
            className="h-[280px] w-full object-cover sm:h-[330px] lg:h-[360px]"
            />
        </div>

        {/* Established Badge */}
        <div className="absolute -bottom-5 right-5 flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-[#F4C400] text-[#071D49] shadow-xl sm:h-24 sm:w-24">
          <span className="text-2xl font-black sm:text-3xl">
            2018
          </span>

          <span className="text-[9px] font-bold">
            स्थापना वर्ष
          </span>
        </div>
      </div>

      {/* About Text */}
      <div>
        {/* Section Kicker */}
        <div className="mb-3 flex items-center gap-3">
          <span className="h-[3px] w-7 bg-[#F4C400]" />

          <p className="text-xs font-black text-[#F4C400]">
            हमारा परिचय
          </p>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl font-black leading-tight text-[#071D49] sm:text-4xl">
          श्री विक्रमादित्य इण्टर कॉलेज
        </h2>

        {/* Description */}
        <div className="mt-4 space-y-3 text-justify text-[13px] leading-6 text-gray-600">

          <p>
            <strong className="font-black text-[#071D49]">
              श्री विक्रमादित्य इण्टर कॉलेज
            </strong>{" "}
            बरौली करमा, कौंधियरा, प्रयागराज में स्थित एक शिक्षण संस्थान है,
            जिसकी स्थापना वर्ष 2018 में इस उद्देश्य के साथ की गई कि ग्रामीण
            एवं आसपास के क्षेत्रों के विद्यार्थियों को गुणवत्तापूर्ण शिक्षा
            के साथ एक सकारात्मक और अनुशासित शैक्षणिक वातावरण उपलब्ध कराया
            जा सके।
          </p>

          <p>
            विद्यालय का मानना है कि शिक्षा केवल पुस्तकीय ज्ञान प्राप्त करने
            का माध्यम नहीं है, बल्कि यह विद्यार्थी के व्यक्तित्व, सोच,
            व्यवहार और चरित्र के निर्माण की आधारशिला है। इसी दृष्टिकोण के
            साथ विद्यार्थियों के शैक्षणिक विकास के साथ उनके सामाजिक, नैतिक
            और व्यक्तिगत विकास पर भी विशेष ध्यान दिया जाता है।
          </p>

          <p>
            हमारा प्रयास है कि प्रत्येक विद्यार्थी को अपनी रुचि, प्रतिभा और
            क्षमता के अनुसार आगे बढ़ने का अवसर मिले। विद्यार्थियों को
            प्रश्न पूछने, नई चीजें सीखने, अपने विचार व्यक्त करने तथा
            आत्मविश्वास के साथ चुनौतियों का सामना करने के लिए प्रोत्साहित
            किया जाता है।
          </p>

          <p>
            विद्यालय शिक्षा के साथ संस्कार और अनुशासन को समान महत्व देता है।
            ईमानदारी, परिश्रम, विनम्रता, सहयोग, सम्मान और जिम्मेदारी जैसे
            मूल्यों को विद्यार्थियों के दैनिक जीवन का हिस्सा बनाने का प्रयास
            किया जाता है। हमारा विश्वास है कि ज्ञान के साथ अच्छा चरित्र ही
            एक विद्यार्थी को समाज का जिम्मेदार और उपयोगी नागरिक बनाता है।
          </p>

          <p>
            विद्यालय का लक्ष्य एक मजबूत, सुरक्षित और प्रेरणादायक शैक्षणिक
            वातावरण तैयार करना है, जहाँ विद्यार्थी अपनी क्षमताओं को पहचान
            सकें और भविष्य की संभावनाओं के लिए स्वयं को तैयार कर सकें।
            शिक्षकों का मार्गदर्शन विद्यार्थियों को केवल परीक्षाओं के लिए
            नहीं, बल्कि जीवन की वास्तविक परिस्थितियों के लिए भी तैयार
            करने की दिशा में केंद्रित है।
          </p>

          <p>
            हमारा प्रयास है कि विद्यालय में ऐसा वातावरण विकसित हो जहाँ
            विद्यार्थी ज्ञान प्राप्त करने के साथ-साथ आत्मविश्वास, नेतृत्व
            क्षमता, सामाजिक जिम्मेदारी और सकारात्मक सोच भी विकसित कर सकें।
            विद्यालय विद्यार्थियों को अपने परिवार, समाज और राष्ट्र के प्रति
            जिम्मेदार नागरिक बनने के लिए प्रेरित करता है।
          </p>

          <p>
            <strong className="font-black text-[#7B1720]">
              “विद्या विनयेन शोभते”
            </strong>{" "}
            — विद्या विनय से शोभित होती है। यही विचार हमारे शैक्षणिक
            दृष्टिकोण का महत्वपूर्ण आधार है। हम चाहते हैं कि हमारे विद्यार्थी
            ज्ञान, संस्कार और आत्मविश्वास के साथ आगे बढ़ें और अपने भविष्य
            का निर्माण स्वयं करने में सक्षम बनें।
          </p>

        </div>
      </div>
    </div>
  </div>
</section>

      {/* =========================
          MISSION & VISION
      ========================== */}
      <section className="bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1250px] px-4 py-12 sm:px-6 md:py-14 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">

            {/* Mission */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                🎯
              </div>

              <p className="mb-1 text-xs font-black text-[#F4C400]">
                हमारा उद्देश्य
              </p>

              <h3 className="text-2xl font-black text-[#071D49]">
                विद्यार्थियों को सक्षम बनाना
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                हमारा उद्देश्य विद्यार्थियों को गुणवत्तापूर्ण शिक्षा,
                सही मार्गदर्शन और सकारात्मक वातावरण प्रदान करना है,
                ताकि वे अपनी प्रतिभा को पहचानकर आत्मविश्वास के साथ
                अपने भविष्य की दिशा निर्धारित कर सकें।
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl bg-[#071D49] p-6 text-white shadow-xl sm:p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4C400] text-xl">
                ✨
              </div>

              <p className="mb-1 text-xs font-black text-[#F4C400]">
                हमारा दृष्टिकोण
              </p>

              <h3 className="text-2xl font-black">
                उज्ज्वल भविष्य की ओर
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/70">
                हमारा दृष्टिकोण ऐसे विद्यार्थियों का निर्माण करना है
                जो ज्ञानवान, संस्कारी, आत्मनिर्भर और जिम्मेदार नागरिक
                बनें तथा परिवार, समाज और राष्ट्र के विकास में अपना
                महत्वपूर्ण योगदान दें।
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          CORE VALUES
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1250px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">

          {/* Heading */}
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-7 bg-[#F4C400]" />

              <span className="text-xs font-black text-[#F4C400]">
                हमारे मूल मूल्य
              </span>

              <span className="h-[2px] w-7 bg-[#F4C400]" />
            </div>

            <h2 className="text-3xl font-black text-[#071D49] sm:text-4xl">
              हमारी प्राथमिकताएँ
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              विद्यार्थियों के बेहतर भविष्य के लिए शिक्षा के साथ
              मूल्यों और व्यक्तित्व विकास पर विशेष ध्यान दिया जाता है।
            </p>
          </div>

          {/* Values */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Value 1 */}
            <div className="rounded-xl bg-[#F5F7FA] p-5 text-center transition hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                🎓
              </div>

              <h3 className="mt-4 text-base font-black text-[#071D49]">
                गुणवत्तापूर्ण शिक्षा
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                विद्यार्थियों को मजबूत शैक्षणिक आधार और बेहतर ज्ञान
                प्रदान करना।
              </p>
            </div>

            {/* Value 2 */}
            <div className="rounded-xl bg-[#F5F7FA] p-5 text-center transition hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                🌱
              </div>

              <h3 className="mt-4 text-base font-black text-[#071D49]">
                सर्वांगीण विकास
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                शिक्षा के साथ विद्यार्थियों के शारीरिक, मानसिक और
                सामाजिक विकास को बढ़ावा देना।
              </p>
            </div>

            {/* Value 3 */}
            <div className="rounded-xl bg-[#F5F7FA] p-5 text-center transition hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                🙏
              </div>

              <h3 className="mt-4 text-base font-black text-[#071D49]">
                संस्कार एवं नैतिकता
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                ईमानदारी, विनम्रता और सामाजिक जिम्मेदारी जैसे मूल्यों
                को विकसित करना।
              </p>
            </div>

            {/* Value 4 */}
            <div className="rounded-xl bg-[#F5F7FA] p-5 text-center transition hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#071D49] text-xl">
                🎯
              </div>

              <h3 className="mt-4 text-base font-black text-[#071D49]">
                अनुशासन
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                अनुशासन, समयपालन और जिम्मेदारी की भावना को मजबूत
                बनाना।
              </p>
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
            शिक्षा से उज्ज्वल भविष्य की ओर
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#071D49]/75">
            श्री विक्रमादित्य इण्टर कॉलेज विद्यार्थियों के ज्ञान,
            संस्कार और सर्वांगीण विकास के लिए निरंतर प्रतिबद्ध है।
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