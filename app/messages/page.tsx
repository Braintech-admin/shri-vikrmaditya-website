"use client";

const messages = [
  {
    role: "प्रधानाचार्य",
    title: "प्रधानाचार्य का संदेश",
    name: "प्रधानाचार्य",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80",
    message:
      "शिक्षा केवल पुस्तकीय ज्ञान प्राप्त करने का माध्यम नहीं है, बल्कि यह विद्यार्थी के व्यक्तित्व, विचारों और चरित्र के निर्माण की आधारशिला है। हमारा प्रयास है कि प्रत्येक विद्यार्थी को ऐसा शैक्षणिक वातावरण प्रदान किया जाए, जहाँ वह अपनी प्रतिभा को पहचान सके और आत्मविश्वास के साथ अपने भविष्य की ओर आगे बढ़ सके।",
    message2:
      "श्री विक्रमादित्य इंटर कॉलेज में हम शिक्षा के साथ अनुशासन, संस्कार, नैतिक मूल्यों और सामाजिक जिम्मेदारी को भी समान महत्व देते हैं। हमारा विश्वास है कि एक शिक्षित एवं संस्कारी विद्यार्थी ही समाज और राष्ट्र के विकास में सकारात्मक योगदान दे सकता है।",
  },
  {
    role: "प्रबंधक",
    title: "प्रबंधक का संदेश",
    name: "विद्यालय प्रबंधक",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?auto=format&fit=crop&w=700&q=80",
    message:
      "हमारा उद्देश्य एक ऐसे विद्यालय का निर्माण करना है जहाँ विद्यार्थियों को गुणवत्तापूर्ण शिक्षा के साथ सुरक्षित, अनुशासित और सकारात्मक वातावरण प्राप्त हो। प्रत्येक विद्यार्थी हमारे लिए महत्वपूर्ण है और उसकी क्षमता को विकसित करना हमारी प्राथमिक जिम्मेदारी है।",
    message2:
      "हम विद्यालय में निरंतर बेहतर शैक्षणिक व्यवस्था, आधुनिक शिक्षण पद्धतियों और विद्यार्थियों के सर्वांगीण विकास के लिए आवश्यक गतिविधियों को प्रोत्साहित करते हैं। हमें विश्वास है कि शिक्षा और संस्कार के मजबूत आधार पर हमारे विद्यार्थी उज्ज्वल भविष्य का निर्माण करेंगे।",
  },
];

export default function MessagesPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071d49]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#f4c400]" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[45px] border-[#f4c400]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-[#f4c400]">
              <span>💬</span>
              <span>विद्यालय परिवार का संदेश</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              हमारे <span className="text-[#f4c400]">संदेश</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              विद्यालय के प्रबंधक एवं प्रधानाचार्य की ओर से विद्यार्थियों,
              अभिभावकों और विद्यालय परिवार के लिए महत्वपूर्ण संदेश।
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7b1720]">
            मार्गदर्शन एवं प्रेरणा
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#071d49] sm:text-3xl">
            शिक्षा के साथ संस्कार और जिम्मेदारी
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            हमारा विद्यालय विद्यार्थियों को केवल परीक्षा के लिए तैयार करने के
            बजाय उन्हें जीवन की चुनौतियों का सामना करने के लिए तैयार करने में
            विश्वास रखता है। शिक्षा, अनुशासन, संस्कार और आत्मविश्वास हमारे
            शैक्षणिक दृष्टिकोण के महत्वपूर्ण आधार हैं।
          </p>
        </div>
      </section>

      {/* MESSAGES */}
      <section className="bg-[#f5f7fa] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {messages.map((item, index) => (
              <article
                key={item.role}
                className={`overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`grid lg:grid-cols-5 ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* IMAGE */}
                  <div
                    className={`relative min-h-[320px] overflow-hidden lg:col-span-2 ${
                      index % 2 === 1 ? "lg:col-start-4" : ""
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071d49]/85 via-[#071d49]/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-flex rounded-full bg-[#f4c400] px-3 py-1.5 text-[10px] font-bold text-[#071d49]">
                        {item.role}
                      </span>

                      <h3 className="mt-3 text-xl font-bold text-white">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-white/70">
                        श्री विक्रमादित्य इंटर कॉलेज
                      </p>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div
                    className={`flex flex-col justify-center p-7 sm:p-9 lg:col-span-3 lg:p-12 ${
                      index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                    }`}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071d49] text-xl text-[#f4c400]">
                        “
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7b1720]">
                          {item.role}
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-[#071d49] sm:text-2xl">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-4 text-justify text-sm leading-7 text-gray-600">
                      <p>{item.message}</p>
                      <p>{item.message2}</p>
                    </div>

                    <div className="mt-7 h-px w-full bg-gray-100" />

                    <div className="mt-5 flex items-center gap-3">
                      <div className="h-1 w-10 rounded-full bg-[#f4c400]" />

                      <p className="text-xs font-semibold text-[#071d49]">
                        शिक्षा • संस्कार • अनुशासन
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071d49] text-xl text-[#f4c400]">
              📚
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#071d49]">
              गुणवत्तापूर्ण शिक्षा
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              विद्यार्थियों को मजबूत शैक्षणिक आधार और सीखने के लिए सकारात्मक
              वातावरण प्रदान करना।
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7b1720] text-xl text-[#f4c400]">
              🌱
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#071d49]">
              व्यक्तित्व विकास
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              विद्यार्थियों की प्रतिभा, आत्मविश्वास, नेतृत्व क्षमता और रचनात्मक
              सोच को विकसित करना।
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16823a] text-xl text-white">
              🤝
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#071d49]">
              संस्कार एवं अनुशासन
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              विद्यार्थियों में नैतिक मूल्यों, अनुशासन और समाज के प्रति
              जिम्मेदारी की भावना विकसित करना।
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#f4c400] px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7b1720]">
              Shri Vikramaditya Inter College
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#071d49] sm:text-3xl">
              शिक्षा और संस्कार के साथ उज्ज्वल भविष्य
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#071d49]/75">
              विद्यालय में प्रवेश, शैक्षणिक गतिविधियों या अन्य जानकारी के लिए
              हमसे संपर्क करें।
            </p>
          </div>

          <a
            href="/contact"
            className="mt-6 inline-flex shrink-0 items-center justify-center rounded-xl bg-[#071d49] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#123b7a] lg:mt-0"
          >
            संपर्क करें →
          </a>
        </div>
      </section>
    </main>
  );
}