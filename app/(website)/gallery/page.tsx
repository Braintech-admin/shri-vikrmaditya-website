"use client";

import { useMemo, useState } from "react";
import {
  galleryCategories,
  galleryItems,
} from "@/components/home/galleryData";

const allCategories = ["सभी", ...galleryCategories];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("सभी");
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryItems)[number] | null
  >(null);

  const filteredItems = useMemo(() => {
    return galleryItems
      .filter((item) => item.isPublished)
      .filter((item) => {
        if (activeCategory === "सभी") {
          return true;
        }

        return item.category === activeCategory;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [activeCategory]);

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
              <span>📸</span>
              <span>विद्यालय की झलकियाँ</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              हमारी <span className="text-[#f4c400]">गैलरी</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              श्री विक्रमादित्य इंटर कॉलेज में आयोजित विभिन्न शैक्षणिक,
              सांस्कृतिक, खेलकूद एवं अन्य गतिविधियों की कुछ यादगार झलकियाँ।
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7b1720]">
            छात्र जीवन की झलक
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#071d49] sm:text-3xl">
            सीखने, सहभागिता और उपलब्धियों की तस्वीरें
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            विद्यालय में शिक्षा के साथ-साथ विद्यार्थियों के सर्वांगीण विकास पर
            विशेष ध्यान दिया जाता है। विभिन्न कार्यक्रमों और गतिविधियों के
            माध्यम से विद्यार्थियों को अपनी प्रतिभा एवं रचनात्मकता प्रदर्शित
            करने के अवसर मिलते हैं।
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="border-y border-gray-100 bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {allCategories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#071d49] text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-[#071d49] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7b1720]">
              Photo Gallery
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#071d49] sm:text-3xl">
              विद्यालय की यादगार झलकियाँ
            </h2>
          </div>

          <div className="hidden rounded-full bg-[#f5f7fa] px-4 py-2 text-xs font-semibold text-gray-600 sm:block">
            {filteredItems.length} तस्वीरें
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedImage(item)}
                className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071d49]/80 via-transparent to-transparent opacity-70" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#f4c400]">
                      {item.category}
                    </p>

                    <h3 className="mt-1 text-sm font-bold text-white">
                      {item.title}
                    </h3>
                  </div>

                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#071d49] opacity-0 shadow-md transition group-hover:opacity-100">
                    ↗
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-[#f5f7fa] py-16 text-center">
            <div className="text-4xl">📷</div>

            <p className="mt-3 text-sm font-semibold text-gray-600">
              इस श्रेणी में अभी कोई तस्वीर उपलब्ध नहीं है।
            </p>
          </div>
        )}
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071d49]/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-[#071d49] shadow-lg transition hover:bg-[#f4c400]"
              aria-label="बंद करें"
            >
              ×
            </button>

            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[75vh] w-full object-contain"
              />

              <div className="px-5 py-4">
                <p className="text-xs font-semibold text-[#7b1720]">
                  {selectedImage.category}
                </p>

                <h3 className="mt-1 text-lg font-bold text-[#071d49]">
                  {selectedImage.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#f4c400] px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7b1720]">
              Shri Vikramaditya Inter College
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#071d49] sm:text-3xl">
              शिक्षा, संस्कार और उज्ज्वल भविष्य की ओर
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#071d49]/75">
              विद्यालय से जुड़ी जानकारी अथवा प्रवेश संबंधी किसी भी जानकारी के
              लिए हमसे संपर्क करें।
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