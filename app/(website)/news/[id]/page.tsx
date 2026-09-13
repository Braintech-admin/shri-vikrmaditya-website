import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedNewsById } from "@/lib/news";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(
    "hi-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  ).format(new Date(date));
}

export default async function NewsDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const newsId = Number(id);

  if (!Number.isInteger(newsId)) {
    notFound();
  }

  const news =
    await getPublishedNewsById(
      newsId
    );

  if (!news) {
    notFound();
  }

  const typeLabel =
    news.type === "NOTICE"
      ? "सूचना"
      : "कार्यक्रम";

  return (
    <div className="bg-[#f5f7fa]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071d49] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,196,0,0.14),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.07),transparent_30%)]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#f4c400] transition hover:text-white"
          >
            ← सभी समाचार
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#f4c400] px-4 py-1.5 text-xs font-bold text-[#071d49]">
              {typeLabel}
            </span>

            {news.category && (
              <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold text-white/80">
                {news.category.name}
              </span>
            )}

            <span className="text-sm text-white/60">
              {formatDate(news.date)}
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold leading-relaxed sm:text-5xl">
            {news.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
            {news.excerpt}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="h-2 bg-[#f4c400]" />

            <div className="p-7 sm:p-10 lg:p-12">

              <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-6">
                <span className="rounded-full bg-[#071d49]/5 px-4 py-2 text-sm font-bold text-[#071d49]">
                  {typeLabel}
                </span>

                <span className="rounded-full bg-[#f5f7fa] px-4 py-2 text-sm font-semibold text-slate-600">
                  {news.category.name}
                </span>

                <span className="rounded-full bg-[#f5f7fa] px-4 py-2 text-sm font-semibold text-slate-500">
                  {formatDate(news.date)}
                </span>
              </div>

              <h2 className="mt-8 text-2xl font-extrabold leading-relaxed text-[#071d49] sm:text-3xl">
                {news.title}
              </h2>

              <p className="mt-6 rounded-2xl bg-[#f5f7fa] p-5 text-base font-semibold leading-8 text-slate-700">
                {news.excerpt}
              </p>

              <div className="mt-8 whitespace-pre-line text-base leading-9 text-slate-700">
                {news.content}
              </div>

            </div>
          </article>

          {/* Back */}
          <div className="mt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full bg-[#071d49] px-6 py-3 font-bold text-white transition hover:bg-[#123b7a]"
            >
              ← सभी समाचार देखें
            </Link>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#071d49] py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-[0.2em] text-[#f4c400]">
            SHRI VIKRAMADITYA INTER COLLEGE
          </p>

          <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
            विद्यालय की अन्य सूचनाएँ देखें
          </h2>

          <Link
            href="/news"
            className="mt-6 inline-flex rounded-full bg-[#f4c400] px-6 py-3 font-bold text-[#071d49] transition hover:bg-white"
          >
            सभी समाचार →
          </Link>
        </div>
      </section>

    </div>
  );
}