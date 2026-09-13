"use client";

import { useEffect, useMemo, useState } from "react";

type Category = {
  id: number;
  name: string;
  isActive: boolean;
  sortOrder: number;
};

type GalleryItem = {
  id: number;
  title: string;
  categoryId: number;
  image: string;
  isPublished: boolean;
  sortOrder: number;
  category: Category;
};

export default function GalleryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const [selectedImageIndex, setSelectedImageIndex] = useState<
    number | null
  >(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch(
          `/api/gallery?t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Gallery load failed");
        }

        const data = await response.json();

        setCategories(data.categories || []);
        setItems(data.items || []);
      } catch (error) {
        console.error("Gallery load error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (activeCategory === "all") return true;

        return (
          String(item.categoryId) === activeCategory
        );
      })
      .sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) {
          return a.sortOrder - b.sortOrder;
        }

        return a.id - b.id;
      });
  }, [items, activeCategory]);

  function openLightbox(index: number) {
    setSelectedImageIndex(index);
  }

  function closeLightbox() {
    setSelectedImageIndex(null);
  }

  function showPreviousImage() {
    if (
      selectedImageIndex === null ||
      filteredItems.length === 0
    ) {
      return;
    }

    setSelectedImageIndex((current) => {
      if (current === null) return null;

      return current === 0
        ? filteredItems.length - 1
        : current - 1;
    });
  }

  function showNextImage() {
    if (
      selectedImageIndex === null ||
      filteredItems.length === 0
    ) {
      return;
    }

    setSelectedImageIndex((current) => {
      if (current === null) return null;

      return current === filteredItems.length - 1
        ? 0
        : current + 1;
    });
  }

  /*
   * Keyboard controls
   */
  useEffect(() => {
    if (selectedImageIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    selectedImageIndex,
    filteredItems.length,
  ]);

  /*
   * If category is changed while lightbox is open,
   * close the lightbox to avoid showing an invalid index.
   */
  useEffect(() => {
    setSelectedImageIndex(null);
  }, [activeCategory]);

  const selectedImage =
    selectedImageIndex !== null
      ? filteredItems[selectedImageIndex]
      : null;

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

              <span>
                विद्यालय की झलकियाँ
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              हमारी{" "}
              <span className="text-[#f4c400]">
                गैलरी
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              विद्यालय की शैक्षणिक, सांस्कृतिक, खेलकूद एवं
              अन्य गतिविधियों की महत्वपूर्ण झलकियाँ।
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7b1720]">
            यादगार जीवन की झलक
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#071d49] sm:text-3xl">
            शिक्षा, संस्कार और गतिविधियों की तस्वीरें
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            विद्यालय में आयोजित विभिन्न गतिविधियों एवं
            कार्यक्रमों के माध्यम से विद्यार्थियों के
            सर्वांगीण विकास की झलक इस गैलरी में देखी जा
            सकती है।
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="border-y border-gray-100 bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() =>
                setActiveCategory("all")
              }
              className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                activeCategory === "all"
                  ? "bg-[#071d49] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-[#071d49] hover:text-white"
              }`}
            >
              सभी
            </button>

            {categories.map((category) => {
              const isActive =
                activeCategory ===
                String(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setActiveCategory(
                      String(category.id)
                    )
                  }
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#071d49] text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-[#071d49] hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GRID */}
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

        {loading ? (
          <div className="rounded-2xl bg-[#f5f7fa] py-16 text-center">
            <p className="text-sm font-semibold text-gray-500">
              गैलरी लोड हो रही है...
            </p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map(
              (item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    openLightbox(index)
                  }
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
                        {item.category.name}
                      </p>

                      <h3 className="mt-1 text-sm font-bold text-white">
                        {item.title}
                      </h3>
                    </div>

                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-[#071d49] opacity-0 shadow-md transition group-hover:opacity-100">
                      ↗
                    </div>
                  </div>
                </button>
              )
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-[#f5f7fa] py-16 text-center">
            <div className="text-4xl">
              📷
            </div>

            <p className="mt-3 text-sm font-semibold text-gray-600">
              अभी इस category में कोई तस्वीर उपलब्ध नहीं है।
            </p>
          </div>
        )}
      </section>

      {/* LIGHTBOX / SLIDER */}
      {selectedImage && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071d49]/95 p-3 backdrop-blur-sm sm:p-5"
          onClick={closeLightbox}
        >
          {/* TOP CONTROLS */}
          <div className="absolute left-3 right-3 top-3 z-30 flex items-center justify-between sm:left-5 sm:right-5 sm:top-5">
            {/* Counter */}
            <div className="rounded-full bg-black/40 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
              {selectedImageIndex + 1} /{" "}
              {filteredItems.length}
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-[#071d49] shadow-lg transition hover:bg-[#f4c400]"
              aria-label="बंद करें"
            >
              ×
            </button>
          </div>

          {/* PREVIOUS */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            className="absolute left-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-4xl leading-none text-white shadow-lg backdrop-blur-md transition hover:bg-white hover:text-[#071d49] sm:left-6 sm:h-14 sm:w-14"
            aria-label="पिछली तस्वीर"
          >
            ‹
          </button>

          {/* CONTENT */}
          <div
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col items-center"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[72vh] w-full object-contain sm:max-h-[78vh]"
              />

              <div className="px-5 py-4 sm:px-6">
                <p className="text-xs font-semibold text-[#7b1720]">
                  {selectedImage.category.name}
                </p>

                <h3 className="mt-1 text-base font-bold text-[#071d49] sm:text-lg">
                  {selectedImage.title}
                </h3>
              </div>
            </div>
          </div>

          {/* NEXT */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            className="absolute right-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-4xl leading-none text-white shadow-lg backdrop-blur-md transition hover:bg-white hover:text-[#071d49] sm:right-6 sm:h-14 sm:w-14"
            aria-label="अगली तस्वीर"
          >
            ›
          </button>

          {/* MOBILE HINT */}
          {filteredItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 text-[11px] font-medium text-white backdrop-blur-md sm:hidden">
              ← पिछली · अगली →
            </div>
          )}
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
              विद्यार्थियों के सर्वांगीण विकास और
              गुणवत्तापूर्ण शिक्षा के लिए हमारा विद्यालय
              निरंतर प्रयासरत है।
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