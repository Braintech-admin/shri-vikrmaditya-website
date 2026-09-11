"use client";

import { useEffect, useState } from "react";

import { banners } from "./bannerData";

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalBanners = banners.length;

  useEffect(() => {
    if (isPaused || totalBanners <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) =>
        previousIndex === totalBanners - 1 ? 0 : previousIndex + 1
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused, totalBanners]);

  const goToPrevious = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? totalBanners - 1 : previousIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === totalBanners - 1 ? 0 : previousIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const activeBanner = banners[currentIndex];

  return (
    <section
      className="relative overflow-hidden bg-[#071d49]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="विद्यालय मुख्य बैनर"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#071d49]/40" />

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071d49]/75 via-[#071d49]/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-5 py-16 sm:px-6 lg:min-h-[560px] lg:px-8">
        <div
          key={activeBanner.id}
          className="max-w-2xl animate-[fadeIn_0.7s_ease-in-out]"
        >
          {/* Kicker */}
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#f4c400]" />
            <span className="text-xs font-bold text-white">
              श्री विक्रमादित्य इंटर कॉलेज
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black leading-[1.12] text-white sm:text-5xl lg:text-6xl">
            {activeBanner.title}
            <span className="mt-1 block text-[#f4c400]">
              {activeBanner.highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
            {activeBanner.description}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            {activeBanner.buttonText && activeBanner.buttonLink && (
              <a
                href={activeBanner.buttonLink}
                className="inline-flex items-center justify-center rounded-xl bg-[#f4c400] px-6 py-3 text-sm font-bold text-[#071d49] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
              >
                {activeBanner.buttonText}
                <span className="ml-2">→</span>
              </a>
            )}

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#071d49]"
            >
              संपर्क करें
            </a>
          </div>

          {/* Establishment */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-10 bg-[#f4c400]" />

            <p className="text-xs font-semibold text-white/60">
              स्थापना वर्ष 2018 • बरौली कर्मा, कौंधियरा, प्रयागराज
            </p>
          </div>
        </div>
      </div>

      {/* Previous Button */}
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

      {/* Next Button */}
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

      {/* Dots + Counter */}
      {totalBanners > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4">
          <div className="flex items-center gap-2">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`बैनर ${index + 1} पर जाएँ`}
                aria-current={index === currentIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#f4c400]"
                    : "w-2 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>

          <div className="rounded-full border border-white/20 bg-[#071d49]/40 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(totalBanners).padStart(2, "0")}
          </div>
        </div>
      )}
    </section>
  );
}