import HeroSlider from "@/components/home/HeroSlider";

import QuickLinks from "@/components/home/QuickLinks";

import AboutSection from "@/components/home/AboutSection";

import NewsSection from "@/components/home/NewsSection";

import Statistics from "@/components/home/Statistics";

import MessagesSection from "@/components/home/MessagesSection";

import AcademicsSection from "@/components/home/AcademicsSection";

import AdmissionCTA from "@/components/home/AdmissionCTA";

import GoToTop from "@/components/GoToTop";

const quickLinks = [
  {
    icon: "📝",
    title: "प्रवेश जानकारी",
    text: "प्रवेश प्रक्रिया एवं आवश्यक जानकारी",
    href: "#admission",
    accent: "gold",
  },
  {
    icon: "🎓",
    title: "शैक्षणिक गतिविधियाँ",
    text: "कक्षाएँ, पाठ्यक्रम एवं परिणाम",
    href: "#academics",
    accent: "blue",
  },
  {
    icon: "🖼️",
    title: "फोटो गैलरी",
    text: "विद्यालय की गतिविधियों की झलक",
    href: "#gallery",
    accent: "maroon",
  },
  {
    icon: "📢",
    title: "सूचना एवं समाचार",
    text: "नवीनतम अपडेट और कार्यक्रम",
    href: "#news",
    accent: "gold",
  },
  {
    icon: "📞",
    title: "संपर्क करें",
    text: "हमसे संपर्क करने के लिए",
    href: "#contact",
    accent: "blue",
  },
];

const features = [
  {
    icon: "👨‍🎓",
    title: "गुणवत्तापूर्ण शिक्षा",
    text: "विद्यार्थियों के ज्ञान एवं शैक्षणिक विकास पर विशेष ध्यान।",
    accent: "green",
  },
  {
    icon: "📚",
    title: "अनुशासित वातावरण",
    text: "शिक्षा के लिए सुरक्षित एवं अनुशासित वातावरण।",
    accent: "gold",
  },
  {
    icon: "⭐",
    title: "सर्वांगीण विकास",
    text: "शैक्षणिक, मानसिक, सामाजिक एवं व्यक्तिगत विकास।",
    accent: "blue",
  },
  {
    icon: "👨‍🏫",
    title: "समर्पित शिक्षक दल",
    text: "विद्यार्थियों को उचित मार्गदर्शन देने के लिए समर्पित।",
    accent: "maroon",
  },
  {
    icon: "🏫",
    title: "स्थापना वर्ष 2018",
    text: "शिक्षा के क्षेत्र में निरंतर प्रगति की ओर अग्रसर।",
    accent: "green",
  },
  {
    icon: "📍",
    title: "प्रयागराज",
    text: "बरौली कर्मा, कौंधियरा, प्रयागराज में स्थित।",
    accent: "gold",
  },
];

const news = [
  {
    day: "12",
    month: "सितंबर",
    title: "अर्धवार्षिक परीक्षा समय सारणी जारी",
    text: "सत्र 2025-26 की अर्धवार्षिक परीक्षा से संबंधित समय सारणी जारी कर दी गई है।",
    latest: true,
  },
  {
    day: "05",
    month: "सितंबर",
    title: "शिक्षक दिवस समारोह",
    text: "विद्यालय में शिक्षक दिवस के अवसर पर विशेष कार्यक्रम आयोजित किया जाएगा।",
    latest: false,
  },
  {
    day: "20",
    month: "अगस्त",
    title: "स्वतंत्रता दिवस समारोह",
    text: "विद्यालय में स्वतंत्रता दिवस समारोह हर्षोल्लास के साथ मनाया गया।",
    latest: false,
  },
  {
    day: "10",
    month: "अगस्त",
    title: "नवीन प्रवेश प्रक्रिया प्रारंभ",
    text: "नए सत्र के लिए प्रवेश प्रक्रिया प्रारंभ हो चुकी है।",
    latest: false,
  },
];

const gallery = [
  {
    title: "विद्यालय गतिविधियाँ",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "शैक्षणिक कार्यक्रम",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "विद्यालय समारोह",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "विद्यार्थी गतिविधियाँ",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "सांस्कृतिक कार्यक्रम",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "विद्यालय परिसर",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85",
  },
];

const calendarItems = [
  ["05", "सितंबर", "शिक्षक दिवस"],
  ["20", "अगस्त", "स्वतंत्रता दिवस कार्यक्रम"],
  ["12", "सितंबर", "अर्धवार्षिक परीक्षा"],
  ["02", "अक्टूबर", "गांधी जयंती"],
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-[#071D49]">

      {/* =====================================================
          TOP BAR
      ====================================================== */}
      <div className="bg-[#F4C400] text-[#071D49]">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2 text-[11px] font-bold sm:px-6 sm:text-xs lg:px-8">

          <div className="flex items-center gap-2">
            <span>🏫</span>
            <span>स्थापना वर्ष : 2018</span>

            <span className="hidden sm:inline">|</span>

            <span className="hidden sm:inline">
              📍 बरौली कर्मा, कौंधियरा, प्रयागराज
            </span>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <a href="tel:9580548475">
              ☎ सामान्य पूछताछ : 9580548475
            </a>

            <a href="mailto:vikramadityap20@gmail.com">
              ✉ vikramadityap20@gmail.com
            </a>
          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN HEADER
      ====================================================== */}
      <header className="bg-white">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">

          {/* Branding */}
          <div className="flex min-w-0 items-center gap-4">

            <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center sm:h-[94px] sm:w-[94px]">

              <img
                src="/school-logo.png"
                alt="श्री विक्रमादित्य इंटर कॉलेज लोगो"
                className="h-full w-full object-contain"
              />

            </div>

            <div className="min-w-0">

              <h1 className="text-[22px] font-black leading-tight text-[#071D49] sm:text-3xl lg:text-[38px]">
                श्री विक्रमादित्य इंटर कॉलेज
              </h1>

              <p className="mt-1 text-sm font-bold text-[#7B1720] sm:text-base">
                बरौली कर्मा, कौंधियरा, प्रयागराज
              </p>

              <div className="mt-2 inline-flex rounded-full bg-[#E9F4EA] px-3 py-1 text-[10px] font-bold text-[#147A39] sm:text-xs">
                शिक्षा • संस्कार • उज्ज्वल भविष्य
              </div>

            </div>

          </div>


          {/* Contact Blocks */}
          <div className="hidden items-center gap-4 xl:flex">

            <div className="flex items-center gap-3 border-r border-gray-200 pr-5">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2F8] text-lg">
                👤
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  प्रबंधक
                </p>

                <a
                  href="tel:8009707183"
                  className="font-black text-[#071D49]"
                >
                  8009707183
                </a>
              </div>

            </div>


            <div className="flex items-center gap-3 border-r border-gray-200 pr-5">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2F8] text-lg">
                👨‍🏫
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  प्रधानाचार्य
                </p>

                <a
                  href="tel:8795690972"
                  className="font-black text-[#071D49]"
                >
                  8795690972
                </a>
              </div>

            </div>


            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF4C7] text-lg">
                📞
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  सामान्य पूछताछ
                </p>

                <a
                  href="tel:9580548475"
                  className="font-black text-[#071D49]"
                >
                  9580548475
                </a>
              </div>

            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <nav className="border-b-4 border-[#F4C400] bg-[#071D49]">

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between">

            <div className="hidden items-center lg:flex">

              <a
                href="#"
                className="bg-[#F4C400] px-7 py-4 font-black text-[#071D49]"
              >
                मुख्य पृष्ठ
              </a>

              <a
                href="#about"
                className="nav-link"
              >
                हमारे बारे में
              </a>

              <a
                href="#academics"
                className="nav-link"
              >
                शैक्षणिक
              </a>

              <a
                href="#admission"
                className="nav-link"
              >
                प्रवेश
              </a>

              <a
                href="#gallery"
                className="nav-link"
              >
                छात्र जीवन
              </a>

              <a
                href="#gallery"
                className="nav-link"
              >
                गैलरी
              </a>

              <a
                href="#news"
                className="nav-link"
              >
                सूचना एवं समाचार
              </a>

              <a
                href="#contact"
                className="nav-link"
              >
                संपर्क
              </a>

            </div>


            {/* Mobile navigation */}
            <details className="relative lg:hidden">

              <summary className="cursor-pointer list-none py-3 font-bold text-white">
                ☰ मेनू
              </summary>

              <div className="absolute left-0 top-full z-50 w-64 overflow-hidden rounded-b-lg bg-[#071D49] shadow-2xl">

                <a className="mobile-nav-link" href="#">
                  मुख्य पृष्ठ
                </a>

                <a className="mobile-nav-link" href="#about">
                  हमारे बारे में
                </a>

                <a className="mobile-nav-link" href="#academics">
                  शैक्षणिक
                </a>

                <a className="mobile-nav-link" href="#admission">
                  प्रवेश प्रक्रिया
                </a>

                <a className="mobile-nav-link" href="#gallery">
                  गैलरी
                </a>

                <a className="mobile-nav-link" href="#news">
                  सूचना एवं समाचार
                </a>

                <a className="mobile-nav-link" href="#contact">
                  संपर्क करें
                </a>

              </div>

            </details>


            <a
              href="tel:9580548475"
              className="rounded-full bg-[#F4C400] px-5 py-2.5 text-sm font-black text-[#071D49] shadow-lg transition hover:bg-white"
            >
              📞 ऑनलाइन संपर्क
            </a>

          </div>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ====================================================== */}
     
      <HeroSlider />

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}
      
      <QuickLinks />

      {/* =====================================================
          ABOUT
      ====================================================== */}
      
      <AboutSection />

      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section className="bg-[#F5F7FA] py-20">

        <div className="mx-auto max-w-[1250px] px-4 sm:px-6 lg:px-8">

          <div className="section-heading">

            <div className="section-kicker justify-center">
              <span />
              हमारी पहचान
              <span />
            </div>

            <h2>
              विद्यालय की प्रमुख विशेषताएँ
            </h2>

            <p>
              विद्यार्थियों के बेहतर भविष्य के लिए शिक्षा, संस्कार और
              अनुशासन हमारी प्राथमिकता है।
            </p>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {features.map((item) => (

              <div
                key={item.title}
                className="group rounded-xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
                    item.accent === "gold"
                      ? "bg-[#FFF4C7]"
                      : item.accent === "maroon"
                        ? "bg-[#F8E5E7]"
                        : item.accent === "green"
                          ? "bg-[#E8F4EB]"
                          : "bg-[#E7EEF8]"
                  }`}
                >
                  {item.icon}
                </div>

                <h3 className="mt-5 text-lg font-black text-[#071D49]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.text}
                </p>

                <div className="mt-5 h-1 w-8 bg-[#F4C400] transition-all group-hover:w-14" />

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          NEWS + GALLERY
      ====================================================== */}
      
      <NewsSection />

      {/* =====================================================
          STATICS
      ====================================================== */}
      
      <Statistics />

      {/* =====================================================
          MESSAGES
      ====================================================== */}
      
      <MessagesSection />

      {/* =====================================================
          ACADEMICS
      ====================================================== */}
      
      <AcademicsSection />
      
      {/* =====================================================
          ACADEMICS
      ====================================================== */}
      
      <AdmissionCTA />

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="bg-[#071D49] text-white">

        <div className="mx-auto grid max-w-[1250px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

          {/* School */}
          <div>

            <div className="flex items-center gap-4">

              <img
                src="/school-logo.png"
                alt="श्री विक्रमादित्य इंटर कॉलेज"
                className="h-20 w-20 object-contain"
              />

              <div>

                <h3 className="text-lg font-black">
                  श्री विक्रमादित्य
                  <br />
                  इंटर कॉलेज
                </h3>

                <p className="mt-1 text-xs text-white/60">
                  स्थापना वर्ष : 2018
                </p>

              </div>

            </div>

            <p className="mt-5 text-sm leading-7 text-white/60">
              ज्ञान, संस्कार और अनुशासन के साथ विद्यार्थियों के
              उज्ज्वल भविष्य के निर्माण के लिए समर्पित।
            </p>

          </div>


          {/* Contact */}
          <div>

            <h3 className="text-lg font-black">
              संपर्क जानकारी
            </h3>

            <div className="mt-5 space-y-3 text-sm text-white/65">

              <p>
                📍 बरौली कर्मा, कौंधियरा,
                <br />
                प्रयागराज, उत्तर प्रदेश
              </p>

              <p>
                ☎ प्रबंधक :
                <a
                  href="tel:8009707183"
                  className="ml-2 hover:text-[#F4C400]"
                >
                  8009707183
                </a>
              </p>

              <p>
                ☎ प्रधानाचार्य :
                <a
                  href="tel:8795690972"
                  className="ml-2 hover:text-[#F4C400]"
                >
                  8795690972
                </a>
              </p>

              <p>
                ☎ सामान्य पूछताछ :
                <a
                  href="tel:9580548475"
                  className="ml-2 hover:text-[#F4C400]"
                >
                  9580548475
                </a>
              </p>

            </div>

          </div>


          {/* Links */}
          <div>

            <h3 className="text-lg font-black">
              महत्वपूर्ण लिंक
            </h3>

            <div className="mt-5 space-y-3 text-sm text-white/65">

              <a href="#about" className="footer-link">
                › हमारे बारे में
              </a>

              <a href="#academics" className="footer-link">
                › शैक्षणिक
              </a>

              <a href="#admission" className="footer-link">
                › प्रवेश प्रक्रिया
              </a>

              <a href="#gallery" className="footer-link">
                › फोटो गैलरी
              </a>

              <a href="#news" className="footer-link">
                › समाचार एवं सूचना
              </a>

              <a href="#messages" className="footer-link">
                › संदेश
              </a>

            </div>

          </div>


          {/* Email */}
          <div>

            <h3 className="text-lg font-black">
              ईमेल एवं वेबसाइट
            </h3>

            <div className="mt-5 space-y-4 text-sm text-white/65">

              <p>
                ✉
                <a
                  href="mailto:vikramadityap20@gmail.com"
                  className="ml-2 break-all hover:text-[#F4C400]"
                >
                  vikramadityap20@gmail.com
                </a>
              </p>

              <p>
                🌐
                <span className="ml-2 break-all">
                  shrivikrmadityaintercollege.co.in
                </span>
              </p>

              <div className="pt-2">

                <p className="font-black text-[#F4C400]">
                  शिक्षा • संस्कार • उज्ज्वल भविष्य
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Bottom */}
        <div className="border-t border-white/10">

          <div className="mx-auto flex max-w-[1250px] flex-col justify-between gap-3 px-4 py-5 text-xs text-white/45 sm:px-6 md:flex-row lg:px-8">

            <p>
              © 2026 श्री विक्रमादित्य इंटर कॉलेज. सर्वाधिकार सुरक्षित।
            </p>

            <p>
              Designed & Developed by Braintech
            </p>

          </div>

        </div>

      </footer>

      <GoToTop />

    </main>
  );
}