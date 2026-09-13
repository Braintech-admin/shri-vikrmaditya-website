import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import sharp from "sharp";
import { requireAdmin } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();

    if (!admin || admin.role !== "WEBSITE_ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Photo is required" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: "Only JPG, PNG and WEBP images are allowed.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Maximum photo size is 5 MB.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "gallery"
    );

    await fs.mkdir(uploadDir, { recursive: true });

    const filename = `gallery-${Date.now()}-${crypto
      .randomBytes(6)
      .toString("hex")}.webp`;

    const outputPath = path.join(uploadDir, filename);

    await sharp(buffer)
      .rotate()
      .resize({
        width: 1400,
        height: 1100,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 84,
      })
      .toFile(outputPath);

    return NextResponse.json({
      success: true,
      image: `/uploads/gallery/${filename}`,
    });
  } catch (error) {
    console.error("Gallery upload error:", error);

    return NextResponse.json(
      { error: "Photo upload failed" },
      { status: 500 }
    );
  }
}