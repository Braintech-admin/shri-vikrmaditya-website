"use client";

import { FormEvent } from "react";

export default function InquiryForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-xs font-black text-[#071D49]"
        >
          आपका नाम *
        </label>

        <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-[#F4C400] focus-within:ring-2 focus-within:ring-[#F4C400]/20">
          <span className="mr-3 text-lg">
            👤
          </span>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="अपना नाम लिखें"
            required
            className="h-12 w-full bg-transparent text-sm text-[#071D49] outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Mobile */}
      <div>
        <label
          htmlFor="mobile"
          className="mb-2 block text-xs font-black text-[#071D49]"
        >
          मोबाइल नंबर *
        </label>

        <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-[#F4C400] focus-within:ring-2 focus-within:ring-[#F4C400]/20">
          <span className="mr-3 text-lg">
            📞
          </span>

          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="10 अंकों का मोबाइल नंबर"
            required
            className="h-12 w-full bg-transparent text-sm text-[#071D49] outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-black text-[#071D49]"
        >
          अपना संदेश लिखें *
        </label>

        <div className="rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-[#F4C400] focus-within:ring-2 focus-within:ring-[#F4C400]/20">
          <div className="flex items-start">
            <span className="mr-3 pt-4 text-lg">
              💬
            </span>

            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={500}
              placeholder="अपनी पूछताछ या संदेश यहाँ लिखें..."
              required
              className="w-full resize-none bg-transparent py-4 text-sm text-[#071D49] outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <p className="mt-1 text-right text-[10px] text-gray-400">
          अधिकतम 500 अक्षर
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#071D49] px-5 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-[#123B7A]"
      >
        <span>✈</span>
        संदेश भेजें
      </button>

      <p className="mt-4 text-center text-[10px] leading-5 text-gray-400">
        🔒 आपकी जानकारी सुरक्षित रखी जाएगी और केवल विद्यालय
        से संबंधित सहायता के लिए उपयोग की जाएगी।
      </p>
    </form>
  );
}