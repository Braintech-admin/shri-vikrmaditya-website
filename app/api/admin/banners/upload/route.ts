import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

export const runtime = "nodejs";

function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}

function forbiddenResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "आपको Banner Management का अधिकार नहीं है।",
    },
    { status: 403 }
  );
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "WEBSITE_ADMIN") {
      return forbiddenResponse();
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "कृपया एक image file select करें।",
        },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "केवल JPG, PNG और WEBP images allowed हैं।",
        },
        { status: 400 }
      );
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Image का maximum size 5 MB है।",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    const image = sharp(inputBuffer);

    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid image file.",
        },
        { status: 400 }
      );
    }

    /*
     * Banner target:
     * - Large enough for desktop screens
     * - No unnecessary huge files
     * - Preserve aspect ratio
     * - WebP output
     */
    const outputBuffer = await image
      .resize({
        width: 1920,
        height: 700,
        fit: "cover",
        position: "centre",
        withoutEnlargement: true,
      })
      .webp({
        quality: 82,
        effort: 5,
      })
      .toBuffer();

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "banners"
    );

    await mkdir(uploadDirectory, {
      recursive: true,
    });

    const uniqueName = `banner-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.webp`;

    const filePath = path.join(
      uploadDirectory,
      uniqueName
    );

    await writeFile(filePath, outputBuffer);

    const publicPath = `/uploads/banners/${uniqueName}`;

    return NextResponse.json({
      success: true,
      message: "Image successfully upload और compress हो गई।",
      data: {
        path: publicPath,
        width: 1920,
        height: 700,
        size: outputBuffer.length,
      },
    });
  } catch (error) {
    console.error("Banner image upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Image upload करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}