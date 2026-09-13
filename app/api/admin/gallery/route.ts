import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

function isLocalUpload(image: string | null | undefined) {
  return Boolean(
    image &&
      image.startsWith("/uploads/gallery/") &&
      !image.includes("..")
  );
}

async function deleteLocalImage(image: string | null | undefined) {
  if (!isLocalUpload(image)) {
    return;
  }

  const relativePath = image!.replace(/^\/+/, "");

  const filePath = path.join(
    process.cwd(),
    "public",
    relativePath
  );

  try {
    await fs.unlink(filePath);
  } catch (error: unknown) {
    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error
        ? String((error as { code?: unknown }).code)
        : "";

    if (code !== "ENOENT") {
      console.error("Gallery image delete error:", error);
    }
  }
}

function parseBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    return value === "true";
  }

  return fallback;
}

function parseNumber(value: unknown, fallback = 0) {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
}

async function ensureWebsiteAdmin() {
  const admin = await requireAdmin();

  if (!admin || admin.role !== "WEBSITE_ADMIN") {
    throw new Error("UNAUTHORIZED");
  }

  return admin;
}

export async function GET() {
  try {
    await ensureWebsiteAdmin();

    const [categories, items] = await Promise.all([
      prisma.galleryCategory.findMany({
        orderBy: [
          { sortOrder: "asc" },
          { id: "asc" },
        ],
        include: {
          _count: {
            select: {
              items: true,
            },
          },
        },
      }),

      prisma.galleryItem.findMany({
        include: {
          category: true,
        },
        orderBy: [
          { sortOrder: "asc" },
          { id: "asc" },
        ],
      }),
    ]);

    return NextResponse.json({
      categories,
      items,
    });
  } catch (error) {
    console.error("Admin gallery GET error:", error);

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureWebsiteAdmin();

    const body = await request.json();

    const action = body?.action;

    if (action === "create-category") {
      const name = String(body?.name ?? "").trim();

      if (!name) {
        return NextResponse.json(
          { error: "Category name is required." },
          { status: 400 }
        );
      }

      const existing = await prisma.galleryCategory.findUnique({
        where: { name },
      });

      if (existing) {
        return NextResponse.json(
          { error: "This category already exists." },
          { status: 409 }
        );
      }

      const category = await prisma.galleryCategory.create({
        data: {
          name,
          isActive: parseBoolean(body?.isActive, true),
          sortOrder: parseNumber(body?.sortOrder, 0),
        },
      });

      revalidatePath("/");
      revalidatePath("/gallery");

      return NextResponse.json({
        success: true,
        category,
      });
    }

    if (action === "create-item") {
      const title = String(body?.title ?? "").trim();
      const image = String(body?.image ?? "").trim();
      const categoryId = Number(body?.categoryId);

      if (!title) {
        return NextResponse.json(
          { error: "Photo title is required." },
          { status: 400 }
        );
      }

      if (!image) {
        return NextResponse.json(
          { error: "Photo is required." },
          { status: 400 }
        );
      }

      if (!Number.isInteger(categoryId)) {
        return NextResponse.json(
          { error: "Valid category is required." },
          { status: 400 }
        );
      }

      const category = await prisma.galleryCategory.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return NextResponse.json(
          { error: "Category not found." },
          { status: 404 }
        );
      }

      const item = await prisma.galleryItem.create({
        data: {
          title,
          categoryId,
          image,
          isPublished: parseBoolean(body?.isPublished, true),
          sortOrder: parseNumber(body?.sortOrder, 0),
        },
        include: {
          category: true,
        },
      });

      revalidatePath("/");
      revalidatePath("/gallery");

      return NextResponse.json({
        success: true,
        item,
      });
    }

    return NextResponse.json(
      { error: "Invalid action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin gallery POST error:", error);

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Gallery save failed." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await ensureWebsiteAdmin();

    const body = await request.json();

    const action = body?.action;
    const id = Number(body?.id);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { error: "Valid ID is required." },
        { status: 400 }
      );
    }

    if (action === "update-category") {
      const name = String(body?.name ?? "").trim();

      if (!name) {
        return NextResponse.json(
          { error: "Category name is required." },
          { status: 400 }
        );
      }

      const existing = await prisma.galleryCategory.findUnique({
        where: { id },
      });

      if (!existing) {
        return NextResponse.json(
          { error: "Category not found." },
          { status: 404 }
        );
      }

      const duplicate = await prisma.galleryCategory.findFirst({
        where: {
          name,
          NOT: {
            id,
          },
        },
      });

      if (duplicate) {
        return NextResponse.json(
          { error: "This category already exists." },
          { status: 409 }
        );
      }

      const category = await prisma.galleryCategory.update({
        where: { id },
        data: {
          name,
          isActive: parseBoolean(
            body?.isActive,
            existing.isActive
          ),
          sortOrder: parseNumber(
            body?.sortOrder,
            existing.sortOrder
          ),
        },
      });

      revalidatePath("/");
      revalidatePath("/gallery");

      return NextResponse.json({
        success: true,
        category,
      });
    }

    if (action === "update-item") {
      const existing = await prisma.galleryItem.findUnique({
        where: { id },
      });

      if (!existing) {
        return NextResponse.json(
          { error: "Gallery photo not found." },
          { status: 404 }
        );
      }

      const title = String(
        body?.title ?? existing.title
      ).trim();

      const categoryId = Number(
        body?.categoryId ?? existing.categoryId
      );

      const image = String(
        body?.image ?? existing.image
      ).trim();

      if (!title) {
        return NextResponse.json(
          { error: "Photo title is required." },
          { status: 400 }
        );
      }

      if (!Number.isInteger(categoryId)) {
        return NextResponse.json(
          { error: "Valid category is required." },
          { status: 400 }
        );
      }

      if (!image) {
        return NextResponse.json(
          { error: "Photo is required." },
          { status: 400 }
        );
      }

      const category = await prisma.galleryCategory.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return NextResponse.json(
          { error: "Category not found." },
          { status: 404 }
        );
      }

      const item = await prisma.galleryItem.update({
        where: { id },
        data: {
          title,
          categoryId,
          image,
          isPublished: parseBoolean(
            body?.isPublished,
            existing.isPublished
          ),
          sortOrder: parseNumber(
            body?.sortOrder,
            existing.sortOrder
          ),
        },
        include: {
          category: true,
        },
      });

      if (
        existing.image !== image &&
        isLocalUpload(existing.image)
      ) {
        await deleteLocalImage(existing.image);
      }

      revalidatePath("/");
      revalidatePath("/gallery");

      return NextResponse.json({
        success: true,
        item,
      });
    }

    if (action === "toggle-category") {
      const category = await prisma.galleryCategory.update({
        where: { id },
        data: {
          isActive: parseBoolean(body?.isActive),
        },
      });

      revalidatePath("/");
      revalidatePath("/gallery");

      return NextResponse.json({
        success: true,
        category,
      });
    }

    if (action === "toggle-item") {
      const item = await prisma.galleryItem.update({
        where: { id },
        data: {
          isPublished: parseBoolean(body?.isPublished),
        },
        include: {
          category: true,
        },
      });

      revalidatePath("/");
      revalidatePath("/gallery");

      return NextResponse.json({
        success: true,
        item,
      });
    }

    return NextResponse.json(
      { error: "Invalid action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin gallery PATCH error:", error);

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Gallery update failed." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureWebsiteAdmin();

    const body = await request.json();

    const type = body?.type;
    const id = Number(body?.id);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { error: "Valid ID is required." },
        { status: 400 }
      );
    }

    if (type === "item") {
      const item = await prisma.galleryItem.findUnique({
        where: { id },
      });

      if (!item) {
        return NextResponse.json(
          { error: "Gallery photo not found." },
          { status: 404 }
        );
      }

      await prisma.galleryItem.delete({
        where: { id },
      });

      await deleteLocalImage(item.image);

      revalidatePath("/");
      revalidatePath("/gallery");

      return NextResponse.json({
        success: true,
      });
    }

    if (type === "category") {
      const category = await prisma.galleryCategory.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              items: true,
            },
          },
        },
      });

      if (!category) {
        return NextResponse.json(
          { error: "Category not found." },
          { status: 404 }
        );
      }

      if (category._count.items > 0) {
        return NextResponse.json(
          {
            error:
              "This category contains photos. Move or delete those photos before deleting the category.",
          },
          { status: 409 }
        );
      }

      await prisma.galleryCategory.delete({
        where: { id },
      });

      revalidatePath("/");
      revalidatePath("/gallery");

      return NextResponse.json({
        success: true,
      });
    }

    return NextResponse.json(
      { error: "Invalid delete type." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin gallery DELETE error:", error);

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Gallery delete failed." },
      { status: 500 }
    );
  }
}