import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoute;

const authRoute = ["/login", "/register"];
const roleBasedPrivateRoute = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/login?${pathname}`, request.url)
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoute[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoute[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};
