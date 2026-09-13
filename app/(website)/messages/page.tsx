import Link from "next/link";
import { getPublishedMessages } from "@/lib/messages";

function roleLabel(role: string) {
  return role === "PRINCIPAL"
    ? "प्रधानाचार्य"
    : "प्रबंधक";
}

export default async function MessagesPage() {
  const messages = await getPublishedMessages();

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#071d49] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4c400]">
            विद्यालय परिवार
          </span>

          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            हमारे संदेश
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            विद्यालय के प्रधानाचार्य एवं प्रबंधक की ओर से
            विद्यार्थियों और अभिभावकों के लिए संदेश।
          </p>
        </div>
      </section>

      {/* Messages */}
      <section className="bg-[#f5f7fa] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          {messages.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-semibold text-gray-500">
                अभी कोई संदेश उपलब्ध नहीं है।
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((message) => (
                <article
                  key={message.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
                >
                  <div className="grid md:grid-cols-[240px_1fr]">
                    <div className="relative h-72 md:h-full">
                      <img
                        src={message.image}
                        alt={message.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#071d49]/80 via-transparent to-transparent" />

                      <span className="absolute bottom-5 left-5 rounded-full bg-[#f4c400] px-4 py-2 text-xs font-bold text-[#071d49]">
                        {roleLabel(message.role)}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8 lg:p-10">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#7b1720]">
                        {roleLabel(message.role)}
                      </p>

                      <h2 className="mt-2 text-2xl font-black text-[#071d49]">
                        {message.title}
                      </h2>

                      <p className="mt-2 text-sm font-bold text-gray-500">
                        {message.name}
                      </p>

                      <div className="mt-6 space-y-4 text-justify text-sm leading-8 text-gray-600">
                        <p>{message.message}</p>

                        {message.message2 && (
                          <p>{message.message2}</p>
                        )}
                      </div>

                      <div className="mt-7 flex items-center gap-3 border-t border-gray-100 pt-5">
                        <span className="h-1 w-10 rounded-full bg-[#f4c400]" />

                        <span className="text-xs font-bold text-[#071d49]">
                          शिक्षा • संस्कार • अनुशासन
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex rounded-xl bg-[#071d49] px-6 py-3 text-xs font-bold text-white hover:bg-[#123b7a]"
            >
              ← मुख्य पृष्ठ पर वापस जाएँ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}