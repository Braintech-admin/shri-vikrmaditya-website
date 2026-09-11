"use client";

import { useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2200&q=90",
    eyebrow: "आपका स्वागत है",
    title: "बेहतर शिक्षा",
    highlight: "एक उज्ज्वल भविष्य",
    description:
      "श्री विक्रमादित्य इंटर कॉलेज में हम विद्यार्थियों को गुणवत्तापूर्ण शिक्षा, संस्कार और अनुशासन के साथ भविष्य के लिए तैयार करने के लिए प्रतिबद्ध हैं।",
    primaryButton: "विद्यालय के बारे में",
    primaryLink: "#about",
    secondaryButton: "प्रवेश जानकारी",
    secondaryLink: "#admission",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2200&q=90",
    eyebrow: "ज्ञान • संस्कार • अनुशासन",
    title: "विद्यार्थियों के",
    highlight: "सपनों को नई उड़ान",
    description:
      "हर विद्यार्थी की प्रतिभा को पहचानना और उसे सही दिशा देना हमारा संकल्प है।",
    primaryButton: "हमारे बारे में",
    primaryLink: "#about",
    secondaryButton: "शैक्षणिक जानकारी",
    secondaryLink: "#academics",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2200&q=90",
    eyebrow: "शिक्षा से विकास",
    title: "आज की शिक्षा",
    highlight: "कल का नेतृत्व",
    description:
      "शिक्षा के साथ आत्मविश्वास, नैतिक मूल्यों और जिम्मेदारी की भावना का विकास।",
    primaryButton: "शैक्षणिक गतिविधियाँ",
    primaryLink: "#academics",
    secondaryButton: "संपर्क करें",
    secondaryLink: "#contact",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const banner = banners[current];

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative min-h-[500px] overflow-hidden border-b-4 border-[#F4C400] sm:min-h-[560px]">

      {/* Background Image */}
      {banners.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${item.image}')`,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071D49]/95 via-[#071D49]/80 to-[#071D49]/30" />

      {/* Decorative Circle */}
      <div className="absolute -right-20 -top-20 hidden h-64 w-64 rounded-full bg-[#F4C400]/90 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-[1400px] items-center px-6 py-16 sm:min-h-[560px] sm:px-10 lg:px-16">

        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">

            <span className="h-[4px] w-12 bg-[#F4C400]" />

            <span className="text-sm font-black tracking-wide text-[#F4C400]">
              {banner.eyebrow}
            </span>

          </div>

          {/* Heading */}
          <h2 className="text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-[64px]">

            {banner.title}

            <br />

            <span className="text-[#F4C400]">
              {banner.highlight}
            </span>

          </h2>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white/90 sm:text-lg">
            {banner.description}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href={banner.primaryLink}
              className="rounded-md bg-[#16823A] px-7 py-3.5 font-black text-white shadow-lg transition hover:bg-[#0F642D]"
            >
              {banner.primaryButton}
            </a>

            <a
              href={banner.secondaryLink}
              className="rounded-md bg-[#F4C400] px-7 py-3.5 font-black text-[#071D49] shadow-lg transition hover:bg-white"
            >
              {banner.secondaryButton}
            </a>

          </div>

        </div>


        {/* Right Badge */}
        <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 rotate-[-5deg] lg:block">

          <div className="rounded-2xl bg-[#F4C400] px-10 py-7 text-center shadow-2xl">

            <p className="text-sm font-black">
              शिक्षा से
            </p>

            <p className="mt-1 text-3xl font-black text-[#071D49]">
              उज्ज्वल
            </p>

            <p className="text-3xl font-black text-[#071D49]">
              भविष्य
            </p>

            <div className="mt-3 border-t-2 border-[#071D49]/30 pt-2 text-sm font-bold">
              ज्ञान • संस्कार • अनुशासन
            </div>

          </div>

        </div>

      </div>


      {/* Previous */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="पिछला बैनर"
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[#071D49]/40 text-xl text-white backdrop-blur transition hover:bg-[#F4C400] hover:text-[#071D49]"
      >
        ‹
      </button>


      {/* Next */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="अगला बैनर"
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[#071D49]/40 text-xl text-white backdrop-blur transition hover:bg-[#F4C400] hover:text-[#071D49]"
      >
        ›
      </button>


      {/* Indicators */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">

        {banners.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`बैनर ${index + 1}`}
            className={`rounded-full transition-all ${
              index === current
                ? "h-3 w-9 bg-[#F4C400]"
                : "h-3 w-3 bg-white/80"
            }`}
          />
        ))}

      </div>

    </section>
  );
}