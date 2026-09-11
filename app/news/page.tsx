"use client";

import { useMemo, useState } from "react";

const newsItems = [
  {
    id: 1,
    type: "सूचना",
    title: "विद्यालय में प्रवेश प्रक्रिया प्रारंभ",
    date: "15 जून 2026",
    category: "प्रवेश",
    excerpt:
      "नए शैक्षणिक सत्र के लिए विद्यालय में प्रवेश प्रक्रिया प्रारंभ हो चुकी है। इच्छुक अभिभावक विद्यालय कार्यालय से संपर्क कर सकते हैं।",
    featured: true,
  },
  {
    id: 2,
    type: "कार्यक्रम",
    title: "विद्यालय में शैक्षणिक गतिविधियों का आयोजन",
    date: "10 जून 2026",
    category: "शैक्षणिक",
    excerpt:
      "विद्यार्थियों के ज्ञान एवं रचनात्मक क्षमता के विकास के लिए विभिन्न शैक्षणिक गतिविधियों का आयोजन किया गया।",
    featured: false,
  },
  {
    id: 3,
    type: "सूचना",
    title: "नए सत्र के लिए महत्वपूर्ण सूचना",
    date: "05 जून 2026",
    category: "महत्वपूर्ण सूचना",
    excerpt:
      "नए शैक्षणिक सत्र से संबंधित आवश्यक जानकारी एवं दिशा-निर्देश विद्यालय कार्यालय से प्राप्त किए जा सकते हैं।",
    featured: false,
  },
  {
    id: 4,
    type: "कार्यक्रम",
    title: "सांस्कृतिक कार्यक्रम एवं प्रतिभा प्रदर्शन",
    date: "28 मई 2026",
    category: "सांस्कृतिक",
    excerpt:
      "विद्यार्थियों को अपनी प्रतिभा एवं रचनात्मकता प्रदर्शित करने का अवसर प्रदान करने के लिए सांस्कृतिक कार्यक्रम आयोजित किया गया।",
    featured: false,
  },
  {
    id: 5,
    type: "कार्यक्रम",
    title: "खेलकूद गतिविधियों का आयोजन",
    date: "20 मई 2026",
    category: "खेलकूद",
    excerpt:
      "विद्यार्थियों में खेल भावना, अनुशासन एवं टीमवर्क विकसित करने के उद्देश्य से विभिन्न खेलकूद गतिविधियाँ आयोजित की गईं।",
    featured: false,
  },
  {
    id: 6,
    type: "सूचना",
    title: "अभिभावकों के लिए आवश्यक सूचना",
    date: "12 मई 2026",
    category: "अभिभावक",
    excerpt:
      "विद्यालय एवं विद्यार्थियों से संबंधित आवश्यक जानकारी के लिए अभिभावक विद्यालय कार्यालय से संपर्क बनाए रखें।",
    featured: false,
  },
];

const filters = [
  "सभी",
  "सूचना",
  "कार्यक्रम",
  "प्रवेश",
  "शैक्षणिक",
  "सांस्कृतिक",
  "खेलकूद",
];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState("सभी");
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const matchesFilter =
        activeFilter === "सभी" ||
        item.type === activeFilter ||
        item.category === activeFilter;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        item.title.toLowerCase().includes(searchText) ||
        item.excerpt.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  const featuredNews = newsItems.find((item) => item.featured);

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
              <span>📰</span>
              <span>विद्यालय की नवीनतम जानकारी</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              सूचना एवं <span className="text-[#f4c400]">समाचार</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              विद्यालय से जुड़ी महत्वपूर्ण सूचनाएँ, कार्यक्रम, गतिविधियाँ,
              प्रवेश संबंधी जानकारी और अन्य नवीनतम अपडेट यहाँ देखें।
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7b1720]">
            Latest Updates
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#071d49] sm:text-3xl">
            विद्यालय की नवीनतम गतिविधियाँ एवं सूचनाएँ
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            विद्यार्थियों एवं अभिभावकों तक विद्यालय से संबंधित महत्वपूर्ण
            जानकारी समय पर पहुँचाना हमारी प्राथमिकता है। यहाँ आपको विद्यालय
            की नवीनतम सूचनाएँ और कार्यक्रमों की जानकारी मिलती रहेगी।
          </p>
        </div>
      </section>

      {/* FEATURED NEWS */}
      {featuredNews && (
        <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-[#071d49] shadow-xl">
            <div className="grid lg:grid-cols-[1.4fr_1fr]">
              <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-[#123b7a] to-[#071d49] p-7 sm:p-10 lg:min-h-[330px] lg:p-12">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[25px] border-[#f4c400]/20" />
                <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/5" />

                <div className="relative flex h-full flex-col justify-center">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="rounded-full bg-[#f4c400] px-3 py-1.5 text-[10px] font-bold text-[#071d49]">
                      महत्वपूर्ण सूचना
                    </span>

                    <span className="text-xs text-white/60">
                      {featuredNews.date}
                    </span>
                  </div>

                  <h2 className="max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {featuredNews.title}
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
                    {featuredNews.excerpt}
                  </p>

                  <div className="mt-7 flex items-center gap-3 text-xs font-semibold text-[#f4c400]">
                    <span className="h-1 w-10 rounded-full bg-[#f4c400]" />
                    श्री विक्रमादित्य इंटर कॉलेज
                  </div>
                </div>
              </div>

              <div className="flex min-h-[280px] items-center justify-center bg-[#f4c400] p-8 lg:min-h-[330px]">
                <div className="text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[#071d49] text-5xl shadow-xl">
                    📰
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#7b1720]">
                    Latest Update
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#071d49]">
                    महत्वपूर्ण जानकारी
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FILTER + SEARCH */}
      <section className="border-y border-gray-100 bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* FILTERS */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => {
                const active = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                      active
                        ? "bg-[#071d49] text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-[#071d49] hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-72">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="समाचार खोजें..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#071d49] focus:ring-2 focus:ring-[#071d49]/10"
              />

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS LIST */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7b1720]">
              News & Events
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#071d49] sm:text-3xl">
              सभी अपडेट
            </h2>
          </div>

          <div className="rounded-full bg-[#f5f7fa] px-4 py-2 text-xs font-semibold text-gray-600">
            {filteredNews.length} अपडेट
          </div>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${
                      item.type === "सूचना"
                        ? "bg-[#071d49] text-white"
                        : "bg-[#f4c400] text-[#071d49]"
                    }`}
                  >
                    {item.type}
                  </span>

                  <span className="text-[11px] font-medium text-gray-400">
                    {item.date}
                  </span>
                </div>

                <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5f7fa] text-xl transition group-hover:bg-[#071d49]">
                  {item.type === "सूचना" ? "📢" : "🎉"}
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#7b1720]">
                  {item.category}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-7 text-[#071d49]">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                  {item.excerpt}
                </p>

                <div className="mt-6 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    className="text-xs font-bold text-[#071d49] transition group-hover:text-[#7b1720]"
                  >
                    पूरी जानकारी देखें →
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-[#f5f7fa] py-16 text-center">
            <div className="text-4xl">🔎</div>

            <h3 className="mt-4 text-lg font-bold text-[#071d49]">
              कोई अपडेट नहीं मिला
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              कृपया दूसरा category या search term आज़माएँ।
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveFilter("सभी");
                setSearch("");
              }}
              className="mt-5 rounded-lg bg-[#071d49] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#123b7a]"
            >
              सभी अपडेट देखें
            </button>
          </div>
        )}
      </section>

      {/* NOTICE STRIP */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#f4c400]/30 bg-[#fff9d9] p-5 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4c400] text-xl">
            📌
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#071d49]">
              महत्वपूर्ण सूचना
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              विद्यालय से संबंधित किसी भी महत्वपूर्ण सूचना के लिए इस पृष्ठ पर
              नियमित रूप से नवीनतम अपडेट देखें।
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
              विद्यालय से जुड़ी जानकारी के लिए संपर्क करें
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#071d49]/75">
              प्रवेश, शैक्षणिक गतिविधियों या विद्यालय से संबंधित किसी अन्य
              जानकारी के लिए हमसे संपर्क करें।
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