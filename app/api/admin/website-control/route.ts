import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await requireAdmin();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Only Super Admin can access website control.",
        },
        { status: 403 }
      );
    }

    const setting = await prisma.siteSetting.findFirst({
      select: {
        websiteEnabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        websiteEnabled: setting?.websiteEnabled ?? true,
      },
    });
  } catch (error) {
    console.error("Website control GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Website status fetch करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only Super Admin can change website status.",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    if (typeof body.websiteEnabled !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid website status.",
        },
        { status: 400 }
      );
    }

    const existingSetting =
      await prisma.siteSetting.findFirst();

    let setting;

    if (existingSetting) {
      setting = await prisma.siteSetting.update({
        where: {
          id: existingSetting.id,
        },
        data: {
          websiteEnabled: body.websiteEnabled,
        },
        select: {
          websiteEnabled: true,
        },
      });
    } else {
  setting = await prisma.siteSetting.create({
    data: {
      schoolName: "श्री विक्रमादित्य इंटर कॉलेज",
      address: "बरौली कर्मा, कौंधियरा, प्रयागराज",
      websiteEnabled: body.websiteEnabled,
    },
    select: {
      websiteEnabled: true,
    },
  });
}

    return NextResponse.json({
      success: true,
      message: body.websiteEnabled
        ? "Website enabled successfully."
        : "Website disabled successfully.",
      data: {
        websiteEnabled: setting.websiteEnabled,
      },
    });
  } catch (error) {
    console.error("Website control PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Website status update करने में समस्या हुई।",
      },
      { status: 500 }
    );
  }
}