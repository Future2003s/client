# Hướng dẫn sử dụng Component Loader

Dự án này đã được tích hợp với các component Loader đẹp để cải thiện trải nghiệm người dùng khi có request API. Dưới đây là hướng dẫn chi tiết cách sử dụng.

## Các Component Loader có sẵn

### 1. Loader (Full Screen Overlay)

Component chính với animation logo đẹp, sử dụng cho loading toàn màn hình.

```tsx
import { Loader } from "@/components/ui/loader";

// Sử dụng cơ bản
<Loader isLoading={isLoading} />

// Với tùy chỉnh
<Loader
  isLoading={isLoading}
  message="Đang tải dữ liệu..."
  size="lg"
  overlay={true}
/>
```

**Props:**

- `isLoading`: boolean - Hiển thị/ẩn loader
- `message`: string - Tin nhắn hiển thị (mặc định: "Đang tải...")
- `size`: "sm" | "md" | "lg" - Kích thước loader (mặc định: "md")
- `overlay`: boolean - Có phải overlay toàn màn hình không (mặc định: true)

### 2. Spinner (Simple Spinner)

Spinner đơn giản cho các trường hợp loading nhỏ.

```tsx
import { Spinner } from "@/components/ui/loader";

// Sử dụng cơ bản
<Spinner />

// Với kích thước tùy chỉnh
<Spinner size="lg" />
```

**Props:**

- `size`: "sm" | "md" | "lg" - Kích thước spinner

### 3. ButtonLoader (Button Loading)

Loader cho button khi submit form.

```tsx
import { ButtonLoader } from "@/components/ui/loader";

// Trong button
<button disabled={loading}>
  {loading ? (
    <div className="flex items-center space-x-2">
      <ButtonLoader size="sm" />
      <span>Đang xử lý...</span>
    </div>
  ) : (
    "Gửi"
  )}
</button>;
```

**Props:**

- `size`: "sm" | "md" | "lg" - Kích thước loader

## Cách sử dụng trong các trường hợp cụ thể

### 1. Loading khi khởi tạo trang

```tsx
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const initPage = async () => {
    try {
      // Load data
      await loadData();
    } finally {
      setIsLoading(false);
    }
  };

  initPage();
}, []);

return (
  <>
    <Loader isLoading={isLoading} message="Đang tải trang..." />
    {/* Nội dung trang */}
  </>
);
```

### 2. Loading khi submit form

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    await submitData(data);
    // Xử lý thành công
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <button disabled={isSubmitting}>
    {isSubmitting ? (
      <div className="flex items-center space-x-2">
        <ButtonLoader size="sm" />
        <span>Đang gửi...</span>
      </div>
    ) : (
      "Gửi"
    )}
  </button>
);
```

### 3. Loading khi fetch API

```tsx
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await api.getData();
    setData(response.data);
  } finally {
    setLoading(false);
  }
};

return (
  <div>
    {loading ? (
      <div className="flex justify-center py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 h-4 w-4"></div>
          <span>Đang tải dữ liệu...</span>
        </div>
      </div>
    ) : (
      <div>{/* Hiển thị data */}</div>
    )}
  </div>
);
```

### 4. Loading trong Suspense

```tsx
import { Loader } from "@/components/ui/loader";

<Suspense
  fallback={
    <Loader
      isLoading={true}
      message="Đang tải trang..."
      size="lg"
      overlay={false}
    />
  }
>
  <Component />
</Suspense>;
```

## Best Practices

### 1. Sử dụng đúng component cho từng trường hợp

- **Loader**: Loading toàn màn hình, khởi tạo trang
- **Spinner**: Loading đơn giản, không cần tin nhắn
- **ButtonLoader**: Loading trong button

### 2. Quản lý state loading

```tsx
// Tốt
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await action();
  } finally {
    setLoading(false);
  }
};

// Không tốt - quên set loading = false
const handleAction = async () => {
  setLoading(true);
  await action();
  // Quên setLoading(false) khi có lỗi
};
```

### 3. Sử dụng try-finally

```tsx
const handleSubmit = async () => {
  setLoading(true);
  try {
    await submit();
    // Xử lý thành công
  } catch (error) {
    // Xử lý lỗi
  } finally {
    setLoading(false); // Luôn chạy
  }
};
```

### 4. Disable button khi loading

```tsx
<button
  disabled={loading}
  className={loading ? "opacity-50 cursor-not-allowed" : ""}
>
  {loading ? <ButtonLoader /> : "Gửi"}
</button>
```

## Ví dụ thực tế đã được cập nhật

### 1. Order Form (sendMail/order-form.tsx)

- Sử dụng `Loader` cho loading khởi tạo trang
- Props: `isLoading={isLoading}`, `message="Đang tải trang..."`, `size="md"`

### 2. Payment Callback (payment-callback/page.tsx)

- Sử dụng `Loader` cho loading xử lý thanh toán
- Props: `overlay={false}` để không che toàn màn hình

### 3. Buy Now Modal (components/ui/buy-now-modal.tsx)

- Sử dụng `ButtonLoader` cho loading submit
- Props: `size="sm"` phù hợp với button

### 4. Products Page (products/page.tsx)

- Props: `message="Đang tải sản phẩm..."`

## Lưu ý quan trọng

1. **Import đúng đường dẫn**: `import { Loader } from "@/components/ui/loader"`
2. **Sử dụng đúng props**: Kiểm tra type của props trước khi sử dụng
3. **Quản lý state**: Luôn sử dụng try-finally để đảm bảo loading được reset
4. **UX**: Sử dụng message phù hợp để người dùng hiểu đang chờ gì
5. **Performance**: Không render Loader khi không cần thiết

## Troubleshooting

### Lỗi thường gặp:

1. **Loader không hiển thị**: Kiểm tra `isLoading` có đúng boolean không
2. **Animation bị giật**: Đảm bảo CSS animation được load đúng
3. **Z-index conflict**: Kiểm tra z-index của Loader (mặc định: 50)

### Debug:

```tsx
console.log("Loading state:", isLoading);
console.log("Loader props:", { isLoading, message, size, overlay });
```

Với hướng dẫn này, bạn có thể dễ dàng tích hợp các component Loader đẹp vào dự án để cải thiện trải nghiệm người dùng!
