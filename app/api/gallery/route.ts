import { NextResponse } from "next/server";
import { getPublishedGalleryCategories, getPublishedGalleryItems } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [categories, items] = await Promise.all([
      getPublishedGalleryCategories(),
      getPublishedGalleryItems(),
    ]);

    return NextResponse.json({
      categories,
      items,
    });
  } catch (error) {
    console.error("Public gallery GET error:", error);

    return NextResponse.json(
      { error: "Gallery load failed" },
      { status: 500 }
    );
  }
}