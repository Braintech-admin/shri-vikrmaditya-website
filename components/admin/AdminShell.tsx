"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import WebsiteControl from "@/components/admin/WebsiteControl";
import WebsiteAdminAccount from "@/components/admin/WebsiteAdminAccount";
import BannersManager from "@/components/admin/BannersManager";
import NewsManager from "@/components/admin/NewsManager";
import MessagesManager from "@/components/admin/MessagesManager";
import GalleryManager from "@/components/admin/GalleryManager";

type AdminRole = "SUPER_ADMIN" | "WEBSITE_ADMIN";

type AdminSection =
  | "dashboard"
  | "banners"
  | "news"
  | "messages"
  | "gallery"
  | "settings"
  | "users";

type AdminShellProps = {
  role: AdminRole;
};

type DashboardData = {
  publishedBanners: number;
  publishedNews: number;
  publishedGalleryPhotos: number;
  websiteEnabled: boolean;
};

type DashboardResponse = {
  success: boolean;
  data?: DashboardData;
  message?: string;
};

function DashboardIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function BannerIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="m4 17 5-5 3 3 2-2 6 5" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 3h14v18H5z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2v-4.5A7.5 7.5 0 1 1 20 11.5Z" />
      <path d="M8 11h8M8 14h5" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="m4 17 5-5 3 3 2-2 6 5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 1.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2v-.48a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.42-1.42.06-.06A1.7 1.7 0 0 0 10.4 15a1.7 1.7 0 0 0-1.56-1.03H8v-2h.84A1.7 1.7 0 0 0 10.4 11a1.7 1.7 0 0 0-.34-1.88L10 9.06l1.42-1.42.06.06A1.7 1.7 0 0 0 13.36 8.04 1.7 1.7 0 0 0 14.4 6.48V6h2v.48A1.7 1.7 0 0 0 17.43 8.04a1.7 1.7 0 0 0 1.88-.34l.06-.06 1.42 1.42-.06.06A1.7 1.7 0 0 0 20.4 11c.16.59.7 1.03 1.31 1.03H22v2h-.29A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 5" />
    </svg>
  );
}

function EmptySection({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#071d49]/5 text-[#123b7a]">
          {icon}
        </div>

        <h2 className="mt-5 text-xl font-extrabold text-[#071d49]">
          {title}
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
          {description}
        </p>

        <span className="mt-5 rounded-full bg-[#f4c400]/15 px-4 py-1.5 text-xs font-bold text-[#8b6d00]">
          Module coming next
        </span>
      </div>
    </div>
  );
}

function DashboardContent() {
  const [data, setData] = useState<DashboardData | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "/api/admin/dashboard",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result: DashboardResponse =
          await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Dashboard data fetch करने में समस्या हुई।"
          );
        }

        if (!cancelled) {
          setData(result.data ?? null);
        }
      } catch (error) {
        console.error(
          "Dashboard fetch error:",
          error
        );

        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Dashboard data fetch करने में समस्या हुई।"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="space-y-6">
      {/* Heading */}
      <div>
        <span className="inline-flex items-center rounded-full bg-[#071d49]/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#123b7a]">
          Website Administration
        </span>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#071d49] sm:text-3xl">
          Dashboard
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
          विद्यालय की वेबसाइट का वर्तमान overview यहाँ देखें।
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Banners */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#123b7a]">
              <BannerIcon />
            </div>

            <span className="text-xs font-bold text-gray-400">
              Published
            </span>
          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            Active Banners
          </p>

          <p className="mt-1 text-3xl font-extrabold text-[#071d49]">
            {loading ? "—" : data?.publishedBanners ?? 0}
          </p>
        </div>

        {/* News */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-[#9a7900]">
              <NewsIcon />
            </div>

            <span className="text-xs font-bold text-gray-400">
              Published
            </span>
          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            News & Notices
          </p>

          <p className="mt-1 text-3xl font-extrabold text-[#071d49]">
            {loading ? "—" : data?.publishedNews ?? 0}
          </p>
        </div>

        {/* Gallery */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <GalleryIcon />
            </div>

            <span className="text-xs font-bold text-gray-400">
              Published
            </span>
          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            Gallery Photos
          </p>

          <p className="mt-1 text-3xl font-extrabold text-[#071d49]">
            {loading
              ? "—"
              : data?.publishedGalleryPhotos ?? 0}
          </p>
        </div>

        {/* Website */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                data?.websiteEnabled
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <SettingsIcon />
            </div>

            <span className="text-xs font-bold text-gray-400">
              System
            </span>
          </div>

          <p className="mt-5 text-sm font-semibold text-gray-500">
            Website Status
          </p>

          <p
            className={`mt-1 text-2xl font-extrabold ${
              data?.websiteEnabled
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {loading
              ? "—"
              : data?.websiteEnabled
                ? "ONLINE"
                : "OFFLINE"}
          </p>
        </div>
      </div>

      {/* Welcome */}
      <div className="rounded-2xl bg-[#071d49] p-6 text-white shadow-sm sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4c400]">
            Shri Vikramaditya Inter College
          </p>

          <h3 className="mt-3 text-xl font-extrabold sm:text-2xl">
            Website Administration Dashboard
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
            यहाँ से विद्यालय की public website के content और
            settings को व्यवस्थित रूप से manage किया जा सकेगा।
            सभी changes database से नियंत्रित होंगे।
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AdminShell({
  role,
}: AdminShellProps) {
  /*
   * IMPORTANT:
   * Super Admin के पास Dashboard नहीं है।
   * इसलिए उसका initial section Website Control रहेगा।
   *
   * Website Admin का initial section Dashboard रहेगा।
   */
  const initialSection: AdminSection =
    role === "SUPER_ADMIN"
      ? "settings"
      : "dashboard";

  const [activeSection, setActiveSection] =
    useState<AdminSection>(initialSection);

  /*
   * Role बदलने की स्थिति में भी गलत section खुला न रहे।
   */
  useEffect(() => {
    if (
      role === "SUPER_ADMIN" &&
      activeSection !== "settings" &&
      activeSection !== "users"
    ) {
      setActiveSection("settings");
    }

    if (
      role === "WEBSITE_ADMIN" &&
      activeSection === "users"
    ) {
      setActiveSection("dashboard");
    }
  }, [role, activeSection]);

  function renderContent() {
    /*
     * SUPER ADMIN
     * केवल Website Control और Users
     */
    if (role === "SUPER_ADMIN") {
      if (activeSection === "settings") {
        return <WebsiteControl />;
      }

      if (activeSection === "users") {
  return <WebsiteAdminAccount />;
}

      /*
       * Safety fallback:
       * अगर किसी वजह से कोई unauthorized section state में आ जाए,
       * तो Super Admin को Dashboard या daily module नहीं दिखेगा।
       */
      setActiveSection("settings");
      return null;
    }

    /*
     * WEBSITE ADMIN
     */
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;

        case "banners":
              return <BannersManager />;

         case "news":
              return <NewsManager />;

        case "messages":
              return <MessagesManager />;

         case "gallery":
              return <GalleryManager />;

      case "settings":
        return (
          <EmptySection
            title="Site Settings"
            description="विद्यालय की website information, contact details, address और अन्य public site settings यहाँ manage होंगी।"
            icon={<SettingsIcon />}
          />
        );

      default:
        return <DashboardContent />;
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar
        role={role}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-7xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}