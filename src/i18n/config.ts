import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Các ngôn ngữ được hỗ trợ
export const locales = ["vi", "en", "ja"] as const;
export type Locale = (typeof locales)[number];

// Cấu hình mặc định
export const defaultLocale: Locale = "vi";

// Cấu hình cho next-intl
export default getRequestConfig(async ({ locale }) => {
  // Kiểm tra ngôn ngữ có được hỗ trợ không
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});

// Hàm kiểm tra ngôn ngữ có được hỗ trợ không
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Hàm lấy tên hiển thị của ngôn ngữ
export function getLocaleDisplayName(locale: Locale): string {
  const displayNames: Record<Locale, string> = {
    vi: "Tiếng Việt",
    en: "English",
    ja: "日本語",
  };
  return displayNames[locale];
}

// Hàm lấy ngôn ngữ từ URL
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split("/");
  const locale = segments[1];

  if (isValidLocale(locale)) {
    return locale;
  }

  return null;
}

// Hàm tạo URL với ngôn ngữ
export function createLocalizedPathname(
  pathname: string,
  locale: Locale
): string {
  const segments = pathname.split("/");

  // Nếu pathname đã có locale, thay thế nó
  if (isValidLocale(segments[1])) {
    segments[1] = locale;
  } else {
    // Nếu không có locale, thêm vào đầu
    segments.splice(1, 0, locale);
  }

  return segments.join("/");
}
