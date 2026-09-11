import { schoolMessages } from "./messageData";

export default function MessagesSection() {
  return (
    <section className="bg-[#f5f7fa] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-[3px] w-7 bg-[#f4c400]" />

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7b1720]">
              विद्यालय परिवार का संदेश
            </p>

            <span className="h-[3px] w-7 bg-[#f4c400]" />
          </div>

          <h2 className="text-2xl font-black text-[#071d49] sm:text-3xl">
            हमारे <span className="text-[#7b1720]">संदेश</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            विद्यालय के प्रबंधक एवं प्रधानाचार्य की ओर से विद्यार्थियों और
            अभिभावकों के लिए महत्वपूर्ण संदेश।
          </p>
        </div>

        {/* Messages */}
        <div className="grid gap-6 lg:grid-cols-2">
          {schoolMessages.map((message) => (
            <article
              key={message.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="grid sm:grid-cols-[180px_1fr]">
                {/* Image */}
                <div className="relative h-56 overflow-hidden sm:h-full">
                  <img
                    src={message.image}
                    alt={message.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071d49]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-[#f4c400] px-3 py-1.5 text-[10px] font-bold text-[#071d49]">
                      {message.role}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071d49] text-xl text-[#f4c400]">
                      “
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7b1720]">
                        {message.role}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-[#071d49]">
                        {message.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-justify text-xs leading-6 text-gray-600">
                    <p>{message.message}</p>
                    <p>{message.message2}</p>
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                    <div className="h-1 w-8 rounded-full bg-[#f4c400]" />

                    <p className="text-[10px] font-semibold text-[#071d49]">
                      शिक्षा • संस्कार • अनुशासन
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="mt-8 text-center">
          <a
            href="/messages"
            className="inline-flex items-center justify-center rounded-xl bg-[#071d49] px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#123b7a]"
          >
            सभी संदेश देखें →
          </a>
        </div>
      </div>
    </section>
  );
}