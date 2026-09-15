"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim() || !password) {
      setError("Username और password दोनों आवश्यक हैं।");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Login failed. कृपया दोबारा प्रयास करें।"
        );
        setLoading(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError(
        "Server से संपर्क नहीं हो सका। कृपया थोड़ी देर बाद प्रयास करें।"
      );
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[490px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
      {/* School Header */}
      <div className="bg-[#071d49] px-6 py-8 text-center sm:px-8 sm:py-9">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white p-2 shadow-lg">
          <Image
            src="/school-logo.png"
            alt="श्री विक्रमादित्य इंटर कॉलेज"
            width={64}
            height={64}
            className="h-full w-full object-contain"
            priority
          />
        </div>

        <h1 className="text-xl font-bold text-white sm:text-2xl">
          श्री विक्रमादित्य इंटर कॉलेज
        </h1>

        <p className="mt-2 text-sm text-white/75">
          Website Administration Panel
        </p>
      </div>

      {/* Login Form */}
      <div className="px-6 py-7 sm:px-9 sm:py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#F4C400]" />

            <h2 className="text-xl font-bold text-[#071d49]">
              Admin Login
            </h2>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            अपने authorized account से login करें।
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              placeholder="अपना username दर्ज करें"
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10 disabled:bg-gray-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="अपना password दर्ज करें"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-20 text-sm outline-none transition focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10 disabled:bg-gray-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#123b7a] hover:text-[#071d49] disabled:opacity-50"
                aria-label={
                  showPassword
                    ? "Password छिपाएँ"
                    : "Password दिखाएँ"
                }
              >
                {showPassword ? "छिपाएँ" : "दिखाएँ"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#071d49] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#123b7a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Login हो रहा है..." : "Login करें"}

            {!loading && (
              <span className="text-lg leading-none">
                →
              </span>
            )}
          </button>
        </form>

        {/* Authorized Notice */}
        <div className="mt-7 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs text-gray-400">
            केवल अधिकृत विद्यालय प्रशासन के लिए
          </p>
        </div>
      </div>
    </div>
  );
}