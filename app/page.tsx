export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* ================= TOP BAR ================= */}
      <div className="bg-[#421d63] text-white">
        <div className="container flex min-h-[38px] items-center justify-between gap-4 text-sm">

          <div className="flex items-center gap-5">
            <span>📍 कौंधियरा, प्रयागराज</span>
          </div>

          <div className="hidden items-center gap-5 sm:flex">
            <span>छात्र लॉगिन</span>
            <span className="opacity-40">|</span>
            <span>अभिभावक लॉगिन</span>
            <span className="opacity-40">|</span>
            <span>स्टाफ लॉगिन</span>
          </div>

        </div>
      </div>


      {/* ================= SCHOOL HEADER ================= */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container flex min-h-[125px] items-center justify-between gap-6 py-4">

          {/* Logo + School Name */}
          <div className="flex items-center gap-4">

            <div className="shrink-0">
              <img
                src="/school-logo.png"
                alt="श्री विक्रमादित्य इंटर कॉलेज का लोगो"
                className="h-[90px] w-[90px] object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold leading-tight text-[#5b2a86] sm:text-3xl lg:text-4xl">
                श्री विक्रमादित्य इंटर कॉलेज
              </h1>

              <p className="mt-1 text-base font-semibold text-gray-700 sm:text-lg">
                कौंधियरा, प्रयागराज
              </p>

              <p className="mt-1 text-sm tracking-wide text-[#5b2a86]">
                ज्ञान&nbsp; • &nbsp;अनुशासन&nbsp; • &nbsp;संस्कार&nbsp; • &nbsp;उज्ज्वल भविष्य
              </p>
            </div>

          </div>


          {/* Right Side Tagline */}
          <div className="hidden max-w-[250px] text-right md:block">
            <p className="text-lg font-bold leading-relaxed text-[#421d63]">
              “शिक्षा से
              <br />
              समृद्ध समाज की ओर”
            </p>

            <div className="ml-auto mt-3 h-1 w-24 rounded-full bg-[#f4c542]" />
          </div>

        </div>
      </header>


      {/* ================= NAVIGATION ================= */}
      <nav className="bg-[#5b2a86] text-white shadow-md">
        <div className="container">

          {/* Desktop Navigation */}
          <div className="hidden items-center lg:flex">

            <a
              href="#"
              className="border-b-4 border-[#f4c542] bg-[#f4c542] px-7 py-4 font-bold text-[#421d63]"
            >
              मुख्य पृष्ठ
            </a>

            <a
              href="#about"
              className="px-6 py-4 font-medium transition hover:bg-[#421d63]"
            >
              हमारे बारे में
            </a>

            <a
              href="#messages"
              className="px-6 py-4 font-medium transition hover:bg-[#421d63]"
            >
              संदेश
            </a>

            <a
              href="#admission"
              className="px-6 py-4 font-medium transition hover:bg-[#421d63]"
            >
              प्रवेश प्रक्रिया
            </a>

            <a
              href="#academics"
              className="px-6 py-4 font-medium transition hover:bg-[#421d63]"
            >
              शैक्षणिक गतिविधियाँ
            </a>

            <a
              href="#gallery"
              className="px-6 py-4 font-medium transition hover:bg-[#421d63]"
            >
              गैलरी
            </a>

            <a
              href="#contact"
              className="px-6 py-4 font-medium transition hover:bg-[#421d63]"
            >
              संपर्क करें
            </a>

          </div>


          {/* Mobile Navigation Button */}
          <div className="flex items-center justify-between py-3 lg:hidden">

            <span className="font-semibold">
              मुख्य पृष्ठ
            </span>

            <button
              type="button"
              className="rounded-md border border-white/30 px-3 py-1.5 text-xl"
              aria-label="मेनू खोलें"
            >
              ☰
            </button>

          </div>

        </div>
      </nav>


      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#421d63]">

        <div className="container relative z-10">

          <div className="grid min-h-[480px] items-center lg:grid-cols-2">

            {/* Hero Content */}
            <div className="py-16 lg:py-20">

              <p className="mb-4 text-lg font-bold tracking-widest text-[#f4c542]">
                आपका स्वागत है
              </p>

              <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                श्री विक्रमादित्य
                <br />
                <span className="text-[#f4c542]">
                  इंटर कॉलेज
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-xl font-semibold leading-relaxed text-white/90">
                उत्तम शिक्षा, श्रेष्ठ संस्कार और
                <br />
                उज्ज्वल भविष्य की दिशा में एक कदम
              </p>

              <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
                विद्यार्थियों के ज्ञान, चरित्र, अनुशासन और सर्वांगीण विकास
                के लिए समर्पित हमारा विद्यालय।
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <a
                  href="#about"
                  className="rounded-md bg-[#f4c542] px-7 py-3.5 font-bold text-[#421d63] shadow-lg transition hover:bg-[#e8b900]"
                >
                  और जानें →
                </a>

                <a
                  href="#admission"
                  className="rounded-md border-2 border-white px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-[#421d63]"
                >
                  प्रवेश जानकारी
                </a>

              </div>

            </div>


            {/* Hero Visual */}
            <div className="flex min-h-[350px] items-center justify-center py-10 lg:min-h-[480px]">

              <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full border-8 border-[#f4c542]/30 bg-white/10 shadow-2xl backdrop-blur-sm sm:h-[380px] sm:w-[380px]">

                <img
                  src="/school-logo.png"
                  alt="श्री विक्रमादित्य इंटर कॉलेज"
                  className="h-[250px] w-[250px] object-contain drop-shadow-2xl sm:h-[300px] sm:w-[300px]"
                />

              </div>

            </div>

          </div>

        </div>


        {/* Decorative Background */}
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-[40px] border-white/5" />
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[40px] border-[#f4c542]/5" />

      </section>


      {/* ================= QUICK HIGHLIGHTS ================= */}
      <section className="relative z-20 -mt-8 px-4">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-xl bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-5">

          <div className="border-b p-6 text-center lg:border-b-0 lg:border-r">
            <div className="text-3xl">🎓</div>
            <h3 className="mt-3 font-bold text-[#421d63]">
              गुणवत्तापूर्ण शिक्षा
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              मजबूत शैक्षणिक आधार
            </p>
          </div>

          <div className="border-b p-6 text-center lg:border-b-0 lg:border-r">
            <div className="text-3xl">👨‍🏫</div>
            <h3 className="mt-3 font-bold text-[#421d63]">
              अनुभवी शिक्षक
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              मार्गदर्शन एवं सहयोग
            </p>
          </div>

          <div className="border-b p-6 text-center lg:border-b-0 lg:border-r">
            <div className="text-3xl">📚</div>
            <h3 className="mt-3 font-bold text-[#421d63]">
              समग्र विकास
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              शिक्षा के साथ संस्कार
            </p>
          </div>

          <div className="border-b p-6 text-center lg:border-b-0 lg:border-r">
            <div className="text-3xl">🏆</div>
            <h3 className="mt-3 font-bold text-[#421d63]">
              अनुशासन एवं मूल्य
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              चरित्र निर्माण
            </p>
          </div>

          <div className="p-6 text-center">
            <div className="text-3xl">🏫</div>
            <h3 className="mt-3 font-bold text-[#421d63]">
              सुरक्षित वातावरण
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              बेहतर सीखने का माहौल
            </p>
          </div>

        </div>
      </section>


      {/* ================= TEMPORARY TEST SECTION ================= */}
      <section className="container py-16">

        <div className="mx-auto max-w-3xl text-center">

          <p className="font-bold text-[#f0b900]">
            श्री विक्रमादित्य इंटर कॉलेज
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#421d63]">
            शिक्षा और संस्कार का केंद्र
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#f4c542]" />

          <p className="mt-6 leading-8 text-gray-600">
            हमारा उद्देश्य विद्यार्थियों को गुणवत्तापूर्ण शिक्षा प्रदान करने
            के साथ-साथ उनमें अनुशासन, संस्कार, आत्मविश्वास और जिम्मेदारी की
            भावना विकसित करना है।
          </p>

        </div>

      </section>

    </main>
  );
}