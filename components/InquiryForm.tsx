"use client";

import {
  FormEvent,
  useState,
} from "react";

export default function InquiryForm() {
  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(
        formData.get("name") || ""
      ).trim(),

      mobile: String(
        formData.get("mobile") || ""
      ).trim(),

      message: String(
        formData.get("message") || ""
      ).trim(),
    };

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "संदेश भेजने में समस्या हुई।"
        );
      }

      setSuccess(
        "✅ आपका संदेश सफलतापूर्वक भेज दिया गया है। विद्यालय शीघ्र आपसे संपर्क करेगा।"
      );

      form.reset();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "संदेश भेजने में समस्या हुई।"
      );
    } finally {
      setLoading(false);
    }
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
            maxLength={100}
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

      {/* Success */}
      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-xs font-semibold leading-5 text-green-700">
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-xs font-semibold leading-5 text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#071D49] px-5 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-[#123B7A] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>✈</span>

        {loading
          ? "संदेश भेजा जा रहा है..."
          : "संदेश भेजें"}
      </button>

      <p className="mt-4 text-center text-[10px] leading-5 text-gray-400">
        🔒 आपकी जानकारी सुरक्षित रखी जाएगी और केवल विद्यालय
        से संबंधित सहायता के लिए उपयोग की जाएगी।
      </p>
    </form>
  );
}