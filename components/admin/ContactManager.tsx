"use client";

import { useEffect, useMemo, useState } from "react";

type ContactInquiry = {
  id: number;
  name: string;
  mobile: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

type FilterType = "all" | "unread" | "read";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ContactIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 5h16v12H8l-4 3V5Z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.27a2 2 0 0 0 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.9 7.3L3.5 20l1.2-4A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="M8.5 8.5c.3-.4.7-.4 1-.1l1.1 1.2c.3.3.3.6.1.9l-.5.7c.8 1.2 1.8 2.2 3 3l.7-.5c.3-.2.6-.2.9.1l1.2 1.1c.3.3.3.7-.1 1-.6.6-1.4.8-2.2.5-3.6-1.2-6.2-3.8-7.4-7.4-.3-.8-.1-1.6.5-2.2Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M9 7V4h6v3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function ContactManager() {
  const [enquiries, setEnquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selected, setSelected] = useState<ContactInquiry | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  async function loadEnquiries() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/contact", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.error ||
            result?.message ||
            "Contact enquiries load नहीं हो सकीं।"
        );
      }

      /*
       * API response can be:
       *
       * 1. [...]
       * 2. { success: true, data: [...] }
       * 3. { success: true, data: { enquiries: [...] } }
       *
       * Normalize everything into an array.
       */
      let enquiryList: ContactInquiry[] = [];

      if (Array.isArray(result)) {
        enquiryList = result;
      } else if (Array.isArray(result?.data)) {
        enquiryList = result.data;
      } else if (Array.isArray(result?.data?.enquiries)) {
        enquiryList = result.data.enquiries;
      } else if (Array.isArray(result?.enquiries)) {
        enquiryList = result.enquiries;
      }

      setEnquiries(enquiryList);
    } catch (error) {
      console.error("Contact manager load error:", error);

      setEnquiries([]);

      setError(
        error instanceof Error
          ? error.message
          : "Contact enquiries load नहीं हो सकीं।"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  const unreadCount = useMemo(
    () =>
      enquiries.filter((item) => !item.isRead).length,
    [enquiries]
  );

  const readCount = enquiries.length - unreadCount;

  const filteredEnquiries = useMemo(() => {
    if (filter === "unread") {
      return enquiries.filter((item) => !item.isRead);
    }

    if (filter === "read") {
      return enquiries.filter((item) => item.isRead);
    }

    return enquiries;
  }, [enquiries, filter]);

  async function updateReadStatus(
    id: number,
    isRead: boolean
  ) {
    try {
      setActionLoading(id);
      setError("");

      const response = await fetch("/api/admin/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          isRead,
        }),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Status update नहीं हो सका।"
        );
      }

      setEnquiries((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                isRead,
              }
            : item
        )
      );

      setSelected((current) =>
        current?.id === id
          ? {
              ...current,
              isRead,
            }
          : current
      );
    } catch (error) {
      console.error("Contact status update error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Status update नहीं हो सका।"
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function deleteEnquiry(id: number) {
    const confirmed = window.confirm(
      "क्या आप इस enquiry को permanently delete करना चाहते हैं?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(id);
      setError("");

      const response = await fetch("/api/admin/contact", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Enquiry delete नहीं हो सकी।"
        );
      }

      setEnquiries((current) =>
        current.filter((item) => item.id !== id)
      );

      setSelected((current) =>
        current?.id === id ? null : current
      );
    } catch (error) {
      console.error("Contact delete error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Enquiry delete नहीं हो सकी।"
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function openEnquiry(enquiry: ContactInquiry) {
    setSelected(enquiry);

    if (!enquiry.isRead) {
      await updateReadStatus(enquiry.id, true);
    }
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full bg-[#071d49]/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#123b7a]">
            Website Communication
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#071d49] sm:text-3xl">
            Contact Enquiries
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            Website contact form से प्राप्त enquiries यहाँ देखें और manage करें।
          </p>
        </div>

        <button
          type="button"
          onClick={loadEnquiries}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-[#071d49] shadow-sm transition hover:border-[#123b7a] hover:text-[#123b7a] disabled:opacity-60"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-xs font-bold text-red-700 underline"
          >
            Close
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">
            Total Enquiries
          </p>

          <p className="mt-2 text-3xl font-extrabold text-[#071d49]">
            {enquiries.length}
          </p>
        </div>

        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <p className="text-sm font-semibold text-orange-700">
            Unread
          </p>

          <p className="mt-2 text-3xl font-extrabold text-orange-800">
            {unreadCount}
          </p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <p className="text-sm font-semibold text-green-700">
            Read
          </p>

          <p className="mt-2 text-3xl font-extrabold text-green-800">
            {readCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        {(
          [
            ["all", `All (${enquiries.length})`],
            ["unread", `Unread (${unreadCount})`],
            ["read", `Read (${readCount})`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              filter === value
                ? "bg-[#071d49] text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-64 items-center justify-center p-8">
            <p className="text-sm font-semibold text-gray-500">
              Enquiries load हो रही हैं...
            </p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#071d49]/5 text-[#123b7a]">
              <ContactIcon />
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-[#071d49]">
              कोई enquiry नहीं मिली
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              इस filter के अनुसार अभी कोई contact enquiry उपलब्ध नहीं है।
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className={`p-4 transition hover:bg-gray-50 sm:p-5 ${
                  !enquiry.isRead ? "bg-orange-50/40" : ""
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Main info */}
                  <button
                    type="button"
                    onClick={() => openEnquiry(enquiry)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          enquiry.isRead
                            ? "bg-gray-100 text-gray-500"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        <ContactIcon />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-base font-extrabold text-[#071d49]">
                            {enquiry.name}
                          </h3>

                          {!enquiry.isRead && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-orange-700">
                              New
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm font-semibold text-gray-600">
                          {enquiry.mobile}
                        </p>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                          {enquiry.message}
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                          {formatDate(enquiry.createdAt)}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
                    <a
                      href={`tel:${enquiry.mobile}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-[#123b7a] hover:text-[#123b7a]"
                    >
                      <PhoneIcon />
                      Call
                    </a>

                    <a
                      href={`https://wa.me/91${enquiry.mobile}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-green-600 hover:text-green-700"
                    >
                      <WhatsAppIcon />
                      WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={() => openEnquiry(enquiry)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#071d49] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#123b7a]"
                    >
                      <EyeIcon />
                      View
                    </button>

                    <button
                      type="button"
                      disabled={actionLoading === enquiry.id}
                      onClick={() =>
                        updateReadStatus(
                          enquiry.id,
                          !enquiry.isRead
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-[#123b7a] hover:text-[#123b7a] disabled:opacity-50"
                    >
                      <CheckIcon />

                      {enquiry.isRead
                        ? "Unread"
                        : "Mark Read"}
                    </button>

                    <button
                      type="button"
                      disabled={actionLoading === enquiry.id}
                      onClick={() => deleteEnquiry(enquiry.id)}
                      className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                      aria-label="Delete enquiry"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 sm:p-6">
              <div>
                <span className="inline-flex items-center rounded-full bg-[#071d49]/5 px-3 py-1 text-xs font-bold text-[#123b7a]">
                  Contact Enquiry
                </span>

                <h3 className="mt-3 text-xl font-extrabold text-[#071d49]">
                  {selected.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(selected.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
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

            {/* Modal Body */}
            <div className="space-y-5 p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Name
                  </p>

                  <p className="mt-1 font-bold text-[#071d49]">
                    {selected.name}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Mobile
                  </p>

                  <p className="mt-1 font-bold text-[#071d49]">
                    {selected.mobile}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Message
                </p>

                <div className="mt-2 rounded-xl border border-gray-200 bg-white p-4">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                    {selected.message}
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-5">
                <a
                  href={`tel:${selected.mobile}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#071d49] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#123b7a]"
                >
                  <PhoneIcon />
                  Call
                </a>

                <a
                  href={`https://wa.me/91${selected.mobile}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-bold text-green-700 hover:bg-green-100"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>

                <button
                  type="button"
                  disabled={actionLoading === selected.id}
                  onClick={() =>
                    updateReadStatus(
                      selected.id,
                      !selected.isRead
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:border-[#123b7a] hover:text-[#123b7a] disabled:opacity-50"
                >
                  <CheckIcon />

                  {selected.isRead
                    ? "Mark Unread"
                    : "Mark Read"}
                </button>

                <button
                  type="button"
                  disabled={actionLoading === selected.id}
                  onClick={() => deleteEnquiry(selected.id)}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                  <TrashIcon />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}