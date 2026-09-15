import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_FOLDERS = new Set([
  "banners",
  "gallery",
  "messages",
]);

const CONTENT_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      path: string[];
    }>;
  }
) {
  try {
    const { path: segments } = await context.params;

    if (!Array.isArray(segments) || segments.length !== 2) {
      return new NextResponse("Not Found", {
        status: 404,
      });
    }

    const folder = segments[0];
    const filename = segments[1];

    if (!ALLOWED_FOLDERS.has(folder)) {
      return new NextResponse("Not Found", {
        status: 404,
      });
    }

    if (
      !filename ||
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return new NextResponse("Not Found", {
        status: 404,
      });
    }

    const extension = path.extname(filename).toLowerCase();
    const contentType = CONTENT_TYPES[extension];

    if (!contentType) {
      return new NextResponse("Not Found", {
        status: 404,
      });
    }

    const uploadRoot = path.resolve(
      process.cwd(),
      "public",
      "uploads",
      folder
    );

    const filePath = path.resolve(
      uploadRoot,
      filename
    );

    if (!filePath.startsWith(uploadRoot + path.sep)) {
      return new NextResponse("Not Found", {
        status: 404,
      });
    }

    const fileBuffer = await readFile(filePath);

    return new NextResponse(
      new Uint8Array(fileBuffer),
      {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control":
            "public, max-age=31536000, immutable",
        },
      }
    );
  } catch (error: unknown) {
    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error
        ? String(
            (error as { code?: unknown }).code
          )
        : "";

    if (code === "ENOENT") {
      return new NextResponse("Not Found", {
        status: 404,
      });
    }

    console.error(
      "Media serving error:",
      error
    );

    return new NextResponse(
      "Internal Server Error",
      {
        status: 500,
      }
    );
  }
}