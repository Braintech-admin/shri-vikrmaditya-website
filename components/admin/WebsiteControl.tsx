"use client";

import { useEffect, useState } from "react";

type WebsiteControlResponse = {
  success: boolean;
  data?: {
    websiteEnabled: boolean;
  };
  message?: string;
};

export default function WebsiteControl() {
  const [websiteEnabled, setWebsiteEnabled] =
    useState<boolean | null>(null);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(
    null
  );

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadWebsiteStatus() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "/api/admin/website-control",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result: WebsiteControlResponse =
          await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Website status fetch करने में समस्या हुई।"
          );
        }

        if (!cancelled) {
          setWebsiteEnabled(
            result.data?.websiteEnabled ?? true
          );
        }
      } catch (error) {
        console.error(
          "Website status fetch error:",
          error
        );

        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Website status fetch करने में समस्या हुई।"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWebsiteStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  function openConfirmation() {
    if (websiteEnabled === null || updating) {
      return;
    }

    setSuccess(null);
    setError(null);
    setShowConfirmation(true);
  }

  function closeConfirmation() {
    if (updating) {
      return;
    }

    setShowConfirmation(false);
  }

  async function updateWebsiteStatus() {
    if (websiteEnabled === null || updating) {
      return;
    }

    const newStatus = !websiteEnabled;

    try {
      setUpdating(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(
        "/api/admin/website-control",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            websiteEnabled: newStatus,
          }),
        }
      );

      const result: WebsiteControlResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Website status update करने में समस्या हुई।"
        );
      }

      const updatedStatus =
        result.data?.websiteEnabled ?? newStatus;

      setWebsiteEnabled(updatedStatus);

      setSuccess(
        updatedStatus
          ? "Public website successfully enabled."
          : "Public website successfully disabled."
      );

      setShowConfirmation(false);
    } catch (error) {
      console.error(
        "Website status update error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Website status update करने में समस्या हुई।"
      );
    } finally {
      setUpdating(false);
    }
  }

  const statusLoading =
    loading || websiteEnabled === null;

  return (
    <section className="space-y-6">
      {/* Page Heading */}
      <div>
        <span className="inline-flex items-center rounded-full bg-[#071d49]/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#123b7a]">
          System Control
        </span>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#071d49] sm:text-3xl">
          Website Control
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Public school website को temporarily enable या
          disable करने के लिए इस control का उपयोग करें।
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="flex gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="mt-0.5 shrink-0 text-red-600"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5" />
              <path d="M12 16h.01" />
            </svg>

            <div>
              <h3 className="text-sm font-bold text-red-800">
                Something went wrong
              </h3>

              <p className="mt-1 text-sm leading-6 text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
          <div className="flex gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="mt-0.5 shrink-0 text-green-600"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 2.5 2.5L16 9" />
            </svg>

            <div>
              <h3 className="text-sm font-bold text-green-800">
                Update Successful
              </h3>

              <p className="mt-1 text-sm leading-6 text-green-700">
                {success}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Control Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="border-b border-gray-100 px-6 py-5 sm:px-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#071d49]">
                Public Website Status
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                यह setting केवल public-facing website को
                control करती है।
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#071d49]/5 px-3 py-1.5 text-xs font-bold text-[#123b7a]">
              <span className="h-2 w-2 rounded-full bg-[#123b7a]" />
              Super Admin Only
            </div>
          </div>
        </div>

        {/* Status Area */}
        <div className="px-6 py-8 sm:px-7 sm:py-10">
          {statusLoading ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#123b7a]" />

              <p className="mt-4 text-sm font-semibold text-gray-500">
                Website status load हो रहा है...
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Current Status */}
              <div className="flex items-center gap-5">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
                    websiteEnabled
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                >
                  {websiteEnabled ? (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="text-green-600"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8 12 2.5 2.5L16 9" />
                    </svg>
                  ) : (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="text-red-600"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8 8l8 8M16 8l-8 8" />
                    </svg>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Current Status
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        websiteEnabled
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />

                    <h4
                      className={`text-2xl font-extrabold ${
                        websiteEnabled
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {websiteEnabled
                        ? "Website ON"
                        : "Website OFF"}
                    </h4>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {websiteEnabled
                      ? "Public website visitors can access the website."
                      : "Public website is currently unavailable to visitors."}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={openConfirmation}
                disabled={updating}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  websiteEnabled
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {websiteEnabled ? (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8 8l8 8M16 8l-8 8" />
                    </svg>

                    Turn Website OFF
                  </>
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8 12 2.5 2.5L16 9" />
                    </svg>

                    Turn Website ON
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Important Information */}
      <div className="rounded-2xl border border-[#f4c400]/40 bg-[#fffbea] p-5 sm:p-6">
        <div className="flex gap-3">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="mt-0.5 shrink-0 text-[#b08b00]"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
          </svg>

          <div>
            <h3 className="text-sm font-bold text-[#071d49]">
              Important
            </h3>

            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-gray-600">
              <li>
                • Website OFF करने पर public website visitors
                को access नहीं मिलेगा।
              </li>

              <li>
                • Admin Panel accessible रहेगा।
              </li>

              <li>
                • Website Admin इस setting को change नहीं कर
                सकता।
              </li>

              <li>
                • Website status बदलने से school का database
                content delete नहीं होता।
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="website-control-confirmation-title"
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    websiteEnabled
                      ? "bg-red-50"
                      : "bg-green-50"
                  }`}
                >
                  {websiteEnabled ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="text-red-600"
                    >
                      <path d="M12 3 2.5 20h19L12 3Z" />
                      <path d="M12 9v5" />
                      <path d="M12 17h.01" />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="text-green-600"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8 12 2.5 2.5L16 9" />
                    </svg>
                  )}
                </div>

                <div>
                  <h3
                    id="website-control-confirmation-title"
                    className="text-lg font-bold text-[#071d49]"
                  >
                    {websiteEnabled
                      ? "Disable Public Website?"
                      : "Enable Public Website?"}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {websiteEnabled
                      ? "Public website temporarily unavailable हो जाएगी। Admin Panel accessible रहेगा।"
                      : "Public website visitors के लिए फिर से accessible हो जाएगी।"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5">
              <div
                className={`rounded-xl p-4 ${
                  websiteEnabled
                    ? "bg-red-50"
                    : "bg-green-50"
                }`}
              >
                <p className="text-sm leading-6 text-gray-700">
                  {websiteEnabled
                    ? "क्या आप वाकई public website को OFF करना चाहते हैं?"
                    : "क्या आप public website को ON करना चाहते हैं?"}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeConfirmation}
                disabled={updating}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={updateWebsiteStatus}
                disabled={updating}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  websiteEnabled
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {updating && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}

                {updating
                  ? "Updating..."
                  : websiteEnabled
                    ? "Turn Website OFF"
                    : "Turn Website ON"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}