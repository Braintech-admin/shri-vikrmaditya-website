"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

type Banner = {
  id: number;
  title: string;
  highlight: string;
  description: string;
  image: string;
  buttonText: string | null;
  buttonLink: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type BannerForm = {
  title: string;
  highlight: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
};

type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
};

const emptyForm: BannerForm = {
  title: "",
  highlight: "",
  description: "",
  image: "",
  buttonText: "",
  buttonLink: "",
};

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
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
      />
      <circle
        cx="8.5"
        cy="9"
        r="1.5"
      />
      <path d="m4 17 5-5 3 3 2-2 6 5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 6 12 12M18 6 6 18" />
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
      <circle
        cx="12"
        cy="12"
        r="2.5"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="17"
      height="17"
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

function ImagePlaceholder() {
  return (
    <div className="flex h-full min-h-[170px] items-center justify-center bg-gray-100 text-gray-400">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
          <BannerIcon />
        </div>

        <p className="mt-3 text-xs font-semibold">
          Image Preview
        </p>
      </div>
    </div>
  );
}

export default function BannersManager() {
  const [banners, setBanners] =
    useState<Banner[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [actionId, setActionId] =
    useState<number | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  const [editingBannerId, setEditingBannerId] =
    useState<number | null>(null);

  const [form, setForm] =
    useState<BannerForm>(emptyForm);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  async function loadBanners() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "/api/admin/banners",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result: ApiResponse<Banner[]> =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Banners fetch करने में समस्या हुई।"
        );
      }

      setBanners(
        (result.data ?? []).sort(
          (a, b) =>
            a.sortOrder - b.sortOrder ||
            a.id - b.id
        )
      );
    } catch (error) {
      console.error(
        "Banners load error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Banners fetch करने में समस्या हुई।"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBanners();

    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateForm(
    field: keyof BannerForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function clearImagePreview() {
    if (
      imagePreview &&
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
    setForm(emptyForm);
    setEditingBannerId(null);
  }

  function openCreateForm() {
    setError(null);
    setSuccess(null);

    resetForm();

    setShowForm(true);
  }

  function openEditForm(
    banner: Banner
  ) {
    setError(null);
    setSuccess(null);

    clearImagePreview();

    setEditingBannerId(
      banner.id
    );

    setForm({
      title: banner.title,
      highlight: banner.highlight,
      description:
        banner.description,
      image: banner.image,
      buttonText:
        banner.buttonText ?? "",
      buttonLink:
        banner.buttonLink ?? "",
    });

    setShowForm(true);
  }

  function closeForm() {
    if (
      saving ||
      uploadingImage
    ) {
      return;
    }

    setShowForm(false);
    resetForm();
  }

  function handleImageSelect(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);
    setSuccess(null);

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
  ): Promise<string | null> {
    try {
      setUploadingImage(true);
      setError(null);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          "/api/admin/banners/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const result: ApiResponse<{
        path: string;
        width: number;
        height: number;
        size: number;
      }> = await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Image upload करने में समस्या हुई।"
        );
      }

      return (
        result.data?.path ?? null
      );
    } catch (error) {
      console.error(
        "Image upload error:",
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !editingBannerId &&
      banners.length >= 6
    ) {
      setError(
        "अधिकतम 6 banners ही बनाए जा सकते हैं।"
      );
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      let imagePath =
        form.image.trim();

      /*
       * New image selected:
       * upload first.
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
          "कृपया Banner Image select करें।"
        );
        return;
      }

      const payload = {
        ...form,
        image: imagePath,
      };

      let response: Response;

      if (editingBannerId) {
        response = await fetch(
          "/api/admin/banners",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id: editingBannerId,
              ...payload,
            }),
          }
        );
      } else {
        response = await fetch(
          "/api/admin/banners",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          }
        );
      }

      const result: ApiResponse<Banner> =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Banner save करने में समस्या हुई।"
        );
      }

      setSuccess(
        result.message ||
          (editingBannerId
            ? "Banner update हो गया।"
            : "Banner create हो गया।")
      );

      setShowForm(false);
      resetForm();

      await loadBanners();
    } catch (error) {
      console.error(
        "Banner save error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Banner save करने में समस्या हुई।"
      );
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(
    banner: Banner
  ) {
    try {
      setActionId(banner.id);
      setError(null);
      setSuccess(null);

      const response =
        await fetch(
          "/api/admin/banners",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id: banner.id,
              isPublished:
                !banner.isPublished,
            }),
          }
        );

      const result: ApiResponse<Banner> =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Banner status update करने में समस्या हुई।"
        );
      }

      setSuccess(
        banner.isPublished
          ? "Banner unpublish हो गया।"
          : "Banner publish हो गया।"
      );

      await loadBanners();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Banner status update करने में समस्या हुई।"
      );
    } finally {
      setActionId(null);
    }
  }

  async function changeOrder(
    banner: Banner,
    direction: "up" | "down"
  ) {
    const currentIndex =
      banners.findIndex(
        (item) =>
          item.id === banner.id
      );

    if (
      currentIndex === -1
    ) {
      return;
    }

    const targetIndex =
      direction === "up"
        ? currentIndex - 1
        : currentIndex + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= banners.length
    ) {
      return;
    }

    const targetBanner =
      banners[targetIndex];

    try {
      setActionId(banner.id);
      setError(null);
      setSuccess(null);

      /*
       * Swap the two positions.
       */
      const firstResponse =
        await fetch(
          "/api/admin/banners",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id: banner.id,
              sortOrder:
                targetBanner.sortOrder,
            }),
          }
        );

      const firstResult: ApiResponse =
        await firstResponse.json();

      if (
        !firstResponse.ok ||
        !firstResult.success
      ) {
        throw new Error(
          firstResult.message ||
            "Display order update नहीं हो सका।"
        );
      }

      await loadBanners();

      setSuccess(
        "Banner display order update हो गया।"
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Display order update करने में समस्या हुई।"
      );
    } finally {
      setActionId(null);
    }
  }

  async function deleteBanner(
    banner: Banner
  ) {
    const confirmed =
      window.confirm(
        `क्या आप "${banner.title}" banner को permanently delete करना चाहते हैं?\n\nImage file भी delete हो जाएगी।`
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(banner.id);
      setError(null);
      setSuccess(null);

      const response =
        await fetch(
          "/api/admin/banners",
          {
            method: "DELETE",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id: banner.id,
            }),
          }
        );

      const result: ApiResponse =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Banner delete करने में समस्या हुई।"
        );
      }

      setSuccess(
        result.message ||
          "Banner delete हो गया।"
      );

      await loadBanners();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Banner delete करने में समस्या हुई।"
      );
    } finally {
      setActionId(null);
    }
  }

  return (
    <section className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full bg-[#071d49]/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#123b7a]">
            Website Content
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#071d49] sm:text-3xl">
            Banner Management
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            Homepage के banners यहाँ से manage करें।
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          disabled={
            banners.length >= 6
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071d49] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#123b7a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PlusIcon />
          Add New Banner
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Total Banners
          </p>

          <p className="mt-2 text-3xl font-extrabold text-[#071d49]">
            {loading
              ? "—"
              : banners.length}

            <span className="ml-1 text-base font-bold text-gray-400">
              / 6
            </span>
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Published
          </p>

          <p className="mt-2 text-3xl font-extrabold text-green-700">
            {loading
              ? "—"
              : banners.filter(
                  (banner) =>
                    banner.isPublished
                ).length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Available Slots
          </p>

          <p className="mt-2 text-3xl font-extrabold text-[#123b7a]">
            {loading
              ? "—"
              : Math.max(
                  0,
                  6 - banners.length
                )}
          </p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm font-semibold text-red-700">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4">
          <p className="text-sm font-semibold text-green-700">
            {success}
          </p>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
            <div>
              <h3 className="text-lg font-extrabold text-[#071d49]">
                {editingBannerId
                  ? "Edit Banner"
                  : "Add New Banner"}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Banner की information manage करें।
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              disabled={
                saving ||
                uploadingImage
              }
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              aria-label="Form बंद करें"
            >
              <CloseIcon />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-5 sm:p-6"
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Title
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    updateForm(
                      "title",
                      event.target.value
                    )
                  }
                  placeholder="जैसे: शिक्षा के साथ"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Highlight
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  value={
                    form.highlight
                  }
                  onChange={(event) =>
                    updateForm(
                      "highlight",
                      event.target.value
                    )
                  }
                  placeholder="जैसे: संस्कार और अनुशासन"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Description
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <textarea
                value={
                  form.description
                }
                onChange={(event) =>
                  updateForm(
                    "description",
                    event.target.value
                  )
                }
                placeholder="Banner का short description लिखें..."
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
              />
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Banner Image
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#123b7a] shadow-sm">
                    <UploadIcon />
                  </div>

                  <p className="mt-3 text-sm font-bold text-gray-700">
                    Banner Image Upload करें
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    JPG, PNG या WEBP • Maximum 5 MB
                  </p>

                  <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#071d49] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#123b7a]">
                    <UploadIcon />
                    {editingBannerId
                      ? "Replace Image"
                      : "Choose Image"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={
                        handleImageSelect
                      }
                      className="hidden"
                      disabled={
                        saving ||
                        uploadingImage
                      }
                    />
                  </label>
                </div>

                {/* Existing image / new preview */}
                {(imagePreview ||
                  form.image) && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        Image Preview
                      </p>
                    </div>

                    <div className="aspect-[1920/700] w-full bg-gray-100">
                      <img
                        src={
                          imagePreview ||
                          form.image
                        }
                        alt="Banner preview"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-3 border-t border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        {selectedImage ? (
                          <>
                            <p className="text-sm font-bold text-gray-700">
                              {
                                selectedImage.name
                              }
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {(
                                selectedImage.size /
                                (1024 *
                                  1024)
                              ).toFixed(
                                2
                              )}{" "}
                              MB • New image
                            </p>
                          </>
                        ) : (
                          <p className="text-sm font-semibold text-gray-600">
                            Current banner image
                          </p>
                        )}
                      </div>

                      {selectedImage && (
                        <button
                          type="button"
                          onClick={() => {
                            clearImagePreview();
                          }}
                          disabled={
                            saving ||
                            uploadingImage
                          }
                          className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                          Cancel New Image
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {uploadingImage && (
                  <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-700" />

                      <p className="text-sm font-bold text-blue-700">
                        Image upload और compression हो रही है...
                      </p>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-center text-xs text-gray-400">
                  Recommended: 1920 × 700 px
                  • WebP conversion automatic
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Button Text
                  <span className="ml-1 text-xs font-normal text-gray-400">
                    Optional
                  </span>
                </label>

                <input
                  type="text"
                  value={
                    form.buttonText
                  }
                  onChange={(event) =>
                    updateForm(
                      "buttonText",
                      event.target.value
                    )
                  }
                  placeholder="जैसे: अधिक जानकारी"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Button Link
                  <span className="ml-1 text-xs font-normal text-gray-400">
                    Optional
                  </span>
                </label>

                <input
                  type="text"
                  value={
                    form.buttonLink
                  }
                  onChange={(event) =>
                    updateForm(
                      "buttonLink",
                      event.target.value
                    )
                  }
                  placeholder="/about"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                disabled={
                  saving ||
                  uploadingImage
                }
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  saving ||
                  uploadingImage
                }
                className="rounded-xl bg-[#071d49] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#123b7a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploadingImage
                  ? "Uploading..."
                  : saving
                  ? "Saving..."
                  : editingBannerId
                  ? "Update Banner"
                  : "Create Banner"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Banner List */}
      <div className="space-y-4">
        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-500">
              Banners load हो रहे हैं...
            </p>
          </div>
        ) : banners.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#071d49]/5 text-[#123b7a]">
              <BannerIcon />
            </div>

            <h3 className="mt-5 text-lg font-extrabold text-[#071d49]">
              अभी कोई Banner नहीं है
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Homepage के लिए पहला banner create करने के लिए नीचे दिए button का उपयोग करें।
            </p>

            <button
              type="button"
              onClick={
                openCreateForm
              }
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#071d49] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#123b7a]"
            >
              <PlusIcon />
              Create First Banner
            </button>
          </div>
        ) : (
          banners.map(
            (banner, index) => {
              const isFirst =
                index === 0;

              const isLast =
                index ===
                banners.length - 1;

              const busy =
                actionId ===
                banner.id;

              return (
                <div
                  key={banner.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="grid lg:grid-cols-[300px_1fr]">
                    {/* Image */}
                    <div className="min-h-[190px] bg-gray-100">
                      {banner.image ? (
                        <img
                          src={
                            banner.image
                          }
                          alt={
                            banner.title
                          }
                          className="h-full min-h-[190px] w-full object-cover"
                        />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-[#071d49]/5 px-2.5 py-1 text-[11px] font-bold text-[#123b7a]">
                                Banner #
                                {index +
                                  1}
                              </span>

                              <span
                                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                  banner.isPublished
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                                }`}
                              >
                                {banner.isPublished
                                  ? "Published"
                                  : "Unpublished"}
                              </span>
                            </div>

                            <h3 className="mt-3 text-lg font-extrabold text-[#071d49]">
                              {
                                banner.title
                              }
                            </h3>

                            <p className="mt-1 text-sm font-bold text-[#7b1720]">
                              {
                                banner.highlight
                              }
                            </p>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
                              {
                                banner.description
                              }
                            </p>
                          </div>

                          {/* Order */}
                          <div className="shrink-0">
                            <div className="flex items-center gap-1 rounded-xl border border-gray-200 p-1">
                              <button
                                type="button"
                                disabled={
                                  isFirst ||
                                  busy
                                }
                                onClick={() =>
                                  changeOrder(
                                    banner,
                                    "up"
                                  )
                                }
                                className="rounded-lg px-2.5 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                title="Move Up"
                              >
                                ↑
                              </button>

                              <span className="min-w-[44px] text-center text-xs font-extrabold text-[#071d49]">
                                #
                                {index +
                                  1}
                              </span>

                              <button
                                type="button"
                                disabled={
                                  isLast ||
                                  busy
                                }
                                onClick={() =>
                                  changeOrder(
                                    banner,
                                    "down"
                                  )
                                }
                                className="rounded-lg px-2.5 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                title="Move Down"
                              >
                                ↓
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                          <button
                            type="button"
                            disabled={
                              busy
                            }
                            onClick={() =>
                              togglePublish(
                                banner
                              )
                            }
                            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                              banner.isPublished
                                ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                          >
                            {busy
                              ? "Please wait..."
                              : banner.isPublished
                              ? "Unpublish"
                              : "Publish"}
                          </button>

                          <button
                            type="button"
                            disabled={
                              busy
                            }
                            onClick={() =>
                              openEditForm(
                                banner
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                          >
                            <EditIcon />
                            Edit
                          </button>

                          <button
                            type="button"
                            disabled={
                              busy
                            }
                            onClick={() =>
                              deleteBanner(
                                banner
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            <TrashIcon />
                            Delete
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              window.open(
                                banner.image,
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
                          >
                            <EyeIcon />
                            View Image
                          </button>
                        </div>

                        {/* Button information */}
                        {(banner.buttonText ||
                          banner.buttonLink) && (
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                            {banner.buttonText && (
                              <span>
                                Button:{" "}
                                <strong className="text-gray-600">
                                  {
                                    banner.buttonText
                                  }
                                </strong>
                              </span>
                            )}

                            {banner.buttonLink && (
                              <span>
                                Link:{" "}
                                <strong className="text-gray-600">
                                  {
                                    banner.buttonLink
                                  }
                                </strong>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </section>
  );
}