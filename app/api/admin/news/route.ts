import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
      message:
        "आपको News & Notices Management का अधिकार नहीं है।",
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

function parseNewsType(value: unknown) {
  if (value === "NOTICE" || value === "EVENT") {
    return value;
  }

  return null;
}

/* =========================================================
   GET
   ========================================================= */

export async function GET() {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "WEBSITE_ADMIN") {
      return forbiddenResponse();
    }

    const [news, categories] = await Promise.all([
      prisma.news.findMany({
        include: {
          category: {
            select: {
              id: true,
              name: true,
              isActive: true,
              sortOrder: true,
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
      }),

      prisma.newsCategory.findMany({
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            id: "asc",
          },
        ],
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        news,
        categories,
      },
    });
  } catch (error) {
    console.error("News GET API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "News & Notices fetch करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   POST
   Supports:
   - News creation
   - Category creation
   ========================================================= */

export async function POST(request: Request) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "WEBSITE_ADMIN") {
      return forbiddenResponse();
    }

    const body = await request.json();

    const action = getSafeString(body.action);

    /* =====================================================
       CREATE CATEGORY
       ===================================================== */

    if (action === "create-category") {
      const name = getSafeString(body.name);

      if (!name) {
        return badRequestResponse(
          "Category name आवश्यक है।"
        );
      }

      if (name.length > 80) {
        return badRequestResponse(
          "Category name अधिकतम 80 characters का हो सकता है।"
        );
      }

      const existingCategory =
        await prisma.newsCategory.findUnique({
          where: {
            name,
          },
        });

      if (existingCategory) {
        return badRequestResponse(
          "यह category पहले से मौजूद है।"
        );
      }

      const maxSortOrder =
        await prisma.newsCategory.aggregate({
          _max: {
            sortOrder: true,
          },
        });

      const sortOrder =
        (maxSortOrder._max.sortOrder ?? 0) + 1;

      const category =
        await prisma.newsCategory.create({
          data: {
            name,
            isActive: true,
            sortOrder,
          },
        });

      return NextResponse.json(
        {
          success: true,
          message: "Category successfully create हो गई।",
          data: category,
        },
        { status: 201 }
      );
    }

    /* =====================================================
       CREATE NEWS
       ===================================================== */

    const type = parseNewsType(body.type);

    const title = getSafeString(body.title);
    const excerpt = getSafeString(body.excerpt);
    const content = getSafeString(body.content);

    const categoryId = Number(body.categoryId);

    const dateValue = getSafeString(body.date);

    if (!type) {
      return badRequestResponse(
        "News Type NOTICE या EVENT होना चाहिए।"
      );
    }

    if (!title) {
      return badRequestResponse(
        "Title आवश्यक है।"
      );
    }

    if (title.length > 250) {
      return badRequestResponse(
        "Title अधिकतम 250 characters का हो सकता है।"
      );
    }

    if (!excerpt) {
      return badRequestResponse(
        "Short Description आवश्यक है।"
      );
    }

    if (!content) {
      return badRequestResponse(
        "Content आवश्यक है।"
      );
    }

    if (
      !Number.isInteger(categoryId) ||
      categoryId <= 0
    ) {
      return badRequestResponse(
        "Valid Category आवश्यक है।"
      );
    }

    if (!dateValue) {
      return badRequestResponse(
        "Date आवश्यक है।"
      );
    }

    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return badRequestResponse(
        "Valid date आवश्यक है।"
      );
    }

    const category =
      await prisma.newsCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

    if (!category) {
      return badRequestResponse(
        "Selected category नहीं मिली।"
      );
    }

    if (!category.isActive) {
      return badRequestResponse(
        "Inactive category में news create नहीं की जा सकती।"
      );
    }

    const maxSortOrder =
      await prisma.news.aggregate({
        _max: {
          sortOrder: true,
        },
      });

    const sortOrder =
      (maxSortOrder._max.sortOrder ?? 0) + 1;

    const news = await prisma.news.create({
      data: {
        type,
        title,
        date: parsedDate,
        categoryId,
        excerpt,
        content,
        isPublished:
          typeof body.isPublished === "boolean"
            ? body.isPublished
            : true,
        isFeatured:
          typeof body.isFeatured === "boolean"
            ? body.isFeatured
            : false,
        sortOrder,
      },
      include: {
        category: true,
      },
    });

    revalidatePath("/", "page");
    revalidatePath("/news", "page");

    return NextResponse.json(
      {
        success: true,
        message:
          "News / Notice successfully create हो गया।",
        data: news,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("News POST API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "News / Notice create करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PATCH
   Supports:
   - News update
   - Publish / Unpublish
   - Featured
   - Sort order
   - Category update
   - Category active/inactive
   ========================================================= */

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

    const action = getSafeString(body.action);

    /* =====================================================
       CATEGORY UPDATE
       ===================================================== */

    if (action === "update-category") {
      const id = Number(body.id);

      if (!Number.isInteger(id) || id <= 0) {
        return badRequestResponse(
          "Valid Category ID आवश्यक है।"
        );
      }

      const category =
        await prisma.newsCategory.findUnique({
          where: {
            id,
          },
        });

      if (!category) {
        return NextResponse.json(
          {
            success: false,
            message: "Category नहीं मिली।",
          },
          { status: 404 }
        );
      }

      const data: {
        name?: string;
        isActive?: boolean;
        sortOrder?: number;
      } = {};

      if (typeof body.name === "string") {
        const name = body.name.trim();

        if (!name) {
          return badRequestResponse(
            "Category name खाली नहीं हो सकता।"
          );
        }

        if (name.length > 80) {
          return badRequestResponse(
            "Category name अधिकतम 80 characters का हो सकता है।"
          );
        }

        const duplicate =
          await prisma.newsCategory.findFirst({
            where: {
              name,
              id: {
                not: id,
              },
            },
          });

        if (duplicate) {
          return badRequestResponse(
            "यह category पहले से मौजूद है।"
          );
        }

        data.name = name;
      }

      if (typeof body.isActive === "boolean") {
        data.isActive = body.isActive;
      }

      if (body.sortOrder !== undefined) {
        const sortOrder = Number(body.sortOrder);

        if (
          !Number.isInteger(sortOrder) ||
          sortOrder < 0
        ) {
          return badRequestResponse(
            "Valid sort order आवश्यक है।"
          );
        }

        data.sortOrder = sortOrder;
      }

      if (Object.keys(data).length === 0) {
        return badRequestResponse(
          "Update करने के लिए कोई बदलाव नहीं मिला।"
        );
      }

      const updatedCategory =
        await prisma.newsCategory.update({
          where: {
            id,
          },
          data,
        });

      revalidatePath("/", "page");
      revalidatePath("/news", "page");

      return NextResponse.json({
        success: true,
        message: "Category successfully update हो गई।",
        data: updatedCategory,
      });
    }

    /* =====================================================
       NEWS UPDATE
       ===================================================== */

    const id = Number(body.id);

    if (!Number.isInteger(id) || id <= 0) {
      return badRequestResponse(
        "Valid News ID आवश्यक है।"
      );
    }

    const existingNews =
      await prisma.news.findUnique({
        where: {
          id,
        },
      });

    if (!existingNews) {
      return NextResponse.json(
        {
          success: false,
          message: "News / Notice नहीं मिला।",
        },
        { status: 404 }
      );
    }

    const data: {
      type?: "NOTICE" | "EVENT";
      title?: string;
      date?: Date;
      categoryId?: number;
      excerpt?: string;
      content?: string;
      isPublished?: boolean;
      isFeatured?: boolean;
      sortOrder?: number;
    } = {};

    if (body.type !== undefined) {
      const type = parseNewsType(body.type);

      if (!type) {
        return badRequestResponse(
          "News Type NOTICE या EVENT होना चाहिए।"
        );
      }

      data.type = type;
    }

    if (typeof body.title === "string") {
      const title = body.title.trim();

      if (!title) {
        return badRequestResponse(
          "Title खाली नहीं हो सकता।"
        );
      }

      if (title.length > 250) {
        return badRequestResponse(
          "Title अधिकतम 250 characters का हो सकता है।"
        );
      }

      data.title = title;
    }

    if (typeof body.date === "string") {
      const date = new Date(body.date);

      if (Number.isNaN(date.getTime())) {
        return badRequestResponse(
          "Valid date आवश्यक है।"
        );
      }

      data.date = date;
    }

    if (body.categoryId !== undefined) {
      const categoryId = Number(
        body.categoryId
      );

      if (
        !Number.isInteger(categoryId) ||
        categoryId <= 0
      ) {
        return badRequestResponse(
          "Valid Category आवश्यक है।"
        );
      }

      const category =
        await prisma.newsCategory.findUnique({
          where: {
            id: categoryId,
          },
        });

      if (!category) {
        return badRequestResponse(
          "Selected category नहीं मिली।"
        );
      }

      if (!category.isActive) {
        return badRequestResponse(
          "Inactive category में news assign नहीं की जा सकती।"
        );
      }

      data.categoryId = categoryId;
    }

    if (typeof body.excerpt === "string") {
      const excerpt = body.excerpt.trim();

      if (!excerpt) {
        return badRequestResponse(
          "Short Description खाली नहीं हो सकती।"
        );
      }

      data.excerpt = excerpt;
    }

    if (typeof body.content === "string") {
      const content = body.content.trim();

      if (!content) {
        return badRequestResponse(
          "Content खाली नहीं हो सकता।"
        );
      }

      data.content = content;
    }

    if (typeof body.isPublished === "boolean") {
      data.isPublished = body.isPublished;
    }

    if (typeof body.isFeatured === "boolean") {
      data.isFeatured = body.isFeatured;
    }

    if (body.sortOrder !== undefined) {
      const sortOrder = Number(body.sortOrder);

      if (
        !Number.isInteger(sortOrder) ||
        sortOrder < 0
      ) {
        return badRequestResponse(
          "Valid sort order आवश्यक है।"
        );
      }

      data.sortOrder = sortOrder;
    }

    if (Object.keys(data).length === 0) {
      return badRequestResponse(
        "Update करने के लिए कोई बदलाव नहीं मिला।"
      );
    }

    /* =====================================================
       FEATURED CONTROL
       एक समय में केवल एक featured news
       ===================================================== */

    if (data.isFeatured === true) {
      await prisma.news.updateMany({
        where: {
          id: {
            not: id,
          },
        },
        data: {
          isFeatured: false,
        },
      });
    }

    /* =====================================================
       SORT ORDER
       ===================================================== */

    if (
      data.sortOrder !== undefined &&
      data.sortOrder !== existingNews.sortOrder
    ) {
      const newOrder = data.sortOrder;
      const oldOrder = existingNews.sortOrder;

      if (newOrder < oldOrder) {
        await prisma.news.updateMany({
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
        await prisma.news.updateMany({
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

    const updatedNews =
      await prisma.news.update({
        where: {
          id,
        },
        data,
        include: {
          category: true,
        },
      });

    revalidatePath("/", "page");
    revalidatePath("/news", "page");

    return NextResponse.json({
      success: true,
      message:
        "News / Notice successfully update हो गया।",
      data: updatedNews,
    });
  } catch (error) {
    console.error("News PATCH API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "News / Notice update करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE
   ========================================================= */

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

    const action = getSafeString(body.action);

    /* =====================================================
       DELETE CATEGORY
       ===================================================== */

    if (action === "delete-category") {
      const id = Number(body.id);

      if (!Number.isInteger(id) || id <= 0) {
        return badRequestResponse(
          "Valid Category ID आवश्यक है।"
        );
      }

      const category =
        await prisma.newsCategory.findUnique({
          where: {
            id,
          },
          include: {
            _count: {
              select: {
                news: true,
              },
            },
          },
        });

      if (!category) {
        return NextResponse.json(
          {
            success: false,
            message: "Category नहीं मिली।",
          },
          { status: 404 }
        );
      }

      if (category._count.news > 0) {
        return badRequestResponse(
          "इस category में news मौजूद हैं। पहले उन news को दूसरी category में move करें।"
        );
      }

      await prisma.newsCategory.delete({
        where: {
          id,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Category successfully delete हो गई।",
      });
    }

    /* =====================================================
       DELETE NEWS
       ===================================================== */

    const id = Number(body.id);

    if (!Number.isInteger(id) || id <= 0) {
      return badRequestResponse(
        "Valid News ID आवश्यक है।"
      );
    }

    const existingNews =
      await prisma.news.findUnique({
        where: {
          id,
        },
      });

    if (!existingNews) {
      return NextResponse.json(
        {
          success: false,
          message: "News / Notice नहीं मिला।",
        },
        { status: 404 }
      );
    }

    await prisma.news.delete({
      where: {
        id,
      },
    });

    /* Normalize order */
    const remainingNews =
      await prisma.news.findMany({
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
      });

    for (
      let index = 0;
      index < remainingNews.length;
      index++
    ) {
      const item = remainingNews[index];

      if (item.sortOrder !== index) {
        await prisma.news.update({
          where: {
            id: item.id,
          },
          data: {
            sortOrder: index,
          },
        });
      }
    }

    revalidatePath("/", "page");
    revalidatePath("/news", "page");

    return NextResponse.json({
      success: true,
      message:
        "News / Notice successfully delete हो गया।",
    });
  } catch (error) {
    console.error("News DELETE API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "News / Notice delete करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}