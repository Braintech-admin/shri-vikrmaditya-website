"use client";

import { useEffect, useState } from "react";

export default function GoToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollProgress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setProgress(scrollProgress);
      setShow(scrollTop > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <div className="pointer-events-none absolute bottom-1/2 right-full mr-3 translate-y-1/2 translate-x-2 whitespace-nowrap rounded-lg bg-[var(--navy)] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        ऊपर जाएँ
        <span className="absolute right-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-[var(--navy)]" />
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="ऊपर जाएँ"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(7,29,73,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(7,29,73,0.3)] active:scale-95"
      >
        {/* Progress Ring */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 56 56"
          aria-hidden="true"
        >
          {/* Background Ring */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-gray-200"
          />

          {/* Progress */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-[var(--gold)] transition-all duration-150"
          />
        </svg>

        {/* Inner Circle */}
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--navy)] text-white transition-all duration-300 group-hover:bg-[var(--blue)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </span>
      </button>
    </div>
  );
}