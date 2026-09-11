import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#071D49] text-white">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-[1250px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* School Information */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-2">
              <img
                src="/school-logo.png"
                alt="श्री विक्रमादित्य इण्टर कॉलेज लोगो"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h3 className="text-lg font-black leading-tight">
                श्री विक्रमादित्य
              </h3>

              <p className="text-sm font-bold text-[#F4C400]">
                इण्टर कॉलेज
              </p>
            </div>
          </div>

          <p className="mb-4 text-sm font-bold text-[#F4C400]">
            स्थापना वर्ष : 2018
          </p>

          <p className="text-sm leading-7 text-white/70">
            शिक्षा, संस्कार और अनुशासन के माध्यम से विद्यार्थियों के
            सर्वांगीण विकास तथा उज्ज्वल भविष्य के निर्माण के लिए
            विद्यालय निरंतर प्रयासरत है।
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="relative mb-6 inline-block text-lg font-black">
            संपर्क जानकारी
            <span className="absolute -bottom-2 left-0 h-1 w-10 rounded-full bg-[#F4C400]" />
          </h3>

          <div className="space-y-4 text-sm">

            <div className="flex gap-3">
              <span className="text-lg">📍</span>

              <p className="leading-6 text-white/70">
                बरौली करमा,<br />
                कौंधियरा, प्रयागराज
              </p>
            </div>

            <div className="flex gap-3">
              <span className="text-lg">👤</span>

              <div>
                <p className="text-xs text-white/50">
                  प्रबंधक
                </p>

                <a
                  href="tel:8009707183"
                  className="font-bold transition hover:text-[#F4C400]"
                >
                  +91-8009707183
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-lg">👨‍🏫</span>

              <div>
                <p className="text-xs text-white/50">
                  प्रधानाचार्य
                </p>

                <a
                  href="tel:8795690972"
                  className="font-bold transition hover:text-[#F4C400]"
                >
                  +91-8795690972
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-lg">📞</span>

              <div>
                <p className="text-xs text-white/50">
                  सामान्य पूछताछ
                </p>

                <a
                  href="tel:9580548475"
                  className="font-bold transition hover:text-[#F4C400]"
                >
                  +91-9580548475
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="relative mb-6 inline-block text-lg font-black">
            महत्वपूर्ण लिंक
            <span className="absolute -bottom-2 left-0 h-1 w-10 rounded-full bg-[#F4C400]" />
          </h3>

          <div className="space-y-3">

            <Link href="/" className="footer-link">
              मुख्य पृष्ठ
            </Link>

            <Link href="/about" className="footer-link">
              हमारे बारे में
            </Link>

            <Link href="/academics" className="footer-link">
              शैक्षणिक
            </Link>

            <Link href="/admission" className="footer-link">
              प्रवेश
            </Link>

            <Link href="/gallery" className="footer-link">
              गैलरी
            </Link>

            <Link href="/#news" className="footer-link">
              सूचना एवं समाचार
            </Link>

            <Link href="/contact" className="footer-link">
              संपर्क करें
            </Link>

          </div>
        </div>

        {/* Educational / Website */}
        <div>
          <h3 className="relative mb-6 inline-block text-lg font-black">
            विद्यालय से जुड़ें
            <span className="absolute -bottom-2 left-0 h-1 w-10 rounded-full bg-[#F4C400]" />
          </h3>

          <p className="text-sm leading-7 text-white/70">
            विद्यालय से संबंधित जानकारी, प्रवेश, शैक्षणिक गतिविधियों
            एवं नवीनतम सूचनाओं के लिए हमारी वेबसाइट से जुड़े रहें।
          </p>

          {/* Sanskrit Quote */}
          <div className="mt-6 rounded-xl border border-[#F4C400]/30 bg-white/5 p-4 text-center">
            <p className="font-serif text-lg font-bold text-[#F4C400]">
              “विद्या विनयेन शोभते”
            </p>

            <p className="mt-1 text-[11px] text-white/50">
              विद्या विनय से शोभित होती है
            </p>
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <a
              href="mailto:vikramadityap20@gmail.com"
              className="block text-white/70 transition hover:text-[#F4C400]"
            >
              ✉ vikramadityap20@gmail.com
            </a>

            <p className="text-white/50">
              🌐 shrivikrmadityaintercollege.co.in
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1250px] flex-col justify-between gap-3 px-4 py-5 text-xs text-white/45 sm:px-6 md:flex-row lg:px-8">
          <p>
            © 2026 श्री विक्रमादित्य इण्टर कॉलेज. सर्वाधिकार सुरक्षित।
          </p>

          <p>
            Designed & Developed by Braintech
          </p>
        </div>
      </div>
    </footer>
  );
}