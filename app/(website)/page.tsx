
import HeroSlider from "@/components/home/HeroSlider";
import { getHomepageBanners } from "@/lib/homepage-banners";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import QuickLinks from "@/components/home/QuickLinks";

import AboutSection from "@/components/home/AboutSection";

import NewsSection from "@/components/home/NewsSection";

import Statistics from "@/components/home/Statistics";

import MessagesSection from "@/components/home/MessagesSection";

import AcademicsSection from "@/components/home/AcademicsSection";

import AdmissionCTA from "@/components/home/AdmissionCTA";

const homepageBanners = await getHomepageBanners();

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
    text: "बरौली करमा, कौंधियरा, प्रयागराज में स्थित।",
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
          HERO
      ====================================================== */}
     
      <HeroSlider banners={homepageBanners} />

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


    </main>
  );
}