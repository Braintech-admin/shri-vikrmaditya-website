import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";

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
        "आपको Messages Management का अधिकार नहीं है।",
    },
    { status: 403 }
  );
}

function badRequest(message: string) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 400 }
  );
}

function clean(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function parseRole(value: unknown) {
  if (
    value === "PRINCIPAL" ||
    value === "MANAGER"
  ) {
    return value;
  }

  return null;
}

async function deleteLocalImage(
  imagePath: string | null | undefined
) {
  if (
    !imagePath ||
    !imagePath.startsWith(
      "/uploads/messages/"
    )
  ) {
    return;
  }

  try {
    const relativePath =
      imagePath.replace(/^\/+/, "");

    const filePath = path.join(
      process.cwd(),
      "public",
      relativePath
    );

    await unlink(filePath);
  } catch (error) {
    /*
     * File missing होने पर DB operation को fail नहीं करेंगे।
     */
    console.warn(
      "Message image cleanup warning:",
      error
    );
  }
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

    const messages =
      await prisma.schoolMessage.findMany({
        orderBy: [
          { sortOrder: "asc" },
          { role: "asc" },
          { id: "asc" },
        ],
      });

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error(
      "Messages GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Messages fetch करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   POST
   ========================================================= */

export async function POST(
  request: Request
) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "WEBSITE_ADMIN") {
      return forbiddenResponse();
    }

    const body = await request.json();

    const role = parseRole(body.role);
    const title = clean(body.title);
    const name = clean(body.name);
    const image = clean(body.image);
    const message = clean(body.message);
    const message2 = clean(body.message2);

    const sortOrder =
      body.sortOrder === undefined
        ? 0
        : Number(body.sortOrder);

    const isPublished =
      typeof body.isPublished === "boolean"
        ? body.isPublished
        : true;

    if (!role) {
      return badRequest(
        "Role Principal या Manager होना चाहिए।"
      );
    }

    if (!title) {
      return badRequest(
        "Title आवश्यक है।"
      );
    }

    if (!name) {
      return badRequest(
        "Name आवश्यक है।"
      );
    }

    if (!image) {
      return badRequest(
        "Photo upload करना आवश्यक है।"
      );
    }

    if (!message) {
      return badRequest(
        "Message आवश्यक है।"
      );
    }

    if (
      !Number.isInteger(sortOrder) ||
      sortOrder < 0
    ) {
      return badRequest(
        "Valid display order आवश्यक है।"
      );
    }

    const existing =
      await prisma.schoolMessage.findFirst({
        where: { role },
      });

    if (existing) {
      return badRequest(
        role === "PRINCIPAL"
          ? "Principal Message पहले से मौजूद है। Existing message को Edit करें।"
          : "Manager Message पहले से मौजूद है। Existing message को Edit करें।"
      );
    }

    const created =
      await prisma.schoolMessage.create({
        data: {
          role,
          title,
          name,
          image,
          message,
          message2: message2 || null,
          isPublished,
          sortOrder,
        },
      });

    revalidatePath("/");
    revalidatePath("/messages");

    return NextResponse.json(
      {
        success: true,
        message:
          "Message successfully create हो गया।",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Messages POST error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Message create करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PATCH
   ========================================================= */

export async function PATCH(
  request: Request
) {
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
      return badRequest(
        "Valid Message ID आवश्यक है।"
      );
    }

    const existing =
      await prisma.schoolMessage.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Message नहीं मिला।",
        },
        { status: 404 }
      );
    }

    const data: {
      role?: "PRINCIPAL" | "MANAGER";
      title?: string;
      name?: string;
      image?: string;
      message?: string;
      message2?: string | null;
      isPublished?: boolean;
      sortOrder?: number;
    } = {};

    if (body.role !== undefined) {
      const role = parseRole(body.role);

      if (!role) {
        return badRequest(
          "Role Principal या Manager होना चाहिए।"
        );
      }

      if (role !== existing.role) {
        const duplicate =
          await prisma.schoolMessage.findFirst({
            where: {
              role,
              id: { not: id },
            },
          });

        if (duplicate) {
          return badRequest(
            "इस role का message पहले से मौजूद है।"
          );
        }
      }

      data.role = role;
    }

    if (body.title !== undefined) {
      const title = clean(body.title);

      if (!title) {
        return badRequest(
          "Title खाली नहीं हो सकता।"
        );
      }

      data.title = title;
    }

    if (body.name !== undefined) {
      const name = clean(body.name);

      if (!name) {
        return badRequest(
          "Name खाली नहीं हो सकता।"
        );
      }

      data.name = name;
    }

    if (body.image !== undefined) {
      const image = clean(body.image);

      if (!image) {
        return badRequest(
          "Photo upload करना आवश्यक है।"
        );
      }

      data.image = image;
    }

    if (body.message !== undefined) {
      const message = clean(body.message);

      if (!message) {
        return badRequest(
          "Message खाली नहीं हो सकता।"
        );
      }

      data.message = message;
    }

    if (body.message2 !== undefined) {
      const message2 = clean(body.message2);

      data.message2 =
        message2 || null;
    }

    if (
      body.isPublished !== undefined
    ) {
      if (
        typeof body.isPublished !==
        "boolean"
      ) {
        return badRequest(
          "Invalid publish status."
        );
      }

      data.isPublished =
        body.isPublished;
    }

    if (
      body.sortOrder !== undefined
    ) {
      const sortOrder =
        Number(body.sortOrder);

      if (
        !Number.isInteger(sortOrder) ||
        sortOrder < 0
      ) {
        return badRequest(
          "Valid display order आवश्यक है।"
        );
      }

      data.sortOrder = sortOrder;
    }

    const updated =
      await prisma.schoolMessage.update({
        where: { id },
        data,
      });

    /*
     * यदि नई image save हुई है तो पुरानी
     * local Messages image remove करें।
     */
    if (
      data.image &&
      data.image !== existing.image
    ) {
      await deleteLocalImage(
        existing.image
      );
    }

    revalidatePath("/");
    revalidatePath("/messages");

    return NextResponse.json({
      success: true,
      message:
        "Message successfully update हो गया।",
      data: updated,
    });
  } catch (error) {
    console.error(
      "Messages PATCH error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Message update करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE
   ========================================================= */

export async function DELETE(
  request: Request
) {
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
      return badRequest(
        "Valid Message ID आवश्यक है।"
      );
    }

    const existing =
      await prisma.schoolMessage.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Message नहीं मिला।",
        },
        { status: 404 }
      );
    }

    await prisma.schoolMessage.delete({
      where: { id },
    });

    await deleteLocalImage(
      existing.image
    );

    revalidatePath("/");
    revalidatePath("/messages");

    return NextResponse.json({
      success: true,
      message:
        "Message successfully delete हो गया।",
    });
  } catch (error) {
    console.error(
      "Messages DELETE error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Message delete करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}