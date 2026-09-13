"use client";

import HindiTyping from "@/components/admin/HindiTyping";
import Sanscript from "@indic-transliteration/sanscript";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

type NewsType = "NOTICE" | "EVENT";

type Category = {
  id: number;
  name: string;
  isActive: boolean;
  sortOrder: number;
};

type NewsItem = {
  id: number;
  type: NewsType;
  title: string;
  date: string;
  categoryId: number;
  excerpt: string;
  content: string;
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
  category: Category;
};

type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
};

type NewsApiData = {
  news: NewsItem[];
  categories: Category[];
};

type NewsForm = {
  type: NewsType;
  title: string;
  date: string;
  categoryId: string;
  excerpt: string;
  content: string;
  isPublished: boolean;
  isFeatured: boolean;
};

const emptyForm: NewsForm = {
  type: "NOTICE",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  categoryId: "",
  excerpt: "",
  content: "",
  isPublished: true,
  isFeatured: false,
};

/* =========================================================
   SEARCH / TRANSLITERATION HELPERS
========================================================= */

const searchAliases: Record<string, string[]> = {
  pravesh: [
    "प्रवेश",
    "admission",
    "admissions",
  ],

  admission: [
    "प्रवेश",
    "pravesh",
  ],

  vidyalaya: [
    "विद्यालय",
    "school",
  ],

  school: [
    "विद्यालय",
    "vidyalaya",
  ],

  shiksha: [
    "शिक्षा",
    "education",
  ],

  education: [
    "शिक्षा",
    "shiksha",
  ],

  khel: [
    "खेल",
    "sports",
  ],

  sports: [
    "खेल",
    "khel",
  ],

  sanskritik: [
    "सांस्कृतिक",
    "cultural",
  ],

  cultural: [
    "सांस्कृतिक",
    "sanskritik",
  ],

  suchna: [
    "सूचना",
    "notice",
  ],

  notice: [
    "सूचना",
    "suchna",
  ],

  programme: [
    "कार्यक्रम",
    "program",
    "event",
  ],

  program: [
    "कार्यक्रम",
    "programme",
    "event",
  ],

  event: [
    "कार्यक्रम",
    "program",
  ],

  important: [
    "महत्वपूर्ण",
  ],

  mahatvapurn: [
    "महत्वपूर्ण",
    "important",
  ],

  abhibhavak: [
    "अभिभावक",
    "parent",
    "parents",
  ],

  parent: [
    "अभिभावक",
    "parents",
  ],

  parents: [
    "अभिभावक",
    "parent",
  ],
};

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("hi-IN")
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ");
}

function getSearchTerms(query: string) {
  const normalized = normalizeSearchText(query);

  if (!normalized) {
    return [];
  }

  const terms = new Set<string>();

  // Original query
  terms.add(normalized);

  /*
   * English / Roman Hindi
   * Example:
   * pravesh -> प्रवेश
   * suchna -> सूचना
   * vidyalaya -> विद्यालय
   */
  if (/[a-zA-Z]/.test(normalized)) {
    try {
      const devanagari = Sanscript.t(
        normalized,
        "itrans",
        "devanagari"
      );

      if (devanagari) {
        terms.add(
          normalizeSearchText(
            devanagari
          )
        );
      }
    } catch (error) {
      console.warn(
        "Roman to Hindi conversion failed:",
        error
      );
    }
  }

  /*
   * Hindi query
   * Example:
   * प्रवेश -> pravesh
   */
  if (/[\u0900-\u097F]/.test(normalized)) {
    try {
      const roman = Sanscript.t(
        normalized,
        "devanagari",
        "itrans"
      );

      if (roman) {
        terms.add(
          normalizeSearchText(roman)
        );
      }
    } catch (error) {
      console.warn(
        "Hindi to Roman conversion failed:",
        error
      );
    }
  }

  /*
   * Existing common search aliases
   */
  const aliases =
    searchAliases[normalized];

  if (aliases) {
    aliases.forEach((alias) => {
      terms.add(
        normalizeSearchText(alias)
      );
    });
  }

  /*
   * Also process individual words.
   */
  normalized
    .split(/\s+/)
    .filter(Boolean)
    .forEach((word) => {
      terms.add(word);

      if (/[a-zA-Z]/.test(word)) {
        try {
          const devanagari =
            Sanscript.t(
              word,
              "itrans",
              "devanagari"
            );

          if (devanagari) {
            terms.add(
              normalizeSearchText(
                devanagari
              )
            );
          }
        } catch {}
      }

      if (
        /[\u0900-\u097F]/.test(
          word
        )
      ) {
        try {
          const roman =
            Sanscript.t(
              word,
              "devanagari",
              "itrans"
            );

          if (roman) {
            terms.add(
              normalizeSearchText(
                roman
              )
            );
          }
        } catch {}
      }

      const wordAliases =
        searchAliases[word];

      if (wordAliases) {
        wordAliases.forEach(
          (alias) => {
            terms.add(
              normalizeSearchText(
                alias
              )
            );
          }
        );
      }
    });

  return Array.from(terms).filter(
    Boolean
  );
}

function matchesSearch(
  text: string,
  terms: string[]
) {
  if (!terms.length) {
    return true;
  }

  const normalizedText =
    normalizeSearchText(text);

  /*
   * Direct match
   */
  if (
    terms.some((term) =>
      normalizedText.includes(term)
    )
  ) {
    return true;
  }

  /*
   * Also create Roman/Hindi forms
   * of the stored text itself.
   */
  try {
    if (
      /[\u0900-\u097F]/.test(
        normalizedText
      )
    ) {
      const romanText =
        normalizeSearchText(
          Sanscript.t(
            normalizedText,
            "devanagari",
            "itrans"
          )
        );

      if (
        terms.some((term) =>
          romanText.includes(term)
        )
      ) {
        return true;
      }
    }
  } catch {}

  return false;
}

function getTypeSearchText(
  type: NewsType
) {
  if (type === "NOTICE") {
    return [
      "NOTICE",
      "सूचना",
      "notice",
      "suchna",
    ];
  }

  return [
    "EVENT",
    "कार्यक्रम",
    "event",
    "program",
    "programme",
  ];
}

function getCategorySearchText(
  category: Category
) {
  return [
    category.name,
    ...getSearchTerms(category.name),
  ];
}

/* =========================================================
   ICONS
========================================================= */

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
      <path d="M5 4h14a1 1 0 0 1 1 1v14H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M7 8h9M7 12h9M7 16h5" />
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

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

/* =========================================================
   FORMATTING
========================================================= */

function formatDate(date: string) {
  return new Intl.DateTimeFormat(
    "hi-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(new Date(date));
}

function getTypeLabel(type: NewsType) {
  return type === "NOTICE"
    ? "सूचना"
    : "कार्यक्रम";
}

/* =========================================================
   COMPONENT
========================================================= */

export default function NewsManager() {
  const [news, setNews] = useState<
    NewsItem[]
  >([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [actionId, setActionId] =
    useState<number | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  const [
    showCategoryForm,
    setShowCategoryForm,
  ] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [
    editingCategoryId,
    setEditingCategoryId,
  ] = useState<number | null>(null);

  const [categoryName, setCategoryName] =
    useState("");

  const [form, setForm] =
    useState<NewsForm>(emptyForm);

  /* =====================================================
     SEARCH STATE
  ===================================================== */

  const [search, setSearch] =
    useState("");

  const [categorySearch, setCategorySearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState<"ALL" | NewsType>("ALL");

  const [categoryFilter, setCategoryFilter] =
    useState("ALL");

  /* =====================================================
     LOAD NEWS
  ===================================================== */

  async function loadNews() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "/api/admin/news",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result: ApiResponse<NewsApiData> =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "News fetch करने में समस्या हुई।"
        );
      }

      setNews(
        result.data?.news ?? []
      );

      setCategories(
        result.data?.categories ?? []
      );
    } catch (error) {
      console.error(
        "News load error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "News fetch करने में समस्या हुई।"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  /* =====================================================
     FILTERED NEWS
  ===================================================== */

  const filteredNews = useMemo(() => {
    const searchTerms =
      getSearchTerms(search);

    return news.filter((item) => {
      /*
       * Search:
       * Title
       * Excerpt
       * Full content
       * Category
       * Type
       */

      const searchableText = [
        item.title,
        item.excerpt,
        item.content,
        ...getCategorySearchText(
          item.category
        ),
        ...getTypeSearchText(
          item.type
        ),
      ].join(" ");

      const matchesSearchQuery =
        searchTerms.length === 0 ||
        matchesSearch(
            searchableText,
            searchTerms
        );

      const matchesType =
        typeFilter === "ALL" ||
        item.type === typeFilter;

      const matchesCategory =
        categoryFilter === "ALL" ||
        String(item.categoryId) ===
          categoryFilter;

      return (
        matchesSearchQuery &&
        matchesType &&
        matchesCategory
        );
    });
  }, [
    news,
    search,
    typeFilter,
    categoryFilter,
  ]);

  /* =====================================================
     SEARCHABLE CATEGORIES
  ===================================================== */

  const filteredCategories =
    useMemo(() => {
      const terms =
        getSearchTerms(
          categorySearch
        );

      if (terms.length === 0) {
        return categories;
      }

      return categories.filter(
        (category) =>
          matchesSearch(
            getCategorySearchText(
              category
            ).join(" "),
            terms
          )
      );
    }, [
      categories,
      categorySearch,
    ]);

  /* =====================================================
     ACTIVE CATEGORIES
  ===================================================== */

  const activeCategories =
    categories.filter(
      (category) =>
        category.isActive
    );

  /* =====================================================
     FORM HELPERS
  ===================================================== */

  function updateForm(
    field: keyof NewsForm,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    const firstActiveCategory =
      categories.find(
        (category) =>
          category.isActive
      );

    setForm({
      ...emptyForm,
      categoryId:
        firstActiveCategory
          ? String(
              firstActiveCategory.id
            )
          : "",
    });

    setEditingId(null);
  }

  function openCreateForm() {
    setError(null);
    setSuccess(null);
    resetForm();
    setShowForm(true);
  }

  function openEditForm(
    item: NewsItem
  ) {
    setError(null);
    setSuccess(null);

    setEditingId(item.id);

    setForm({
      type: item.type,
      title: item.title,
      date: new Date(item.date)
        .toISOString()
        .slice(0, 10),
      categoryId: String(
        item.categoryId
      ),
      excerpt: item.excerpt,
      content: item.content,
      isPublished:
        item.isPublished,
      isFeatured:
        item.isFeatured,
    });

    setShowForm(true);
  }

  function closeForm() {
    if (saving) {
      return;
    }

    setShowForm(false);
    resetForm();
  }

  /* =====================================================
     SUBMIT NEWS
  ===================================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.categoryId) {
      setError(
        "कृपया category select करें।"
      );
      return;
    }

    if (!form.title.trim()) {
      setError(
        "कृपया news title भरें।"
      );
      return;
    }

    if (!form.excerpt.trim()) {
      setError(
        "कृपया short description भरें।"
      );
      return;
    }

    if (!form.content.trim()) {
      setError(
        "कृपया full content भरें।"
      );
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const payload = {
        type: form.type,
        title: form.title.trim(),
        date: form.date,
        categoryId: Number(
          form.categoryId
        ),
        excerpt:
          form.excerpt.trim(),
        content:
          form.content.trim(),
        isPublished:
          form.isPublished,
        isFeatured:
          form.isFeatured,
      };

      const response = await fetch(
        "/api/admin/news",
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

      const result: ApiResponse<NewsItem> =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "News save करने में समस्या हुई।"
        );
      }

      setSuccess(
        result.message ||
          (editingId
            ? "News update हो गया।"
            : "News create हो गया।")
      );

      setShowForm(false);
      resetForm();

      await loadNews();
    } catch (error) {
      console.error(
        "News save error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "News save करने में समस्या हुई।"
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     PUBLISH
  ===================================================== */

  async function togglePublished(
    item: NewsItem
  ) {
    try {
      setActionId(item.id);
      setError(null);
      setSuccess(null);

      const response = await fetch(
        "/api/admin/news",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: item.id,
            isPublished:
              !item.isPublished,
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
            "Publish status update नहीं हुआ।"
        );
      }

      setSuccess(
        item.isPublished
          ? "News unpublish हो गई।"
          : "News publish हो गई।"
      );

      await loadNews();
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

  /* =====================================================
     FEATURED
  ===================================================== */

  async function toggleFeatured(
    item: NewsItem
  ) {
    try {
      setActionId(item.id);
      setError(null);
      setSuccess(null);

      const response = await fetch(
        "/api/admin/news",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: item.id,
            isFeatured:
              !item.isFeatured,
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
            "Featured status update नहीं हुआ।"
        );
      }

      setSuccess(
        item.isFeatured
          ? "Featured status हट गया।"
          : "News अब featured है।"
      );

      await loadNews();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Featured status update नहीं हुआ।"
      );
    } finally {
      setActionId(null);
    }
  }

  /* =====================================================
     DELETE NEWS
  ===================================================== */

  async function deleteNews(
    item: NewsItem
  ) {
    const confirmed =
      window.confirm(
        `क्या आप "${item.title}" को permanently delete करना चाहते हैं?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(item.id);
      setError(null);
      setSuccess(null);

      const response = await fetch(
        "/api/admin/news",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: item.id,
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
            "News delete नहीं हुई।"
        );
      }

      setSuccess(
        "News successfully delete हो गई।"
      );

      await loadNews();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "News delete नहीं हुई।"
      );
    } finally {
      setActionId(null);
    }
  }

  /* =====================================================
     SAVE CATEGORY
  ===================================================== */

  async function saveCategory(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const name =
      categoryName.trim();

    if (!name) {
      setError(
        "Category name आवश्यक है।"
      );
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      let response: Response;

      if (editingCategoryId) {
        response = await fetch(
          "/api/admin/news",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              action:
                "update-category",
              id: editingCategoryId,
              name,
            }),
          }
        );
      } else {
        response = await fetch(
          "/api/admin/news",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              action:
                "create-category",
              name,
            }),
          }
        );
      }

      const result: ApiResponse =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Category save नहीं हुई।"
        );
      }

      setSuccess(
        result.message ||
          "Category successfully save हो गई।"
      );

      setCategoryName("");
      setEditingCategoryId(null);
      setShowCategoryForm(false);

      await loadNews();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Category save नहीं हुई।"
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     TOGGLE CATEGORY
  ===================================================== */

  async function toggleCategory(
    category: Category
  ) {
    try {
      setActionId(category.id);
      setError(null);
      setSuccess(null);

      const response = await fetch(
        "/api/admin/news",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            action:
              "update-category",
            id: category.id,
            isActive:
              !category.isActive,
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
            "Category status update नहीं हुआ।"
        );
      }

      setSuccess(
        category.isActive
          ? "Category inactive हो गई।"
          : "Category active हो गई।"
      );

      await loadNews();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Category status update नहीं हुआ।"
      );
    } finally {
      setActionId(null);
    }
  }

  /* =====================================================
     DELETE CATEGORY
  ===================================================== */

  async function deleteCategory(
    category: Category
  ) {
    const confirmed =
      window.confirm(
        `"${category.name}" category delete करनी है?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(category.id);
      setError(null);
      setSuccess(null);

      const response = await fetch(
        "/api/admin/news",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            action:
              "delete-category",
            id: category.id,
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
            "Category delete नहीं हुई।"
        );
      }

      setSuccess(
        "Category successfully delete हो गई।"
      );

      await loadNews();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Category delete नहीं हुई।"
      );
    } finally {
      setActionId(null);
    }
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#071d49]/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#123b7a]">
            <NewsIcon />
            Website Content
          </span>

          <h2 className="mt-3 text-2xl font-extrabold text-[#071d49] sm:text-3xl">
            News & Notices
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            विद्यालय की सभी सूचनाएँ, कार्यक्रम और
            announcements यहाँ से manage करें।
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setError(null);
              setSuccess(null);
              setCategorySearch("");
              setShowCategoryForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#071d49]/15 bg-white px-4 py-3 text-sm font-bold text-[#071d49] shadow-sm transition hover:bg-[#071d49]/5"
          >
            Category Manage
          </button>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#071d49] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#123b7a]"
          >
            <PlusIcon />
            Add News / Notice
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-700">
            {success}
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Total
          </p>

          <p className="mt-2 text-3xl font-extrabold text-[#071d49]">
            {loading ? "—" : news.length}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Total News
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Published
          </p>

          <p className="mt-2 text-3xl font-extrabold text-green-700">
            {loading
              ? "—"
              : news.filter(
                  (item) =>
                    item.isPublished
                ).length}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Live on website
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Featured
          </p>

          <p className="mt-2 text-3xl font-extrabold text-[#8b6d00]">
            {loading
              ? "—"
              : news.filter(
                  (item) =>
                    item.isFeatured
                ).length}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Highlighted news
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Categories
          </p>

          <p className="mt-2 text-3xl font-extrabold text-[#123b7a]">
            {loading
              ? "—"
              : activeCategories.length}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Active categories
          </p>
        </div>
      </div>

      {/* =====================================================
          SEARCH & FILTERS
      ===================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          {/* Main Search */}
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search news — हिंदी या English..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#123b7a] focus:bg-white focus:ring-2 focus:ring-[#123b7a]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value as
                  | "ALL"
                  | NewsType
              )
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-[#071d49] outline-none focus:border-[#123b7a]"
          >
            <option value="ALL">
              सभी प्रकार
            </option>

            <option value="NOTICE">
              सूचना
            </option>

            <option value="EVENT">
              कार्यक्रम
            </option>
          </select>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-[#071d49] outline-none focus:border-[#123b7a]"
          >
            <option value="ALL">
              सभी categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category.id}
                  value={String(
                    category.id
                  )}
                >
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* Search Help */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
          <span>
            🔍 Hindi/English दोनों में search करें
          </span>

          <span>
            उदाहरण:{" "}
            <b className="text-gray-500">
              प्रवेश
            </b>{" "}
            या{" "}
            <b className="text-gray-500">
              pravesh
            </b>
          </span>

          <span>
            • Title, description, content और category में search
          </span>
        </div>
      </div>

      {/* =====================================================
          NEWS LIST
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-extrabold text-[#071d49]">
                News List
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {filteredNews.length} result(s)
              </p>
            </div>

            {(search ||
              typeFilter !== "ALL" ||
              categoryFilter !==
                "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setTypeFilter(
                    "ALL"
                  );
                  setCategoryFilter(
                    "ALL"
                  );
                }}
                className="w-fit rounded-lg bg-[#071d49]/5 px-3 py-2 text-xs font-bold text-[#071d49] hover:bg-[#071d49]/10"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#071d49]/20 border-t-[#071d49]" />

            <p className="mt-4 text-sm text-gray-500">
              News loading...
            </p>
          </div>
        ) : filteredNews.length ===
          0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#071d49]/5 text-[#123b7a]">
              <NewsIcon />
            </div>

            <h3 className="mt-4 font-bold text-[#071d49]">
              कोई News नहीं मिली
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Hindi या English keyword से search करें,
              या filters बदलें।
            </p>

            {search && (
              <p className="mt-3 text-xs text-gray-400">
                Search:{" "}
                <span className="font-bold text-gray-600">
                  {search}
                </span>
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNews.map(
              (item) => (
                <article
                  key={item.id}
                  className="p-5 transition hover:bg-gray-50/70"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            item.type ===
                            "NOTICE"
                              ? "bg-[#071d49]/10 text-[#071d49]"
                              : "bg-[#f4c400]/20 text-[#7b1720]"
                          }`}
                        >
                          {getTypeLabel(
                            item.type
                          )}
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                          {item.category
                            ?.name ??
                            "—"}
                        </span>

                        {item.isFeatured && (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                            ★ Featured
                          </span>
                        )}

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            item.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.isPublished
                            ? "Published"
                            : "Unpublished"}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-extrabold leading-7 text-[#071d49]">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                        {item.excerpt}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-400">
                        <span>
                          📅{" "}
                          {formatDate(
                            item.date
                          )}
                        </span>

                        <span>
                          Order:{" "}
                          {item.sortOrder +
                            1}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 xl:justify-end">
                      <button
                        type="button"
                        disabled={
                          actionId ===
                          item.id
                        }
                        onClick={() =>
                          togglePublished(
                            item
                          )
                        }
                        className={`rounded-xl px-4 py-2.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          item.isPublished
                            ? "bg-red-50 text-red-700 hover:bg-red-100"
                            : "bg-green-50 text-green-700 hover:bg-green-100"
                        }`}
                      >
                        {item.isPublished
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        disabled={
                          actionId ===
                          item.id
                        }
                        onClick={() =>
                          toggleFeatured(
                            item
                          )
                        }
                        className="rounded-xl bg-yellow-50 px-4 py-2.5 text-xs font-bold text-yellow-800 transition hover:bg-yellow-100 disabled:opacity-50"
                      >
                        {item.isFeatured
                          ? "Remove Featured"
                          : "Make Featured"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(
                            item
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-[#071d49]/5 px-4 py-2.5 text-xs font-bold text-[#071d49] transition hover:bg-[#071d49]/10"
                      >
                        <EditIcon />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={
                          actionId ===
                          item.id
                        }
                        onClick={() =>
                          deleteNews(
                            item
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        <TrashIcon />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          NEWS FORM MODAL
      ===================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h3 className="font-extrabold text-[#071d49]">
                  {editingId
                    ? "Edit News / Notice"
                    : "Add News / Notice"}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Website पर दिखाई देने वाली जानकारी भरें।
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <CloseIcon />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                {/* Type */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#071d49]">
                    Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(event) =>
                      updateForm(
                        "type",
                        event.target
                          .value as NewsType
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                  >
                    <option value="NOTICE">
                      सूचना
                    </option>

                    <option value="EVENT">
                      कार्यक्रम
                    </option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#071d49]">
                    Date
                  </label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      updateForm(
                        "date",
                        event.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#071d49]">
                    Category
                  </label>

                  <select
                    value={
                      form.categoryId
                    }
                    onChange={(event) =>
                      updateForm(
                        "categoryId",
                        event.target.value
                      )
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#123b7a] focus:ring-2 focus:ring-[#123b7a]/10"
                  >
                    <option value="">
                      Category select करें
                    </option>

                    {activeCategories.map(
                      (category) => (
                        <option
                          key={
                            category.id
                          }
                          value={String(
                            category.id
                          )}
                        >
                          {category.name}
                        </option>
                      )
                    )}
                  </select>

                  <p className="mt-1 text-[11px] text-gray-400">
                    Category Manage से categories add/edit कर सकते हैं।
                  </p>
                </div>

                {/* Title */}
                <div className="md:col-span-2">
                  <HindiTyping
                    label="समाचार शीर्षक"
                    value={form.title}
                    onChange={(value) =>
                      updateForm(
                        "title",
                        value
                      )
                    }
                    placeholder="समाचार का शीर्षक लिखें"
                  />
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2">
                  <HindiTyping
                    label="संक्षिप्त विवरण"
                    value={form.excerpt}
                    onChange={(value) =>
                      updateForm(
                        "excerpt",
                        value
                      )
                    }
                    placeholder="समाचार का संक्षिप्त विवरण..."
                    multiline
                    rows={4}
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <HindiTyping
                    label="पूरी जानकारी"
                    value={form.content}
                    onChange={(value) =>
                      updateForm(
                        "content",
                        value
                      )
                    }
                    placeholder="समाचार की पूरी जानकारी..."
                    multiline
                    rows={10}
                  />
                </div>

                {/* Options */}
                <div className="md:col-span-2">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <input
                        type="checkbox"
                        checked={
                          form.isPublished
                        }
                        onChange={(event) =>
                          updateForm(
                            "isPublished",
                            event.target.checked
                          )
                        }
                        className="h-4 w-4"
                      />

                      <span>
                        <span className="block text-sm font-bold text-[#071d49]">
                          Publish on website
                        </span>

                        <span className="block text-xs text-gray-500">
                          Public website पर दिखाएँ
                        </span>
                      </span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <input
                        type="checkbox"
                        checked={
                          form.isFeatured
                        }
                        onChange={(event) =>
                          updateForm(
                            "isFeatured",
                            event.target.checked
                          )
                        }
                        className="h-4 w-4"
                      />

                      <span>
                        <span className="block text-sm font-bold text-[#071d49]">
                          Featured News
                        </span>

                        <span className="block text-xs text-gray-500">
                          इसे प्रमुख सूचना बनाएं
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#071d49] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#123b7a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update News"
                      : "Create News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          CATEGORY MODAL
      ===================================================== */}

      {showCategoryForm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h3 className="font-extrabold text-[#071d49]">
                  News Categories
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Categories को add, rename और activate/deactivate करें।
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCategoryForm(
                    false
                  );

                  setEditingCategoryId(
                    null
                  );

                  setCategoryName("");
                  setCategorySearch("");
                }}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto p-5">
              {/* Add / Edit Category */}
              <form
                onSubmit={saveCategory}
                className="space-y-3"
              >
                <HindiTyping
                  label={
                    editingCategoryId
                      ? "Category Edit करें"
                      : "नई Category"
                  }
                  value={categoryName}
                  onChange={(value) =>
                    setCategoryName(
                      value
                    )
                  }
                  placeholder="Category name..."
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-[#071d49] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
                  >
                    {editingCategoryId
                      ? "Update Category"
                      : "Add Category"}
                  </button>

                  {editingCategoryId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategoryId(
                          null
                        );
                        setCategoryName(
                          ""
                        );
                      }}
                      className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {/* Category Search */}
              <div className="relative mt-6">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>

                <input
                  type="search"
                  value={
                    categorySearch
                  }
                  onChange={(event) =>
                    setCategorySearch(
                      event.target.value
                    )
                  }
                  placeholder="Category खोजें — हिंदी या English..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#123b7a] focus:bg-white focus:ring-2 focus:ring-[#123b7a]/10"
                />

                {categorySearch && (
                  <button
                    type="button"
                    onClick={() =>
                      setCategorySearch(
                        ""
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category List */}
              <div className="mt-5 space-y-2">
                {filteredCategories
                  .length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
                    <p className="font-bold text-[#071d49]">
                      कोई category नहीं मिली
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Hindi या English keyword से search करें।
                    </p>
                  </div>
                ) : (
                  filteredCategories.map(
                    (category) => (
                      <div
                        key={
                          category.id
                        }
                        className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-bold text-[#071d49]">
                            {category.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Order:{" "}
                            {category.sortOrder +
                              1}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              category.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {category.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingCategoryId(
                                category.id
                              );

                              setCategoryName(
                                category.name
                              );
                            }}
                            className="rounded-lg bg-[#071d49]/5 px-3 py-2 text-xs font-bold text-[#071d49]"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            disabled={
                              actionId ===
                              category.id
                            }
                            onClick={() =>
                              toggleCategory(
                                category
                              )
                            }
                            className="rounded-lg bg-yellow-50 px-3 py-2 text-xs font-bold text-yellow-800 disabled:opacity-50"
                          >
                            {category.isActive
                              ? "Deactivate"
                              : "Activate"}
                          </button>

                          <button
                            type="button"
                            disabled={
                              actionId ===
                              category.id
                            }
                            onClick={() =>
                              deleteCategory(
                                category
                              )
                            }
                            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 disabled:opacity-50"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}