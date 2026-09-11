import Link from "next/link";

export default function Header() {
  return (
    <>
      {/* Top Information Bar */}
      <div className="bg-[#F4C400] text-[#071D49]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2 text-[11px] font-bold sm:px-6 sm:text-xs lg:px-8">
          <div className="flex items-center gap-2">
            <span>🏫</span>
            <span>स्थापना वर्ष : 2018</span>

            <span className="hidden sm:inline">|</span>

            <span className="hidden sm:inline">
              📍 बरौली करमा, कौंधियरा, प्रयागराज
            </span>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <a href="tel:9580548475" className="transition hover:underline">
              ☎ सामान्य पूछताछ : +91-9580548475
            </a>

            <a
              href="mailto:vikramadityap20@gmail.com"
              className="transition hover:underline"
            >
              ✉ vikramadityap20@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main School Header */}
      <header className="bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo + School Information */}
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center sm:h-[94px] sm:w-[94px]">
              <img
                src="/school-logo.png"
                alt="श्री विक्रमादित्य इण्टर कॉलेज लोगो"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-[22px] font-black leading-tight text-[#071D49] sm:text-3xl lg:text-[38px]">
                श्री विक्रमादित्य इण्टर कॉलेज
              </h1>

              <p className="mt-1 text-sm font-bold text-[#7B1720] sm:text-base">
                बरौली करमा, कौंधियरा, प्रयागराज
              </p>

              <div className="mt-2 inline-flex rounded-full bg-[#E9F4EA] px-3 py-1 text-[10px] font-bold text-[#147A39] sm:text-xs">
                शिक्षा • संस्कार • उज्ज्वल भविष्य
              </div>
            </div>
          </div>

          {/* Traditional Educational Highlight */}
<div className="hidden items-center xl:flex">
  <div className="relative overflow-hidden rounded-2xl border border-[#F4C400]/50 bg-gradient-to-br from-[#071D49] via-[#123B7A] to-[#071D49] px-8 py-4 text-white shadow-lg">

    {/* Decorative Circles */}
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-[#F4C400]/20" />
    <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full border border-white/10" />

    <div className="relative flex items-center gap-4">

      {/* Book / Education Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#F4C400]/60 bg-[#F4C400] text-2xl shadow-md">
        📖
      </div>

      <div className="text-center">
        <p className="text-[10px] font-bold tracking-[0.25em] text-[#F4C400]">
          ज्ञान ही शक्ति है
        </p>

        <p className="mt-1 font-serif text-xl font-black leading-tight text-white">
          “विद्या विनयेन शोभते”
        </p>

        <p className="mt-1 text-[10px] font-medium tracking-wide text-white/70">
          शिक्षा • संस्कार • अनुशासन
        </p>
      </div>

    </div>
  </div>
</div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b-4 border-[#F4C400] bg-[#071D49]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden items-center justify-between lg:flex">
            <div className="flex items-center">
              <Link
                href="/"
                className="nav-link"
              >
                मुख्य पृष्ठ
              </Link>

              <Link
                href="/about"
                className="nav-link"
              >
                हमारे बारे में
              </Link>

              <Link
                href="/academics"
                className="nav-link"
              >
                शैक्षणिक
              </Link>

              <Link
                href="/admission"
                className="nav-link"
              >
                प्रवेश
              </Link>

              <Link
                href="/messages"
                className="nav-link"
              >
                संदेश
              </Link>

              <Link
                href="/gallery"
                className="nav-link"
              >
                गैलरी
              </Link>

              <Link
                href="/news"
                className="nav-link"
              >
                सूचना एवं समाचार
              </Link>

              <Link
                href="/contact"
                className="nav-link"
              >
                संपर्क
              </Link>
            </div>

            {/* Contact CTA */}
            <a
              href="tel:9580548475"
              className="rounded-full bg-[#F4C400] px-5 py-2.5 text-sm font-black text-[#071D49] shadow-lg transition hover:bg-white"
            >
              📞 ऑनलाइन संपर्क
            </a>
          </div>

          {/* Mobile Navigation */}
          <details className="lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-black text-white">
              <span>☰ मेनू</span>

              <span className="rounded-full bg-[#F4C400] px-4 py-1.5 text-xs font-black text-[#071D49]">
                मेनू खोलें
              </span>
            </summary>

            <div className="border-t border-white/10 pb-3 pt-2">
              <Link href="/" className="mobile-nav-link">
                मुख्य पृष्ठ
              </Link>

              <Link href="/about" className="mobile-nav-link">
                हमारे बारे में
              </Link>

              <Link href="/academics" className="mobile-nav-link">
                शैक्षणिक
              </Link>

              <Link href="/admission" className="mobile-nav-link">
                प्रवेश
              </Link>

              <Link href="/messages" className="mobile-nav-link">
                संदेश
              </Link>

              <Link href="/gallery" className="mobile-nav-link">
                गैलरी
              </Link>

              <Link href="/news" className="mobile-nav-link">
                सूचना एवं समाचार
              </Link>

              <Link href="/contact" className="mobile-nav-link">
                संपर्क
              </Link>

              <a
                href="tel:9580548475"
                className="mt-2 block rounded-lg bg-[#F4C400] px-4 py-3 text-center text-sm font-black text-[#071D49]"
              >
                📞 ऑनलाइन संपर्क
              </a>
            </div>
          </details>
        </div>
      </nav>
    </>
  );
}