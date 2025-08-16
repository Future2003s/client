import { NextResponse, NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

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

export default function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  // Xử lý internationalization trước
  const response = intlMiddleware(request);

  // Nếu response đã được xử lý bởi intl middleware, trả về
  if (response.status !== 200) {
    return response;
  }

  // Xử lý authentication
  const sessionId = request.cookies.get("sessionToken")?.value;

  // Đăng nhập vào đường dẫn khi đã đăng nhập
  if (privatePath.some((path) => pathName.includes(path)) && !sessionId) {
    const url = new URL("/login", request.url);
    url.searchParams.set("reason", "login_required");
    url.searchParams.set("redirect", pathName);
    return NextResponse.redirect(url);
  }

  // Đã đăng nhập nhưng vẫn truy cập vào trang đăng nhập
  if (publicPath.some((path) => pathName.includes(path)) && sessionId) {
    const url = new URL("/me", request.url);
    url.searchParams.set("from", "already_logged_in");
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    // Matcher cho internationalization
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // Matcher cho authentication
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
