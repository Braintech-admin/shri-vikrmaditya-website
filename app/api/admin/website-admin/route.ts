import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const WEBSITE_ADMIN_ROLE = "WEBSITE_ADMIN";

function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized",
    },
    {
      status: 401,
    }
  );
}

function forbiddenResponse() {
  return NextResponse.json(
    {
      success: false,
      message:
        "केवल Super Admin ही Website Admin account manage कर सकता है।",
    },
    {
      status: 403,
    }
  );
}

/**
 * GET
 *
 * Website Admin account की current information return करता है।
 * Password कभी भी return नहीं किया जाता।
 */
export async function GET() {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "SUPER_ADMIN") {
      return forbiddenResponse();
    }

    const websiteAdmin = await prisma.user.findFirst({
      where: {
        role: WEBSITE_ADMIN_ROLE,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!websiteAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Website Admin account नहीं मिला।",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: websiteAdmin,
    });
  } catch (error) {
    console.error(
      "Website Admin GET API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Website Admin account fetch करने में समस्या हुई।",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * PATCH
 *
 * Super Admin:
 * - username change कर सकता है
 * - password change कर सकता है
 * - account enable / disable कर सकता है
 */
export async function PATCH(request: Request) {
  try {
    const user = await requireAdmin();

    if (!user) {
      return unauthorizedResponse();
    }

    if (user.role !== "SUPER_ADMIN") {
      return forbiddenResponse();
    }

    const body = await request.json();

    const websiteAdmin = await prisma.user.findFirst({
      where: {
        role: WEBSITE_ADMIN_ROLE,
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    if (!websiteAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Website Admin account नहीं मिला।",
        },
        {
          status: 404,
        }
      );
    }

    const data: {
      username?: string;
      passwordHash?: string;
      isActive?: boolean;
    } = {};

    /*
     * --------------------------------
     * Username Change
     * --------------------------------
     */
    if (body.username !== undefined) {
      if (typeof body.username !== "string") {
        return NextResponse.json(
          {
            success: false,
            message: "Username invalid है।",
          },
          {
            status: 400,
          }
        );
      }

      const username = body.username.trim();

      if (username.length < 4) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Username कम से कम 4 characters का होना चाहिए।",
          },
          {
            status: 400,
          }
        );
      }

      if (username.length > 50) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Username maximum 50 characters का हो सकता है।",
          },
          {
            status: 400,
          }
        );
      }

      if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Username में केवल letters, numbers, dot, underscore और hyphen allowed हैं।",
          },
          {
            status: 400,
          }
        );
      }

      /*
       * Username किसी दूसरे account के साथ duplicate नहीं होना चाहिए।
       */
      const existingUser = await prisma.user.findFirst({
        where: {
          username,
          NOT: {
            id: websiteAdmin.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            message:
              "यह username पहले से किसी दूसरे account के लिए उपयोग हो रहा है।",
          },
          {
            status: 409,
          }
        );
      }

      data.username = username;
    }

    /*
     * --------------------------------
     * Password Change
     * --------------------------------
     */
    if (body.password !== undefined) {
      if (typeof body.password !== "string") {
        return NextResponse.json(
          {
            success: false,
            message: "Password invalid है।",
          },
          {
            status: 400,
          }
        );
      }

      const password = body.password;

      if (password.length < 8) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Password कम से कम 8 characters का होना चाहिए।",
          },
          {
            status: 400,
          }
        );
      }

      if (password.length > 100) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Password बहुत लंबा है।",
          },
          {
            status: 400,
          }
        );
      }

      /*
       * Password plain text में database में कभी store नहीं होगा।
       */
      data.passwordHash = await bcrypt.hash(
        password,
        12
      );
    }

    /*
     * --------------------------------
     * Enable / Disable
     * --------------------------------
     */
    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        return NextResponse.json(
          {
            success: false,
            message:
              "Account status invalid है।",
          },
          {
            status: 400,
          }
        );
      }

      data.isActive = body.isActive;
    }

    /*
     * कोई valid field नहीं भेजी गई।
     */
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Update करने के लिए कोई valid field नहीं दी गई।",
        },
        {
          status: 400,
        }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: websiteAdmin.id,
      },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Website Admin account successfully updated.",
      data: updatedUser,
    });
  } catch (error) {
    console.error(
      "Website Admin PATCH API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Website Admin account update करने में समस्या हुई।",
      },
      {
        status: 500,
      }
    );
  }
}