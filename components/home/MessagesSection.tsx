const messages = [
  {
    name: "विद्यालय प्रबंधक",
    designation: "प्रबंधक",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    message:
      "हमारा उद्देश्य विद्यार्थियों को गुणवत्तापूर्ण शिक्षा के साथ-साथ संस्कार, अनुशासन और जिम्मेदारी की भावना प्रदान करना है। हम चाहते हैं कि प्रत्येक विद्यार्थी अपने ज्ञान और प्रतिभा के माध्यम से समाज और राष्ट्र के विकास में योगदान दे।",
  },
  {
    name: "प्रधानाचार्य",
    designation: "प्रधानाचार्य",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    message:
      "शिक्षा केवल पुस्तकीय ज्ञान तक सीमित नहीं है। हमारा प्रयास विद्यार्थियों के सर्वांगीण विकास के लिए एक ऐसा वातावरण तैयार करना है, जहाँ वे आत्मविश्वास, अनुशासन और नैतिक मूल्यों के साथ अपने भविष्य का निर्माण कर सकें।",
  },
];

export default function MessagesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="section-heading mb-14">
          <div className="section-kicker justify-center">
            <span></span>
            विद्यालय संदेश
            <span></span>
          </div>

          <h2>प्रबंधक एवं प्रधानाचार्य का संदेश</h2>

          <p>
            हमारे विद्यालय के नेतृत्व की ओर से विद्यार्थियों,
            अभिभावकों एवं समाज के लिए एक विशेष संदेश।
          </p>
        </div>

        {/* Messages */}
        <div className="grid gap-8 lg:grid-cols-2">
          {messages.map((item) => (
            <div
              key={item.designation}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-[var(--light)] p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Gold top line */}
              <div className="absolute left-0 top-0 h-1 w-full bg-[var(--gold)]" />

              <div className="flex flex-col gap-7 sm:flex-row">

                {/* Photo */}
                <div className="shrink-0">
                  <div className="h-28 w-28 overflow-hidden rounded-2xl border-4 border-white shadow-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-[var(--navy)]">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm font-bold text-[var(--maroon)]">
                      {item.designation}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <span className="absolute -left-1 -top-5 text-5xl font-serif text-[var(--gold)] opacity-60">
                      “
                    </span>

                    <p className="relative text-sm leading-7 text-gray-600">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="mt-7 flex items-center gap-3">
                <div className="h-1 w-10 rounded-full bg-[var(--gold)]" />
                <div className="h-1 w-4 rounded-full bg-[var(--maroon)]" />
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 text-center">
          <a
            href="/messages"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--blue)] hover:shadow-lg"
          >
            सभी संदेश देखें
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}