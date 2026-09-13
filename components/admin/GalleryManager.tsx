"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import HindiTyping from "./HindiTyping";

type Category = {
  id: number;
  name: string;
  isActive: boolean;
  sortOrder: number;
  _count?: {
    items: number;
  };
};

type GalleryItem = {
  id: number;
  title: string;
  categoryId: number;
  image: string;
  isPublished: boolean;
  sortOrder: number;
  category: Category;
};

type ItemForm = {
  title: string;
  categoryId: string;
  image: string;
  isPublished: boolean;
  sortOrder: string;
};

type CategoryForm = {
  name: string;
  isActive: boolean;
  sortOrder: string;
};

const emptyItemForm: ItemForm = {
  title: "",
  categoryId: "",
  image: "",
  isPublished: true,
  sortOrder: "0",
};

const emptyCategoryForm: CategoryForm = {
  name: "",
  isActive: true,
  sortOrder: "0",
};

export default function GalleryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<GalleryItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [itemForm, setItemForm] = useState<ItemForm>(emptyItemForm);
  const [categoryForm, setCategoryForm] =
    useState<CategoryForm>(emptyCategoryForm);

  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingCategoryId, setEditingCategoryId] =
    useState<number | null>(null);

  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [categoryFilter, setCategoryFilter] = useState("all");

  const activeCategories = useMemo(
    () => categories.filter((category) => category.isActive),
    [categories]
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (categoryFilter === "all") return true;
      return String(item.categoryId) === categoryFilter;
    });
  }, [items, categoryFilter]);

  async function loadGallery() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/gallery", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Gallery load failed.");
      }

      setCategories(data.categories || []);
      setItems(data.items || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gallery load failed."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGallery();
  }, []);

  function resetItemForm() {
    setItemForm(emptyItemForm);
    setEditingItemId(null);
    setSelectedFile(null);
    setImagePreview("");
  }

  function resetCategoryForm() {
    setCategoryForm(emptyCategoryForm);
    setEditingCategoryId(null);
  }

  function startEditItem(item: GalleryItem) {
    setEditingItemId(item.id);

    setItemForm({
      title: item.title,
      categoryId: String(item.categoryId),
      image: item.image,
      isPublished: item.isPublished,
      sortOrder: String(item.sortOrder),
    });

    setSelectedFile(null);
    setImagePreview(item.image);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function startEditCategory(category: Category) {
    setEditingCategoryId(category.id);

    setCategoryForm({
      name: category.name,
      isActive: category.isActive,
      sortOrder: String(category.sortOrder),
    });
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPG, PNG and WEBP photos are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Maximum photo size is 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  async function uploadImage(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "/api/admin/gallery/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error || "Photo upload failed."
      );
    }

    return data.image as string;
  }

  async function saveItem(event: FormEvent) {
    event.preventDefault();

    if (!itemForm.title.trim()) {
      setError("Photo title is required.");
      return;
    }

    if (!itemForm.categoryId) {
      setError("Please select a category.");
      return;
    }

    if (!editingItemId && !selectedFile) {
      setError("Please select a photo.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      let image = itemForm.image;

      if (selectedFile) {
        setUploading(true);
        image = await uploadImage(selectedFile);
        setUploading(false);
      }

      const payload = {
        action: editingItemId
          ? "update-item"
          : "create-item",
        ...(editingItemId
          ? { id: editingItemId }
          : {}),
        title: itemForm.title.trim(),
        categoryId: Number(itemForm.categoryId),
        image,
        isPublished: itemForm.isPublished,
        sortOrder: Number(itemForm.sortOrder) || 0,
      };

      const response = await fetch(
        "/api/admin/gallery",
        {
          method: editingItemId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Gallery save failed."
        );
      }

      setMessage(
        editingItemId
          ? "Photo updated successfully."
          : "Photo added successfully."
      );

      resetItemForm();
      await loadGallery();
    } catch (err) {
      setUploading(false);

      setError(
        err instanceof Error
          ? err.message
          : "Gallery save failed."
      );
    } finally {
      setSaving(false);
    }
  }

  async function saveCategory(event: FormEvent) {
    event.preventDefault();

    if (!categoryForm.name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        action: editingCategoryId
          ? "update-category"
          : "create-category",
        ...(editingCategoryId
          ? { id: editingCategoryId }
          : {}),
        name: categoryForm.name.trim(),
        isActive: categoryForm.isActive,
        sortOrder: Number(categoryForm.sortOrder) || 0,
      };

      const response = await fetch(
        "/api/admin/gallery",
        {
          method: editingCategoryId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Category save failed."
        );
      }

      setMessage(
        editingCategoryId
          ? "Category updated successfully."
          : "Category created successfully."
      );

      resetCategoryForm();
      await loadGallery();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Category save failed."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleItem(item: GalleryItem) {
    try {
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/admin/gallery",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "toggle-item",
            id: item.id,
            isPublished: !item.isPublished,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Status update failed."
        );
      }

      setMessage(
        item.isPublished
          ? "Photo unpublished."
          : "Photo published."
      );

      await loadGallery();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Status update failed."
      );
    }
  }

  async function toggleCategory(category: Category) {
    try {
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/admin/gallery",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "toggle-category",
            id: category.id,
            isActive: !category.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Category status update failed."
        );
      }

      setMessage(
        category.isActive
          ? "Category disabled."
          : "Category enabled."
      );

      await loadGallery();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Category status update failed."
      );
    }
  }

  async function deleteItem(item: GalleryItem) {
    const confirmed = window.confirm(
      `क्या आप "${item.title}" फोटो को delete करना चाहते हैं?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/admin/gallery",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "item",
            id: item.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Photo delete failed."
        );
      }

      setMessage("Photo deleted successfully.");

      if (editingItemId === item.id) {
        resetItemForm();
      }

      await loadGallery();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Photo delete failed."
      );
    }
  }

  async function deleteCategory(category: Category) {
    const confirmed = window.confirm(
      `क्या आप "${category.name}" category को delete करना चाहते हैं?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/admin/gallery",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "category",
            id: category.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Category delete failed."
        );
      }

      setMessage("Category deleted successfully.");

      if (editingCategoryId === category.id) {
        resetCategoryForm();
      }

      await loadGallery();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Category delete failed."
      );
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#071d49]">
          Gallery Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          विद्यालय की photos और gallery categories manage करें।
        </p>
      </div>

      {message && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* CATEGORY FORM */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-[#071d49]">
              {editingCategoryId
                ? "Edit Category"
                : "Add Gallery Category"}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Categories gallery photos को organize करने के लिए हैं।
            </p>
          </div>

          {editingCategoryId && (
            <button
              type="button"
              onClick={resetCategoryForm}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>

        <form
          onSubmit={saveCategory}
          className="grid gap-4 md:grid-cols-[1fr_150px_150px_auto]"
        >
          <input
            value={categoryForm.name}
            onChange={(event) =>
              setCategoryForm((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            placeholder="Category name"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#071d49]"
          />

          <input
            type="number"
            value={categoryForm.sortOrder}
            onChange={(event) =>
              setCategoryForm((current) => ({
                ...current,
                sortOrder: event.target.value,
              }))
            }
            placeholder="Order"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#071d49]"
          />

          <label className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={categoryForm.isActive}
              onChange={(event) =>
                setCategoryForm((current) => ({
                  ...current,
                  isActive: event.target.checked,
                }))
              }
            />
            Active
          </label>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#071d49] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#123b7a] disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : editingCategoryId
              ? "Update"
              : "Add Category"}
          </button>
        </form>
      </section>

      {/* CATEGORIES */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4">
          <h2 className="text-lg font-black text-[#071d49]">
            Categories
          </h2>
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">
            अभी कोई category नहीं है।
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-xl border border-gray-100 bg-[#f5f7fa] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[#071d49]">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {category._count?.items ?? 0} photos · Order{" "}
                      {category.sortOrder}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                      category.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {category.isActive
                      ? "ACTIVE"
                      : "INACTIVE"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      startEditCategory(category)
                    }
                    className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#071d49] ring-1 ring-gray-200 hover:bg-gray-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      toggleCategory(category)
                    }
                    className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
                  >
                    {category.isActive
                      ? "Disable"
                      : "Enable"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteCategory(category)
                    }
                    className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PHOTO FORM */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-[#071d49]">
              {editingItemId
                ? "Edit Gallery Photo"
                : "Add Gallery Photo"}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Photo select करें। System automatically WebP में
              compress करेगा।
            </p>
          </div>

          {editingItemId && (
            <button
              type="button"
              onClick={resetItemForm}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>

        <form
          onSubmit={saveItem}
          className="grid gap-6 lg:grid-cols-[260px_1fr]"
        >
          {/* PHOTO */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-[#f5f7fa] ring-1 ring-gray-200">
              <div className="aspect-[4/3]">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Gallery preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
                    <div className="text-4xl">📷</div>
                    <p className="mt-2 text-xs font-semibold">
                      Photo Preview
                    </p>
                  </div>
                )}
              </div>
            </div>

            <label className="mt-3 block cursor-pointer rounded-xl bg-[#071d49] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#123b7a]">
              {selectedFile
                ? "Change Photo"
                : editingItemId
                ? "Change Photo"
                : "Select Photo"}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <p className="mt-2 text-center text-[11px] text-gray-400">
              JPG / PNG / WEBP · Max 5 MB
            </p>
          </div>

          {/* DETAILS */}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-gray-700">
                Photo Title
              </label>

            <HindiTyping
                label="Photo Title"
                value={itemForm.title}
                onChange={(value) =>
                    setItemForm((prev) => ({
                    ...prev,
                    title: value,
                    }))
                }
                placeholder="Photo ka title English mein type karein..."
/>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">
                  Category
                </label>

                <select
                  value={itemForm.categoryId}
                  onChange={(event) =>
                    setItemForm((current) => ({
                      ...current,
                      categoryId: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#071d49]"
                >
                  <option value="">
                    Select category
                  </option>

                  {activeCategories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">
                  Display Order
                </label>

                <input
                  type="number"
                  value={itemForm.sortOrder}
                  onChange={(event) =>
                    setItemForm((current) => ({
                      ...current,
                      sortOrder: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#071d49]"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
              <input
                type="checkbox"
                checked={itemForm.isPublished}
                onChange={(event) =>
                  setItemForm((current) => ({
                    ...current,
                    isPublished: event.target.checked,
                  }))
                }
              />

              <span className="text-sm font-semibold text-gray-700">
                Publish this photo on website
              </span>
            </label>

            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full rounded-xl bg-[#7b1720] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#64131a] disabled:opacity-50"
            >
              {uploading
                ? "Uploading & Compressing..."
                : saving
                ? "Saving..."
                : editingItemId
                ? "Update Photo"
                : "Add Photo"}
            </button>
          </div>
        </form>
      </section>

      {/* PHOTO LIST */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-black text-[#071d49]">
              Gallery Photos
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {items.length} total photos
            </p>
          </div>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold outline-none"
          >
            <option value="all">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-500">
            Loading gallery...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-[#f5f7fa] py-12 text-center">
            <div className="text-4xl">📷</div>

            <p className="mt-3 text-sm font-semibold text-gray-500">
              अभी कोई photo नहीं है।
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />

                  <span
                    className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      item.isPublished
                        ? "bg-green-500 text-white"
                        : "bg-gray-800/80 text-white"
                    }`}
                  >
                    {item.isPublished
                      ? "PUBLISHED"
                      : "HIDDEN"}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7b1720]">
                    {item.category.name}
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-sm font-bold text-[#071d49]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[11px] text-gray-400">
                    Order: {item.sortOrder}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        startEditItem(item)
                      }
                      className="rounded-lg bg-[#f5f7fa] px-3 py-2 text-xs font-bold text-[#071d49] hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleItem(item)
                      }
                      className="rounded-lg bg-[#f5f7fa] px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
                    >
                      {item.isPublished
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteItem(item)
                      }
                      className="col-span-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                    >
                      Delete Photo
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}