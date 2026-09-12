import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { unlink } from "fs/promises";
import path from "path";

function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized",
    },
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

function badRequestResponse(message: string) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 400 }
  );
}

function getSafeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

async function deleteLocalImage(
  imagePath: string | null | undefined
) {
  if (!imagePath) {
    return;
  }

  /*
   * केवल हमारे local uploaded banner files delete होंगे.
   * External URLs या दूसरे paths को touch नहीं किया जाएगा.
   */
  if (!imagePath.startsWith("/uploads/banners/")) {
    return;
  }

  try {
    const relativePath = imagePath.replace(/^\/+/, "");

    const fullPath = path.join(
      process.cwd(),
      "public",
      relativePath
    );

    await unlink(fullPath);
  } catch (error) {
    /*
     * File missing होने पर DB operation fail नहीं करना है.
     */
    console.warn(
      "Banner image delete warning:",
      error
    );
  }
}

/*
 * GET
 */
export async function GET() {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "WEBSITE_ADMIN") {
      return forbiddenResponse();
    }

    const banners = await prisma.banner.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          id: "asc",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error("Banners GET API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Banners fetch करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/*
 * POST
 */
export async function POST(request: Request) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "WEBSITE_ADMIN") {
      return forbiddenResponse();
    }

    const existingBannerCount =
      await prisma.banner.count();

    if (existingBannerCount >= 6) {
      return badRequestResponse(
        "अधिकतम 6 banners ही बनाए जा सकते हैं।"
      );
    }

    const body = await request.json();

    const title = getSafeString(body.title);
    const highlight = getSafeString(body.highlight);
    const description = getSafeString(body.description);
    const image = getSafeString(body.image);

    const buttonText =
      getSafeString(body.buttonText) || null;

    const buttonLink =
      getSafeString(body.buttonLink) || null;

    if (
      !title ||
      !highlight ||
      !description ||
      !image
    ) {
      return badRequestResponse(
        "Title, Highlight, Description और Image आवश्यक हैं।"
      );
    }

    const maxSortOrder =
      await prisma.banner.aggregate({
        _max: {
          sortOrder: true,
        },
      });

    const sortOrder =
      (maxSortOrder._max.sortOrder ?? -1) + 1;

    const banner = await prisma.banner.create({
      data: {
        title,
        highlight,
        description,
        image,
        buttonText,
        buttonLink,
        isPublished: true,
        sortOrder,
      },
    });

    /*
     * Homepage को fresh banner data के लिए revalidate करें.
     */
    revalidatePath("/", "page");

    return NextResponse.json(
      {
        success: true,
        message: "Banner successfully create हो गया।",
        data: banner,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Banners POST API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Banner create करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/*
 * PATCH
 *
 * Supports:
 * - Edit content
 * - Replace image
 * - Publish / Unpublish
 * - Change display order
 */
export async function PATCH(request: Request) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "WEBSITE_ADMIN") {
      return forbiddenResponse();
    }

    const body = await request.json();

    const id = Number(body.id);

    if (!Number.isInteger(id) || id <= 0) {
      return badRequestResponse(
        "Valid Banner ID आवश्यक है।"
      );
    }

    const existingBanner =
      await prisma.banner.findUnique({
        where: {
          id,
        },
      });

    if (!existingBanner) {
      return NextResponse.json(
        {
          success: false,
          message: "Banner नहीं मिला।",
        },
        { status: 404 }
      );
    }

    const data: {
      title?: string;
      highlight?: string;
      description?: string;
      image?: string;
      buttonText?: string | null;
      buttonLink?: string | null;
      isPublished?: boolean;
      sortOrder?: number;
    } = {};

    /*
     * Content fields
     */
    if (typeof body.title === "string") {
      const title = body.title.trim();

      if (!title) {
        return badRequestResponse(
          "Title खाली नहीं हो सकता।"
        );
      }

      data.title = title;
    }

    if (typeof body.highlight === "string") {
      const highlight = body.highlight.trim();

      if (!highlight) {
        return badRequestResponse(
          "Highlight खाली नहीं हो सकता।"
        );
      }

      data.highlight = highlight;
    }

    if (typeof body.description === "string") {
      const description =
        body.description.trim();

      if (!description) {
        return badRequestResponse(
          "Description खाली नहीं हो सकता।"
        );
      }

      data.description = description;
    }

    /*
     * Image replacement
     */
    if (typeof body.image === "string") {
      const image = body.image.trim();

      if (!image) {
        return badRequestResponse(
          "Image खाली नहीं हो सकती।"
        );
      }

      data.image = image;
    }

    /*
     * Optional button
     */
    if (
      body.buttonText === null ||
      typeof body.buttonText === "string"
    ) {
      data.buttonText =
        getSafeString(body.buttonText) || null;
    }

    if (
      body.buttonLink === null ||
      typeof body.buttonLink === "string"
    ) {
      data.buttonLink =
        getSafeString(body.buttonLink) || null;
    }

    /*
     * Publish / Unpublish
     */
    if (typeof body.isPublished === "boolean") {
      data.isPublished = body.isPublished;
    }

    /*
     * Display order
     */
    if (body.sortOrder !== undefined) {
      const sortOrder = Number(body.sortOrder);

      if (
        !Number.isInteger(sortOrder) ||
        sortOrder < 0 ||
        sortOrder > 5
      ) {
        return badRequestResponse(
          "Display Order 1 से 6 के बीच होना चाहिए।"
        );
      }

      data.sortOrder = sortOrder;
    }

    /*
     * Nothing to update
     */
    if (Object.keys(data).length === 0) {
      return badRequestResponse(
        "Update करने के लिए कोई बदलाव नहीं मिला।"
      );
    }

    /*
     * If order is changing, move the
     * current banner and shift the others.
     */
    if (
      data.sortOrder !== undefined &&
      data.sortOrder !== existingBanner.sortOrder
    ) {
      const newOrder = data.sortOrder;
      const oldOrder = existingBanner.sortOrder;

      if (newOrder < oldOrder) {
        await prisma.banner.updateMany({
          where: {
            sortOrder: {
              gte: newOrder,
              lt: oldOrder,
            },
            id: {
              not: id,
            },
          },
          data: {
            sortOrder: {
              increment: 1,
            },
          },
        });
      } else {
        await prisma.banner.updateMany({
          where: {
            sortOrder: {
              gt: oldOrder,
              lte: newOrder,
            },
            id: {
              not: id,
            },
          },
          data: {
            sortOrder: {
              decrement: 1,
            },
          },
        });
      }
    }

    const updatedBanner =
      await prisma.banner.update({
        where: {
          id,
        },
        data,
      });

    /*
     * Homepage को हर update के बाद revalidate करें.
     *
     * इससे:
     * - Edit
     * - Publish
     * - Unpublish
     * - Order change
     * सभी तुरंत homepage पर reflect होंगे.
     */
    revalidatePath("/", "page");

    /*
     * Delete old local image only after
     * successful DB update.
     */
    if (
      data.image &&
      data.image !== existingBanner.image
    ) {
      await deleteLocalImage(
        existingBanner.image
      );
    }

    return NextResponse.json({
      success: true,
      message: "Banner successfully update हो गया।",
      data: updatedBanner,
    });
  } catch (error) {
    console.error(
      "Banners PATCH API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Banner update करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/*
 * DELETE
 */
export async function DELETE(request: Request) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "WEBSITE_ADMIN") {
      return forbiddenResponse();
    }

    const body = await request.json();

    const id = Number(body.id);

    if (!Number.isInteger(id) || id <= 0) {
      return badRequestResponse(
        "Valid Banner ID आवश्यक है।"
      );
    }

    const existingBanner =
      await prisma.banner.findUnique({
        where: {
          id,
        },
      });

    if (!existingBanner) {
      return NextResponse.json(
        {
          success: false,
          message: "Banner नहीं मिला।",
        },
        { status: 404 }
      );
    }

    await prisma.banner.delete({
      where: {
        id,
      },
    });

    /*
     * Remaining banners के order को
     * automatically normalize करें.
     */
    const remainingBanners =
      await prisma.banner.findMany({
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            id: "asc",
          },
        ],
      });

    for (
      let index = 0;
      index < remainingBanners.length;
      index++
    ) {
      const banner = remainingBanners[index];

      if (banner.sortOrder !== index) {
        await prisma.banner.update({
          where: {
            id: banner.id,
          },
          data: {
            sortOrder: index,
          },
        });
      }
    }

    await deleteLocalImage(
      existingBanner.image
    );

    /*
     * Delete के बाद homepage भी refresh होगा.
     */
    revalidatePath("/", "page");

    return NextResponse.json({
      success: true,
      message: "Banner successfully delete हो गया।",
    });
  } catch (error) {
    console.error(
      "Banners DELETE API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Banner delete करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}