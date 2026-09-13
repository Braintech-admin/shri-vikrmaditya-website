"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NewsType = "NOTICE" | "EVENT";

type Category = {
  id: number;
  name: string;
  isActive: boolean;
  sortOrder: number;
};

type NewsItem = {
  id: number;
  type: NewsType;
  title: string;
  date: string;
  categoryId: number;
  excerpt: string;
  content: string;
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
  category: Category;
};

type NewsApiResponse = {
  success: boolean;
  data?: {
    news: NewsItem[];
    categories: Category[];
  };
  message?: string;
};

const searchAliases: Record<string, string[]> = {
  pravesh: ["प्रवेश", "admission"],
  admission: ["प्रवेश", "pravesh"],
  suchna: ["सूचना", "notice"],
  notice: ["सूचना", "suchna"],
  vidyalaya: ["विद्यालय", "school"],
  school: ["विद्यालय", "vidyalaya"],
  khel: ["खेल", "खेलकूद", "sports"],
  sports: ["खेल", "खेलकूद", "khel"],
  karyakram: ["कार्यक्रम", "event", "program"],
  event: ["कार्यक्रम", "event"],
  program: ["कार्यक्रम", "program"],
  shiksha: ["शिक्षा", "education"],
  education: ["शिक्षा", "shiksha"],
  abhibhavak: ["अभिभावक", "parent", "parents"],
  parent: ["अभिभावक", "parents"],
  parents: ["अभिभावक", "parent"],
};

function normalizeText(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("hi-IN")
    .trim()
    .replace(/\s+/g, " ");
}

function getSearchTerms(query: string) {
  const normalized = normalizeText(query);

  if (!normalized) {
    return [];
  }

  const terms = new Set<string>();

  terms.add(normalized);

  const aliases =
    searchAliases[normalized];

  if (aliases) {
    aliases.forEach((alias) =>
      terms.add(normalizeText(alias))
    );
  }

  normalized
    .split(/\s+/)
    .filter(Boolean)
    .forEach((word) => {
      terms.add(word);

      const wordAliases =
        searchAliases[word];

      if (wordAliases) {
        wordAliases.forEach((alias) =>
          terms.add(
            normalizeText(alias)
          )
        );
      }
    });

  return Array.from(terms);
}

function searchMatches(
  item: NewsItem,
  query: string
) {
  const terms =
    getSearchTerms(query);

  if (!terms.length) {
    return true;
  }

  const searchableText = normalizeText(
    [
      item.title,
      item.excerpt,
      item.content,
      item.category?.name ?? "",
      item.type === "NOTICE"
        ? "सूचना notice suchna"
        : "कार्यक्रम event program karyakram",
    ].join(" ")
  );

  return terms.some((term) =>
    searchableText.includes(term)
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat(
    "hi-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(new Date(date));
}

function getTypeLabel(type: NewsType) {
  return type === "NOTICE"
    ? "सूचना"
    : "कार्यक्रम";
}

export default function NewsPage() {
  const [news, setNews] =
    useState<NewsItem[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("ALL");

  const [search, setSearch] =
    useState("");

  /* =====================================================
     LOAD DB NEWS
  ===================================================== */

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/news",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result: NewsApiResponse =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "News load नहीं हो सकी।"
          );
        }

        setNews(
          result.data?.news ?? []
        );

        setCategories(
          result.data?.categories ?? []
        );
      } catch (error) {
        console.error(
          "Frontend news error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "News load नहीं हो सकी।"
        );
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  /* =====================================================
     FILTERS
  ===================================================== */

  const filters = useMemo(() => {
    return [
      {
        value: "ALL",
        label: "सभी",
      },
      ...categories.map(
        (category) => ({
          value: String(
            category.id
          ),
          label: category.name,
        })
      ),
    ];
  }, [categories]);

  const publishedNews = useMemo(() => {
    return [...news].sort(
      (a, b) =>
        a.sortOrder - b.sortOrder ||
        new Date(b.date).getTime() -
          new Date(a.date).getTime()
    );
  }, [news]);

  const featuredNews = useMemo(() => {
    return (
      publishedNews.find(
        (item) =>
          item.isFeatured
      ) ??
      publishedNews[0]
    );
  }, [publishedNews]);

  const filteredNews = useMemo(() => {
    return publishedNews.filter(
      (item) => {
        const matchesCategory =
          activeFilter === "ALL" ||
          String(
            item.categoryId
          ) === activeFilter;

        return (
          matchesCategory &&
          searchMatches(
            item,
            search
          )
        );
      }
    );
  }, [
    publishedNews,
    activeFilter,
    search,
  ]);

  return (
    <div className="bg-[#f5f7fa]">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-[#071d49] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,196,0,0.14),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.07),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold tracking-[0.2em] text-[#f4c400]">
              सूचना एवं समाचार
            </p>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              विद्यालय की नवीनतम
              <span className="block text-[#f4c400]">
                सूचनाएँ एवं गतिविधियाँ
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              विद्यालय से संबंधित महत्वपूर्ण सूचनाएँ, कार्यक्रम,
              शैक्षणिक गतिविधियाँ एवं अन्य समाचार एक ही स्थान पर
              प्राप्त करें।
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          FEATURED NEWS
      ================================================= */}

      {!loading &&
        featuredNews && (
          <section className="relative -mt-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <div className="grid lg:grid-cols-[1fr_1.4fr]">

                  <div className="bg-[#071d49] p-8 text-white sm:p-10">
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#f4c400] px-4 py-1.5 text-xs font-bold text-[#071d49]">
                        प्रमुख सूचना
                      </span>

                      <span className="text-sm text-white/60">
                        {formatDate(
                          featuredNews.date
                        )}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold leading-relaxed sm:text-3xl">
                      {featuredNews.title}
                    </h2>

                    <p className="mt-5 leading-8 text-white/75">
                      {featuredNews.excerpt}
                    </p>

                    <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-[#f4c400]" />
                      {featuredNews.category.name}
                    </div>
                  </div>

                  <div className="flex items-center bg-white p-8 sm:p-10">
                    <div>
                      <p className="text-sm font-bold text-[#7b1720]">
                        विद्यालय सूचना
                      </p>

                      <h3 className="mt-3 text-2xl font-bold leading-relaxed text-[#071d49]">
                        {featuredNews.title}
                      </h3>

                      <p className="mt-4 line-clamp-5 leading-8 text-slate-600">
                        {featuredNews.content}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <span className="rounded-full bg-[#f5f7fa] px-4 py-2 text-sm font-semibold text-[#071d49]">
                          {getTypeLabel(
                            featuredNews.type
                          )}
                        </span>

                        <span className="rounded-full bg-[#f5f7fa] px-4 py-2 text-sm font-semibold text-[#071d49]">
                          {formatDate(
                            featuredNews.date
                          )}
                        </span>
                      </div>

                      <Link
                        href={`/news/${featuredNews.id}`}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#071d49] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#123b7a]"
                      >
                        पूरी जानकारी
                        <span>→</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        )}

      {/* =================================================
          NEWS LISTING
      ================================================= */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading + Search */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">
                LATEST UPDATES
              </p>

              <h2 className="section-heading mt-2">
                सभी सूचना एवं समाचार
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-slate-600">
                विद्यालय की नवीनतम गतिविधियों और महत्वपूर्ण सूचनाओं
                से अपडेट रहें।
              </p>
            </div>

            {/* Bilingual Search */}
            <div className="w-full lg:max-w-sm">
              <div className="relative">
                <input
                  type="search"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="हिंदी या English में खोजें..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 pr-12 text-sm outline-none transition focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                />

                <svg
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                उदाहरण:{" "}
                <b>प्रवेश</b> या{" "}
                <b>pravesh</b>
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
            {filters.map(
              (filter) => {
                const isActive =
                  activeFilter ===
                  filter.value;

                return (
                  <button
                    key={
                      filter.value
                    }
                    type="button"
                    onClick={() =>
                      setActiveFilter(
                        filter.value
                      )
                    }
                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                      isActive
                        ? "bg-[#071d49] text-white shadow-md"
                        : "bg-white text-slate-600 hover:bg-[#071d49]/5 hover:text-[#071d49]"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              }
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-10 rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#071d49]/20 border-t-[#071d49]" />

              <p className="mt-4 text-sm text-slate-500">
                समाचार लोड हो रहे हैं...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center">
              <h3 className="text-xl font-bold text-red-700">
                समाचार लोड नहीं हो सके
              </h3>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Cards */}
          {!loading &&
            !error &&
            filteredNews.length >
              0 && (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNews.map(
                  (item) => (
                    <article
                      key={item.id}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="h-2 bg-[#071d49] transition group-hover:bg-[#f4c400]" />

                      <div className="flex flex-1 flex-col p-7">

                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              item.type ===
                              "NOTICE"
                                ? "bg-[#071d49]/10 text-[#071d49]"
                                : "bg-[#f4c400]/20 text-[#7b1720]"
                            }`}
                          >
                            {getTypeLabel(
                              item.type
                            )}
                          </span>

                          <span className="text-xs font-semibold text-slate-400">
                            {formatDate(
                              item.date
                            )}
                          </span>
                        </div>

                        <h3 className="mt-5 text-xl font-bold leading-relaxed text-[#071d49] transition group-hover:text-[#7b1720]">
                          {item.title}
                        </h3>

                        <p className="mt-4 flex-1 line-clamp-4 leading-7 text-slate-600">
                          {item.excerpt}
                        </p>

                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                          <span className="text-xs font-bold text-slate-400">
                            {item.category.name}
                          </span>

                          <Link
                            href={`/news/${item.id}`}
                            className="text-sm font-bold text-[#071d49] transition hover:text-[#7b1720]"
                          >
                            पूरी जानकारी →
                          </Link>
                        </div>

                      </div>
                    </article>
                  )
                )}
              </div>
            )}

          {/* No Results */}
          {!loading &&
            !error &&
            filteredNews.length ===
              0 && (
              <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#071d49]/5 text-2xl">
                  🔎
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#071d49]">
                  कोई समाचार नहीं मिला
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  कृपया Hindi या English में कोई दूसरा keyword
                  खोजकर देखें।
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="mt-5 rounded-full bg-[#071d49] px-5 py-2.5 text-sm font-bold text-white"
                  >
                    Search Clear करें
                  </button>
                )}
              </div>
            )}
        </div>
      </section>

      {/* Notice Strip */}
      <section className="border-y border-[#f4c400]/30 bg-[#fff9df] py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4c400] text-[#071d49]">
              !
            </span>

            <p className="text-sm font-semibold leading-6 text-[#071d49]">
              विद्यालय की नवीनतम सूचनाओं के लिए नियमित रूप से इस पेज
              पर विजिट करते रहें।
            </p>
          </div>

          <Link
            href="/contact"
            className="font-bold text-[#7b1720] transition hover:text-[#071d49]"
          >
            संपर्क करें →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#071d49] py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-[0.2em] text-[#f4c400]">
            SHRI VIKRAMADITYA INTER COLLEGE
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            विद्यालय से संबंधित जानकारी के लिए हमसे संपर्क करें
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
            प्रवेश, शैक्षणिक गतिविधियों एवं अन्य विद्यालय संबंधी जानकारी
            के लिए विद्यालय कार्यालय से संपर्क करें।
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-[#f4c400] px-7 py-3.5 font-bold text-[#071d49] transition hover:bg-white"
            >
              संपर्क करें
            </Link>

            <Link
              href="/admission"
              className="rounded-full border border-white/30 px-7 py-3.5 font-bold text-white transition hover:border-[#f4c400] hover:text-[#f4c400]"
            >
              प्रवेश जानकारी
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}