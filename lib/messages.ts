import { prisma } from "@/lib/prisma";

export async function getPublishedMessages() {
  return prisma.schoolMessage.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      { sortOrder: "asc" },
      { role: "asc" },
      { id: "asc" },
    ],
  });
}

export async function getPublishedMessageByRole(
  role: "PRINCIPAL" | "MANAGER"
) {
  return prisma.schoolMessage.findFirst({
    where: {
      role,
      isPublished: true,
    },
    orderBy: [
      { sortOrder: "asc" },
      { id: "asc" },
    ],
  });
}