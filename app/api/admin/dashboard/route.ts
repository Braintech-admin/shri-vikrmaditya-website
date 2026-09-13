import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await requireAdmin();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const [
      publishedBanners,
      publishedNews,
      publishedGalleryPhotos,
      unreadContactEnquiries,
      siteSetting,
    ] = await Promise.all([
      prisma.banner.count({
        where: {
          isPublished: true,
        },
      }),

      prisma.news.count({
        where: {
          isPublished: true,
        },
      }),

      prisma.galleryItem.count({
        where: {
          isPublished: true,
        },
      }),

      prisma.contactInquiry.count({
        where: {
          isRead: false,
        },
      }),

      prisma.siteSetting.findFirst({
        select: {
          websiteEnabled: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        publishedBanners,
        publishedNews,
        publishedGalleryPhotos,
        unreadContactEnquiries,
        websiteEnabled:
          siteSetting?.websiteEnabled ?? true,
      },
    });
  } catch (error) {
    console.error(
      "Dashboard API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Dashboard data fetch करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}