import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const name = clean(body.name);
    const mobile = clean(body.mobile);
    const message = clean(body.message);

    if (!name) {
      return badRequest(
        "कृपया अपना नाम दर्ज करें।"
      );
    }

    if (!mobile) {
      return badRequest(
        "कृपया मोबाइल नंबर दर्ज करें।"
      );
    }

    if (!message) {
      return badRequest(
        "कृपया अपना संदेश दर्ज करें।"
      );
    }

    if (name.length > 100) {
      return badRequest(
        "नाम अधिकतम 100 अक्षरों का होना चाहिए।"
      );
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return badRequest(
        "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।"
      );
    }

    if (message.length > 500) {
      return badRequest(
        "संदेश अधिकतम 500 अक्षरों का होना चाहिए।"
      );
    }

    const inquiry =
      await prisma.contactInquiry.create({
        data: {
          name,
          mobile,
          message,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "आपका संदेश सफलतापूर्वक भेज दिया गया है।",
        data: {
          id: inquiry.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Contact POST error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "संदेश भेजने में समस्या हुई। कृपया पुनः प्रयास करें।",
      },
      { status: 500 }
    );
  }
}