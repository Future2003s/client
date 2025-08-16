# Admin Products Setup Guide

## Tổng quan

Trang admin-products đã được cập nhật với đầy đủ chức năng CRUD (Create, Read, Update, Delete) cho sản phẩm.

## Các tính năng đã thêm

### 1. Hiển thị danh sách sản phẩm

- Grid layout responsive với hình ảnh sản phẩm
- Hiển thị thông tin: tên, giá, tồn kho, trạng thái, danh mục, thương hiệu
- Phân trang
- Tìm kiếm theo tên, SKU, thương hiệu
- Lọc theo danh mục và trạng thái

### 2. Thêm sản phẩm mới

- Modal form với đầy đủ các trường:
  - Tên sản phẩm (bắt buộc)
  - Mô tả
  - Giá (bắt buộc)
  - Số lượng tồn kho (bắt buộc)
  - SKU
  - Danh mục
  - Thương hiệu
  - Trạng thái (ACTIVE, INACTIVE, OUT_OF_STOCK)
  - Hình ảnh (nhiều ảnh)

### 3. Chỉnh sửa sản phẩm

- Modal form tương tự như thêm mới
- Tự động điền dữ liệu hiện tại
- Cập nhật thông tin sản phẩm

### 4. Xem chi tiết sản phẩm

- Modal hiển thị đầy đủ thông tin sản phẩm
- Gallery hình ảnh
- Thông tin chi tiết và thống kê
- Nút chỉnh sửa và xóa

### 5. Xóa sản phẩm

- Xác nhận trước khi xóa
- Loading state khi đang xóa

## API Routes đã tạo

### 1. `/api/products/admin` - Lấy danh sách sản phẩm cho admin

- Sử dụng endpoint `/v1/api/products/public` của backend
- Hỗ trợ tìm kiếm, lọc, phân trang

### 2. `/api/products/create` - Tạo sản phẩm mới

- Proxy đến `/v1/api/products/createProduct` của backend
- Yêu cầu authentication

### 3. `/api/products/[id]` - CRUD cho sản phẩm cụ thể

- GET: Lấy chi tiết sản phẩm
- PUT: Cập nhật sản phẩm
- DELETE: Xóa sản phẩm

### 4. `/api/meta/brands` - Lấy danh sách thương hiệu

- Proxy đến `/v1/api/meta/brands` của backend

### 5. `/api/categories` - Lấy danh sách danh mục

- Proxy đến `/v1/api/categories/public` của backend

### 6. `/api/products/statuses` - Lấy danh sách trạng thái

- Trả về các trạng thái: ACTIVE, INACTIVE, OUT_OF_STOCK

## Cấu trúc thư mục

```
src/app/(admin)/admin-products/
├── page.tsx                    # Trang chính
├── components/
│   ├── index.ts               # Export components
│   ├── ProductModal.tsx       # Modal thêm/sửa sản phẩm
│   └── ProductViewModal.tsx   # Modal xem chi tiết sản phẩm
```

## Cách sử dụng

### 1. Khởi chạy backend shopdev

```bash
cd shopdev
mvn spring-boot:run
```

### 2. Khởi chạy frontend

```bash
cd clientCompany
npm run dev
```

### 3. Truy cập trang admin

- Mở trình duyệt và truy cập: `http://localhost:3000/admin-products`
- Đảm bảo đã đăng nhập với quyền admin

## Cấu hình môi trường

Tạo file `.env.local` với nội dung:

```env
NEXT_PUBLIC_API_END_POINT=http://localhost:8080
```

## Lưu ý

1. **Authentication**: Các API tạo, sửa, xóa sản phẩm yêu cầu authentication
2. **Backend**: Cần đảm bảo backend shopdev đang chạy và có các endpoint cần thiết
3. **Images**: Hình ảnh sản phẩm được lưu dưới dạng URL, không upload trực tiếp
4. **Status**: Trạng thái sản phẩm được lọc ở frontend vì backend không hỗ trợ

## Troubleshooting

### Lỗi "Failed to fetch products"

- Kiểm tra backend shopdev có đang chạy không
- Kiểm tra biến môi trường `NEXT_PUBLIC_API_END_POINT`
- Kiểm tra console browser để xem lỗi chi tiết

### Lỗi authentication

- Đảm bảo đã đăng nhập với quyền admin
- Kiểm tra session token trong cookies

### Lỗi tạo/sửa/xóa sản phẩm

- Kiểm tra quyền admin
- Kiểm tra dữ liệu gửi lên có hợp lệ không
- Kiểm tra backend logs để xem lỗi chi tiết
