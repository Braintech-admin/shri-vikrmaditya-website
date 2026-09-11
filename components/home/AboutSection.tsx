export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24">

      <div className="mx-auto grid max-w-[1250px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* =====================================================
            SCHOOL IMAGE
        ====================================================== */}
        <div className="relative">

          <div className="rounded-2xl bg-[#F4F6FA] p-4 shadow-sm">

            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">

              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=90"
                alt="श्री विक्रमादित्य इण्टर कॉलेज विद्यालय भवन"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071D49]/60 to-transparent" />

              <div className="absolute bottom-5 left-5">

                <p className="text-sm font-bold text-white">
                  श्री विक्रमादित्य इण्टर कॉलेज
                </p>

                <p className="text-xs text-white/80">
                  बरौली करमा, कौंधियरा, प्रयागराज
                </p>

              </div>

            </div>

          </div>


          {/* Establishment Badge */}
          <div className="absolute -bottom-7 right-5 rounded-xl bg-[#F4C400] px-7 py-4 text-center shadow-xl">

            <div className="text-4xl font-black text-[#071D49]">
              2018
            </div>

            <div className="text-sm font-black">
              स्थापना वर्ष
            </div>

          </div>

        </div>


        {/* =====================================================
            ABOUT CONTENT
        ====================================================== */}
        <div>

          <div className="section-kicker">
            <span />
            हमारे विद्यालय के बारे में
          </div>


          <h2 className="mt-4 text-3xl font-black leading-tight text-[#071D49] sm:text-4xl lg:text-5xl">

            शिक्षा के साथ

            <br />

            <span className="text-[#123B7A]">
              संस्कार और व्यक्तित्व निर्माण
            </span>

          </h2>


          <div className="mt-5 h-1 w-16 bg-[#F4C400]" />


          <p className="mt-7 text-base leading-8 text-gray-600">
            श्री विक्रमादित्य इण्टर कॉलेज, बरौली करमा, कौंधियरा,
            प्रयागराज विद्यार्थियों को गुणवत्तापूर्ण शिक्षा प्रदान करने
            तथा उनके सर्वांगीण विकास के लिए समर्पित एक शिक्षण संस्थान है।
          </p>


          <p className="mt-4 text-base leading-8 text-gray-600">
            हमारा उद्देश्य विद्यार्थियों में ज्ञान के साथ-साथ अनुशासन,
            संस्कार, आत्मविश्वास, नैतिक मूल्यों और सामाजिक जिम्मेदारी की
            भावना विकसित करना है, जिससे वे भविष्य में एक बेहतर नागरिक
            बन सकें।
          </p>


          {/* Values */}
          <div className="mt-7 grid gap-4 sm:grid-cols-2">

            <div className="flex gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F4EB]">
                ✓
              </span>

              <div>
                <h4 className="font-black text-[#071D49]">
                  गुणवत्तापूर्ण शिक्षा
                </h4>

                <p className="text-xs text-gray-500">
                  बेहतर शिक्षा पर विशेष ध्यान
                </p>
              </div>

            </div>


            <div className="flex gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF4C7]">
                ★
              </span>

              <div>
                <h4 className="font-black text-[#071D49]">
                  संस्कार
                </h4>

                <p className="text-xs text-gray-500">
                  नैतिक मूल्यों का विकास
                </p>
              </div>

            </div>


            <div className="flex gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7EEF8]">
                ◈
              </span>

              <div>
                <h4 className="font-black text-[#071D49]">
                  मार्गदर्शन
                </h4>

                <p className="text-xs text-gray-500">
                  उचित दिशा एवं सहयोग
                </p>
              </div>

            </div>


            <div className="flex gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8E5E7]">
                ⚖
              </span>

              <div>
                <h4 className="font-black text-[#071D49]">
                  अनुशासन
                </h4>

                <p className="text-xs text-gray-500">
                  सकारात्मक वातावरण
                </p>
              </div>

            </div>

          </div>


          <a
            href="/about"
            className="mt-8 inline-flex rounded-md bg-[#071D49] px-7 py-3.5 font-black text-white transition hover:bg-[#123B7A]"
          >
            विद्यालय के बारे में और पढ़ें →
          </a>

        </div>

      </div>

    </section>
  );
}