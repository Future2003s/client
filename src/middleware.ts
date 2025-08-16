import { NextResponse, NextRequest } from "next/server";

const privatePath: string[] = [
  "/me",
  "/dashboard",
  "/admin-products",
  "/orders",
  "/accounts",
  "/analytics",
  "/settings",
];
const publicPath: string[] = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const sessionId = request.cookies.get("sessionToken")?.value;

  // đăng nhập vào đường dẫn khi đã đăng nhập
  if (privatePath.some((path) => pathName.startsWith(path)) && !sessionId) {
    const url = new URL("/login", request.url);
    url.searchParams.set("reason", "login_required");
    url.searchParams.set("redirect", pathName);
    return NextResponse.redirect(url);
  }

  // đã đăng nhập nhưng vẫn truy cập vào trang đăng nhập
  if (publicPath.some((path) => pathName.startsWith(path)) && sessionId) {
    const url = new URL("/me", request.url);
    url.searchParams.set("from", "already_logged_in");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/me",
    "/register",
    "/dashboard",
    "/admin-products",
    "/orders",
    "/accounts",
    "/analytics",
    "/settings",
  ],
};
