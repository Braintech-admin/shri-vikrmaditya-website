import { NextResponse } from "next/server";
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
        "आपको Contact Enquiries Management का अधिकार नहीं है।",
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

    const inquiries =
      await prisma.contactInquiry.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    console.error(
      "Contact enquiries GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Contact enquiries fetch करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PATCH
   Mark Read / Unread
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
        "Valid Contact Inquiry ID आवश्यक है।"
      );
    }

    if (
      typeof body.isRead !== "boolean"
    ) {
      return badRequest(
        "Valid read status आवश्यक है।"
      );
    }

    const existing =
      await prisma.contactInquiry.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Contact enquiry नहीं मिली।",
        },
        { status: 404 }
      );
    }

    const updated =
      await prisma.contactInquiry.update({
        where: { id },
        data: {
          isRead: body.isRead,
        },
      });

    return NextResponse.json({
      success: true,
      message: body.isRead
        ? "Enquiry read mark हो गई।"
        : "Enquiry unread mark हो गई।",
      data: updated,
    });
  } catch (error) {
    console.error(
      "Contact enquiry PATCH error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Contact enquiry update करने में समस्या हुई।",
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
        "Valid Contact Inquiry ID आवश्यक है।"
      );
    }

    const existing =
      await prisma.contactInquiry.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Contact enquiry नहीं मिली।",
        },
        { status: 404 }
      );
    }

    await prisma.contactInquiry.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message:
        "Contact enquiry successfully delete हो गई।",
    });
  } catch (error) {
    console.error(
      "Contact enquiry DELETE error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Contact enquiry delete करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}