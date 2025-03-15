import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const authRoute = ["/login", "/register"];
export const middleware= async(request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL(`http://localhost:3000/login?${pathname}`, request.url))
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/create-shop"],
};
