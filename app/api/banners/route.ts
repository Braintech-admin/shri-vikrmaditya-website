import { NextResponse } from "next/server";
import { unstable_noStore } from "next/cache";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  unstable_noStore();

  try {
    const banners = await prisma.banner.findMany({
      where: {
        isPublished: true,
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
        title: true,
        highlight: true,
        description: true,
        image: true,
        buttonText: true,
        buttonLink: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: banners,
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Public banners fetch error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        data: [],
        message:
          "Banners fetch करने में समस्या हुई।",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}