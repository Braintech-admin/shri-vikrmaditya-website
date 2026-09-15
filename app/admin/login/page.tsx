"use client";

import Image from "next/image";
import { useState } from "react";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  const [showMobileNotices, setShowMobileNotices] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f9fd] p-2 sm:p-3">
      {/* Main Blue Border */}
      <div className="relative min-h-[calc(100vh-16px)] overflow-hidden rounded-xl border-[3px] border-[#1597e5] bg-[#f5f9fd] sm:min-h-[calc(100vh-24px)] sm:rounded-2xl">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#dcecff] opacity-70 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-[#dcecff] opacity-60 blur-3xl" />

        <div className="relative min-h-[calc(100vh-22px)] w-full px-5 py-3 sm:px-7 sm:py-4 lg:px-10">
          <div className="grid min-h-[calc(100vh-54px)] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_490px] lg:gap-10">

            {/* =====================================================
                LEFT SIDE
            ====================================================== */}
            <section className="flex min-w-0 flex-col">

              {/* =================================================
                  MOBILE TOP BAR
              ================================================== */}
              <div className="flex items-start justify-between lg:hidden">

                {/* Braintech Logo */}
                <div>
                  <a
                    href="https://itsbraintech.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-opacity duration-200 hover:opacity-85"
                  >
                    <Image
                      src="/braintech-logo.svg"
                      alt="Braintech IT Services"
                      width={180}
                      height={215}
                      className="h-auto w-[95px] object-contain sm:w-[105px]"
                      priority
                    />
                  </a>

                </div>

                {/* Mobile Notification Bell */}
                <div className="relative pt-2">

                  <button
                    type="button"
                    onClick={() =>
                      setShowMobileNotices((current) => !current)
                    }
                    aria-label={
                      showMobileNotices
                        ? "Close notices"
                        : "Open notices"
                    }
                    aria-expanded={showMobileNotices}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#1597e5]/30 bg-white text-xl shadow-sm transition-all duration-200 hover:bg-[#1597e5] hover:text-white active:scale-95"
                  >
                    🔔

                    {/* Notification Dot */}
                    <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#e63220] ring-2 ring-white" />
                  </button>

                  {/* Mobile Notices Popup */}
                  {showMobileNotices && (
                    <div className="absolute right-0 top-14 z-50 w-[min(85vw,340px)] overflow-hidden rounded-xl border border-[#dbeafe] bg-white shadow-xl">

                      <div className="flex items-center justify-between border-b border-gray-100 bg-[#071d49] px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            📢
                          </span>

                          <h2 className="text-sm font-extrabold text-white">
                            Notices
                          </h2>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowMobileNotices(false)}
                          aria-label="Close notices"
                          className="text-lg leading-none text-white/80 transition hover:text-white"
                        >
                          ×
                        </button>
                      </div>

                      <div className="px-4 py-5">
                        <p className="text-sm text-gray-400">
                          अभी कोई सूचना उपलब्ध नहीं है।
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* =================================================
                  DESKTOP BRAINTECH BRANDING
                  Mobile पर hidden
              ================================================== */}
              <div className="hidden lg:block">
                <a
                  href="https://itsbraintech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-opacity duration-200 hover:opacity-85"
                >
                  <Image
                    src="/braintech-logo.svg"
                    alt="Braintech IT Services"
                    width={180}
                    height={215}
                    className="h-auto w-[105px] object-contain sm:w-[120px]"
                    priority
                  />
                </a>

                   </div>

              {/* =================================================
                  DESKTOP NOTICES
                  Mobile पर hidden
              ================================================== */}
              <div className="mt-4 hidden flex-1 lg:block">
                <div className="h-full min-h-[300px] rounded-2xl border border-[#dbeafe] bg-white/95 p-5 shadow-sm sm:min-h-[350px] sm:p-6">

                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <span className="text-lg">
                      📢
                    </span>

                    <h2 className="text-lg font-extrabold text-[#071d49] sm:text-xl">
                      Notices :
                    </h2>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-gray-400">
                      अभी कोई सूचना उपलब्ध नहीं है।
                    </p>
                  </div>

                </div>
              </div>

              {/* =================================================
                  MOBILE SPACING
              ================================================== */}
              <div className="h-2 lg:hidden" />

              {/* =================================================
                  DEVELOPER BRANDING
              ================================================== */}
              <div className="mt-5 pb-1 lg:mt-5">

                <p className="text-sm font-semibold text-[#071d49] sm:text-base">
                  Design &amp; Developed By
                </p>

                <p className="mt-0.5 text-lg font-extrabold sm:text-xl">
                  <a
                    href="https://itsbraintech.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity duration-200 hover:opacity-80"
                  >
                    <span className="text-black">
                      Brain
                    </span>

                    <span className="text-[#ff7a00ff]">
                      Tech
                    </span>
                  </a>{" "}

                  <span className="font-semibold text-gray-500">
                    IT SERVICES
                  </span>
                </p>

                <div className="mt-0.5">
                    <a
                      href="https://itsbraintech.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#123b7a] transition-colors duration-200 hover:text-[#e63220]"
                    >
                      🌐 Visit Braintech Website For More Services
                    </a>
                  </div>
              </div>
            </section>

            {/* =====================================================
                RIGHT SIDE - LOGIN
            ====================================================== */}
            <section className="flex items-center justify-center lg:justify-end">
              <LoginForm />
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}