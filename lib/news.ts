import { prisma } from "@/lib/prisma";

export async function getPublishedNews() {
  return prisma.news.findMany({
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
      {
        sortOrder: "asc",
      },
      {
        date: "desc",
      },
    ],
  });
}

export async function getPublishedNewsById(
  id: number
) {
  return prisma.news.findFirst({
    where: {
      id,
      isPublished: true,
      category: {
        isActive: true,
      },
    },
    include: {
      category: true,
    },
  });
}

export async function getPublishedNewsCategories() {
  return prisma.newsCategory.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}