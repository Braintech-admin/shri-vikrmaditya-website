const quickLinks = [
  {
    icon: "📝",
    title: "प्रवेश जानकारी",
    text: "प्रवेश प्रक्रिया एवं आवश्यक जानकारी",
    href: "#admission",
  },
  {
    icon: "🎓",
    title: "शैक्षणिक गतिविधियाँ",
    text: "कक्षाएँ, पाठ्यक्रम एवं परिणाम",
    href: "#academics",
  },
  {
    icon: "🖼️",
    title: "फोटो गैलरी",
    text: "विद्यालय की गतिविधियों की झलक",
    href: "#gallery",
  },
  {
    icon: "📢",
    title: "सूचना एवं समाचार",
    text: "नवीनतम अपडेट और कार्यक्रम",
    href: "#news",
  },
  {
    icon: "📞",
    title: "संपर्क करें",
    text: "हमसे संपर्क करने के लिए",
    href: "#contact",
  },
];

export default function QuickLinks() {
  return (
    <section className="relative z-20 px-4">

      <div className="mx-auto -mt-2 grid max-w-[1250px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:grid-cols-2 lg:grid-cols-5">

        {quickLinks.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="group border-b border-gray-200 p-6 text-center transition duration-300 hover:-translate-y-1 hover:bg-[#FAFBFD] lg:border-b-0 lg:border-r last:border-r-0"
          >

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF4C7] text-2xl transition duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            <h3 className="mt-4 text-base font-black text-[#071D49]">
              {item.title}
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              {item.text}
            </p>

            <span className="mt-3 inline-block text-sm font-black text-[#7B1720] transition group-hover:text-[#071D49]">
              और जानें →
            </span>

          </a>
        ))}

      </div>

    </section>
  );
}