const newsItems = [
  {
    id: 1,
    day: "12",
    month: "सितंबर",
    title: "अर्धवार्षिक परीक्षा समय सारणी जारी",
    description:
      "सत्र 2025-26 की अर्धवार्षिक परीक्षा से संबंधित समय सारणी जारी कर दी गई है।",
    isNew: true,
  },
  {
    id: 2,
    day: "05",
    month: "सितंबर",
    title: "शिक्षक दिवस समारोह",
    description:
      "विद्यालय में शिक्षक दिवस के अवसर पर विशेष कार्यक्रम आयोजित किया जाएगा।",
    isNew: false,
  },
  {
    id: 3,
    day: "20",
    month: "अगस्त",
    title: "स्वतंत्रता दिवस समारोह",
    description:
      "विद्यालय में स्वतंत्रता दिवस समारोह हर्षोल्लास के साथ मनाया गया।",
    isNew: false,
  },
  {
    id: 4,
    day: "10",
    month: "अगस्त",
    title: "नवीन प्रवेश प्रक्रिया प्रारंभ",
    description:
      "नए सत्र के लिए प्रवेश प्रक्रिया प्रारंभ हो चुकी है।",
    isNew: false,
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-20">

      <div className="mx-auto grid max-w-[1250px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">

        {/* =====================================================
            NEWS
        ====================================================== */}
        <div>

          {/* Heading */}
          <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">

            <div>

              <div className="section-kicker">
                <span />
                विद्यालय समाचार
              </div>

              <h2 className="mt-2 text-3xl font-black text-[#071D49]">
                नवीनतम समाचार एवं कार्यक्रम
              </h2>

            </div>

            <a
              href="#"
              className="hidden text-sm font-black text-[#7B1720] sm:block"
            >
              सभी देखें →
            </a>

          </div>


          {/* News List */}
          <div className="space-y-3">

            {newsItems.map((item) => (

              <article
                key={item.id}
                className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-4 transition duration-300 hover:border-[#F4C400] hover:shadow-md"
              >

                {/* Date */}
                <div className="flex h-[62px] w-[62px] shrink-0 flex-col items-center justify-center rounded-lg bg-[#071D49] text-white">

                  <strong className="text-xl leading-none">
                    {item.day}
                  </strong>

                  <span className="mt-1 text-[10px] font-bold text-[#F4C400]">
                    {item.month}
                  </span>

                </div>


                {/* Content */}
                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-black text-[#071D49]">
                      {item.title}
                    </h3>

                    {item.isNew && (
                      <span className="rounded-full bg-[#7B1720] px-2 py-0.5 text-[9px] font-black text-white">
                        नया
                      </span>
                    )}

                  </div>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>


        {/* =====================================================
            NOTICE / FEATURED EVENT
        ====================================================== */}
        <div>

          <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">

            <div>

              <div className="section-kicker">
                <span />
                विशेष कार्यक्रम
              </div>

              <h2 className="mt-2 text-3xl font-black text-[#071D49]">
                विद्यालय की गतिविधियाँ
              </h2>

            </div>

            <a
              href="/gallery"
              className="hidden text-sm font-black text-[#7B1720] sm:block"
            >
              सभी देखें →
            </a>

          </div>


          {/* Featured Image */}
          <div className="group relative overflow-hidden rounded-2xl">

            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=90"
              alt="विद्यालय कार्यक्रम"
              className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071D49]/90 via-[#071D49]/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">

              <span className="inline-block rounded-full bg-[#F4C400] px-3 py-1 text-[10px] font-black text-[#071D49]">
                विशेष कार्यक्रम
              </span>

              <h3 className="mt-3 text-2xl font-black text-white">
                शिक्षा, संस्कार एवं विद्यार्थी गतिविधियाँ
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/80">
                विद्यालय में आयोजित विभिन्न शैक्षणिक एवं
                सांस्कृतिक गतिविधियों की झलक।
              </p>

            </div>

          </div>


          {/* Small notices */}
          <div className="mt-4 grid grid-cols-2 gap-3">

            <div className="rounded-xl border border-gray-200 bg-[#F5F7FA] p-4">

              <p className="text-xs font-black text-[#7B1720]">
                सूचना
              </p>

              <p className="mt-1 text-sm font-bold text-[#071D49]">
                विद्यालय समय-सारणी
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 bg-[#F5F7FA] p-4">

              <p className="text-xs font-black text-[#7B1720]">
                अपडेट
              </p>

              <p className="mt-1 text-sm font-bold text-[#071D49]">
                नवीन प्रवेश जानकारी
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}