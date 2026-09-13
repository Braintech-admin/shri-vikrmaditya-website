"use client";

import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

type MessageRole =
  | "PRINCIPAL"
  | "MANAGER";

type SchoolMessage = {
  id: number;
  role: MessageRole;
  title: string;
  name: string;
  image: string;
  message: string;
  message2: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  role: MessageRole;
  title: string;
  name: string;
  image: string;
  message: string;
  message2: string;
  isPublished: boolean;
  sortOrder: string;
};

const emptyForm: FormState = {
  role: "PRINCIPAL",
  title: "प्रधानाचार्य का संदेश",
  name: "प्रधानाचार्य",
  image: "",
  message: "",
  message2: "",
  isPublished: true,
  sortOrder: "0",
};

function roleLabel(
  role: MessageRole
) {
  return role === "PRINCIPAL"
    ? "प्रधानाचार्य"
    : "प्रबंधक";
}

function roleTitle(
  role: MessageRole
) {
  return role === "PRINCIPAL"
    ? "प्रधानाचार्य का संदेश"
    : "प्रबंधक का संदेश";
}

export default function MessagesManager() {
  const [messages, setMessages] =
    useState<SchoolMessage[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [actionId, setActionId] =
    useState<number | null>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [form, setForm] =
    useState<FormState>(emptyForm);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function loadMessages() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/messages",
        {
          cache: "no-store",
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Messages fetch करने में समस्या हुई।"
        );
      }

      setMessages(
        (result.data || []).sort(
          (
            a: SchoolMessage,
            b: SchoolMessage
          ) =>
            a.sortOrder - b.sortOrder ||
            a.id - b.id
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Messages fetch करने में समस्या हुई।"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();

    return () => {
      if (
        imagePreview.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearImagePreview() {
    if (
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setSelectedImage(null);
    setImagePreview("");
  }

  function resetForm() {
    clearImagePreview();

    setEditingId(null);
    setForm(emptyForm);
  }

  function updateForm(
    field: keyof FormState,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function editMessage(
    message: SchoolMessage
  ) {
    clearImagePreview();

    setEditingId(message.id);

    setForm({
      role: message.role,
      title: message.title,
      name: message.name,
      image: message.image,
      message: message.message,
      message2:
        message.message2 || "",
      isPublished:
        message.isPublished,
      sortOrder: String(
        message.sortOrder
      ),
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleImageSelect(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "केवल JPG, PNG और WEBP images allowed हैं।"
      );

      event.target.value = "";
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Image का maximum upload size 5 MB है।"
      );

      event.target.value = "";
      return;
    }

    clearImagePreview();

    const previewUrl =
      URL.createObjectURL(file);

    setSelectedImage(file);
    setImagePreview(previewUrl);
  }

  async function uploadImage(
    file: File
  ) {
    try {
      setUploadingImage(true);
      setError("");

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          "/api/admin/messages/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Image upload करने में समस्या हुई।"
        );
      }

      return result.data?.path || null;
    } catch (error) {
      console.error(
        "Message image upload error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Image upload करने में समस्या हुई।"
      );

      return null;
    } finally {
      setUploadingImage(false);
    }
  }

  async function saveMessage() {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!form.title.trim()) {
        setError(
          "Title आवश्यक है।"
        );
        return;
      }

      if (!form.name.trim()) {
        setError(
          "Name आवश्यक है।"
        );
        return;
      }

      if (!form.message.trim()) {
        setError(
          "Message आवश्यक है।"
        );
        return;
      }

      let imagePath =
        form.image.trim();

      /*
       * New image selected:
       * Upload before saving DB.
       */
      if (selectedImage) {
        const uploadedPath =
          await uploadImage(
            selectedImage
          );

        if (!uploadedPath) {
          return;
        }

        imagePath =
          uploadedPath;
      }

      if (!imagePath) {
        setError(
          "कृपया Message Photo upload करें।"
        );
        return;
      }

      const payload = {
        role: form.role,
        title: form.title.trim(),
        name: form.name.trim(),
        image: imagePath,
        message: form.message.trim(),
        message2:
          form.message2.trim(),
        isPublished:
          form.isPublished,
        sortOrder:
          Number(form.sortOrder) || 0,
      };

      const response =
        await fetch(
          "/api/admin/messages",
          {
            method: editingId
              ? "PATCH"
              : "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              editingId
                ? {
                    id: editingId,
                    ...payload,
                  }
                : payload
            ),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Message save करने में समस्या हुई।"
        );
      }

      setSuccess(
        editingId
          ? "Message successfully update हो गया।"
          : "Message successfully create हो गया।"
      );

      resetForm();

      await loadMessages();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Message save करने में समस्या हुई।"
      );
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(
    message: SchoolMessage
  ) {
    try {
      setActionId(message.id);
      setError("");
      setSuccess("");

      const response =
        await fetch(
          "/api/admin/messages",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id: message.id,
              isPublished:
                !message.isPublished,
            }),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Publish status update नहीं हुआ।"
        );
      }

      setSuccess(
        message.isPublished
          ? "Message unpublish कर दिया गया।"
          : "Message publish कर दिया गया।"
      );

      await loadMessages();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Publish status update नहीं हुआ।"
      );
    } finally {
      setActionId(null);
    }
  }

  async function deleteMessage(
    message: SchoolMessage
  ) {
    const confirmed =
      window.confirm(
        `${roleLabel(
          message.role
        )} का message delete करना चाहते हैं?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(message.id);
      setError("");
      setSuccess("");

      const response =
        await fetch(
          "/api/admin/messages",
          {
            method: "DELETE",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id: message.id,
            }),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Message delete करने में समस्या हुई।"
        );
      }

      setSuccess(
        "Message successfully delete हो गया।"
      );

      if (
        editingId === message.id
      ) {
        resetForm();
      }

      await loadMessages();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Message delete करने में समस्या हुई।"
      );
    } finally {
      setActionId(null);
    }
  }

  const filteredMessages =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return messages;
      }

      return messages.filter(
        (item) => {
          const text = [
            item.title,
            item.name,
            item.message,
            item.message2 || "",
            roleLabel(item.role),
            item.role,
          ]
            .join(" ")
            .toLowerCase();

          return text.includes(
            query
          );
        }
      );
    }, [messages, search]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <span className="inline-flex rounded-full bg-[#071d49]/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#123b7a]">
          Website Content
        </span>

        <h2 className="mt-3 text-2xl font-extrabold text-[#071d49] sm:text-3xl">
          Messages Management
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          प्रधानाचार्य एवं प्रबंधक के संदेश manage करें।
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {success}
        </div>
      )}

      {/* Form */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#071d49]">
              {editingId
                ? "Edit Message"
                : "Add Message"}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Website पर दिखाई देने वाला message manage करें।
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={
                saving ||
                uploadingImage
              }
              className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Role */}
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-gray-700">
              Message For
            </span>

            <select
              value={form.role}
              onChange={(e) => {
                const role =
                  e.target
                    .value as MessageRole;

                setForm(
                  (current) => ({
                    ...current,
                    role,
                    title:
                      roleTitle(role),
                    name:
                      role ===
                      "PRINCIPAL"
                        ? "प्रधानाचार्य"
                        : "विद्यालय प्रबंधक",
                  })
                );
              }}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#123b7a]"
            >
              <option value="PRINCIPAL">
                प्रधानाचार्य
              </option>

              <option value="MANAGER">
                प्रबंधक
              </option>
            </select>
          </label>

          {/* Title */}
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-gray-700">
              Title
            </span>

            <input
              value={form.title}
              onChange={(e) =>
                updateForm(
                  "title",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#123b7a]"
              placeholder="प्रधानाचार्य का संदेश"
            />
          </label>

          {/* Name */}
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-gray-700">
              Name / Designation
            </span>

            <input
              value={form.name}
              onChange={(e) =>
                updateForm(
                  "name",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#123b7a]"
              placeholder="प्रधानाचार्य"
            />
          </label>

          {/* PHOTO UPLOAD */}
          <div className="block">
            <span className="mb-2 block text-xs font-bold text-gray-700">
              Message Photo
            </span>

            <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center transition hover:border-[#123b7a] hover:bg-gray-100">
              {imagePreview ||
              form.image ? (
                <div className="relative">
                  <img
                    src={
                      imagePreview ||
                      form.image
                    }
                    alt="Message preview"
                    className="h-40 w-32 rounded-xl object-cover shadow-sm"
                  />

                  <span className="absolute -right-2 -top-2 rounded-full bg-[#071d49] px-2 py-1 text-[9px] font-bold text-white">
                    Change
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                    📷
                  </div>

                  <p className="mt-3 text-sm font-bold text-[#071d49]">
                    Choose Photo
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    JPG, PNG or WEBP
                  </p>

                  <p className="text-[11px] text-gray-400">
                    Maximum 5 MB
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={
                  handleImageSelect
                }
                className="hidden"
              />
            </label>

            {uploadingImage && (
              <p className="mt-2 text-xs font-semibold text-[#123b7a]">
                Photo upload हो रही है...
              </p>
            )}
          </div>

          {/* Message */}
          <label className="block md:col-span-2">
            <span className="mb-2 block text-xs font-bold text-gray-700">
              Message — Paragraph 1
            </span>

            <textarea
              value={form.message}
              onChange={(e) =>
                updateForm(
                  "message",
                  e.target.value
                )
              }
              rows={6}
              className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#123b7a]"
              placeholder="Message लिखें..."
            />
          </label>

          {/* Message 2 */}
          <label className="block md:col-span-2">
            <span className="mb-2 block text-xs font-bold text-gray-700">
              Message — Paragraph 2
            </span>

            <textarea
              value={form.message2}
              onChange={(e) =>
                updateForm(
                  "message2",
                  e.target.value
                )
              }
              rows={5}
              className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#123b7a]"
              placeholder="Optional second paragraph..."
            />
          </label>

          {/* Order */}
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-gray-700">
              Display Order
            </span>

            <input
              type="number"
              min="0"
              value={form.sortOrder}
              onChange={(e) =>
                updateForm(
                  "sortOrder",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#123b7a]"
            />
          </label>

          {/* Publish */}
          <label className="flex items-center gap-3 self-end rounded-xl border border-gray-200 px-4 py-3">
            <input
              type="checkbox"
              checked={
                form.isPublished
              }
              onChange={(e) =>
                updateForm(
                  "isPublished",
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />

            <span className="text-sm font-bold text-gray-700">
              Published on Website
            </span>
          </label>
        </div>

        {/* Save */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={saveMessage}
            disabled={
              saving ||
              uploadingImage
            }
            className="rounded-xl bg-[#071d49] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#123b7a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update Message"
                : "Save Message"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            disabled={
              saving ||
              uploadingImage
            }
            className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Existing */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#071d49]">
                Existing Messages
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Principal और Manager के current messages
              </p>
            </div>

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search messages..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#123b7a] sm:w-64"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Messages loading...
            </div>
          ) : filteredMessages.length ===
            0 ? (
            <div className="p-8 text-center">
              <p className="text-sm font-semibold text-gray-500">
                कोई message नहीं मिला।
              </p>
            </div>
          ) : (
            filteredMessages.map(
              (item) => (
                <article
                  key={item.id}
                  className="p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-24 shrink-0 rounded-xl object-cover ring-1 ring-gray-100"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#f4c400]/20 px-3 py-1 text-[10px] font-bold text-[#806900]">
                          {roleLabel(
                            item.role
                          )}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                            item.isPublished
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {item.isPublished
                            ? "Published"
                            : "Unpublished"}
                        </span>
                      </div>

                      <h4 className="mt-3 text-lg font-extrabold text-[#071d49]">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs font-semibold text-gray-500">
                        {item.name}
                      </p>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                        {item.message}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            editMessage(
                              item
                            )
                          }
                          className="rounded-lg bg-[#071d49] px-4 py-2 text-xs font-bold text-white hover:bg-[#123b7a]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            togglePublished(
                              item
                            )
                          }
                          disabled={
                            actionId ===
                            item.id
                          }
                          className={`rounded-lg px-4 py-2 text-xs font-bold ${
                            item.isPublished
                              ? "border border-red-200 text-red-700 hover:bg-red-50"
                              : "border border-green-200 text-green-700 hover:bg-green-50"
                          }`}
                        >
                          {item.isPublished
                            ? "Unpublish"
                            : "Publish"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteMessage(
                              item
                            )
                          }
                          disabled={
                            actionId ===
                            item.id
                          }
                          className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
}