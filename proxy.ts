import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Admin और API routes को public website control से बाहर रखा गया है.
   */
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  /*
   * फिलहाल public requests को normally आगे जाने दें.
   * Website ON/OFF database check अगला हिस्सा है.
   */
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Static/internal files को छोड़कर public routes पर Proxy चलेगा.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};