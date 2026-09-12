"use client";

import { useEffect, useState } from "react";

type WebsiteAdmin = {
  id: number;
  name: string;
  username: string;
  role: "WEBSITE_ADMIN";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: WebsiteAdmin;
};

type ModalType =
  | "username"
  | "password"
  | "status"
  | null;

export default function WebsiteAdminAccount() {
  const [account, setAccount] =
    useState<WebsiteAdmin | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  const [success, setSuccess] = useState<string | null>(
    null
  );

  const [modal, setModal] = useState<ModalType>(null);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [updating, setUpdating] = useState(false);

  async function loadAccount() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "/api/admin/website-admin",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result: ApiResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Website Admin account fetch करने में समस्या हुई।"
        );
      }

      setAccount(result.data ?? null);
    } catch (error) {
      console.error(
        "Website Admin account fetch error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Website Admin account fetch करने में समस्या हुई।"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAccount();
  }, []);

  function clearMessages() {
    setError(null);
    setSuccess(null);
  }

  function openUsernameModal() {
    if (!account) return;

    clearMessages();

    setUsername(account.username);

    setModal("username");
  }

  function openPasswordModal() {
    clearMessages();

    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);

    setModal("password");
  }

  function openStatusModal() {
    if (!account) return;

    clearMessages();

    setModal("status");
  }

  function closeModal() {
    if (updating) return;

    setModal(null);

    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  }

  async function updateAccount(
    payload: Record<string, unknown>,
    successMessage: string
  ) {
    try {
      setUpdating(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(
        "/api/admin/website-admin",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result: ApiResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Account update करने में समस्या हुई।"
        );
      }

      if (result.data) {
        setAccount(result.data);
      }

      setSuccess(successMessage);

      setModal(null);

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
    } catch (error) {
      console.error(
        "Website Admin account update error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Account update करने में समस्या हुई।"
      );
    } finally {
      setUpdating(false);
    }
  }

  async function handleUsernameChange() {
    const newUsername = username.trim();

    if (!newUsername) {
      setError("Username खाली नहीं हो सकता।");
      return;
    }

    if (newUsername.length < 4) {
      setError(
        "Username कम से कम 4 characters का होना चाहिए।"
      );
      return;
    }

    if (newUsername.length > 50) {
      setError(
        "Username maximum 50 characters का हो सकता है।"
      );
      return;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(newUsername)) {
      setError(
        "Username में केवल letters, numbers, dot, underscore और hyphen allowed हैं।"
      );
      return;
    }

    if (newUsername === account?.username) {
      setError(
        "नया username पुराने username के समान है।"
      );
      return;
    }

    await updateAccount(
      {
        username: newUsername,
      },
      "Website Admin username successfully changed."
    );
  }

  async function handlePasswordChange() {
    setError(null);

    if (!password) {
      setError("Password enter करें।");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password कम से कम 8 characters का होना चाहिए।"
      );
      return;
    }

    if (password.length > 100) {
      setError(
        "Password बहुत लंबा है।"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Password और Confirm Password match नहीं कर रहे हैं।"
      );
      return;
    }

    await updateAccount(
      {
        password,
      },
      "Website Admin password successfully changed."
    );
  }

  async function handleStatusChange() {
    if (!account) return;

    await updateAccount(
      {
        isActive: !account.isActive,
      },
      account.isActive
        ? "Website Admin account successfully disabled."
        : "Website Admin account successfully enabled."
    );
  }

  return (
    <section className="space-y-6">
      {/* Heading */}
      <div>
        <span className="inline-flex items-center rounded-full bg-[#071d49]/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#123b7a]">
          Account Management
        </span>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#071d49] sm:text-3xl">
          Website Admin Account
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Website Admin के एकमात्र account को यहाँ से
          manage करें।
        </p>
      </div>

      {/* Security Notice */}
      <div className="rounded-2xl border border-[#f4c400]/40 bg-[#fffbea] p-5">
        <div className="flex gap-3">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="mt-0.5 shrink-0 text-[#a27f00]"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
          </svg>

          <div>
            <h3 className="text-sm font-bold text-[#071d49]">
              Account Security
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              यह account केवल Super Admin द्वारा manage किया
              जा सकता है। Password कभी भी यहाँ display नहीं
              किया जाएगा।
            </p>
          </div>
        </div>
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

            <p className="text-sm font-semibold leading-6 text-red-700">
              {error}
            </p>
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

            <p className="text-sm font-semibold leading-6 text-green-700">
              {success}
            </p>
          </div>
        </div>
      )}

      {/* Account Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="border-b border-gray-100 px-6 py-5 sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#071d49]">
                Website Administrator
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Daily website management account
              </p>
            </div>

            {!loading && account && (
              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                  account.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    account.isActive
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                {account.isActive
                  ? "Active"
                  : "Disabled"}
              </span>
            )}
          </div>
        </div>

        {/* Account Information */}
        <div className="px-6 py-6 sm:px-7">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#123b7a]" />

              <p className="mt-4 text-sm font-semibold text-gray-500">
                Account details load हो रही हैं...
              </p>
            </div>
          ) : !account ? (
            <div className="py-10 text-center">
              <p className="text-sm font-semibold text-gray-500">
                Website Admin account नहीं मिला।
              </p>
            </div>
          ) : (
            <>
              {/* Information Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Name
                  </p>

                  <p className="mt-2 text-base font-bold text-[#071d49]">
                    {account.name}
                  </p>
                </div>

                {/* Username */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Username
                  </p>

                  <p className="mt-2 break-all text-base font-bold text-[#071d49]">
                    {account.username}
                  </p>
                </div>

                {/* Role */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Role
                  </p>

                  <p className="mt-2 text-base font-bold text-[#071d49]">
                    Website Admin
                  </p>
                </div>

                {/* Status */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Account Status
                  </p>

                  <p
                    className={`mt-2 text-base font-bold ${
                      account.isActive
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {account.isActive
                      ? "Active"
                      : "Disabled"}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-7 border-t border-gray-100" />

              {/* Actions */}
              <div>
                <h4 className="text-sm font-bold text-[#071d49]">
                  Account Actions
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Website Admin account की login information
                  manage करें।
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {/* Username */}
                  <button
                    type="button"
                    onClick={openUsernameModal}
                    disabled={updating}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-[#123b7a]/30 hover:bg-[#071d49]/5 hover:text-[#071d49] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>

                    Change Username
                  </button>

                  {/* Password */}
                  <button
                    type="button"
                    onClick={openPasswordModal}
                    disabled={updating}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-[#123b7a]/30 hover:bg-[#071d49]/5 hover:text-[#071d49] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect
                        x="5"
                        y="10"
                        width="14"
                        height="10"
                        rx="2"
                      />

                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />

                      <circle
                        cx="12"
                        cy="15"
                        r="1"
                      />
                    </svg>

                    Change Password
                  </button>

                  {/* Status */}
                  <button
                    type="button"
                    onClick={openStatusModal}
                    disabled={updating}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      account.isActive
                        ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                        : "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {account.isActive ? (
                      <>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                          />
                          <path d="M8 8l8 8M16 8l-8 8" />
                        </svg>

                        Disable Account
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
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                          />
                          <path d="m8 12 2.5 2.5L16 9" />
                        </svg>

                        Enable Account
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Username Modal */}
      {modal === "username" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="border-b border-gray-100 px-6 py-5">
              <h3 className="text-lg font-bold text-[#071d49]">
                Change Username
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Website Admin के login username को बदलें।
              </p>
            </div>

            <div className="px-6 py-6">
              <label className="block text-sm font-bold text-gray-700">
                New Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                autoComplete="off"
                maxLength={50}
                placeholder="Enter username"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
              />

              <p className="mt-2 text-xs text-gray-400">
                Letters, numbers, dot, underscore और hyphen
                allowed हैं।
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                disabled={updating}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUsernameChange}
                disabled={updating}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071d49] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123b7a] disabled:opacity-60"
              >
                {updating && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}

                {updating
                  ? "Updating..."
                  : "Save Username"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {modal === "password" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="border-b border-gray-100 px-6 py-5">
              <h3 className="text-lg font-bold text-[#071d49]">
                Change Password
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                नया password set करें। Current password की
                जरूरत नहीं है।
              </p>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div>
                <label className="block text-sm font-bold text-gray-700">
                  New Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="new-password"
                    maxLength={100}
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm font-medium text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#071d49]"
                    aria-label={
                      showPassword
                        ? "Password hide करें"
                        : "Password show करें"
                    }
                  >
                    {showPassword ? (
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4 9.5 7-0.4 1.2-1.3 2.5-2.5 3.5" />
                        <path d="M6.2 6.2C4.4 7.4 3.2 9.2 2.5 12c1 3 4.5 7 9.5 7 1.2 0 2.3-.2 3.3-.6" />
                      </svg>
                    ) : (
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M2.5 12c1-3 4.5-7 9.5-7s8.5 4 9.5 7c-1 3-4.5 7-9.5 7s-8.5-4-9.5-7Z" />
                        <circle
                          cx="12"
                          cy="12"
                          r="2.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Minimum 8 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700">
                  Confirm Password
                </label>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                  maxLength={100}
                  placeholder="Confirm new password"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                />
              </div>

              <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                <p className="text-xs font-semibold leading-5 text-green-700">
                  Password securely hash होकर database में
                  store होगा। Plain password store नहीं होगा।
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                disabled={updating}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePasswordChange}
                disabled={updating}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071d49] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#123b7a] disabled:opacity-60"
              >
                {updating && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}

                {updating
                  ? "Updating..."
                  : "Save Password"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Confirmation Modal */}
      {modal === "status" && account && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    account.isActive
                      ? "bg-red-50"
                      : "bg-green-50"
                  }`}
                >
                  {account.isActive ? (
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
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                      />
                      <path d="m8 12 2.5 2.5L16 9" />
                    </svg>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#071d49]">
                    {account.isActive
                      ? "Disable Website Admin?"
                      : "Enable Website Admin?"}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {account.isActive
                      ? "Disabled account से Website Admin login नहीं कर पाएगा।"
                      : "Account enable करने के बाद Website Admin फिर से login कर सकेगा।"}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              <div
                className={`rounded-xl p-4 ${
                  account.isActive
                    ? "bg-red-50"
                    : "bg-green-50"
                }`}
              >
                <p className="text-sm leading-6 text-gray-700">
                  {account.isActive
                    ? "क्या आप वाकई Website Admin account को disable करना चाहते हैं?"
                    : "क्या आप Website Admin account को enable करना चाहते हैं?"}
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                disabled={updating}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleStatusChange}
                disabled={updating}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60 ${
                  account.isActive
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {updating && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}

                {updating
                  ? "Updating..."
                  : account.isActive
                    ? "Disable Account"
                    : "Enable Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}