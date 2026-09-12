"use client";

import { useState } from "react";

type AdminRole = "SUPER_ADMIN" | "WEBSITE_ADMIN";

type AdminSection =
  | "dashboard"
  | "banners"
  | "news"
  | "messages"
  | "gallery"
  | "settings"
  | "users";

type AdminSidebarProps = {
  role: AdminRole;
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
};

type MenuItem = {
  id: AdminSection;
  label: string;
  icon: React.ReactNode;
};

function DashboardIcon() {
  return (
    <svg
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
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="9" r="1.5" />
      <path d="M3 16l5-5 4 4 3-3 6 5" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 4h14a1 1 0 0 1 1 1v14H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M7 8h9M7 12h9M7 16h5" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 5h16v11H8l-4 4V5Z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="M3 17l5-5 4 4 3-3 6 5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 1.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56V21h-2v-.08a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.42-1.42.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.04H7v-2h.84A1.7 1.7 0 0 0 9.4 10a1.7 1.7 0 0 0-.34-1.88L9 8.06l1.42-1.42.06.06A1.7 1.7 0 0 0 12.36 7.04 1.7 1.7 0 0 0 13.4 5.48V5h2v.48a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.42 1.42-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.04H21v2h-.04A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.9M17 14.5a5 5 0 0 1 4 5" />
    </svg>
  );
}

/*
 * SCHOOL ADMIN MENU
 * Daily website content management.
 */
const schoolAdminMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    id: "banners",
    label: "Banners",
    icon: <BannerIcon />,
  },
  {
    id: "news",
    label: "News & Notices",
    icon: <NewsIcon />,
  },
  {
    id: "messages",
    label: "Messages",
    icon: <MessageIcon />,
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: <GalleryIcon />,
  },
  {
    id: "settings",
    label: "Site Settings",
    icon: <SettingsIcon />,
  },
];

/*
 * SUPER ADMIN MENU
 * Only system-level controls.
 */
const superAdminMenuItems: MenuItem[] = [
  {
    id: "settings",
    label: "Website Control",
    icon: <SettingsIcon />,
  },
  {
    id: "users",
    label: "Users",
    icon: <UsersIcon />,
  },
];

export default function AdminSidebar({
  role,
  activeSection,
  onSectionChange,
}: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  /*
   * IMPORTANT:
   * role is used INSIDE the component because it is a prop.
   */
  const menuItems: MenuItem[] =
    role === "SUPER_ADMIN"
      ? superAdminMenuItems
      : schoolAdminMenuItems;

  function handleSectionChange(section: AdminSection) {
    onSectionChange(section);
    setMobileOpen(false);
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-[5.5rem] z-30 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#071d49] text-white shadow-lg lg:hidden"
        aria-label="Admin menu खोलें"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Menu बंद करें"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-[#071d49] text-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-16 lg:z-30 lg:h-[calc(100vh-4rem)] lg:w-64 lg:translate-x-0 lg:shadow-none ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 lg:hidden">
          <div>
            <p className="text-sm font-bold">
              SVIC ADMIN
            </p>

            <p className="text-xs text-white/60">
              Administration Panel
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Menu बंद करें"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Sidebar Branding */}
        <div className="hidden border-b border-white/10 px-5 py-5 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
              <span className="text-base font-extrabold text-[#071d49]">
                SV
              </span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                SVIC ADMIN
              </p>

              <p className="truncate text-xs text-white/60">
                Website Management
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
            {role === "SUPER_ADMIN"
              ? "System Menu"
              : "Main Menu"}
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const active =
                activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleSectionChange(item.id)
                  }
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                    active
                      ? "bg-[#f4c400] text-[#071d49] shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? "bg-[#071d49]/10"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    <span className="h-[18px] w-[18px]">
                      {item.icon}
                    </span>
                  </span>

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Role Information */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Current Role
            </p>

            <p className="mt-1 text-sm font-bold text-[#f4c400]">
              {role === "SUPER_ADMIN"
                ? "Super Admin"
                : "Website Admin"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}