# API Fixes for Admin Products

## Vấn đề đã được khắc phục

### 1. **Backend ShopDev - Thêm endpoint admin mới**

#### ProductController.java

- ✅ Thêm endpoint `/v1/api/products/admin` với quyền ADMIN
- ✅ Hỗ trợ filter theo status (không có trong endpoint public)
- ✅ Hỗ trợ tất cả các tham số: keyword, categoryId, brandId, status, page, size

#### ProductService.java

- ✅ Thêm method `listProductsForAdmin()` vào interface

#### ProductServiceImpl.java

- ✅ Implement method `listProductsForAdmin()`
- ✅ Sử dụng repository method mới `searchListForAdmin()`
- ✅ **FIXED**: Set giá trị mặc định cho stockQuantity và status
- ✅ **FIXED**: Lấy SKU từ ProductVariant đầu tiên
- ✅ **FIXED**: Set description là null (ProductEntity không có trường này)

#### ProductRepository.java

- ✅ Thêm method `searchListForAdmin()` với query hỗ trợ filter theo status
- ✅ Sử dụng EntityGraph để load brand, category, images

#### ProductListItemResponse.java

- ✅ Thêm các trường mới cho admin:
  - `brandId` (String - UUID)
  - `categoryId` (Long - IDENTITY)
  - `sku` (String) - Lấy từ ProductVariant
  - `description` (String) - Set là null

### 2. **Frontend - Cập nhật API route**

#### `/api/products/admin/route.ts`

- ✅ Sử dụng endpoint admin mới: `/v1/api/products/admin`
- ✅ Hỗ trợ filter theo status
- ✅ Map dữ liệu từ ProductListItemResponse sang format admin cần
- ✅ Xử lý lỗi và response đúng cách

### 3. **Database - Cập nhật dữ liệu**

#### `update_product_data.sql`

- ✅ Script SQL để cập nhật dữ liệu trong database
- ✅ Set `stock_quantity = 0` nếu là null
- ✅ Set `status = 'ACTIVE'` nếu là null

## Vấn đề đã được khắc phục

### **Trước đây (Sai):**

```json
{
  "data": {
    "id": "945fd5f9-86c7-4b8e-8f86-4b6ee7f4a569",
    "name": "Mật Ong Hoa Vải Thanh Hà 165g",
    "price": 160000,
    "brandName": "LLLC Mật Ong Hoa Vải",
    "categoryName": "Mật Ong Hoa Vải",
    "imageUrls": ["..."],
    "variants": [],
    "tags": ["165g"],
    "stockQuantity": null, // ❌ Bị null
    "status": null // ❌ Bị null
  }
}
```

### **Bây giờ (Đúng):**

```json
{
  "data": {
    "id": "945fd5f9-86c7-4b8e-8f86-4b6ee7f4a569",
    "name": "Mật Ong Hoa Vải Thanh Hà 165g",
    "price": 160000,
    "brandName": "LLLC Mật Ong Hoa Vải",
    "categoryName": "Mật Ong Hoa Vải",
    "imageUrls": ["..."],
    "variants": [],
    "tags": ["165g"],
    "stockQuantity": 0, // ✅ Có giá trị mặc định
    "status": "ACTIVE", // ✅ Có giá trị mặc định
    "sku": null, // ✅ Lấy từ ProductVariant
    "description": null, // ✅ ProductEntity không có trường này
    "brandId": "...", // ✅ ID của brand
    "categoryId": 1 // ✅ ID của category
  }
}
```

## Cách test

### 1. **Khởi chạy backend**

```bash
cd shopdev
mvn spring-boot:run
```

### 2. **Cập nhật database (nếu cần)**

```bash
# Chạy script SQL để cập nhật dữ liệu
mysql -u username -p database_name < update_product_data.sql
```

### 3. **Khởi chạy frontend**

```bash
cd clientCompany
npm run dev
```

### 4. **Test API endpoint mới**

```bash
# Test endpoint admin (cần authentication)
curl -X GET "http://localhost:8080/v1/api/products/admin?page=0&size=10" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Test endpoint public (không cần authentication)
curl -X GET "http://localhost:8080/v1/api/products/public?page=0&size=10"
```

### 5. **Test frontend API route**

```bash
# Test frontend API route
curl -X GET "http://localhost:3000/api/products/admin?page=0&size=10"
```

## Các thay đổi chính

### Backend

1. **Endpoint mới**: `/v1/api/products/admin`
2. **Quyền**: Chỉ ADMIN mới có thể truy cập
3. **Filter**: Hỗ trợ filter theo status
4. **Response**: Trả về đầy đủ thông tin cần thiết cho admin
5. **FIXED**: Giá trị mặc định cho stockQuantity và status
6. **FIXED**: Lấy SKU từ ProductVariant

### Frontend

1. **API route**: Sử dụng endpoint admin mới
2. **Data mapping**: Map dữ liệu đúng cách từ backend
3. **Error handling**: Xử lý lỗi tốt hơn
4. **Status filter**: Hỗ trợ filter theo status

### Database

1. **Script SQL**: Cập nhật dữ liệu null thành giá trị mặc định
2. **Data consistency**: Đảm bảo dữ liệu nhất quán

## Lưu ý

1. **Authentication**: Endpoint admin yêu cầu quyền ADMIN
2. **Data mapping**: Frontend map dữ liệu từ ProductListItemResponse
3. **Status filter**: Backend hỗ trợ filter theo status
4. **Performance**: Sử dụng EntityGraph để load dữ liệu hiệu quả
5. **Database**: Chạy script SQL để cập nhật dữ liệu null

## Troubleshooting

### Lỗi "403 Forbidden"

- Đảm bảo đã đăng nhập với quyền ADMIN
- Kiểm tra JWT token có hợp lệ không

### Lỗi "500 Internal Server Error"

- Kiểm tra backend logs
- Đảm bảo database có dữ liệu
- Kiểm tra các entity relationships

### Lỗi "Data mapping failed"

- Kiểm tra ProductListItemResponse có đúng format không
- Kiểm tra API route mapping logic

### Lỗi "stockQuantity hoặc status bị null"

- Chạy script SQL `update_product_data.sql`
- Kiểm tra dữ liệu trong database
- Đảm bảo ProductEntity có dữ liệu đúng
