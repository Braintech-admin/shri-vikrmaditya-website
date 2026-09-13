import { prisma } from "@/lib/prisma";

export async function getContactInquiries() {
  return prisma.contactInquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUnreadContactInquiryCount() {
  return prisma.contactInquiry.count({
    where: {
      isRead: false,
    },
  });
}

export async function getContactInquiryById(
  id: number
) {
  return prisma.contactInquiry.findUnique({
    where: {
      id,
    },
  });
}