import { prisma } from "@/lib/prisma";

export async function getPublishedGalleryCategories() {
  return prisma.galleryCategory.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      { sortOrder: "asc" },
      { id: "asc" },
    ],
  });
}

export async function getPublishedGalleryItems() {
  return prisma.galleryItem.findMany({
    where: {
      isPublished: true,
      category: {
        isActive: true,
      },
    },
    include: {
      category: true,
    },
    orderBy: [
      { sortOrder: "asc" },
      { id: "asc" },
    ],
  });
}