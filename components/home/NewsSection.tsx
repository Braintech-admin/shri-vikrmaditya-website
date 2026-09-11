import Link from "next/link";
import { newsItems } from "./newsData";

export default function NewsSection() {
  const latestNews = [...newsItems]
    .filter((item) => item.isPublished)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 4);

  return (
    <section
      id="news"
      className="bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">
              LATEST UPDATES
            </p>

            <h2 className="section-heading mt-2">
              नवीनतम सूचना एवं समाचार
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-slate-600">
              विद्यालय से संबंधित महत्वपूर्ण सूचनाएँ, कार्यक्रम एवं
              गतिविधियों की नवीनतम जानकारी यहाँ प्राप्त करें।
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex w-fit items-center gap-2 font-bold text-[#071d49] transition hover:text-[#7b1720]"
          >
            सभी समाचार देखें
            <span>→</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">

          {/* News Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {latestNews.map((item) => (
              <article
                key={item.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Top */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.type === "सूचना"
                        ? "bg-[#071d49]/10 text-[#071d49]"
                        : "bg-[#f4c400]/20 text-[#7b1720]"
                    }`}
                  >
                    {item.type}
                  </span>

                  <span className="text-xs font-semibold text-slate-400">
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-bold leading-7 text-[#071d49] transition group-hover:text-[#7b1720]">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                  {item.excerpt}
                </p>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-400">
                    {item.category}
                  </span>

                  <Link
                    href="/news"
                    className="text-sm font-bold text-[#071d49] transition hover:text-[#7b1720]"
                  >
                    पढ़ें →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Special Activities Panel */}
          <div className="relative overflow-hidden rounded-3xl bg-[#071d49] p-8 text-white">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#f4c400]/10" />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white/5" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4c400] text-xl font-bold text-[#071d49]">
                ★
              </div>

              <p className="mt-7 text-sm font-bold tracking-wide text-[#f4c400]">
                SCHOOL ACTIVITIES
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                विशेष कार्यक्रम
              </h3>

              <p className="mt-4 leading-8 text-white/70">
                विद्यालय में समय-समय पर शैक्षणिक, सांस्कृतिक एवं
                खेलकूद गतिविधियों का आयोजन किया जाता है, जिससे
                विद्यार्थियों के सर्वांगीण विकास को बढ़ावा मिले।
              </p>

              {/* Activity Points */}
              <div className="mt-7 space-y-4">
                {[
                  "शैक्षणिक गतिविधियाँ",
                  "सांस्कृतिक कार्यक्रम",
                  "खेलकूद गतिविधियाँ",
                  "विद्यार्थी प्रतिभा प्रदर्शन",
                ].map((activity) => (
                  <div
                    key={activity}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm text-[#f4c400]">
                      ✓
                    </span>

                    <span className="text-sm font-semibold text-white/85">
                      {activity}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/gallery"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#071d49] transition hover:bg-[#f4c400]"
              >
                विद्यालय गतिविधियाँ देखें
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}