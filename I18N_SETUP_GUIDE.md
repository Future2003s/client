# Hướng Dẫn Sử Dụng Hệ Thống Đa Ngôn Ngữ

## Tổng Quan

Hệ thống đa ngôn ngữ đã được tích hợp vào dự án Next.js với hỗ trợ 3 ngôn ngữ:

- 🇻🇳 **Tiếng Việt** (vi) - Ngôn ngữ mặc định
- 🇺🇸 **English** (en) - Tiếng Anh
- 🇯🇵 **日本語** (ja) - Tiếng Nhật

## Cấu Trúc Thư Mục

```
src/
├── i18n/
│   ├── config.ts              # Cấu hình chính
│   └── locales/
│       ├── vi.json            # Tiếng Việt
│       ├── en.json            # Tiếng Anh
│       └── ja.json            # Tiếng Nhật
├── components/
│   ├── language-switcher.tsx  # Component chuyển đổi ngôn ngữ
│   └── i18n-demo.tsx         # Component demo
├── hooks/
│   └── use-translation.ts     # Custom hook cho translation
└── app/
    ├── [locale]/              # Dynamic routing cho locale
    │   ├── layout.tsx         # Layout cho locale
    │   ├── page.tsx           # Trang chủ
    │   └── demo/
    │       └── page.tsx       # Trang demo
    └── page.tsx               # Redirect đến locale mặc định
```

## Cách Sử Dụng

### 1. Sử Dụng Translation Hook

```tsx
import { useTranslation } from "@/hooks/use-translation";

export default function MyComponent() {
  const { t, formatCurrency, formatDate, formatNumber } = useTranslation();

  return (
    <div>
      <h1>{t("home.welcome")}</h1>
      <p>Giá: {formatCurrency(1500000)}</p>
      <p>Ngày: {formatDate(new Date())}</p>
      <p>Số lượng: {formatNumber(42)}</p>
    </div>
  );
}
```

### 2. Sử Dụng Trực Tiếp next-intl

```tsx
import { useTranslations, useLocale } from "next-intl";

export default function MyComponent() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div>
      <h1>{t("home.welcome")}</h1>
      <p>Current locale: {locale}</p>
    </div>
  );
}
```

### 3. Thêm Language Switcher

```tsx
import LanguageSwitcher from "@/components/language-switcher";

export default function Header() {
  return (
    <header>
      <LanguageSwitcher />
      {/* Other header content */}
    </header>
  );
}
```

## Thêm Ngôn Ngữ Mới

### 1. Tạo File Ngôn Ngữ

Tạo file mới trong `src/i18n/locales/` (ví dụ: `fr.json` cho tiếng Pháp):

```json
{
  "common": {
    "loading": "Chargement...",
    "error": "Une erreur s'est produite"
  }
}
```

### 2. Cập Nhật Config

Cập nhật `src/i18n/config.ts`:

```typescript
export const locales = ["vi", "en", "ja", "fr"] as const;

export function getLocaleDisplayName(locale: Locale): string {
  const displayNames: Record<Locale, string> = {
    vi: "Tiếng Việt",
    en: "English",
    ja: "日本語",
    fr: "Français", // Thêm dòng này
  };
  return displayNames[locale];
}
```

## URL Structure

Với hệ thống đa ngôn ngữ, URL sẽ có dạng:

- `/vi/` - Trang chủ tiếng Việt
- `/en/` - Trang chủ tiếng Anh
- `/ja/` - Trang chủ tiếng Nhật
- `/vi/products` - Sản phẩm tiếng Việt
- `/en/products` - Sản phẩm tiếng Anh
- `/ja/products` - Sản phẩm tiếng Nhật

## Các Key Translation Chính

### Common

- `common.loading` - Trạng thái đang tải
- `common.error` - Thông báo lỗi
- `common.success` - Thông báo thành công
- `common.save` - Nút lưu
- `common.delete` - Nút xóa

### Navigation

- `navigation.home` - Trang chủ
- `navigation.products` - Sản phẩm
- `navigation.about` - Giới thiệu
- `navigation.contact` - Liên hệ

### Home

- `home.welcome` - Lời chào mừng
- `home.hero_title` - Tiêu đề chính
- `home.hero_subtitle` - Phụ đề

### Products

- `products.title` - Tiêu đề sản phẩm
- `products.price` - Giá
- `products.add_to_cart` - Thêm vào giỏ hàng

## Formatting

### Tiền Tệ

```tsx
const { formatCurrency } = useTranslation();
formatCurrency(1500000, "VND"); // 1.500.000 ₫
```

### Ngày Tháng

```tsx
const { formatDate } = useTranslation();
formatDate(new Date()); // 15 tháng 1 năm 2025
```

### Số

```tsx
const { formatNumber } = useTranslation();
formatNumber(1234567); // 1,234,567
```

## Testing

Để test hệ thống đa ngôn ngữ:

1. Truy cập `/vi/demo` - Demo tiếng Việt
2. Truy cập `/en/demo` - Demo tiếng Anh
3. Truy cập `/ja/demo` - Demo tiếng Nhật

Sử dụng Language Switcher trong header để chuyển đổi giữa các ngôn ngữ.

## Troubleshooting

### Lỗi "Module not found"

- Đảm bảo đã cài đặt `next-intl`: `npm install next-intl`
- Kiểm tra import paths

### Translation không hoạt động

- Kiểm tra file JSON có đúng format không
- Đảm bảo key translation tồn tại trong tất cả file ngôn ngữ
- Kiểm tra middleware configuration

### URL không redirect

- Kiểm tra `next.config.ts` có sử dụng `createNextIntlPlugin`
- Kiểm tra middleware có đúng matcher pattern

## Performance

- Sử dụng `generateStaticParams` để tạo static pages cho mỗi locale
- Lazy load translation files
- Sử dụng `useTranslations` hook để tối ưu re-renders

## Best Practices

1. **Consistency**: Đảm bảo tất cả key translation có trong mọi file ngôn ngữ
2. **Naming**: Sử dụng namespace rõ ràng (ví dụ: `common.`, `home.`, `products.`)
3. **Fallbacks**: Luôn có fallback cho key translation bị thiếu
4. **Testing**: Test tất cả ngôn ngữ trước khi deploy
5. **Maintenance**: Cập nhật translation khi thêm tính năng mới
