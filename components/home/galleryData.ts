export type GalleryCategory =
  | "विद्यालय परिसर"
  | "शैक्षणिक गतिविधियाँ"
  | "सांस्कृतिक कार्यक्रम"
  | "खेलकूद"
  | "वार्षिक समारोह"
  | "अन्य कार्यक्रम";

export type GalleryItem = {
  id: number;
  title: string;
  category: GalleryCategory;
  image: string;
  isPublished: boolean;
  sortOrder: number;
};

export const galleryCategories: GalleryCategory[] = [
  "विद्यालय परिसर",
  "शैक्षणिक गतिविधियाँ",
  "सांस्कृतिक कार्यक्रम",
  "खेलकूद",
  "वार्षिक समारोह",
  "अन्य कार्यक्रम",
];

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "विद्यालय परिसर",
    category: "विद्यालय परिसर",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80",
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: 2,
    title: "शैक्षणिक गतिविधियाँ",
    category: "शैक्षणिक गतिविधियाँ",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: 3,
    title: "सांस्कृतिक कार्यक्रम",
    category: "सांस्कृतिक कार्यक्रम",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    isPublished: true,
    sortOrder: 3,
  },
  {
    id: 4,
    title: "खेलकूद गतिविधियाँ",
    category: "खेलकूद",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    isPublished: true,
    sortOrder: 4,
  },
  {
    id: 5,
    title: "विद्यालय का वातावरण",
    category: "विद्यालय परिसर",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    isPublished: true,
    sortOrder: 5,
  },
  {
    id: 6,
    title: "विद्यार्थी गतिविधि",
    category: "शैक्षणिक गतिविधियाँ",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    isPublished: true,
    sortOrder: 6,
  },
  {
    id: 7,
    title: "वार्षिक समारोह",
    category: "वार्षिक समारोह",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    isPublished: true,
    sortOrder: 7,
  },
  {
    id: 8,
    title: "विद्यालय कार्यक्रम",
    category: "अन्य कार्यक्रम",
    image:
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1200&q=80",
    isPublished: true,
    sortOrder: 8,
  },
];