import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const categoryIdParam =
      searchParams.get("categoryId");

    const search =
      searchParams.get("search")?.trim() || "";

    const limitParam =
      searchParams.get("limit");

    const categoryId = categoryIdParam
      ? Number(categoryIdParam)
      : null;

    const limit = limitParam
      ? Math.min(
          Math.max(Number(limitParam), 1),
          50
        )
      : undefined;

    const news = await prisma.news.findMany({
      where: {
        isPublished: true,

        ...(categoryId &&
        Number.isInteger(categoryId) &&
        categoryId > 0
          ? {
              categoryId,
            }
          : {}),

        ...(search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                  },
                },
                {
                  excerpt: {
                    contains: search,
                  },
                },
                {
                  content: {
                    contains: search,
                  },
                },
              ],
            }
          : {}),
      },

      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          date: "desc",
        },
        {
          id: "desc",
        },
      ],

      ...(limit
        ? {
            take: limit,
          }
        : {}),
    });

    const categories =
      await prisma.newsCategory.findMany({
        where: {
          isActive: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            id: "asc",
          },
        ],
        select: {
          id: true,
          name: true,
        },
      });

    return NextResponse.json({
      success: true,
      data: {
        news,
        categories,
      },
    });
  } catch (error) {
    console.error("Public News API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "News fetch करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}