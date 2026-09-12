"use client";

import { useEffect, useState } from "react";

export type HeroBanner = {
  id: number | string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  buttonText?: string | null;
  buttonLink?: string | null;
};

/* =========================================================
   FALLBACK HERO
   जब कोई भी database banner published नहीं है
========================================================= */

const fallbackBanners: HeroBanner[] = [
  {
    id: "fallback-1",
    title: "श्री विक्रमादित्य इंटर कॉलेज",
    highlight: "ज्ञान, अनुशासन और संस्कार",
    description:
      "गुणवत्तापूर्ण शिक्षा एवं विद्यार्थियों के सर्वांगीण विकास के लिए प्रतिबद्ध।",
    image: "/school-logo.png",
  },
];

type HeroSliderProps = {
  banners?: HeroBanner[];
};

export default function HeroSlider({
  banners: initialBanners = [],
}: HeroSliderProps) {
  const [banners, setBanners] = useState<HeroBanner[]>(
    initialBanners.length > 0 ? initialBanners : fallbackBanners
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalBanners = banners.length;

  /* =========================================================
     LATEST PUBLISHED BANNERS FETCH
     ========================================================= */

  useEffect(() => {
    let isMounted = true;

    const loadLatestBanners = async () => {
      try {
        const response = await fetch(`/api/banners?t=${Date.now()}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const result = await response.json();

        if (!isMounted) {
          return;
        }

        const latestBanners: HeroBanner[] = Array.isArray(result?.data)
          ? result.data
          : [];

        /*
         * अगर database में कोई published banner नहीं है,
         * तो fallback hero दिखाएँ।
         */
        const nextBanners =
          latestBanners.length > 0
            ? latestBanners
            : fallbackBanners;

        setBanners((currentBanners) => {
          const currentIds = currentBanners.map((banner) => banner.id);
          const nextIds = nextBanners.map((banner) => banner.id);

          const isSame =
            currentIds.length === nextIds.length &&
            currentIds.every(
              (id, index) => id === nextIds[index]
            );

          return isSame ? currentBanners : nextBanners;
        });
      } catch (error) {
        console.error("Latest banners fetch error:", error);

        /*
         * API error होने पर existing banners को रहने दें।
         * अगर शुरुआत से कोई banner नहीं था तो fallback रहेगा।
         */
      }
    };

    /* Initial latest check */
    loadLatestBanners();

    /*
     * हर 5 सेकंड में latest published banners check करें।
     */
    const interval = window.setInterval(() => {
      loadLatestBanners();
    }, 5000);

    /*
     * Tab वापस active होने पर तुरंत check करें।
     */
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadLatestBanners();
      }
    };

    /*
     * Window focus होने पर भी latest data check करें।
     */
    const handleFocus = () => {
      loadLatestBanners();
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener("focus", handleFocus);

    return () => {
      isMounted = false;

      window.clearInterval(interval);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  /* =========================================================
     CURRENT INDEX SAFETY
  ========================================================= */

  useEffect(() => {
    if (currentIndex >= totalBanners) {
      setCurrentIndex(0);
    }
  }, [currentIndex, totalBanners]);

  /* =========================================================
     AUTOPLAY
  ========================================================= */

  useEffect(() => {
    if (totalBanners <= 1 || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) =>
        previousIndex === totalBanners - 1
          ? 0
          : previousIndex + 1
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused, totalBanners]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const goToPrevious = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0
        ? totalBanners - 1
        : previousIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === totalBanners - 1
        ? 0
        : previousIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const activeBanner = banners[currentIndex];

  if (!activeBanner) {
    return null;
  }

  const isFallback =
    typeof activeBanner.id === "string" &&
    activeBanner.id.startsWith("fallback-");

  /* =========================================================
     UI
  ========================================================= */

  return (
    <section
      className="relative overflow-hidden bg-[#071d49]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="विद्यालय मुख्य बैनर"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            {isFallback && index === currentIndex ? (
              <>
                {/* Fallback background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#071d49] via-[#123b7a] to-[#071d49]" />

                {/* Soft decorative circles */}
                <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#f4c400]/10 blur-3xl" />

                <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#7b1720]/20 blur-3xl" />
              </>
            ) : (
              <>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="h-full w-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#071d49]/40" />

                {/* Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#071d49]/75 via-[#071d49]/40 to-transparent" />
              </>
            )}
          </div>
        ))}
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-5 py-16 sm:px-6 lg:min-h-[560px] lg:px-8"
      >
        <div
          key={activeBanner.id}
          className="w-full max-w-3xl animate-[fadeIn_0.7s_ease-in-out]"
        >
          {/* =================================================
              FALLBACK LOGO
          ================================================== */}

          {isFallback && (
            <div className="mb-7 flex items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-white p-3 shadow-2xl sm:h-28 sm:w-28">
                <img
                  src="/school-logo.png"
                  alt="श्री विक्रमादित्य इंटर कॉलेज लोगो"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          )}

          {/* School Badge */}

          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#f4c400]" />

            <span className="text-xs font-bold text-white">
              श्री विक्रमादित्य इंटर कॉलेज
            </span>
          </div>

          {/* =================================================
              TITLE
          ================================================== */}

          <h1 className="text-4xl font-black leading-[1.12] text-white sm:text-5xl lg:text-6xl">
            {activeBanner.title}

            <span className="mt-2 block text-[#f4c400]">
              {activeBanner.highlight}
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            {activeBanner.description}
          </p>

          {/* =================================================
              BUTTONS
          ================================================== */}

          <div className="mt-8 flex flex-wrap gap-3">
            {activeBanner.buttonText &&
              activeBanner.buttonLink && (
                <a
                  href={activeBanner.buttonLink}
                  className="inline-flex items-center justify-center rounded-xl bg-[#f4c400] px-6 py-3 text-sm font-bold text-[#071d49] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
                >
                  {activeBanner.buttonText}

                  <span className="ml-2">
                    →
                  </span>
                </a>
              )}

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#071d49]"
            >
              संपर्क करें
            </a>
          </div>

          {/* =================================================
              SCHOOL INFO
          ================================================== */}

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-10 bg-[#f4c400]" />

            <p className="text-xs font-semibold text-white/60">
              स्थापना वर्ष 2018 • बरौली कर्मा, कौंधियारा, प्रयागराज
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          PREVIOUS BUTTON
      ====================================================== */}

      {totalBanners > 1 && (
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="पिछला बैनर"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#071d49]/50 text-xl text-white backdrop-blur-md transition hover:bg-[#f4c400] hover:text-[#071d49] sm:left-5"
        >
          ‹
        </button>
      )}

      {/* =====================================================
          NEXT BUTTON
      ====================================================== */}

      {totalBanners > 1 && (
        <button
          type="button"
          onClick={goToNext}
          aria-label="अगला बैनर"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#071d49]/50 text-xl text-white backdrop-blur-md transition hover:bg-[#f4c400] hover:text-[#071d49] sm:right-5"
        >
          ›
        </button>
      )}

      {/* =====================================================
          DOTS + COUNTER
      ====================================================== */}

      {totalBanners > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4">
          <div className="flex items-center gap-2">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`बैनर ${index + 1} पर जाएँ`}
                aria-current={
                  index === currentIndex
                }
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#f4c400]"
                    : "w-2 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>

          <div className="rounded-full border border-white/20 bg-[#071d49]/40 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm">
            {String(currentIndex + 1).padStart(
              2,
              "0"
            )}{" "}
            /{" "}
            {String(totalBanners).padStart(
              2,
              "0"
            )}
          </div>
        </div>
      )}
    </section>
  );
}