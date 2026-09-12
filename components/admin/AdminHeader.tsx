"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AdminHeaderProps = {
  user: {
    name: string;
    username: string;
    role: "SUPER_ADMIN" | "WEBSITE_ADMIN";
  };
  expiresAt: number;
};

export default function AdminHeader({
  user,
  expiresAt,
}: AdminHeaderProps) {
  const router = useRouter();

  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(
    null
  );

  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let logoutStarted = false;

    const checkExpiry = () => {
      const seconds = Math.max(
        0,
        Math.ceil((expiresAt - Date.now()) / 1000)
      );

      setRemainingSeconds(seconds);

      if (seconds <= 0 && !logoutStarted) {
        logoutStarted = true;

        fetch("/api/admin/logout", {
          method: "POST",
        }).finally(() => {
          router.replace("/admin/login?reason=session-expired");
          router.refresh();
        });
      }
    };

    checkExpiry();

    const interval = window.setInterval(checkExpiry, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [expiresAt, router]);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  const displaySeconds = remainingSeconds ?? 0;

  const hours = Math.floor(displaySeconds / 3600);
  const minutes = Math.floor((displaySeconds % 3600) / 60);
  const seconds = displaySeconds % 60;

  const formattedTime =
    hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`;

  const isExpiringSoon =
    remainingSeconds !== null && remainingSeconds <= 5 * 60;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* School Branding */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#071d49] sm:flex">
            <span className="text-lg font-bold text-[#f4c400]">
              SV
            </span>
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-[#071d49] sm:text-base">
              श्री विक्रमादित्य इंटर कॉलेज
            </h1>

            <p className="text-xs text-gray-500">
              Website Administration Panel
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {/* Session Timer */}
          <div
            className={`rounded-lg border px-3 py-2 ${
              isExpiringSoon
                ? "border-red-200 bg-red-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={
                  isExpiringSoon
                    ? "text-red-600"
                    : "text-[#123b7a]"
                }
              >
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 14" />
              </svg>

              <div>
                <p className="hidden text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:block">
                  Session
                </p>

                <p
                  className={`font-mono text-sm font-bold ${
                    isExpiringSoon
                      ? "text-red-600"
                      : "text-[#071d49]"
                  }`}
                >
                  {remainingSeconds === null
                    ? "--:--"
                    : formattedTime}
                </p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-[#071d49]">
              {user.name}
            </p>

            <p className="text-xs text-gray-500">
              {user.role === "SUPER_ADMIN"
                ? "Super Admin"
                : "Website Admin"}
            </p>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
            </svg>

            <span className="hidden sm:inline">
              {loggingOut ? "Logout..." : "Logout"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}